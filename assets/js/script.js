var userFormEl = document.getElementById("user-form");
var itemSearchEl = document.getElementById("itemSearch");
var collectionSearchEl = document.getElementById("collectionSearch");

var formSubmitHandler = function(event) {
    event.preventDefault();
    var searchedItems = itemSearchEl.value.trim();
    if(searchedItems) {
        localStorage.setItem("searchedItems", searchedItems);
        getItemsHandler();   
    }
    else {
        alert("Please enter a valid input in search bar");
    }
}

var getItemsHandler = function(items) {
    window.location.assign("search-page.html");
}

userFormEl.addEventListener("submit", formSubmitHandler);
