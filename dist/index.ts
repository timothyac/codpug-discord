// .env file where you will store your discord bot token
require("dotenv").config();
import { Client } from "discord.js";
import checkOrCreateUser from "./checkOrCreateUser";
import joinQueue from "./actions/joinQ";

const client = new Client();

client.on("ready", () => console.log(`Logged in as ${client.user.tag}!`));

client.on("message", async message => {
  if (message.content === "!joinQ") {
    let user = await checkOrCreateUser(message);
    await joinQueue(user, message);
  }

  if (message.content === "!leaderBoard") {
  }
});

client.login(process.env.DISCORD_TOKEN);
