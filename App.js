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

var price, mcap , cmcrank, hrchange;

getNANOfromCMC().then(function(res){
            var result = JSON.parse(res);
            cmcrank = result.cmc_rank;
            mcap = result.quote.USD.market_cap;
            price = result.quote.USD.price;
            hrchange = result.quote.USD.percent_change_1h;
            hrchange = Math.round(hrchange * 100) / 100;
            mcap= mcap / 1000000;
            mcap= Math.round(mcap * 100) / 100;
            price= Math.round(price * 1000) / 1000;
            finalTweet = 'Price : $'+price+
            '\r\n\n\tMarket cap : $'+mcap +'M' +'\r\n\n\tCoinmarketcap rank : '+cmcrank 
            +'\r\n\n\tFees per tx : $0.00'
            +'\r\n\n\t$NANO';
            if(hrchange >10){
                if(hrchange > 100 ){
                    finalTweet = '$NANO is what Bitcoin was supposed to be.'
                } else if(hrchange > 50){
                    finalTweet = '$NANO is superior.'
                } else{
                finalTweet += ' price has increased by ' +hrchange+ '% in the last one hour!'
                }
            } 
            if(hrchange < -10){
                finalTweet += ' price has decreased by ' +hrchange+ '% in the last one hour!'
            } 

            console.log(finalTweet);
            twitterClient.post('statuses/update', {status: finalTweet})
            .then(function (tweet) {
                 console.log(tweet);
                })
                .catch(function (error) {
                    console.log(error)
                    throw error;
                });

        })