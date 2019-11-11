import { Message } from "discord.js";
import Player from "../classes/player";

const queueOfPlayers: Array<Player> = [];

/**
 *
 * @param player to add to the queue
 */
export default function(player: Player, msg: Message): void {
  let { username, id } = player;

  // Check if player is in queue
  let playerAlreadyInQueue = queueOfPlayers.some(
    player => player.username === username && player.id === id
  );

  // If player isn't in que, add them to it
  if (!playerAlreadyInQueue) {
    queueOfPlayers.push(player);
    msg.reply(`we added you to the queue!`);
  } else {
    msg.reply(`you're already in the queue!`);
  }
}
