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

/* Example in Node.js ES6 using request-promise */

const rp = require('request-promise');
const requestOptions = {
  method: 'GET',
  uri: 'https://pro-api.coinmarketcap.com/v1/tools/price-conversion',
  qs: {
    'id': '1567',
    'amount': '1',
    'convert': 'BTC'
  },
  headers: {
    'X-CMC_PRO_API_KEY': '4c187d62-0c7f-4f1f-8c60-b5dc07f72bd7'
  },
  json: true,
  gzip: true
};



var price, mcap , cmcrank, hrchange, volume_24h, price_trend;

rp(requestOptions).then(response => {
    // console.log('API call response:', response.data.quote.BTC.price);
    return response.data.quote.BTC.price;
  }).then( satPrice=>{

    getNANOfromCMC().then(function(res){
        var result = JSON.parse(res);
        cmcrank = result.cmc_rank;
        mcap = result.quote.USD.market_cap;
        price = result.quote.USD.price;
        volume_24h = result.quote.USD.volume_24h;0
        hrchange = result.quote.USD.percent_change_1h;
        hrchange = Math.round(hrchange * 100) / 100;
        mcap= mcap / 1000000;
        mcap= Math.round(mcap * 100) / 100;
        price= Math.round(price * 1000) / 1000;
        volume_24h= volume_24h / 1000000;
        volume_24h= Math.round(volume_24h * 1000) / 1000;
        if(hrchange>=0){
            price_trend = '📈';
        } else {
            price_trend = '📉';
        }

        satPrice= Math.round(satPrice * 100000000);
        // console.log(satPrice);
        finalTweet = 
        'Price : $'+price 
        +'\r\n\n\tPrice in BTC : '+satPrice +' sats' 
        +'\r\n\n\tChange in USD (last 1h) : '+hrchange+'%' +' '+ price_trend
        +'\r\n\n\tMarket cap : $'+mcap +'M' 
        +'\r\n\n\tVolume (last 24h) : $'+volume_24h +'M' 
        +'\r\n\n\tCoinmarketcap rank : '+cmcrank 
        +'\r\n\n\t$NANO';
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


  })
  
  