const axios = require('axios');

function getOnlineReps() {
    return axios.post('https://nanoverse.io/api/node',{
        "action": "representatives_online"
      } );
  }


  function getVotingWeight(rep) {
    return axios.post('https://nanoverse.io/api/node',{
        "action": "account_weight",
        "account": rep
      } );
  }

  function getCirculatingSupply() {
    return axios.post('https://nanoverse.io/api/node', {
        "action": "available_supply"
      });
  }

  var fullreps;
  var map;
  var mainObject = {},
  promises = [];

  axios.all([getOnlineReps(), getCirculatingSupply()])
    .then(axios.spread( (reps, supply) =>{
        fullreps = reps.data.representatives;
        console.log("number of reps: "+fullreps.length)
        cirsupply = supply.data.available /1000000000000000000000000000000000000
        cirsupply =Math.round(cirsupply * 1000) / 1000;
        console.log("Circulating supply : "+cirsupply)
    }));

   
   

   

