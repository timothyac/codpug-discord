import commandData from "../classes/commandData";

export default function({
  message,
  player,
  queue,
  messageContents
}: commandData) {
  let currentMatches = queue.matches;

  // Check if array is empty
  let matchIDToReport = messageContents[1];

  // If match ID wasn't included in message
  if (!matchIDToReport)
    return message.reply(
      "you forgot to include match ID, (!reportMatch <matchID>)"
    );

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
}
