import { Message } from "discord.js";
import Player from "../classes/player";

let player1 = new Player({ username: "a", id: "123", elo: 90, inQueue: true });
let player2 = new Player({ username: "b", id: "234", elo: 160, inQueue: true });
let player3 = new Player({ username: "c", id: "345", elo: 250, inQueue: true });

const queueOfPlayers: Array<Player> = [player1, player2, player3];

/**
 *
 * @param player to add to the queue
 */
export default function(player: Player, msg: Message) {
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

  console.log(queueOfPlayers);
  return queueOfPlayers;
}
