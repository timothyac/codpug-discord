import Player from "./player";
import generateRandomNumber from "../utils/randomNumber";

export default class Match {
  player1: Player;
  player2: Player;
  id: number;
  active: boolean;
  winner: Player;
  loser: Player;
  mapsToPlay: Array<string>;

  constructor({ player1, player2 }) {
    this.player1 = player1;
    this.player2 = player2;
    this.id = generateRandomNumber(999999);
    this.active = true;
  }

  getRandomMaps(): Array<string> {
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

    let mapsToPlay = [map1, map2, map3];

    this.mapsToPlay = mapsToPlay;

    return mapsToPlay;
  }

  finishMatch() {
    this.active = false;
  }
}
