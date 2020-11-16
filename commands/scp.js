const request = require("request-promise")

var SCPEmbed = {
"embed": {
    "title": "SCP - ",
    "url": "http://www.scpwiki.com/scp-",
    "color": 16711679,
    "timestamp": "2020-11-12T15:22:58.716Z",
    "footer": {
      "icon_url": "https://cdn.glitch.com/5c16f57a-df22-4cc9-be9b-5a08f8c832b9%2FCivilous_Main3.png",
      "text": "SCPF | Public Database"
    },
    "fields": []
  }
}

var overrides = {
  '457': 4,
  '096': 4,
  '173': 4,
  '910': 4,
  '4101': 4
}

function formatText(text) {
  var t = text.replace( /(<([^>]+)>)/ig, '').replace("&#160;", " ").replace("&quot;", "'").substring(0, 1000)
  if (t.charAt(999)) {
    return t + "..."
  } else {
    return t
  }
}

function processRaw(scp, text) {
  //return text.replace("</strong>", "**").replace( /(<([^>]+)>)/ig, '').replace("&#160;", " ")
  var Embed = JSON.parse( JSON.stringify(SCPEmbed) )
  
  if (scp == '001') {
    Embed["embed"]["fields"][0] = {}
    Embed["embed"]["fields"][0]["name"] = "ERROR: INVALID CLEARANCE"
    Embed["embed"]["fields"][0]["value"] = "UNABLE TO LOAD SCP DATA."
    Embed["embed"]["title"] = null
    Embed["embed"]["url"] = null
    Embed["embed"]["timestamp"] = new Date(new Date().toString().split('GMT')[0]+' UTC').toISOString().split('.')[0]
    
    return Embed
  }
  
  Embed["embed"]["title"] = Embed["embed"]["title"] + scp
  Embed["embed"]["url"] = Embed["embed"]["url"] + scp
  Embed["embed"]["timestamp"] = new Date(new Date().toString().split('GMT')[0]+' UTC').toISOString().split('.')[0]
  
  var i
  var v = text.length-1
  if (v > overrides[scp] || 5) {v = overrides[scp] || 5}
  for (i = 0; i < v; i++) {
    // Skip index 0
    Embed["embed"]["fields"][i] = {}
    Embed["embed"]["fields"][i]["name"] = formatText(text[i+1].split("</strong>")[0]) || "Error"
    Embed["embed"]["fields"][i]["value"] = formatText(text[i+1].split("</strong>")[1]) || "Unable to load information."
  }
  
  //Embed["embed"]["fields"]
  
  return Embed
}

module.exports = {
  ["helpdesc"]: "Look up the information on any SCP. `!scp [scp number]`",
  ["throttle"]: 5, // How many seconds before this command can be run (per user)
  ["run"]: function(client, message, args) {
    var scp = args[0]
    if (!isNaN(scp)) {
      
      if (scp < 1) {
        message.reply(":warning: The first argument must be a number above 0. (ex. `!scp 049`)")
        return
      } else if (scp > 10000) {
        message.reply(":warning: The first argument must be a number below 10,000. (ex. `!scp 049`)")
        return
      }
      
      if (scp.length < 3) {
        scp = ("0").repeat(3-scp.length) + scp
      }
      
      var err = false
      
      request.get(`http://www.scpwiki.com/scp-${scp}`)
      .catch(function (er) {
        err = true
        message.reply(processRaw("001"))
      })  
      .then(function (res) {
        if (err) {return}
        var raw = res.split("<p><strong>")
        var embed = processRaw(scp, raw)
        
        var imgsearch = raw[0].split('<div class="scp-image-block block-right"')
        if (imgsearch[1]) {
          var url = imgsearch[1].substring(0, 100).match(/\bhttps?:\/\/\S+/gi)[0].split('"')[0]
          if (url) {
            embed["embed"]["image"] = {}
            embed["embed"]["image"]["url"] = url
            //console.log(url)
          }
        }
        
        //console.log(embed)
        message.reply(embed)
      })
    } else {
      message.reply(":warning: The first argument must be a number. (ex. `!scp 049`)")
    }
  }
}
