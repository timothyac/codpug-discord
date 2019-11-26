# codpug-discord

> Discord bot for pug matches

## What can it do

### Overall (goal)

To have a bot that can create, stage and handle a pug queue/leaderboard for a discord.

### Currently

- Create members into a firebase/firestore db
- !joinQ Allows user's to join a queue
- Match players based on elo
- Send a message to a specific channel to let them know they've matched
- Remove player from queue
- Match reporting

### Working On

- Adjust elo after a match has been reported
- Send a message to a group DM between the two players
- !leaderboard

### Future

- !leaveQ
- Admin overrides
- Deployment to heroku

## Dev

- Built with [Discord.js](https://discord.js.org/).
- Built with [Typescript](https://www.typescriptlang.org/index.html).
- Built with [Firebase](https://firebase.google.com/).

### To Run

```bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run start

# compile TS into JS
npm run build
```

## Helpful Resources

- [Discord Developer Docs](https://discordapp.com/developers/docs/intro)
- [Discord.js Docs](https://discord.js.org/#/docs/main/stable/general/welcome)
- [Discord.js Guide](https://discordjs.guide/)
