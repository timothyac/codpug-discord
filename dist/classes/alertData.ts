import { TextChannel } from "discord.js";
import Player from "./player";
import Queue from "./queue";

export default interface alertData {
  player1: Player;
  player2: Player;
  channel: TextChannel;
  queue: Queue;
}
