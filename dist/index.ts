// .env file where you will store your discord bot token
require("dotenv").config();
import { Client } from "discord.js";
import checkOrCreatePlayer from "./modules/checkOrCreatePlayer";
import matchPlayers from "./modules/matchPlayers";
import joinQueue from "./actions/joinQ";

const client = new Client();

client.on("ready", () => console.log(`Logged in as ${client.user.tag}!`));

client.on("message", async message => {
  // Grab the player of the message
  let player = await checkOrCreatePlayer(message);

  // Join the active queue
  if (message.content === "!joinQ") {
    let activeQueue = await joinQueue(player, message);
    // Match players
    await matchPlayers(player, activeQueue);
  }

  // Check Leaderboard
  if (message.content === "!leaderBoard") {
  }
});

client.login(process.env.DISCORD_TOKEN);
