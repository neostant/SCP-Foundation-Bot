module.exports = {
  ["helpdesc"]: "Get the response delay to Discord's gateway. `!ping`",
  ["throttle"]: 10, // How many seconds before this command can be run (per user)
  ["run"]: function(client, message, args) {
    message.reply(`:ping_pong: Pong!  ${client.ws.ping}ms`)
  }
}
