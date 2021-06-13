const discord = require("discord.js");
const axios = require("axios");
const http = require("http");
const querystring = require("querystring");
const client = new discord.Client();

http
  .createServer(function(req, res) {
    if (req.method == "POST") {
      var data = "";
      req.on("data", function(chunk) {
        data += chunk;
      });
      req.on("end", function() {
        if (!data) {
          console.log("No post data");
          res.end();
          return;
        }
        var dataObject = querystring.parse(data);
        console.log("post:" + dataObject.type);
        if (dataObject.type == "wake") {
          console.log("Woke up in post");
          res.end();
          return;
        }
        res.end();
      });
    } else if (req.method == "GET") {
      res.writeHead(200, { "Content-Type": "text/plain" });
      res.end("Discord Bot is active now\n");
    }
  })
  .listen(process.env.PORT);

function fetchNameList() {
  return axios.get(`${process.env.GAS_URL}?name=list`);
}

function fetchValue(name) {
  return axios.get(`${process.env.GAS_URL}?name=${name}`);
}

client.on("ready", message => {
  console.log("bot started!");
  client.user.setPresence({ activity: { name: "Visual Studio Parrot" } });
});

client.on("message", async message => {
  const commands = message.content.split(" ");
  console.log(commands);
  if (commands[0] === "!smp") {
    if (commands[1] === "list") {
      fetchNameList().then(res => {
        console.log(res.data.data);
        message.channel.send(`\`\`\`\n${res.data.data.join("\n")}\n\`\`\``);
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
