const { Client, GatewayIntentBits, Collection } = require("discord.js");
require("dotenv").config();
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildVoiceStates,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

client.commands = new Collection();
client.aliases = new Collection();
client.categories = new Collection();

["command", "event"].forEach((handler) =>
  require(`./handlers/${handler}`)(client)
);
module.exports.client = client;
client.login(process.env.TOKEN);
