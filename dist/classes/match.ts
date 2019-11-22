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

  finishMatch(winner) {
    // Set winner and loser
    let resultsSet = this._setWinnerAndLoser(winner);

    // If the message author was not a player, reject
    if (!resultsSet)
      return Promise.reject("you are not a player of this match.");

    // Set match to inactive
    this.active = false;

    // TODO: Add elo adjust function
    return Promise.resolve(
      `congratulations on winning the match, you're elo has now been adjusted to: `
    );
  }

  _setWinnerAndLoser(player) {
    // Match the message author to the player
    if (player === this.player1) {
      this.winner = this.player1;
      this.loser = this.player2;
      return true;
    } else if (player === this.player2) {
      this.winner = this.player2;
      this.loser = this.player1;
      return true;
    } else {
      return false;
    }
  }
}
