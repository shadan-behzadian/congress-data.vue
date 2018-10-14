/console.log(data);


document.getElementById("title").textContent = "New title";


// document.getElementById("senatedata").innerHTML = JSON.stringify(data,null,2);




var myName = "text example";

// i'm creating a new tr element

var tableRowToAdd = document.createElement('tr');

// i'm putting content in it

tableRowToAdd.innerHTML = "<td>" + myName + "</td>";

// i'm getting reference to the table in html

var tbody = document.getElementById('tablesenate');

// i'm appending the new tr element as a child in the table tbody element:

tbody.appendChild(tableRowToAdd);