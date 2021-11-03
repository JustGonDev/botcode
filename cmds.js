module.exports = function() {
    var config = require('./config.json');
    var prefix = config.prefix;
    var axios = require('axios');
    return async function({ event, api }) {

        //fetchthreaduser
        const { threadID, senderID, messageID } = event;
        //endfetchthreaduser

        //argcommand
        var arg = event.body.slice(prefix.length).trim().split(/ +/);
        if (event.body.startsWith(prefix)){
            var cmd = arg[0];
        //endargcommand

        //reply
        function outMsg(data) {
            api.sendMessage(data, threadID, messageID);
           }
        //endreply

        //startcommand
        if(cmd == "test") {
            outMsg("test");
        }
        if(cmd == "đạt") {
            if(arg[1] == "ngu") {
                outMsg("đạt ngu");
            }
                else {
                    outMsg("đạt ocschos");
                }
        }
        if(cmd == "gái") {
            try {
                var gái = {
                    body: "gái",
                    attachment: (await axios({
                        url: (await axios('https://api.ditlolichapfbi.tk/image?type=gai&apikey=phongdeptraiprovip')).data.data,
                        method: "GET", 
                        responseType: "stream"
                    })).data
                    
                }
                api.sendMessage(gái ,event.threadID, event.messageID);
                } catch(err) {
                    api.sendMessage(err ,event.threadID, event.messageID);
                }
                }
        //endstartcommand
           }
        }
    }