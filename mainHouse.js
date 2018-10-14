// document.getElementById("housedata").innerHTML = JSON.stringify(housedata,null,2);

var houseMembers;
var membersOfHouse;

var republican = document.getElementById("republican");
var democrate = document.getElementById("democrate");
var independent = document.getElementById("independent");

var selectedCheckBox = [];

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

        var data = json;


        houseMembers = data.results[0].members;
        app.membersOfHouse = data.results[0].members;

        filterCheckBoxes(data.results[0].members);
        filterStateDropDown(data.results[0].members);

        //createTableTbody(data.results[0].members);

        //console.log(data.results[0].members);
        console.log("WE DID STUFF");

    })
    .catch(function (error) {
        console.log("Request failed: " + error.message);
    });



var republican = document.getElementById("republican");
var democrate = document.getElementById("democrate");
var independent = document.getElementById("independent");
var selectedCheckBox = [];

document.getElementById("republican").addEventListener("click", function () {
    filterCheckBoxes(houseMembers);
});
document.getElementById("democrate").addEventListener("click", function () {
    filterCheckBoxes(houseMembers)
});
document.getElementById("independent").addEventListener("click", function () {
    filterCheckBoxes(houseMembers)
});
document.getElementById("dropdown").addEventListener("change", function () {
    filterCheckBoxes(houseMembers)
});


function filterCheckBoxes(houseMembers) {

    selectedCheckBox = []; // you need this inside to prevent repetiontion when a something is unchecked
    for (var i = 0; i < houseMembers.length; i++) {

        if (houseMembers[i].party == "R" && republican.checked && (houseMembers[i].state == dropdown.value || dropdown.value == "All States")) {


            selectedCheckBox.push(houseMembers[i]);


        }

        if (houseMembers[i].party == "D" && democrate.checked && (houseMembers[i].state == dropdown.value || dropdown.value == "All States")) {
            selectedCheckBox.push(houseMembers[i]);

        }

        if (houseMembers[i].party == "I" && independent.checked && (houseMembers[i].state == dropdown.value || dropdown.value == "All States")) {
            selectedCheckBox.push(houseMembers[i]);

        }
        if (!republican.checked && !democrate.checked && !independent.checked && (houseMembers[i].state == dropdown.value || dropdown.value == "All States")) {
            selectedCheckBox.push(houseMembers[i]);
        }

    }
    app.membersOfHouse = selectedCheckBox; //you need to fill the new table with the array filled with Vue!!!!!!

}

function filterStateDropDown(houseMembers) {
    var dropdown = document.getElementById("dropdown");
    var array = []

    for (i = 0; i < houseMembers.length; i++) {
        if (!array.includes(houseMembers[i].state)) {

            var option = document.createElement("option");
            option.textContent = (houseMembers[i].state);
            dropdown.appendChild(option);
            array.push(houseMembers[i].state);
        }
    }
}


var app = new Vue({
    el: '#houseDataTable',
    data: {
        membersOfHouse: [],
        headers: ["FullName", "Party", "State", "Years In Office", "% Votes"]
    },
    updated: function () {
        $('.colorbox').colorbox({
            iframe: true,
            width: "500px",
            hight:"500px"
            
            
        });

    }
})
