import alertData from "../classes/alertData";
import Match from "../classes/match";

export default async function({ player1, player2, queue }: alertData) {
  // Create a new match
  let newMatch = new Match({ player1, player2 });

  // Add match to queue
  await queue.addNewMatch(newMatch);

  return newMatch;
}
