import { Message, Client } from 'discord.js';
import dotenv from 'dotenv';

dotenv.config();

const client = new Client({
  intents: ['GUILDS', 'GUILD_MEMBERS', 'GUILD_MESSAGES'],
});

client.once('ready', () => {
  console.log(client.user?.tag);
});

client.on('messageCreate', async (message: Message) => {
  if (message.author.bot) return;
  if (message.content.startsWith('!ping')) {
    message.channel.send('pong');
  }
});
client.login(process.env.TOKEN);
