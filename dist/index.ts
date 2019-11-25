// .env file where you will store your discord bot token
require("dotenv").config();
import { Client } from "discord.js";
import checkOrCreatePlayer from "./modules/checkOrCreatePlayer";
import Queue from "./classes/queue";
import joinQ from "./actions/joinQ";
import reportMatch from "./actions/reportMatch";

const client = new Client();
const queue = new Queue();
let channelForPostingMatches;

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);

  // Get channel that matches will be posted in
  channelForPostingMatches = client.channels
    .filter(channel => channel.id == process.env.DISCORD_MATCH_CHANNEL)
    .get(process.env.DISCORD_MATCH_CHANNEL);
});

client.on("message", async message => {
  // Grab the player of the message
  const player = await checkOrCreatePlayer(message);

  // Define the message contents
  const messageContents = message.content.split(" ");

  // Grab the user command
  const command = messageContents[0];

  // Join the active queue
  if (command === "!joinQ") {
    joinQ({ message, player, queue, channelForPostingMatches });
  }

  // Report Match
  if (command === "!reportMatch") {
    reportMatch({ message, player, queue, messageContents });
  }

  // Check Leaderboard
  if (command === "!leaderBoard") {
    console.log("!leaderBoard");
  }
});

client.login(process.env.DISCORD_TOKEN);
