const discord = require("discord.js");
const client = new discord.Client();

// 準備ができたら
client.on("ready", message => {
  console.log("bot started!");
});

client.on('message', message =>{
    if(message.content === "!massuparrot"){
        message.channel.send(process.env.MASSU_URL)
    }
})

client.login(process.env.DISCORD_BOT_TOKEN);