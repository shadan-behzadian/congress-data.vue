//document.getElementById("senatedata").innerHTML = JSON.stringify(senatedata,null,2);

var statistics = {
    "NumberOfRepublicans": 0,
    "NumberOfDemocrates": 0,
    "NumberOfIndependent": 0,
    "RepublicanVotes": 0,
    "DemocrateVotes": 0,
    "IndependentVotes": 0,
    "TotalNumberReps": 0,
    "TotalVote": 0,

};


fetch("https://api.propublica.org/congress/v1/113/senate/members.json",
    { method:"GET",
    headers: {'X-API-Key':'yCL55t25UAIXqJpryupK1zZotkcNx5KDwx0LHNWY'}
    }).then(function(response) {
    if (response.ok){
        return response.json();
    }
  console.log('Request succeeded: ' + response.statusText);
}).then(function(json){
    var data = json;
    filteringByPartyAndSumingThem(data.results[0].members);
    memberOfSenate = data.results[0].members;
    //TheadEngagedTables("leastengagedHead");

    //tbodyEngagedTables("leastengagedBody",leastEngaged(data.results[0].members));
   // TheadEngagedTables("mostengagedHead");
     //tbodyEngagedTables("mostengagedBody",mostEngaged(data.results[0].members));
    app.memberOfSenate = data.results[0].members;
    app1.leastEngaged = leastEngaged(data.results[0].members);
    app2.mostEngaged = mostEngaged(data.results[0].members);
    
    
   
})
    .catch(function(error) {
  console.log( "Request failed: " + error.message );
});


//----------------------first table--------calculations for senate table at one glance----------------
//var membersOfSenate = senatedata.results[0].members;

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
        if (membersOf[i].party == "R") {                 // add couner here =+ or republican = republican +1
            republicans.push(membersOf[i]);                 //then insted of array you need republican = 0
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

//----------------------second table------to get 10% less engaged people :----------------------

 
function leastEngaged(membersOfSenate){
var sortedMembersmissingvotes = membersOfSenate.sort(function (a, b) {
    return b.missed_votes - a.missed_votes;
});


//to round the number to the number Mathround or Math.floor
var lessEngaged = Math.round((sortedMembersmissingvotes.length * 10) / 100);

var tenLeastEngagedMembers = [];
for (var i = 0; i < lessEngaged; i++) {
    tenLeastEngagedMembers.push(sortedMembersmissingvotes[i]);
}

for (var i = lessEngaged; i < sortedMembersmissingvotes.length; i++) {

    if (tenLeastEngagedMembers[tenLeastEngagedMembers.length - 1].missed_votes == sortedMembersmissingvotes[i].missed_votes) {
        tenLeastEngagedMembers.push(sortedMembersmissingvotes[i]);
    }
//    else{
//         break so it does not go over the whole loop
//    }
}
    return tenLeastEngagedMembers;
}



//------------------------third table-------to get 10% top engaged people :-----------------------------

function mostEngaged(membersOfSenate){
var sortedTopMembersMissingVotes = membersOfSenate.sort(function (a, b) {
    return a.missed_votes - b.missed_votes;
});
var topEngaged = Math.round((sortedTopMembersMissingVotes.length * 10) / 100);


var tenMostEngagedMembers = [];
for (var i = 0; i < topEngaged; i++) {
    tenMostEngagedMembers.push(sortedTopMembersMissingVotes[i]);
}


for (i = topEngaged; i < sortedTopMembersMissingVotes.length; i++) {
    if (tenMostEngagedMembers[tenMostEngagedMembers.length - 1].missed_votes == sortedTopMembersMissingVotes[i].missed_votes) {
        tenMostEngagedMembers.push(sortedTopMembersMissingVotes[i]);
    }
}
    return tenMostEngagedMembers;
}
//-----------------------------------constructing the tables------------------------------------



//creating tablebody of senate at first glance using !!!innerHTML!!!:



var app = new Vue({
  el: '#senateAttendanceGlance',
  data: {
  headers: ['Party', 'No. of Reps', '% voted W/Party'],
 memberOfSenate:[],
  statistics: {}
}});

var app1 = new Vue({
  el: '#leastEngagedTable',
  data: {
  headers: ['Name', 'No. of Missed Votes', 'Voted % Missed'],
  statistics: {},
  leastEngaged:[]
}});

var app2 = new Vue({
     el:'#mostEngagedTable',
  data: {
  headers: ['Name', 'No. of Missed Votes', 'Voted % Missed'],
  statistics: {},
  mostEngaged:[]
  }
});



