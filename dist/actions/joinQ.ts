import { Message } from "discord.js";
import Member from "../classes/member";

const queueOfPlayers: Array<Member> = [];

/**
 *
 * @param user User to add to the queue
 */
export default function(user: Member, msg: Message): void {
  let { username, id } = user;

  // Check if player is in queue
  let playerAlreadyInQueue = queueOfPlayers.some(
    user => user.username === username && user.id === id
  );

  // If player isn't in que, add them to it
  if (!playerAlreadyInQueue) {
    queueOfPlayers.push(user);
    msg.reply(`we added you to the queue!`);
  } else {
    msg.reply(`you're already in the queue!`);
  }
}
