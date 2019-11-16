// .env file where you will store your discord bot token
require("dotenv").config();
import { Client } from "discord.js";
import checkOrCreatePlayer from "./modules/checkOrCreatePlayer";
import matchPlayers from "./modules/matchPlayers";
import alertPlayers from "./modules/alertPlayers";
import Queue from "./classes/queue";
import alertDataInt from "./classes/alertData";

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
  let player = await checkOrCreatePlayer(message);

  // Join the active queue
  if (message.content === "!joinQ") {
    let activeQueue = await queue.addPlayer(player, message);
    // Match players
    let { foundMatch, matchedPlayer } = await matchPlayers(player, activeQueue);

    // Determine if the match was found
    if (foundMatch) {
      let alertData: alertDataInt = {
        player1: player,
        player2: matchedPlayer,
        channel: channelForPostingMatches || message.channel
      };

      // Send out rich embeds
      await alertPlayers(alertData);

      // Remove players from queue
      await queue.removePlayers([player, matchedPlayer]);
    } else {
      // Reply that we couldn't find a match right now
      message.reply(
        "no match found at this time. We will keep trying to match you with other players"
      );
    }
  }

  // Check Leaderboard
  if (message.content === "!leaderBoard") {
  }
});

client.login(process.env.DISCORD_TOKEN);
