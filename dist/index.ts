// .env file where you will store your discord bot token
require("dotenv").config();
import { Client, RichEmbed, TextChannel } from "discord.js";
import checkOrCreatePlayer from "./modules/checkOrCreatePlayer";
import matchPlayers from "./modules/matchPlayers";
import joinQueue from "./actions/joinQ";

const client = new Client();
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
    let activeQueue = await joinQueue(player, message);
    // Match players
    let { foundMatch, matchedPlayer } = await matchPlayers(player, activeQueue);

    // Determine if the match was found
    if (foundMatch) {
      // Create a rich discord embed
      let richEmbed = new RichEmbed();

      // Set embed properties
      richEmbed.setColor(3140255);
      richEmbed.setTitle(
        `${player.username}(${player.elo}) vs. ${matchedPlayer.username}(${matchedPlayer.elo})`
      );
      richEmbed.setDescription("Best of 3. S&D. CDL Ruleset.");
      richEmbed.addField("Map 1", `Arklov Peak [${player.username}]`, true); // TO-DO: Generate maps randomly
      richEmbed.addField(
        "Map 2",
        `Gun Runner [${matchedPlayer.username}]`,
        true
      );
      richEmbed.addField(
        "Tie Breaker",
        `St. Pretrograd [${player.username}]`,
        true
      );
      richEmbed.setFooter("codpug discord bot - v0.1.0"); // TO-DO: Pull correct bot version
      richEmbed.setTimestamp();

      // Send in the channel the original message was set, can be adjusted
      message.channel.send(richEmbed);
      // Post in specific channel
      channelForPostingMatches.send(richEmbed);
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
