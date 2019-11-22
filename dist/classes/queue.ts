import { Message } from "discord.js";
import Player from "./player";
import Match from "./match";

export default class Queue {
  players: Array<Player> = [];
  matches: Array<Match> = [];

  /**
   *
   * @description Add a player from the queue.
   * @param player to add to the queue
   * @param msg so you can reploy to the user
   * @returns {Array} queueOfPlayers
   */
  addPlayer(player: Player, msg: Message): Array<Player> {
    let { username, id } = player;

    // Check to see if player is already in queue
    let playerAlreadyInQueue = this.players.some(
      player => player.username === username && player.id === id
    );

    if (playerAlreadyInQueue) {
      msg.reply(`you're already in the queue!`);
    } else {
      // Add new user to database
      this.players.push(player);
      msg.reply(`we added you to the queue!`);
    }

    return this.players;
  }

  /**
   *
   * @description Remove player(s) from the queue.
   * @param playersToRemove
   * @returns {Array} queueOfPlayers
   */
  removePlayers(playersToRemove: Array<Player>) {
    playersToRemove.forEach(player => {
      let { username, id } = player;

      // Check to see if player is already in queue
      let playerAlreadyInQueue = this.players.some(
        player => player.username === username && player.id === id
      );

      if (playerAlreadyInQueue) {
        let index = this.players.indexOf(player);
        this.players.splice(index, 1);
      }
    });
  }

  /**
   *
   * @description Add an actuve match in the queue.
   * @param matchToAdd
   * @returns {Array} activeMatches
   */
  addNewMatch(matchToAdd: Match): Array<Match> {
    this.matches.push(matchToAdd);

    return this.matches;
  }
}
