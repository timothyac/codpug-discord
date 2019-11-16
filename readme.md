# codpug-discord

> Discord bot for pug matches

## What can it do

### Overall (goal)

To have a bot that can create, stage and handle a pug queue/leaderboard for a discord.

### Currently

- Create members into a firebase/firestore db
- Allows user's to join a queue
- Match players based on elo
- Send a message to a specific channel to let them know they've matched
- Remove player from queue

### Workin On

- Send a message to a group DM between the two players
- Match reporting (using reaction collector)

### Future

- !leaderboard
- !leaveQ
- Deployment to heroku

## Dev

- Built with [Typescript](https://www.typescriptlang.org/index.html).
- Built with [Firebase](https://firebase.google.com/).

### To Run

## Build Setup

```bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run start

# compile TS into JS
npm run build
```
