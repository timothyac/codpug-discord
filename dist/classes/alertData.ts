import { TextChannel } from "discord.js";
import Player from "./player";

export default interface alertData {
  player1: Player;
  player2: Player;
  channel: TextChannel;
}
