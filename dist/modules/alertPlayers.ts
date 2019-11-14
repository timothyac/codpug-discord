import { RichEmbed } from "discord.js";
import alertData from "../classes/alertData";

function generateRandomNumber(MaxNumber: number) {
  return Math.floor(Math.random() * MaxNumber) + 1;
}

function pickRandomMap(map1?: string, map2?: string) {
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

  if (map2) {
    // If there is a second map, then make sure to remove it and map 1
    let newMaps = maps.filter(map => map !== map1 && map !== map2);
    return maps[generateRandomNumber(newMaps.length)];
  } else if (map1) {
    // If there is a first map, then remove it
    let newMaps = maps.filter(map => map !== map1);
    return maps[generateRandomNumber(newMaps.length)];
  } else {
    // No existing maps yet, pick a random map (index)
    return maps[generateRandomNumber(7)];
  }
}

function getMaps(): Array<String> {
  let map1 = pickRandomMap();
  let map2 = pickRandomMap(map1);
  let map3 = pickRandomMap(map1, map2);

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
  let mapsToPlay = getMaps();

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
