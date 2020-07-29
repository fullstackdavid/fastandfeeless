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

var sixmonthsago, threemonthsago , onemonthago, today;

getNanoPriceFromPast(6).then(function(res6){
        sixmonthsago = res6;
        getNanoPriceFromPast(3).then(function(res3){
            threemonthsago = res3;
            getNanoPriceFromPast(1).then(function(res1){
                onemonthago = res1
                getNanoPriceFromPast(0).then(function(res0){
                    today = res0

                    finalTweet = '$NANO Historic Prices: '
                    +'\r\n\n\tSix months ago   : $'+sixmonthsago
                    +'\r\n\n\tThree months ago : $'+threemonthsago
                    +'\r\n\n\tOne month ago    : $'+onemonthago 
                    +'\r\n\n\tNow              : $'+today
                   
                
                    twitterClient.post('statuses/update', {status: finalTweet})
            .then(function (tweet) {
                 console.log(tweet);
                })
                .catch(function (error) {
                    console.log(error)
                    throw error;
                });
            // console.log(finalTweet)
            // console.log(sixmonthsago)
            // console.log(threemonthsago)
            // console.log(onemonthago)
            // console.log(today)
        })    
        })
        })
        })

function getDateFromPast( months){
        var d = new Date();
        d.setMonth(d.getMonth() - months);
        return dateFormat(d, "yyyy-mm-dd")+ "T00:00:00";
}