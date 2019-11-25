var Twitter = require('twitter');
var fetch = require('node-fetch');
var request = require('request');
//for process.env
// require('dotenv').config()
let secureEnv = require('secure-env');
global.env = secureEnv({secret:'nanoFastAndFeeless'});
var finalTweet;
var totalDevBalanceNano =0;
var totalDevBalanceUSD =0;
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

var price, cmc_rank, mcap , hrchange;

getNANOfromCMC().then(function(res){
            var result = JSON.parse(res);
            cmcrank = result.cmc_rank;
            mcap = result.quote.USD.market_cap;
            price = result.quote.USD.price;
            price= Math.round(price * 1000) / 1000;
           return price;
        }).then(function(price){
            request.post(
                'https://nanoverse.io/api/node',
                { json: { "action": "accounts_balances",
                "accounts": [
                  "nano_1ipx847tk8o46pwxt5qjdbncjqcbwcc1rrmqnkztrfjy5k7z4imsrata9est",
                  "nano_3jrwstf4qqaxps36py6ripnhqpjbjrfu14apdedk37uj51oic4g94qcabf1i",
                  "nano_3qj455oiip846ceo9x5dfu4on3uuceamdyr9cjzca684myaeoxx393o9yocr",
                  "nano_38zqijoywujftqw7477ugp8fph33wq45m7x7mkxa8a4571tg857ejs5t379p",
                  "nano_1rteae6tp8337pu9sd8kz7ycgd391uiei4fqye3owed84bkn4xxz5btc7egs",
                  "nano_3dmyb38b78djik8ygenc5ouky6yqtwys8uk3srzmy3cpbzkjwim89nu8guyw",
                  "nano_1gj3pe7qd3ti34ps1nkahw4enawtrb4c9cnbizbrqt5nj4o499zhhanernjz",
                  "nano_1zysh161yqdnf6uy64rtrt6wi39ing1q33m9b316tjtc634s8z5nc7qq3jcj",
                  "nano_3ws3xaieznd469nd69krip88eh3ws755yoqp9sprjir3k8oxfiqqrtwfn76k",
                  "nano_3wrmemtchxtq3rm41afb7eik4ae4cckb1kr8t96p38red8a1964f6kgkd9rr",
                  "nano_3wcksj9bdim1tu1uowpow9t68ctz3bbxcn6hsanefamhhowyw4ros1kgp718",
                  "nano_1owfq1e97ety7eew3nhydu8bztomzos6sipyuh7f8w9ib6rsybjk7ad5hawj",
                  "nano_1htdp5pgzusksggmqomye4ipeo338d7x1nd5paom1wkhokbb6u9r51r3h5jo",
                  "nano_1pr7nzy3g8thgjwbfguhrjk1jxuuqh35njhs98k6ik8mjaytrx3yego9nypd",
                  "nano_1ero6egquwf3bkh4h5ksf7ghumehn3c131opqe65bsi5q17huwjsnhcp8kxd",
                  "nano_3bgo6r3ydek45dsweejifsc1ibxx1m41iya9aqfz1p43pu3k9z8885gjdmqz",
                  "nano_1remj4fcy5jses164k35qwxrjmsf5mn7psz4hwpy6fnpat7in8716cnxqw7y",
                  "nano_38dzf7rqftnsmfr14953igye1jwz4hi1q5zrww5xtethwwzy58h17u1kg1t7",
                  "nano_3hsss3n1idbotapj678rx36xsc6fxsi1furuzi39p9d34gdjfy1o9fhmummp",
                  "nano_35a485rf6mxigjbcibzcuwmcsbganftgyamskkusu7zt9ftdse9unzfynfqb",
                  "nano_15c5s1nuan3frrxmdfha79b1rdckueiu3k9p4hz5cd1n4h93zt7m1ywsm7db",
                  "nano_1pjjq3pn5atoafye11zphe1kcmcfr5w5h6bh38o4khkf9ei59bw3s8tocjjz",
                  "nano_1dcjpc417yxy3i5j9cgwjx1faaw1ays6wtcbrpgd4zcsd8e9fqzs9ttqmegm",
                  "nano_3oeqfnr5enafi4ym1fs95hirbidqpecbhcfm3p586cpkn8pq4d7rghsh5mwo",
                  "nano_3ctbey1141ehqhzipwz1wc1fshact55f1zzsm86ux4be6spjxuqe4ibp197q",
                  "nano_1ow1iwdudq7b1yriazjfnobyxafm563ahwjyru5d6ike4m116um6kut7tyw3",
                  "nano_39ucdbymoqgibrqtdusz1mxcex8cd6n8d4a9h8c79w8se9duwajthe3tkfj7",
                  "nano_1usakbybypk5iqj5rewg1qqtro6tx8q86mdponys4yc75uzkersqens5z5ii",
                  "nano_3teotsxrs1c1ns53wmaapwxgr7qb1ijuhni1o5jtumjj4m79ai33bf9oimo9",
                  "nano_1aemsbimza6p77w43zxycpg38dbhh9eorg3iioh85gef3amcuraapt8quy8f",
                  "nano_3mz4jr4aa5eoz3n3y3pd8kd59u6r8kbughpsz47fw34wbky8kobqryauqpgk",
                  "nano_38sg6ip6r3ktighemo8jgqpwcjyxfs8z5c3fr7zxcukysyo3uqs1s5wechez",
                  "nano_3o91ojafkp3dn8finnpa47qabti83cdub5u7eubdkjafnxxmwbxf774jmdh9",
                  "nano_3fegpdys1a3ncscmhagn3yxdrf5s9kb8drorsi75399omnwjbcp87cyibzyx",
                  "nano_395rob9twqn6eb6uqggm868n3x8h7s1zmsgsu5q4hmadndkbg4y7xuctzf3i",
                  "nano_1p3ty4anbfjcxs381qr6q4jht4b15cjkcswtmuu8t4bm4d6fp7qem31fyocf",
                  "nano_3q9sijk1fpyfe7i6xzwo4dp8kipeujen584kdanupcduddzoyejyi4by6bfg",
                  "nano_1b8o8i59izcefxa4yfm5xbcgr99ziih7cd7stzj5py4ojozo61r9dskr5zpw",
                  "nano_1d8qkij3wi18txi1an5qnhq5i8fhx48rtssggwwf4xe6mqe767gbbq1fxm76",
                  "nano_3txzxgxbdm1nnzhc6g5kpp6d6p6rf5uh9rqp45stt581pqzsjng67zn1mint", 
                  "nano_3ye1yb8rwr8ecnxcmc51149yxn9may9kxtsjkque7bipnyszk19fjsnx144m",
                  "nano_34y8xwbqngg1tgtz6zkwfw6sbc6csgxjj9k8ruxhbqykqqn4cwfdc5sm51x8",
                  "nano_347pnh9u5ztj1dyytww194cxf3znw5timntd4ckpnprzbo1fpgb3j61tya5t",
                  "nano_3xtk5k6p8q4khrtoaihnnsu5y8ywhxure4n9deejysqzftsg49aojhxga1du",
                  "nano_1df77q68xaztubha55aq1n4ymjmi1k474h1qr5gh7jww981rk4bp5hadyk1k",
                  "nano_1gre5ststj5tsh7udmse3cgdy46cp1gjy5an1bqy6uwoxkommtn4dcgkyrid",
                  "nano_1r4db5peijxotwn63kzx6qaxyp1mds19pdjc5gc3mtc66hjfgqrirs8meijs",
                  "nano_3p95yh5p1t5o9asepy1xnejb9qfwtquo6bzsrj14obhbh474btzsp6ch978w",
                  "nano_171fcehxigg84zfh1rc5z8nhty3od4x49txub59thah55f69cjfoct8ih3t7",
                  "nano_3zo48m136ay85sy9b7dnjcticizb9sazfe8sn3zkmugfkozbhsfshtyoaan3"
                ] } },
                function (error, response, body) {
                    if (!error && response.statusCode == 200) {
                        var data = body.balances;
                        var count = 0;
                        Object.keys(data).forEach(function(key) {
                            count ++;
                            var currentDevBalance = data[key].balance;
                            currentDevBalance = currentDevBalance/1000000000000000000000000000000;
                            totalDevBalanceNano += currentDevBalance;
                          })
                          totalDevBalanceNano = Math.round(totalDevBalanceNano* 100) / 100;
                          totalDevBalanceUSD = totalDevBalanceNano*price;
                          totalDevBalanceUSD= Math.round(totalDevBalanceUSD * 100) / 100;
                          totalDevBalanceUSD =numberWithCommas(totalDevBalanceUSD)
                          totalDevBalanceNano = numberWithCommas(totalDevBalanceNano)

                        finalTweet = 'Developer Fund Balance ( Combined ) : '
                        +'\r\n\n\t'+totalDevBalanceNano+" NANO" 
                        +'\r\n\n\t'+totalDevBalanceUSD+" USD" 
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
                        
                    }
                }
            );
        })

        function numberWithCommas(x) {
            return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        }