import { Message } from "discord.js";
import db from "./firebase";
import Player from "../classes/player";

let playersCollection = db.collection("players");

let checkDbForPlayer = async userId => {
  try {
    // Define the player
    let player = await playersCollection.doc(userId).get();

    // Use the firestore property to check if it exists
    let playerExists = (await player.exists) ? true : false;

    return playerExists;
  } catch (error) {
    console.log("Problem checking player");
  }
};

/**
 *
 * @param msg Incoming Message object from discord
 * @returns Player
 */
export default async function(msg: Message) {
  // Destructure msg object
  let { username, id } = msg.author;

  // Check to see if player already exists
  let playerAlreadyExists = await checkDbForPlayer(id);

  // If player does exist, then return the player data
  if (playerAlreadyExists) {
    // Get player information from firestore
    let player = await playersCollection.doc(id).get();

    // .data() is the function to pull the data
    let playerData = await player.data();

    // @ts-ignore
    return new Player(playerData);
  } else {
    let newUser = {
      username,
      id,
      elo: 50,
      inQueue: false
    };

    // Add new user to database
    await playersCollection.doc(id).set(newUser);

    // Create a new player based on the provided info
    return new Player(newUser);
  }
}
