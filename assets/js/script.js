var userFormEl = document.getElementById("user-form");
var itemSearchEl = document.getElementById("itemSearch");
var collectionSearchEl = document.getElementById("collectionSearch");


var formSubmitHandler = function(event) {
    event.preventDefault();
    var searchedItems = itemSearchEl.value.trim();
    if(searchedItems) {
        getItemsHandler(searchedItems);   
    }
    else {
        alert("Please enter a valid input in search bar");
    }
}

var getItemsHandler = function(items) {
    var apiURL = "https://www.loc.gov/search/?q=" + items + "&fo=json";
    fetch(apiURL) 
        .then(function(response) {
            console.log(response);
            if (response.ok) {
                response.json().then(function (data) {
                    console.log(data);
                    console.log(data.search.query);
                    displayData(data);
                });
            }
            else {
                alert("Error: " + response.statusText);
            }
        })
        .catch(function (error) {
            alert('Unable to connect');
        });
}

var displayData = function(results) {
    window.location.assign("search-page.html")
    if (results.length === 0) {
        alert()
    }
}

userFormEl.addEventListener("submit", formSubmitHandler);
