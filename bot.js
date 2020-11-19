const fs = require("fs");
const path = require("path")
const { Client } = require('discord.js');
const client = new Client();

var throttling = {}

var Activity = -1
const Activities = [
  ["LISTENING", "!help"],
  ["PLAYING", "https://bot.codercrazy.com"],
  ["WATCHING"], // guilds
]

function toHumanReadableNumber(toCompress) {
    const numberAbbreviations = ['K', 'M', 'B', 'T']
    let compressedNumber = parseInt(toCompress, 10).toFixed(1)

    let placeShift = 0
    while (compressedNumber >= 1000) {
      compressedNumber = (compressedNumber / 1000).toFixed(1)
      placeShift++
    }

    if (placeShift > 0) {
      compressedNumber += numberAbbreviations[placeShift - 1]
    } else {
      compressedNumber = Math.floor(compressedNumber)
    }
  return compressedNumber
}

async function GuildCount() {
  var count = await client.shard.fetchClientValues('guilds.cache.size')
  count = count.reduce((prev, val) => prev + val, 0)
  return toHumanReadableNumber(count)
}

async function ChangeActivity() {
  Activity += 1
  if (Activity >= Activities.length) {Activity = 0}
  var guilds = client.shard.fetchClientValues('guilds.cache.size')
  client.user.setActivity(Activities[Activity][1] || await GuildCount() + " guilds", { type: Activities[Activity][0] || 'LISTENING'})
  setTimeout(ChangeActivity, 15000)
}

client.on("ready", () =>{
    ChangeActivity()
});
client.on('message', message => {
	if (message.author.bot || message.channel.type == "dm") return;
  
  var guildData = require(path.join(__dirname, "data.js"))["getdata"](message.guild.id)
  if (message.content == "<@!776438111331680266> prefix") {
    message.reply(":wave: This server's prefix is `" + guildData.prefix + "`")
  } else if (!message.content.startsWith(guildData.prefix)) {
    return
  }
  
	const args = message.content.slice(guildData.prefix.length).trim().split(/ +/);
	const command = args.shift().toLowerCase();

	if (fs.existsSync(path.join(__dirname, "/commands/" + command + ".js"))) {
    var module = require(path.join(__dirname, "/commands/" + command + ".js"))//["run"](client, message)
    var unixtimestamp = Math.floor(new Date().getTime() / 1000)
    if (!throttling[message.author.id]) {throttling[message.author.id] = {}}
    if (!throttling[message.author.id][command]) {throttling[message.author.id][command] = 0}
    
    if (unixtimestamp >= throttling[message.author.id][command]) {
      throttling[message.author.id][command] = unixtimestamp + module["throttle"]
      module["run"](client, message, args)
    } else {
      message.reply(`:octagonal_sign: Woah, you're sending commands too fast. Try again in ${throttling[message.author.id][command] - unixtimestamp} seconds.`)
    }
    
  }
});

client.login(process.env.BOT_TOKEN)
