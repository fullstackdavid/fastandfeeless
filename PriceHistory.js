var Twitter = require('twitter');
var fetch = require('node-fetch');
var dateFormat = require('dateformat');
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

async function getNanoPriceFromPast(months) {
    let date= getDateFromPast(months)
    let response = await fetch("https://rest.coinapi.io/v1/quotes/BINANCEUS_SPOT_NANO_USD/history?apikey=9FDB3ACC-90F3-43FE-9717-909352504687&time_start="+date+"&limit=1")
    let data = await response.json()
    return data[0].ask_price
}

async function getNANOfromCMC() {
    let response = await fetch("https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest?CMC_PRO_API_KEY=4c187d62-0c7f-4f1f-8c60-b5dc07f72bd7&symbol=NANO")
    let data = await response.json()
    return JSON.stringify(data["data"].NANO, null, "\t");
}

var sixmonthsago, threemonthsago , onemonthago, today;

getNanoPriceFromPast(6).then(function(res6){
        sixmonthsago = res6;
        getNanoPriceFromPast(3).then(function(res3){
            threemonthsago = res3;
            getNanoPriceFromPast(1).then(function(res1){
                onemonthago = res1
                getNANOfromCMC().then(function(res0){
                    var result = JSON.parse(res0);
                    today = result.quote.USD.price;
                    today= Math.round(today * 1000) / 1000;

                    finalTweet = '$NANO Historic Prices: '
                    +'\r\n\n\tSix months ago   : $'+sixmonthsago
                    +'\r\n\n\tThree months ago : $'+threemonthsago
                    +'\r\n\n\tOne month ago    : $'+onemonthago 
                    +'\r\n\n\tNow              : $'+today
                   
                // console.log(finalTweet)
                    twitterClient.post('statuses/update', {status: finalTweet})
            .then(function (tweet) {
                 console.log(tweet);
                })
                .catch(function (error) {
                    console.log(error)
                    throw error;
                });
        })    
        })
        })
        })

function getDateFromPast( months){
        var d = new Date();
        d.setMonth(d.getMonth() - months);
        return dateFormat(d, "yyyy-mm-dd")+ "T00:00:00";
}