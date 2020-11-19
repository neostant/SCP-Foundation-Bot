const fs = require("fs")

module.exports = {
  ["getdata"]: function(guildId) {
    if ( fs.existsSync("./data/guilds/" + guildId + ".json") ) {
      return require("./data/guilds/" + guildId + ".json")
    } else {
      return require("./data/base.json")
    }
  },
  ["writedata"]: function(guildId, newData) {
    fs.writeFile("./data/guilds/" + guildId + ".json", JSON.stringify(newData), function(err) {
      if (err) {return false}
    })
    return true
  }
}
