var responseEl = document.getElementById("search-container");
var listEl = document.getElementById("list");
var userFormEl = document.getElementById("user-form");
var itemSearchEl = document.getElementById("itemSearch");
var collectionSearchEl = document.getElementById("collectionSearch");

var getItemsHandler = function() {
    var items = localStorage.getItem("searchedItems");
    var apiURL = "https://www.loc.gov/search/?q=" + items + "&fo=json";
    fetch(apiURL) 
        .then(function(response) {
            console.log(response);
            if (response.ok) {
                response.json().then(function(data) {
                    console.log(data);
                    console.log(data.search.query);
                    console.log(data.results[0].title);
                    displayData(data);
                });
            }
            else {
                alert("Error: " + response.statusText);
            }
        })
        .catch(function(error) {
            alert('Unable to connect');
        });
}

var displayData = function(data) {
    console.log(data);
    if (data.results.length === 0) {
        var alert = document.createTextNode("No results found.");
        responseEl.appendChild(alert);
        return;
    }
    for (i = 0; i < data.results.length; i++) {
        var resultTitle = data.results[i].title;
        var resultDate = data.results[i].date;
        var resultAuthor = data.results[i].contributor;
        var resultDescription = data.results[i].description;
        var resultLink = data.results[i].id;
        
        var resultContainer = document.createElement("div");
        resultContainer.classList = "list-group-item flex-column align-items-start mb-1";

        var titleContainer = document.createElement("div");
        titleContainer.classList = "d-flex w-100 justify-content-between";
        
        var titleEl = document.createElement("h4");
        titleEl.classList = "mb-1";
        titleEl.textContent = resultTitle;
        
        var small = document.createElement("small");
        small.textContent = resultDate;

        var authorEL = document.createElement("p");
        authorEL.classList = "mb-1";
        if (!resultAuthor) {
            authorEL.textContent = "Contributors: N/A";
        }
        else {
            authorEL.textContent = "Contributors: " + resultAuthor;
        }

        var descriptionEL = document.createElement("p");
        descriptionEL.classList = "mb-1";
        if (!resultDescription) {
            descriptionEL.textContent = "Description: N/A";
        }
        else {
            descriptionEL.textContent = "Description: " + resultDescription;
        }

        var linkEl = document.createElement("a");
        linkEl.classList = "mb-1";
        linkEl.setAttribute("href", resultLink);
        linkEl.setAttribute("target", "_blank");
        linkEl.textContent = resultLink;

        titleContainer.appendChild(titleEl);
        titleContainer.appendChild(small);
        resultContainer.appendChild(titleContainer);
        resultContainer.appendChild(authorEL);
        resultContainer.appendChild(descriptionEL);
        resultContainer.appendChild(linkEl);
        listEl.appendChild(resultContainer);
    }
}

var formSubmitHandler = function(event) {
    event.preventDefault();
    var searchedItems = itemSearchEl.value.trim();

    listEl.textContent = "";

    if(searchedItems) {
        getItemsHandler2(searchedItems);   
    }
    else {
        alert("Please enter a valid input in search bar");
    }
}

var getItemsHandler2 = function(items) {
    var apiURL = "https://www.loc.gov/search/?q=" + items + "&fo=json";
    fetch(apiURL) 
        .then(function(response) {
            console.log(response);
            if (response.ok) {
                response.json().then(function(data) {
                    console.log(data);
                    console.log(data.search.query);
                    console.log(data.results[0].title);
                    displayData(data);
                });
            }
            else {
                alert("Error: " + response.statusText);
            }
        })
        .catch(function(error) {
            alert('Unable to connect');
        });
}

userFormEl.addEventListener("submit", formSubmitHandler);
window.addEventListener("load", getItemsHandler());