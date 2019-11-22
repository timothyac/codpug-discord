// .env file where you will store your discord bot token
require("dotenv").config();
import { Client } from "discord.js";
import checkOrCreatePlayer from "./modules/checkOrCreatePlayer";
import createNewMatch from "./modules/createNewMatch";
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
  const player = await checkOrCreatePlayer(message);

  // Define the message contents
  const messageContents = message.content.split(" ");

  // Grab the user command
  const command = messageContents[0];

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
        channel: channelForPostingMatches || message.channel,
        queue: queue
      };

      // Create new match
      let newMatch = await createNewMatch(alertData);

      // Send out rich embeds
      await alertPlayers(alertData, newMatch);

      // Remove players from queue
      await queue.removePlayers([player, matchedPlayer]);
    } else {
      // Reply that we couldn't find a match right now
      message.reply(
        "no match found at this time. We will keep trying to match you with other players"
      );
    }
  }

  // Report Match
  if (command === "!reportMatch") {
    let currentMatches = queue.matches;

    // Check if array is empty
    let matchIDToReport = messageContents[1];

    // If match ID wasn't included in message
    if (!matchIDToReport)
      return message.reply(
        "you forgot to include match ID, (!reportMatch <matchID>)"
      );

    console.log(matchIDToReport);

    // Check to see if current match exists
    let foundMatch = currentMatches.some(
      match => match.id === Number(matchIDToReport)
    );

    // If match wasn't found
    if (!foundMatch)
      return message.reply("that match ID doesn't exist. Try again.");

    // Find the current match
    let currentMatch = currentMatches.find(
      match => match.id === Number(matchIDToReport)
    );

    currentMatch
      .finishMatch(player)
      .then(reply => message.reply(reply))
      .catch(err => message.reply(err));
    console.log(currentMatch);
  }

  // Check Leaderboard
  if (command === "!leaderBoard") {
    console.log("!leaderBoard");
  }
});

client.login(process.env.DISCORD_TOKEN);
