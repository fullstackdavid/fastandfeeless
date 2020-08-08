var Twitter = require("twitter");
var fetch = require("node-fetch");
//for process.env
// require('dotenv').config()
let secureEnv = require("secure-env");
global.env = secureEnv({ secret: "nanoFastAndFeeless" });
var finalTweet;
var twitterClient = new Twitter({
  consumer_key: global.env.consumer_key,
  consumer_secret: global.env.consumer_secret,
  access_token_key: global.env.access_token_key,
  access_token_secret: global.env.access_token_secret,
});

async function getPricefromCMC(coin) {
  let response = await fetch(
    "https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest?CMC_PRO_API_KEY=4c187d62-0c7f-4f1f-8c60-b5dc07f72bd7&symbol="+coin
  );
  let data = await response.json();
  return data
}

var nanoPrice, nanoMcap, dgbMcap, ltcMcap, bchMcap, btcMcap;
const nanoSupply =133248297;
var mcapString;

getPricefromCMC("NANO").then(function (res) {
  var result = JSON.parse(JSON.stringify(res["data"].NANO, null, "\t"));
  nanoPrice = Math.round(result.quote.USD.price * 1000) / 1000;
  getPricefromCMC("DGB").then(function (res2) {
    var result = JSON.parse(JSON.stringify(res2["data"].DGB, null, "\t"));
    dgbMcap = roundOffMcap(result.quote.USD.market_cap);
    getPricefromCMC("LTC").then(function (res3) {
        var result = JSON.parse(JSON.stringify(res3["data"].LTC, null, "\t"));
        ltcMcap = roundOffMcap(result.quote.USD.market_cap);
        getPricefromCMC("BCH").then(function (res4) {
            var result = JSON.parse(JSON.stringify(res4["data"].BCH, null, "\t"));
            bchMcap = roundOffMcap(result.quote.USD.market_cap);
            getPricefromCMC("BTC").then(function (res5) {
                var result = JSON.parse(JSON.stringify(res5["data"].BTC, null, "\t"));
                btcMcap = roundOffMcap( result.quote.USD.market_cap);
  finalTweet =
    "Current Price of $NANO : $" + nanoPrice +
    "\r\n\n\tIf $NANO had:" +
    "\r\n\n\t  - $DGB's Market cap, 1 NANO = $" + dgbMcap +
    "\r\n\n\t  - $LTC's Market cap, 1 NANO = $" + ltcMcap +
    "\r\n\n\t  - $BCH's Market cap, 1 NANO = $" + bchMcap +
    "\r\n\n\t  - $BTC's Market cap, 1 NANO = $" + btcMcap 
    ;
//   console.log(finalTweet);
    twitterClient
      .post("statuses/update", { status: finalTweet })
      .then(function (tweet) {
        console.log(tweet);
      })
      .catch(function (error) {
        console.log(error);
        throw error;
      });
});

})    
})
})
})

function roundOffMcap(mcap) {
    return Number(mcap/nanoSupply).toFixed(2)
}