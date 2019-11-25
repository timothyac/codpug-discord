import commandData from "../classes/commandData";
import matchPlayers from "../modules/matchPlayers";
import alertPlayers from "../modules/alertPlayers";
import createNewMatch from "../modules/createNewMatch";
import alertData from "../classes/alertData";

export default async function({
  message,
  player,
  queue,
  channelForPostingMatches
}: commandData) {
  let activeQueue = await queue.addPlayer(player, message);

  // Match players
  let { foundMatch, matchedPlayer } = await matchPlayers(player, activeQueue);

  // Determine if the match was found
  if (foundMatch) {
    let data: alertData = {
      player1: player,
      player2: matchedPlayer,
      channel: channelForPostingMatches || message.channel,
      queue: queue
    };

    // Create new match
    let newMatch = await createNewMatch(data);

    // Send out rich embeds
    await alertPlayers(data, newMatch);

    // Remove players from queue
    await queue.removePlayers([player, matchedPlayer]);
  } else {
    // Reply that we couldn't find a match right now
    message.reply(
      "no match found at this time. We will keep trying to match you with other players"
    );
  }
}
