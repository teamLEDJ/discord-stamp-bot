const discord = require("discord.js");
const axios = require("axios");
const client = new discord.Client();

function fetchNameList() {
  return axios.get(`${process.env.GAS_URL}?name=list`);
}

function fetchValue(name) {
  return axios.get(`${process.env.GAS_URL}?name=${name}`);
}

client.on("ready", message => {
  console.log("bot started!");
});

client.on("message", async message => {
  const commands = message.content.split(" ");
  console.log(commands);
  if (commands[0] === "!smp") {
    if (commands[1] === "list") {
      fetchNameList().then(res => {
        console.log(res.data.data);
        message.channel.send(`===###===\n${res.data.data.join('\n')}\n===###===`);
      });
    } else {
      fetchValue(commands[1]).then(res => {
        console.log(res.data.data);
        message.channel.send(res.data.data);
      });
    }
  }

  if (message.content === "!massuparrot") {
    message.channel.send(process.env.MASSU_URL);
  }
});

client.login(process.env.DISCORD_BOT_TOKEN);
