export default class Player {
  username: string;
  id: string;
  elo: number;
  inQueue: boolean;

  constructor({ username, id, elo, inQueue }) {
    this.username = username;
    this.id = id;
    this.elo = elo;
    this.inQueue = inQueue || true;
  }
}
