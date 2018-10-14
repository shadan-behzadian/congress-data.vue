var statistics = {
    "NumberOfRepublicans": 0,
    "NumberOfDemocrates": 0,
    "NumberOfIndependent": 0,
    "RepublicanVotes": 0,
    "DemocrateVotes": 0,
    "IndependentVotes": 0,
    "TotalNumberReps": 0,
    "TotalVote": 0

};


var memberOfSenate;
var most = "mostLoyal";
var least = "leastLoyal";


fetch("https://api.propublica.org/congress/v1/113/senate/members.json", {
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
        var data = json;
        filteringByPartyAndSumingThem(data.results[0].members);
        app1.mostEngaged = loyaltyTables("mostLoyal", data.results[0].members);
        app2.leastEngaged =loyaltyTables("leastLoyal", data.results[0].members);

        app.memberOfSenate = data.results[0].members;
        app1.memberOfSenate=data.results[0].members;
        app2.memberOfSenate=data.results[0].members;


    })
    .catch(function (error) {
        console.log("Request failed: " + error.message);
    });




//----------------------first table--------calculations for senate table at one glance----------------
//var membersOfSenate = senatedata.results[0].members

//rounding the number by slicing methode
function avaragevotes(partyArray, partySum) {
    var avarage = partySum / partyArray.length;
    var tostring = avarage.toString();
    var sliceString = tostring.substring(0, 5);
    var percentageOfvotes = Number(sliceString);
    return percentageOfvotes;
}

function filteringByPartyAndSumingThem(membersOf) {

    var republicans = []
    var democrates = []
    var independents = []
    var totalNumberReps = []


    var republicanSum = 0;
    var democratesSum = 0;
    var independentSum = 0;
    var sum = 0;


    for (var i = 0; i < membersOf.length; i++) {
        if (membersOf[i].party == "R") { // add couner here =+ or republican = republican +1
            republicans.push(membersOf[i]); //then insted of array you need republican = 0
            republicanSum = republicanSum + membersOf[i].votes_with_party_pct;
        }
        if (membersOf[i].party == "D") {
            democrates.push(membersOf[i]);
            democratesSum = democratesSum + membersOf[i].votes_with_party_pct;
        }
        if (membersOf[i].party == "I") {
            independents.push(membersOf[i]);
            independentSum = independentSum + membersOf[i].votes_with_party_pct;
        }
        //to sum two numbers:
        totalNumberReps.push(membersOf[i]);
        sum = sum + membersOf[i].votes_with_party_pct;

    }


    statistics["RepublicanVotes"] = avaragevotes(republicans, republicanSum);
    statistics["DemocrateVotes"] = avaragevotes(democrates, democratesSum);
    statistics["IndependentVotes"] = avaragevotes(independents, independentSum);
    statistics["TotalVote"] = avaragevotes(totalNumberReps, sum);
    statistics["NumberOfRepublicans"] = republicans.length;
    statistics["NumberOfDemocrates"] = democrates.length;
    statistics["NumberOfIndependent"] = independents.length;
    statistics["TotalNumberReps"] = totalNumberReps.length;
    
    
    
    app.statistics = statistics;
   

}

//filteringByPartyAndSumingThem(membersOfSenate);

//----------------------second table------to get 10% least loyal people :----------------------


function loyaltyTables(sortingOrder, membersOfSenate) {
    console.log(membersOfSenate);
    var loyalty = [];
    var sortedMembers = [];

    if (sortingOrder == "mostLoyal") {
        sortedMembers = membersOfSenate.sort(function (a, b) {
            return a.votes_with_party_pct - b.votes_with_party_pct
        });
    }



    if (sortingOrder == "leastLoyal") {
        sortedMembers = membersOfSenate.sort(function (a, b) {
            return b.votes_with_party_pct - a.votes_with_party_pct
        })
    }
    //MAKE SURE YOU ROUND THIS NUMBER BECOUSE LATER ON YOU ARE USING IT AS A POSITION NUMBER AND IF YOU DONT ROUND IT. IT WILL TELL YOU THAT ITS NOT DEFINED WHEN TRYING TO GET A VALUE FROM THAT POSITION!!!!! YOU SPENT 1 HOUR TRYING TO FIND THAT!!!!
    var tenPercent = Math.round(membersOfSenate.length * 0.1)

    for (var i = 0; i < tenPercent; i++) {
        loyalty.push(sortedMembers[i]);
    }

    for (var i = tenPercent; i < sortedMembers.length; i++) {
        if (loyalty[loyalty.length - 1].votes_with_party_pct == sortedMembers[i].votes_with_party_pct) {
            loyalty.push(sortedMembers[i]);

        }
    }

    console.log(loyalty);
    return loyalty;
    
}


//---------------------- custructing tables ----------------------------------------


var app = new Vue({
    el: "#senateLoyaltyGlance",
    data: {
        headers: ["Party", "No. of Reps", "% Voted w/party"],
        memberOfSenate: [],
        statistics : {}
}});




var app1 = new Vue({
    el:"#mostLoyalTable",
    data:{
        memberOfSenate: [],
        headers:["Name","No. of Party Votes","% Party Votes"],  
         statistics : {},
        mostEngaged: []
    }
});

var app2 = new Vue({
    el:"#leastLoyalTable",
    data:{
        memberOfSenate: [],
        headers:["Name","No. of Party Votes","% Party Votes"],  
         statistics : {},
        leastEngaged: []
    }
});


