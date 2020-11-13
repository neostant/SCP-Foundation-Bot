const path = require("path")

const helpEmbed = {
  "embed": {
    "title": ":book: The Big Book of Commands",
    "description": "This is the list of every single command we have to offer, generated on-the-fly as you request for them. Keep in mind that, depending on the server, you may or may not be able to use all of them.",
    "color": 16711679,
    "timestamp": "2020-11-12T16:32:07.226Z",
    "footer": {
      "icon_url": "https://cdn.glitch.com/5c16f57a-df22-4cc9-be9b-5a08f8c832b9%2FCivilous_Main3.png",
      "text": "SCP Foundation | Commands List"
    },
    "thumbnail": {
      "url": "https://cdn.glitch.com/5c16f57a-df22-4cc9-be9b-5a08f8c832b9%2FCivilous_Main3.png"
    },
    "fields": []
  }
}

module.exports = {
  ["helpdesc"]: "Find information about every command. `!help`",
  ["throttle"]: 15, // How many seconds before this command can be run (per user)
  ["run"]: function(client, message, args) {
    //message.reply(`:book: book`)
    
    if (args[0]) {
      return
    }
    
    var embed = JSON.parse( JSON.stringify( helpEmbed ) )
    embed["embed"]["timestamp"] = new Date(new Date().toString().split('GMT')[0]+' UTC').toISOString().split('.')[0]
    
    var i = -1
    require("fs").readdirSync(path.join(__dirname, "/")).forEach(function(file) {
      i += 1
      //console.log(file)
      var cmd = require("./" + file)
      embed["embed"]["fields"][i] = {}
      embed["embed"]["fields"][i]["name"] = `!${file.split(".js")}`
      embed["embed"]["fields"][i]["value"] = cmd["helpdesc"]
    });
    
    embed["embed"]["fields"].push({
      name: "Add the SCP Foundation bot to your own server!",
      value: "Interested in having the SCP Foundation bot in your own server? You can do so for free [here](https://discord.com/api/oauth2/authorize?client_id=776438111331680266&permissions=8&scope=bot)."
    })
    
    message.author.send(embed)
    .then(() => {
      message.reply("😃 Check your DMs for more information.")
    })
    .catch(() => {
      message.reply("🚫 We were unable to send you a DM. Please enable your messages for this server and try again.")
    })
  }
}
