import { RichEmbed } from "discord.js";
import alertData from "../classes/alertData";

// TO-DO: Move to utils
function generateRandomNumber(MaxNumber: number) {
  return Math.floor(Math.random() * MaxNumber) + 1;
}

function getRandomMaps(): Array<String> {
  // Current S&D rotation as of 'CDL v1.0'
  const maps = [
    "Arklov Peak",
    "Azhir Cave",
    "Gun Runner",
    "Hackney Yard",
    "Piccadilly",
    "Rammaza",
    "St. Petrograd"
  ];

  // Generate random number
  let map1Index = generateRandomNumber(6);

  // Get it from the array
  let map1 = maps[map1Index];

  // Remove it
  maps.splice(map1Index, 1);

  // Repeat
  let map2Index = generateRandomNumber(5); // TO-DO: Find out if there is a better way to do this
  let map2 = maps[map2Index];
  maps.splice(map2Index, 1);

  let map3Index = generateRandomNumber(4);
  let map3 = maps[map3Index];

  return [map1, map2, map3];
}

/**
 *
 * @description Generate a rich embed, pick 3 random maps, then send everything to a channel
 * @param alertData { player1, player2, channel }
 */
export default function({ player1, player2, channel }: alertData) {
  // Create a rich discord embed
  let richEmbed = new RichEmbed();

  // Generate maps that will be played
  let mapsToPlay = getRandomMaps();

  // Set embed properties
  richEmbed.setColor(3140255);
  richEmbed.setTitle(
    `${player1.username}(${player1.elo}) vs. ${player2.username}(${player2.elo})`
  );
  richEmbed.setDescription("Best of 3. S&D. CDL Ruleset.");
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
  channel.send(richEmbed);
}
