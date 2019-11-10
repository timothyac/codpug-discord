//msg.reply(`Added ${msg.author.username} to the queue!`);
export default function(msg) {
  msg.reply(`Added ${msg.author.username} to the queue!`);
  console.log("Added user to queue");
}
