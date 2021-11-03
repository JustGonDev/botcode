var login = require("fca-unofficial-force")
var fs = require("fs")
var axios = require("axios")
var package = require("./package.json");
require("npmlog").emitLog = () => { };

//commands
var cmds = require("./cmds.js")()

//config
var config = require("./configcreate.js");
config()

//startbot
if(fs.existsSync('phongdzvippro.json')){
login({appState: JSON.parse(fs.readFileSync('phongdzvippro.json', 'utf8'))}, (err, api) => {
    
    if(err){ 
        return console.error('Not logged in');
    }
    console.log("Bot ID: " + api.getCurrentUserID());
    api.listenMqtt((err, event) => {
        if(err) return console.error(err);
        console.log(event);

        api.setOptions({
            forceLogin: true,
            listenEvents: true,
            selfListen: true
            });
            switch (event.type) {
                case "log:subscribe":
                case "log:unsubscribe":
                case "message": {
                    cmds({ event, api });
                    break;
                    }
                    case "event": {
                    break;
                    }
                }
            })
        })
}else{
    console.log("Not logged in")
}
async function checkupdate() {
    var { data }  = await axios("https://pastebin.com/raw/xXs5Dmsb");
    try {
        if (data.version != package.version) {
            console.log(data)
            console.log(package)
            console.log("Update available!");
            console.log("Downloading...");
        } else {
            console.log("No update available!");
        }
     } catch(err) {
            console.log("Error: " + err);
        }
}
checkupdate()