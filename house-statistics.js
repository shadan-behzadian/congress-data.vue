var data;

var calculations = {
    "NumberofDemocrates": 0,
    "NumberofRepublicans": 0,
    "NumberofIndependent": 0,
    "TotalNumberOfParty": 0,
    "DemocrateVoted": 0,
    "RepublicanVoted": 0,
    "IndependentVoted": 0,
    "TotalpartyVoted": 0
}
var most = "most";
var least = "least";

fetch("https://api.propublica.org/congress/v1/113/house/members.json", {
        method: "GET",
        headers: {
            'X-API-Key': 'yCL55t25UAIXqJpryupK1zZotkcNx5KDwx0LHNWY'
        }
    }).then(function (response) {
        if (response.ok) {
            return response.json();
        }
        console.log('Request succeeded: ' + response.statusText);
    }).then(function (json) {
        data = json;
        
       partyLengthAndSum(data.results[0].members);
       app.membersOfHouse = data.results[0].members;
      
       app1.leastEngaged= engagement("least", data.results[0].members);
      
       app2.mostEngaged= engagement("most", data.results[0].members);
     
      
})
    
    .catch(function (error) {
        console.log("Request failed: " + error.message);
    });





//----------------------------------first table-----------------------------------------


function avargeVotePercentage(partySum, partyLength) {
    if (partySum == 0 && partyLength == 0) {
        return 0;
    } else {
        var avarage = partySum / partyLength;
        var avargeRoundedDecimal = avarage.toFixed(2);
        var avargeRoundedDecimalNumber = Number(avargeRoundedDecimal);
        console.log(typeof (avargeRoundedDecimalNumber));
        return avargeRoundedDecimalNumber;

    }
}

function partyLengthAndSum(members) {
    var democrate = 0;
    var republican = 0;
    var independent = 0;

    var democrateVotesPercentageSum = 0;
    var republicanVotesPercentageSum = 0;
    var independentVotesPercentageSum = 0;
    var totalVotesPercentageSum = 0;


    for (var i = 0; i < members.length; i++) {
        if (members[i].party == "D") {
            democrate++;
            democrateVotesPercentageSum += members[i].votes_with_party_pct;
        }


        if (members[i].party == "R") {
            republican++;
            republicanVotesPercentageSum += members[i].votes_with_party_pct;

        }

        if (members[i].party == "I") {
            independent++;
            independentVotesPercentageSum += members[i].votes_with_party_pct;
        }

        totalVotesPercentageSum += members[i].votes_with_party_pct;
    }

    calculations["NumberofDemocrates"] = democrate;
    calculations["NumberofRepublicans"] = republican;
    calculations["NumberofIndependent"] = independent;
    calculations["TotalNumberOfParty"] = members.length;
    calculations["DemocrateVoted"] = avargeVotePercentage(democrateVotesPercentageSum, democrate);
    calculations["RepublicanVoted"] = avargeVotePercentage(republicanVotesPercentageSum, republican);
    calculations["IndependentVoted"] = avargeVotePercentage(independentVotesPercentageSum, independent);
    calculations["TotalpartyVoted"] = avargeVotePercentage(totalVotesPercentageSum, members.length);
    
    app.calculations = calculations;
}



//---------------------------------least and most engaged in on function----------------------

//when you are using a function two more than one time you need to empthy it firts
//thats why I put engaged and sorted array empthy inside the function to empthy it before starting the loop again for the new info
function engagement(sortingOrder, membersOfHouse) {
    var engaged = [];
    var sortedArray = [];

    if (sortingOrder == "most") {
        sortedArray = membersOfHouse.sort(function (a, b) {
            return a.missed_votes_pct - b.missed_votes_pct
        });
    }
    if (sortingOrder == "least") {
        sortedArray = membersOfHouse.sort(function (a, b) {
            return b.missed_votes_pct - a.missed_votes_pct
        });
    }

    tenPercentOfArray = Math.round((membersOfHouse.length) * 0.1);
    for (var i = 0; i < tenPercentOfArray; i++) {
        engaged.push(sortedArray[i]);

    }

    for (var i = tenPercentOfArray; i < sortedArray.length; i++) {
        if (engaged[engaged.length - 1].missed_votes_pct == sortedArray[i].missed_votes_pct) {
            engaged.push(sortedArray[i]);
            if (!engaged[engaged.length - 1].missed_votes_pct == sortedArray[i].missed_votes_pct) {
                break;
            }
        }
    }
    return engaged;
}

//var sortingtocheck = membersOfHouse.sort(function(a,b){return b.missed_votes-a.missed_votes});
//


//------------------------------------constructing the table---------------------------



var app = new Vue({
  el: '#houseattandance',
  data: {
  headers: ['Party', 'No. of Reps', '% voted W/Party'],
  membersOfHouse:[],
  calculations: {}
}});



var app1 = new Vue({
    el:"#leastEngagedTable",
    data:{
        headers:['Name','No. of Missed Votes','Voted % Missed'],
      
        calcualations:{},
        leastEngaged:[]
    }
    
})



var app2 = new Vue({
    el:"#mostEngagedTable",
    data:{
        headers:['Name','No. of Missed Votes','Voted % Missed'],
       
        calcualations:{},
        mostEngaged:[]
    }
    
})




















