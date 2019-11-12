import { Message } from "discord.js";
import db from "./firebase";
import Player from "../classes/player";

let playersCollection = db.collection("players");

let checkDbForPlayer = async userId => {
  try {
    let player = await playersCollection.doc(userId).get();

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
    let player = await playersCollection.doc(id).get();
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

    return new Player(newUser);
  }
}
