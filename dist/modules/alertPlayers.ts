import { RichEmbed } from "discord.js";
import alertData from "../classes/alertData";

export default function({ player1, player2, channel }: alertData) {
  // Create a rich discord embed
  let richEmbed = new RichEmbed();

  // Set embed properties
  richEmbed.setColor(3140255);
  richEmbed.setTitle(
    `${player1.username}(${player1.elo}) vs. ${player2.username}(${player2.elo})`
  );
  richEmbed.setDescription("Best of 3. S&D. CDL Ruleset.");
  richEmbed.addField("Map 1", `Arklov Peak [${player1.username}]`, true); // TO-DO: Generate maps randomly
  richEmbed.addField("Map 2", `Gun Runner [${player2.username}]`, true);
  richEmbed.addField(
    "Tie Breaker",
    `St. Pretrograd [${player1.username}]`,
    true
  );
  richEmbed.setFooter("codpug discord bot - v0.1.0"); // TO-DO: Pull correct bot version
  richEmbed.setTimestamp();

  // Post in specific channel
  channel.send(richEmbed);
}
