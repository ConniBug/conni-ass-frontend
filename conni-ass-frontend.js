const { name, version } = require('./package.json');
const express = require('express');
const router = express.Router();

const config = require("./../config.json");
const users = require('../auth');
const data = require('../data');

router.all('/', (_req, res) => {
/*    data.put("test", {
        "urlForward" : true,
        "targetUrl"  : "http://google.com/",
        "logsCnt" : 0,
        "logs" : [
            {
                "id": "0",
                "ip": "127.0.0.1",
                "userAgent": "init",
                "note": "init"
            }
        ]

    });*/
    //res.send('My awesome dashboarddddddd!');

    let final = "";
    data.get().then(dataset => {

        // List Grabber info
        dataset.forEach(entry => {
            let entryName = entry[0];
            let entryDat = entry[1];
            if(entryDat.urlForward) {
                final += config.domain;
                if(!final.endsWith("/") && !final.endsWith('\'')) final += "/";
                final += entryName;
                final += " --> ";
                final += entryDat.targetUrl;

                // List ip log info
                entryDat.logs.forEach(ipLog => {
                    final += "<br>";
                    final += "-----" + ipLog.ip + "<br>";
                    final += "---------- UserAgent: (" + ipLog.userAgent + ")<br>";
                    final += "---------- Notes: " + ipLog.note + "<br>";
                    final += "---------- Time: " + ipLog.time + "<br>";
                });
            }
        });

        console.log("final", final);
        res.send(final);
    });
});

// These exports are REQUIRED by ass, so don't forget to set them!
module.exports = {
    router,                       // The dashboard router itself
    enabled: true,                // Required to activate frontend in ass; DO NOT change unless you want to disable your frontend
    brand: `${name} v${version}`, // Printed in ass logs & reported to client. Can be changed to your liking
    endpoint: '/dashboard'        // URL to use for your dashboard router. ass will automatically set up Express to use this value. Can be changed to your liking
};

