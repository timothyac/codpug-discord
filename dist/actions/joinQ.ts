import { Message } from "discord.js";
import Player from "../classes/player";

let player1 = new Player({ username: "a", id: "123", elo: 190, inQueue: true });
let player2 = new Player({ username: "b", id: "234", elo: 150, inQueue: true });
let player3 = new Player({ username: "c", id: "345", elo: 250, inQueue: true });
let player4 = new Player({ username: "d", id: "456", elo: 100, inQueue: true });
let player5 = new Player({ username: "3", id: "567", elo: 110, inQueue: true });

const queueOfPlayers: Array<Player> = [
  player1,
  player2,
  player3,
  player4,
  player5
];

/**
 *
 * @param player to add to the queue
 * @param msg so you can reploy to the user
 * @returns {Array} queueOfPlayers
 */
export default function(player: Player, msg: Message): Array<Player> {
  let { username, id } = player;

  // Check to see if player is already in queue
  let playerAlreadyInQueue = queueOfPlayers.some(
    player => player.username === username && player.id === id
  );

  if (playerAlreadyInQueue) {
    msg.reply(`you're already in the queue!`);
  } else {
    // Add new user to database
    queueOfPlayers.push(player);
    msg.reply(`we added you to the queue!`);
  }

  return queueOfPlayers;
}
