export default class Player {
  username: string;
  id: string;
  elo: number = 50;
  inQueue: boolean = false;

  constructor(username: string, id: string) {
    this.username = username;
    this.id = id;
  }
}
