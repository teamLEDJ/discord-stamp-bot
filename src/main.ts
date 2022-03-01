import { Client } from 'discord.js';
import dotenv from 'dotenv';
import * as admin from 'firebase-admin';
const serviceAccount = require('../key.json');

dotenv.config();

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: process.env.DATABASE_URL,
});
const db = admin.database();

let triggerKeywords: string[] = [];

const client = new Client({
  intents: ['GUILDS', 'GUILD_MEMBERS', 'GUILD_MESSAGES'],
});

client.once('ready', () => {
  const ref = db.ref();

  ref.on('value', (snapshot) => {
    console.log(snapshot.val());
    triggerKeywords = Object.keys(snapshot.val());
    console.log(triggerKeywords);
  });

  console.log(client.user?.tag);
});

client.on('message', async (message) => {
  if (message.author.bot) return;

  triggerKeywords.forEach((keyword) => {
    if (message.content.indexOf(keyword) !== -1) {
      console.log({ keyword });
      const ref = db.ref(keyword);
      ref.on('value', (snapshot) => {
        const stampsList: string[] = snapshot.val();
        const randomIndex = Math.floor(Math.random() * stampsList.length);
        message.channel.send(stampsList[randomIndex]);
      });
    }
  });
});

client.login(process.env.TOKEN);
