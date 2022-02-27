import { Message, Client } from 'discord.js';
import dotenv from 'dotenv';
import * as admin from 'firebase-admin';
const serviceAccount = require('../key.json');

dotenv.config();

let triggerKeywords: string[] = [];

const checkKeywords = (array: string[], targetText: string) => {
  array.forEach((keyword) => {
    if (targetText.indexOf(keyword) !== -1) {
      console.log({ keyword });
    }
  });
};

const client = new Client({
  intents: ['GUILDS', 'GUILD_MEMBERS', 'GUILD_MESSAGES'],
});

client.once('ready', () => {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: process.env.DATABASE_URL,
  });
  const db = admin.database();
  const ref = db.ref();

  ref.on('value', (snapshot) => {
    console.log(snapshot.val());
    triggerKeywords = Object.keys(snapshot.val());
    console.log(triggerKeywords);
  });

  console.log(client.user?.tag);
});

client.on('messageCreate', async (message: Message) => {
  if (message.author.bot) return;
  if (message.content.startsWith('!ping')) {
    message.channel.send('pong');
  }
});

client.on('message', async (message) => {
  if (message.author.bot) return;
  checkKeywords(triggerKeywords, message.content);
});

client.login(process.env.TOKEN);
