// .env file where you will store your discord bot token
require("dotenv").config();
import * as Discord from "discord.js";
import joinQueue from "./actions/joinQ";

const client = new Discord.Client();

client.on("ready", () => console.log(`Logged in as ${client.user.tag}!`));

client.on("message", msg => {
  if (msg.content === "!joinQ") {
    joinQueue(msg);
  }
});

client.login(process.env.DISCORD_TOKEN);
