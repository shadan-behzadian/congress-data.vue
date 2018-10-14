//document.getElementById("senateData").innerHTML = JSON.stringify(senatedata,null,2);
var memberOfSenate;


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

        memberOfSenate = data.results[0].members;
        app.memberOfSenate = data.results[0].members;


        filterPartyByCheckBoxAndDropDowns(data.results[0].members);
        filterStateDropDown(data.results[0].members);

        //setTimeout(function(){ filterTableByName(); }, 500);


    })
    .catch(function (error) {
        console.log("Request failed: " + error.message);
    });


//WHEN USING FETCH : 1.get data from a resource 
//2.if reponse 
//3.define it as json
//4.then show data in function
//5.you only need your functions in the fetch 
//6.you need to create paramete for functions to pass teh data you get to those functions
//7.so in all of your functions including the event listeners you add that parameter
//8.and in fetch you put the dtaa from jason as the argument instead of that paramete


var republicanParty = document.getElementById("republican");
var democrateParty = document.getElementById("democrate");
var independentParty = document.getElementById("independent");

var selectedMembers = [];

function filterPartyByCheckBoxAndDropDowns(memberOfSenate) {
    //var tbody = document.getElementById("senateData");
    //var dropdown = document.getElementById("dropdown");

    //tbody.innerHTML = ""; // to empthy table everytime that someting is unchecked

    selectedMembers = []; //toempthy the selected members everytime when something is unchecked

    for (i = 0; i < memberOfSenate.length; i++) {
        console.log(memberOfSenate.length);

        if (memberOfSenate[i].party == "R" && republicanParty.checked && (memberOfSenate[i].state == dropdown.value || dropdown.value == "All States")) {
            selectedMembers.push(memberOfSenate[i]);
        }

        if (memberOfSenate[i].party == "D" && democrateParty.checked && (memberOfSenate[i].state == dropdown.value || dropdown.value == "All States")) {
            selectedMembers.push(memberOfSenate[i]);
        }
        if (memberOfSenate[i].party == "I" && independent.checked && (memberOfSenate[i].state == dropdown.value || dropdown.value == "All States")) {
            selectedMembers.push(memberOfSenate[i]);
        }
        if (republicanParty.checked == false && democrateParty.checked == false && independent.checked == false && (memberOfSenate[i].state == dropdown.value || dropdown.value == "All States")) {
            selectedMembers.push(memberOfSenate[i]);
        }

    }
    app.memberOfSenate = selectedMembers;


}
document.getElementById("republican").addEventListener("click", function () {
    console.log("republican is clicked");
    filterPartyByCheckBoxAndDropDowns(memberOfSenate);
});
document.getElementById("democrate").addEventListener("click", function () {
    console.log("democrate is clicked");
    filterPartyByCheckBoxAndDropDowns(memberOfSenate);
});
document.getElementById("independent").addEventListener("click", function () {
    console.log("independent is clicked");
    filterPartyByCheckBoxAndDropDowns(memberOfSenate);
});
document.getElementById("dropdown").addEventListener("change", function () {
    filterPartyByCheckBoxAndDropDowns(memberOfSenate);
});



function filterStateDropDown(memberOfSenate) {

    var dropdown = document.getElementById("dropdown");
    var array = [];

    for (i = 0; i < memberOfSenate.length; i++) {
        if (!array.includes(memberOfSenate[i].state)) {
            var option = document.createElement("option");
            option.textContent = memberOfSenate[i].state;
            dropdown.appendChild(option);
            array.push(memberOfSenate[i].state);

        }
    }
}

function setupColorbox() {
    $('.colorbox').colorbox({
        iframe: true,
        width: "500px",
        height: "500px"
    });
}




function filterTableByName() {

    if (($.fn.dataTable.isDataTable('#senateDataTable'))) {
        
        $('#senateDataTable').DataTable({
            destroy: true
        });
    } else {
        $('#senateDataTable').DataTable({
            
            paging: false,
            fixedHeader: true
        });

    }
}


var app = new Vue({
    el: '#senateDataTable',
    data: {
        memberOfSenate: [],
        headers: ["FullName", "Party", "State", "Years In Office", "% Votes"]

    },
   
    updated: function () {

        setupColorbox();
        //to use search box
        //filterTableByName();

    }


})
