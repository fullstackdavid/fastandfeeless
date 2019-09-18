var Twitter = require('twitter');
var fetch = require('node-fetch')

var twitterClient = new Twitter({
    consumer_key: '6tz0DjSavjiXv9rTJUo77HpUj',
    consumer_secret: 'OoyiyxGkuqAwPepmPXa8KPyJJDNdQJjT5zm3AoOeX2fcYWpjMb',
    access_token_key: '1154085717628207104-E4qiIi2c1Y0RD625wSHSx4EPEev9zZ',
    access_token_secret: 'tjezHpo7YE71DwzxLd9hf1rT4HBMYwunvfAxYReOGrwGL'
  });
 
  async function getPrice() {
    let response = await fetch("https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest?CMC_PRO_API_KEY=4c187d62-0c7f-4f1f-8c60-b5dc07f72bd7&symbol=NANO")
    let data = await response.json()
    return JSON.stringify(data["data"].NANO.quote.USD.price, null, "\t"); 
}
  
async function getMarketCap() {
    let response = await fetch("https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest?CMC_PRO_API_KEY=4c187d62-0c7f-4f1f-8c60-b5dc07f72bd7&symbol=NANO")
    let data = await response.json()
    return JSON.stringify(data["data"].NANO.quote.USD.market_cap, null, "\t");
}

async function getCMCRank() {
    let response = await fetch("https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest?CMC_PRO_API_KEY=4c187d62-0c7f-4f1f-8c60-b5dc07f72bd7&symbol=NANO")
    let data = await response.json()
    return JSON.stringify(data["data"].NANO.cmc_rank, null, "\t");
}

var price, mcap , cmcrank;
getPrice().then(function(res){
    price = res;
    return price;
}).then(function(price){
    getMarketCap().then(function(res){
       mcap = res;
       return mcap;
    }).then (function(mcap){
        getCMCRank().then(function(res){
            cmcrank = res;
            mcap= mcap / 1000000;
            mcap= Math.round(mcap * 100) / 100;
            price= Math.round(price * 1000) / 1000;
            twitterClient.post('statuses/update', {status: 'Price : $'+price+
            '\r\n\n\tMarket cap : $'+mcap +'M' +'\r\n\n\tCoinmarketcap rank : '+cmcrank 
            +'\r\n\n\tFees per tx : $0.00'})
            .then(function (tweet) {
                 console.log(tweet);
                })
                .catch(function (error) {
                    console.log(error)
                    throw error;
                });

        })
    })
});
