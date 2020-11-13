const embed = {
  "title": "Credits",
  "description": "Bot development doesn't come out of thin air, each bot has a team behind it. The team for SCP Foundation is comprised of two members, <@309109471546966016> and <@267359927037591553>.",
  "color": 16711679,
  "timestamp": new Date(new Date().toString().split('GMT')[0]+' UTC').toISOString().split('.')[0],
  "footer": {
    "icon_url": "https://cdn.glitch.com/5c16f57a-df22-4cc9-be9b-5a08f8c832b9%2FCivilous_Main3.png",
    "text": "SCP Foundation | Credits "
  },
  "thumbnail": {
    "url": "https://cdn.glitch.com/5c16f57a-df22-4cc9-be9b-5a08f8c832b9%2FCivilous_Main3.png"
  },
  "fields": [
    {
      "name": "Civilous' SCPF",
      "value": "Both developers develop for and maintain the games associated with [Civilous' SCPF](https://www.roblox.com/groups/3360429/SCPF-Special-Containment-Procedures-Foundation#!/about), a Roblox group dedicated to the Foundation. Playing and supporting those games is a way to indirectly support the Developers of this bot. "
    },
    {
      "name": "Feedback",
      "value": "If you have any feedback (such as bugfixes, suggestions, etc.) you are welcome to report it to the google form [here](https://forms.gle/QQNV2BFBJdSJ6dGE8)."
    }
  ]
};
module.exports = {
  ["helpdesc"]: "Get the information on the Developers of the bot. `!credits`",
  ["throttle"]: 10, // How many seconds before this command can be run (per user)
  ["run"]: function(client, message, args) {
    embed["timestamp"] = new Date(new Date().toString().split('GMT')[0]+' UTC').toISOString().split('.')[0]
    message.reply({embed: embed})
  }
}
