var Twitter = require('twitter');
const axios = require('axios');

//for process.env
// require('dotenv').config()
let secureEnv = require('secure-env');
global.env = secureEnv({secret:'nanoFastAndFeeless'});

var twitterClient = new Twitter({
    consumer_key: global.env.consumer_key,
    consumer_secret: global.env.consumer_secret,
    access_token_key: global.env.access_token_key,
    access_token_secret: global.env.access_token_secret
  });

   function getOnlineReps() {
    return axios.post('https://nanoverse.io/api/node',{
        "action": "representatives_online"
      } );
  }
  
  function getConfirmationQuorum() {
    return axios.post('https://nanoverse.io/api/node', {
        "action": "confirmation_quorum"
      });
  }

  function getCirculatingSupply() {
    return axios.post('https://nanoverse.io/api/node', {
        "action": "available_supply"
      });
  }
  
  var reps_online, voting_weight_online , cirsupply, percentVotingPower;
  //Performing multiple concurrent requests
  axios.all([getOnlineReps(), getConfirmationQuorum(), getCirculatingSupply()])
    .then(axios.spread( (reps, quorum, supply ) =>{
      // Both requests are now complete
      reps_online = Object.keys(reps.data.representatives).length
      voting_weight_online=  quorum.data.online_stake_total;
      voting_weight_online = voting_weight_online /1000000000000000000000000000000000000
      voting_weight_online =Math.round(voting_weight_online * 1000) / 1000; 
      cirsupply = supply.data.available /1000000000000000000000000000000000000
      cirsupply =Math.round(cirsupply * 1000) / 1000;
      percentVotingPower = Math.round(((voting_weight_online/cirsupply)*100)*100)/100
      twitterClient.post('statuses/update', {status: 'Number of representatives online : '+reps_online+
      '\r\n\n\tTotal online voting weight : '+voting_weight_online +'M $NANO' +'\r\n\n\tCirculating supply : '+cirsupply 
      +'M $NANO'+'\r\n\n\tPercentage of voting power online : '+percentVotingPower+'%'})
      .then(function (tweet) {
           console.log(tweet);
          })
          .catch(function (error) {
              console.log(error)
              throw error;
          });
    }));