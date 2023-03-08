module.exports = (client, message) => {
  if (message.author.bot) return;
  const prefix = "!";
  if (!message.content.startsWith(prefix)) return;
  const args = message.content.slice(prefix.length).trim().split(" ");
  const cmd = args.shift().toLowerCase();
  const command =
    client.commands.get(cmd) || client.commands.get(client.aliases.get(cmd));
  console.log("command: ", command);
  if (command) command.run(client, message, args);
  console.log(args);
  console.log(cmd);
};
