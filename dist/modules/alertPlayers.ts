import { RichEmbed } from "discord.js";
import alertData from "../classes/alertData";
import Match from "../classes/match";

/**
 *
 * @description Generate a rich embed, pick 3 random maps, then send everything to a channel
 * @param alertData { player1, player2, channel }
 * @param Match newMatch
 */
export default async function(
  { player1, player2, channel }: alertData,
  newMatch: Match
) {
  // Create a rich discord embed
  let richEmbed = new RichEmbed();

  // Generate maps that will be played
  let mapsToPlay = await newMatch.getRandomMaps();

  // Set embed properties
  richEmbed.setColor(3140255);
  richEmbed.setURL("https://github.com/SunstroUS/codpug-discord");
  richEmbed.setTitle(
    `${player1.username}(${player1.elo}) vs. ${player2.username}(${player2.elo})`
  );
  richEmbed.setDescription(
    `Best of 3. S&D. CDL Ruleset. Match ID: ${newMatch.id}`
  );
  richEmbed.addField("Map 1", `${mapsToPlay[0]} [${player1.username}]`, true);
  richEmbed.addField("Map 2", `${mapsToPlay[1]} [${player2.username}]`, true);
  richEmbed.addField(
    "Tie Breaker",
    `${mapsToPlay[2]} [${player1.username}]`,
    true
  );
  richEmbed.setFooter("codpug discord bot - v0.1.0"); // TO-DO: Pull actual bot version
  richEmbed.setTimestamp();

  // Post in specific channel
  let messagePromise = await channel.send(richEmbed);

  return Promise.resolve({ messagePromise });
}
