var Twitter = require('twitter');
var fetch = require('node-fetch');
//for process.env
// require('dotenv').config()
let secureEnv = require('secure-env');
global.env = secureEnv({secret:'nanoFastAndFeeless'});
var finalTweet;
var twitterClient = new Twitter({
    consumer_key: global.env.consumer_key,
    consumer_secret: global.env.consumer_secret,
    access_token_key: global.env.access_token_key,
    access_token_secret: global.env.access_token_secret
  });

const jsdom = require("jsdom");
const { JSDOM } = jsdom;
var medianTime, averageTime , minTime, maxTime;
var finalTweet= "";
  const getScript = (url) => {
    return new Promise((resolve, reject) => {
        const http      = require('http'),
              https     = require('https');

        let client = http;

        if (url.toString().indexOf("https") === 0) {
            client = https;
        }

        client.get(url, (resp) => {
            let data = '';

            // A chunk of data has been recieved.
            resp.on('data', (chunk) => {
                data += chunk;
            });

            // The whole response has been received. Print out the result.
            resp.on('end', () => {
                const dom = new JSDOM(data.toString());
                var myNodeList = dom.window.document.querySelectorAll("p");
                    var txTimes = myNodeList[1].textContent.split(", ");
                    medianTime= txTimes[0];
                    averageTime= txTimes[1];
                    minTime= txTimes[2];
                    maxTime= txTimes[3];
                    finalTweet = 'Confirmation times ( last 24 hours ) : '
                    +'\r\n\t'+medianTime 
                    +'\r\n\n\t'+averageTime 
                    +'\r\n\n\t'+minTime
                    +'\r\n\n\t'+maxTime
                    +'\r\n\t$NANO';
                    console.log(finalTweet);
                twitterClient.post('statuses/update', {status: finalTweet})
                    .then(function (tweet) {
                        console.log(tweet);
                        })
                        .catch(function (error) {
                            console.log(error)
                            throw error;
                        });
            });

        }).on("error", (err) => {
            reject(err);
        });
    });
};

(async (url) => {
    console.log(await getScript(url));
})('https://repnode.org/network/propagation-confirmation');




