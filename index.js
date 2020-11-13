const path = require('path')
const request = require('request-promise')
const Discord = require('discord.js')
const express = require("express");
const app = express();

const shardingManager = new Discord.ShardingManager(path.join(__dirname, 'bot.js'), {
  token: process.env.BOT_TOKEN,
  totalShards: 'auto',
  shardArgs: typeof v8debug === 'object' ? ['--inspect'] : undefined,
  execArgv: ['--trace-warnings']
})

shardingManager.on('shardCreate', shard => {
  console.log(`Launching shard ${shard.id + 1}/${shardingManager.totalShards}`)
})

shardingManager.spawn('auto', 8000, -1)

// listen for requests :)
const listener = app.listen(process.env.PORT, () => {
  console.log("Your app is listening on port " + listener.address().port);
});
