









//document.getElementById("senateData").innerHTML = JSON.stringify(senatedata,null,2);


var memberOfSenate = senatedata.results[0].members

var thead =document.getElementById("theadsenate");
var tr =document.createElement("tr");

var thFirstName = document.createElement("th")
thFirstName.textContent= "Full Name";
tr.appendChild(thFirstName);

//var thMiddleName = document.createElement("th")
//thMiddleName.innerHTML= "Middle Name";
//tr.appendChild(thMiddleName);
//
//
//var thLastName = document.createElement("th")
//thLastName.innerHTML= "Last Name";
//tr.appendChild(thLastName);



var thparty = document.createElement("th");
thparty.textContent= "Party";
tr.appendChild(thparty);



var thstate = document.createElement("th");
thstate.textContent= "State";
tr.appendChild(thstate);
 


var thSeniority = document.createElement("th");
thSeniority.textContent = "Years In Office";
tr.appendChild(thSeniority);


var thVotesPercentage = document.createElement("th");
thVotesPercentage.textContent = "% Votes"
tr.appendChild(thVotesPercentage);



thead.appendChild(tr);


//th.innerHTML = "middlename";
//tr.appendChild(th);

//var thLastName = "lastname";

//--------------------------------------------------------------------------------------------------
var allPartyArray = []
for(i=0; i< memberOfSenate.length ; i++){
var allParty = memberOfSenate[i].party;
console.log(allParty);
    allPartyArray.push(allParty);

}

console.log(allPartyArray);


var RepublicanArray =[];
var DemocrateArray =[];
var IndependentArray =[];
for(i=0 ; i< memberOfSenate.length ; i++){
var rParty = allPartyArray.indexOf("R",i);
 RepublicanArray.push(rParty);
    

var dParty =allPartyArray.indexOf("D", i);
    DemocrateArray.push(dParty);
    

  
var iParty = allPartyArray.indexOf("I", i);
    IndependentArray.push(iParty);

}

console.log(RepublicanArray);
console.log(DemocrateArray);
console.log(IndependentArray);




var republicanParty = document.getElementById("republican");
var democrateParty = document.getElementById ("democrate");
var independentParty = document.getElementById("independent")
if (republicanParty.checked ==true){
     console.log(RepublicanArray);

    
} else if ( democrateParty.checked == true ){
    console.log(DemocrateArray);
    
}

else if(independent.checked == true ){
    console.log(IndependentArray);
}
 


//----------------------------------------------------------------------------


var tbody =document.getElementById("senateData");                   //this is the java taht we are getting data from to analays
console.log(tbody);

for (var i=0 ; i < memberOfSenate.length ; i++){


    
   var tr =document.createElement("tr");
    
//   var membersNum = document.createElement("td");                     to get the numbers of rows
//    membersNum.textContent = i+1;
//    tr.appendChild(membersNum);
   
    
    //to say if it is null or space what to do
    var middleName;
    if(memberOfSenate[i].middle_name == null || memberOfSenate[i].middle_name == "" ) {   
         middleName = '';
     } else 
         {
             middleName = memberOfSenate[i].middle_name;
         }
 
// to put anchor links you need to make the <a> and what is inside it and </a> as seperate strings
    
    
   var firstNameCol =document.createElement("td");
 firstNameCol.innerHTML = '<a href = "'+ memberOfSenate[i].url + '" target="_blank" >' + memberOfSenate[i].first_name +  ' ' + middleName + '' + memberOfSenate[i].last_name +'</a>';
   tr.appendChild(firstNameCol);
    
    
    
     
   
    

    

    
// 
//    var partyCol = document.createElement("td");
//    partyCol.textContent = memberOfSenate[i].party;
//    tr.appendChild(partyCol);
    
    
    
    
    var partyCol = document.createElement("td");
    partyCol.textContent = memberOfSenate[i].party;
    tr.appendChild(partyCol);
    
    
    
    
    
    
    
    
   
    
    var StateCol = document.createElement("td");
   StateCol.textContent = memberOfSenate[i].state;
     tr.appendChild(StateCol);
    
    

   var seniorityCol = document.createElement("td");
    seniorityCol.textContent = memberOfSenate[i].seniority;
    tr.appendChild(seniorityCol);
    
    
    var percentageVote = document.createElement("td");
    percentageVote.textContent = "%" + memberOfSenate[i].votes_with_party_pct;
    tr.appendChild(percentageVote);
    
    
    tbody.appendChild(tr);
}


