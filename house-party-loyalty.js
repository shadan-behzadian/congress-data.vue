var calculations = {
    "NumberofDemocrates": 0,
    "NumberofRepublicans": 0,
    "NumberofIndependent": 0,
    "TotalNumberOfParty": 0,
    "DemocrateVoted": 0,
    "RepublicanVoted": 0,
    "IndependentVoted": 0,
    "Total partyVoted": 0
}
var ascending = "ascending";
var decending = "decending";
var data;


//fetch is happening in teh background it gets the information while doing everythinhg else so if you define a global variable and try to save the data that fetch is getting in that global variable an dthen using that global varible i the functions(out side) fetch: it would not work.
//you need to have your functions inside the fetch so at the same time that getting info which is a long process create what your functions are asking.
//fetch does not men that it gets the info right away to store it somewhere. fetch means while doing other things it starts getting data


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
       
        app.membersOfHouse = data.results[0].members;
        partyLengthAndSum(data.results[0].members);
        
        app1.leastLoyal = loyaltyTables("ascending", data.results[0].members);
        app2.mostLoyal=loyaltyTables("decending", data.results[0].members);
       
      

    

    })
    .catch(function (error) {
        console.log("Request failed: " + error.message);
    });






//----------------------------------first table-----------------------------------------
//var membersOfHouse = housedata.results[0].members;

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


//-----------------------------------second and thir tables----------------------------

function loyaltyTables(sortingOrder, membersOfHouse) {

    var sortedMembers = []
    var loyals = [];

    if (sortingOrder == "ascending") {
        sortedMembers = membersOfHouse.sort(function (a, b) {
            return a.total_votes - b.total_votes
        });

    }
    if (sortingOrder == "decending") {
        sortedMembers = membersOfHouse.sort(function (a, b) {
            return b.total_votes - a.total_votes
        });

    }

    var tenPercentOfArray = Math.round(membersOfHouse.length * 0.1);

    for (var i = 0; i < tenPercentOfArray; i++) {
        loyals.push(sortedMembers[i]);

    }
    for (var i = tenPercentOfArray; i < sortedMembers.length; i++) {
        if (loyals[loyals.length - 1].votes_with_party_pct == sortedMembers[i].votes_with_party_pct) {
            loyals.push(sortedMembers[i]);
        }
    }
    return loyals;
}


//----------------------------------------constructing tables-------------------------

var app = new Vue({
  el: '#houseLoyaltyGlance',
  data: {
  headers: ['Party', 'No. of Reps', '% voted W/Party'],

  calculations: {}
}});

var app1 = new Vue({
  el: '#leastLoyalTable',
  data: {
  headers: ['Name', '	No. of Party Votes', '% Party Votes'],
  leastLoyal:[],
 membersOfHouse:[],
  calculations: {}
}});

var app2 = new Vue({
    el:'#mostLoyalTable',
    data:{
     headers: ['Name', '	No. of Party Votes', '% Party Votes'],
  mostLoyal:[],
 membersOfHouse:[],
  calculations: {}
        
    }
})



