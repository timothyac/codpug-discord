import { Message } from "discord.js";
import Player from "./player";
import Queue from "./queue";

export default interface commandData {
  message: Message;
  player: Player;
  queue: Queue;
  messageContents?: string[];
  channelForPostingMatches?;
}
