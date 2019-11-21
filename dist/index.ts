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
const currentMatches = [];
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

  const command = messageContents[0];

  console.log(messageContents);

  // Join the active queue
  if (command === "!joinQ") {
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
      let { newMatch } = await alertPlayers(alertData);

      // Remove players from queue
      await queue.removePlayers([player, matchedPlayer]);

      // Add new match to active matches
      currentMatches.push(newMatch);
    } else {
      // Reply that we couldn't find a match right now
      message.reply(
        "no match found at this time. We will keep trying to match you with other players"
      );
    }
  }

  // Report Match
  if (command === "!reportMatch") {
    console.log("!reportMatch");
  }

  // Check Leaderboard
  if (command === "!leaderBoard") {
    console.log("!leaderBoard");
  }
});

client.login(process.env.DISCORD_TOKEN);
