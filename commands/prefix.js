const path = require("path")

module.exports = {
  ["helpdesc"]: "Set the server's prefix. `!prefix [new prefix]`",
  ["throttle"]: 15, // How many seconds before this command can be run (per user)
  ["run"]: function(client, message, args) {
    var desiredPrefix = args[0]
    if (desiredPrefix) {
      if (message.member.hasPermission("MANAGE_GUILD")) {
        // User wants to set the prefix and is an administrator.
        if (desiredPrefix.length <= 5) {
          
          var guildData = require(path.join(__dirname, "../data.js"))["getdata"](message.guild.id)
          guildData.prefix = desiredPrefix
          var success = require(path.join(__dirname, "../data.js"))["writedata"](message.guild.id, guildData)
          //console.log("Prefix set: " + success)
          if (success) {
            message.reply(":pencil2: Successfully changed this server's prefix to `" + desiredPrefix + "`")
          } else {
            message.reply(":warning: Unable to save the new prefix. Wait a few minutes and then try again. ")
          }
          
        } else {
          message.reply(":warning: The prefix must be under 5 characters.")
        }
      } else {
        message.reply(":no_entry_sign: You need the `Manage Server` permission in order to set the prefix. Message the server owner if you believe this is a mistake.")
      }
    } else {
      // User wants to know the prefix
      var guildData = require(path.join(__dirname, "../data.js"))["getdata"](message.guild.id)
      message.reply(":wave: This server's prefix is `" + guildData.prefix + "`")
    }
  }
}
