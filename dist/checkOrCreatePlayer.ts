import { Message } from "discord.js";
import Player from "./classes/player";

const arrayOfActiveUsers = [
  { username: "Sunstoe", id: "123", elo: 927, inQueue: true },
  { username: "Sunsbro", id: "1234", elo: 264, inQueue: false },
  { username: "Sunshoe", id: "12345", elo: 735, inQueue: false }
];

/**
 *
 * @param msg Incoming Message object from discord
 * @returns Player
 */
export default function(msg: Message): Player {
  // Destructure msg object
  let { username, id } = msg.author;

  // Check array to see if user & id match
  let checkForUser = arrayOfActiveUsers.some(
    user => user.username === username && user.id === id
  );

  if (!checkForUser) {
    // Create new user
    let newUser = new Player(username, id);

    // Add new user to array
    arrayOfActiveUsers.push(newUser);

    console.log(`Created new user, ${username}`);
    return newUser;
  } else {
    // Grab the user from the array
    let user = arrayOfActiveUsers.filter(
      user => user.username === username && user.id === id
    )[0];

    console.log(`Users exists, ${username}`);
    return user;
  }
}
