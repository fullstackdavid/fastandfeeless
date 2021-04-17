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

async function getNANOfromCMC() {
    let response = await fetch("https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest?CMC_PRO_API_KEY=4c187d62-0c7f-4f1f-8c60-b5dc07f72bd7&symbol=NANO")
    let data = await response.json()
    return JSON.stringify(data["data"].NANO, null, "\t");
}

var price, mcap , cmcrank, hrchange, volume_24h, price_trend;

getNANOfromCMC().then(function(res){
            var result = JSON.parse(res);
            cmcrank = result.cmc_rank;
            mcap = result.quote.USD.market_cap;
            price = result.quote.USD.price;
            volume_24h = result.quote.USD.volume_24h;
            hrchange = result.quote.USD.percent_change_1h;
            hrchange = Math.round(hrchange * 100) / 100;
            mcap = roundOff(mcap)
            price= Math.round(price * 1000) / 1000;
            volume_24h=roundOff(volume_24h);
            if(hrchange>=0){
                price_trend = '📈';
            } else {
                price_trend = '📉';
            }
            finalTweet = 'Price : $'+price
            +'\r\n\n\tChange (last 1h) : '+hrchange+'%' +' '+ price_trend
            +'\r\n\n\tMarket cap : $'+mcap  
            +'\r\n\n\tVolume (last 24h) : $'+volume_24h
            +'\r\n\n\tCoinmarketcap rank : '+cmcrank 
            +'\r\n\n\t$NANO';
            // console.log(finalTweet);
            twitterClient.post('statuses/update', {status: finalTweet})
            .then(function (tweet) {
                 console.log(tweet);
                })
                .catch(function (error) {
                    console.log(error)
                    throw error;
                });

        })

function roundOff(value) {
    if (value < 1000000000) value = value = Number(value/1000000).toFixed(3)+ "M";
            else if (value >= 1000000000) value = Number(value/1000000000).toFixed(3) + "B"; 
            return value;
}