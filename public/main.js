
let loadResultsFromDatabase = () => {
    console.log("Loading data from server...");
    $.ajax({
        url: "http://127.0.0.1:3000/database",
        type: "GET",
        success: (results) => {
            console.log("Got data: ", results);
            var dataDiv = $('#mysql-data');
            dataDiv.empty(); // remove all current elements in div
            for (row of results) {
                dataDiv.prepend(`<p>${row.text}</p>`);
            }
        },
        error: (error) => {
            console.log(error);
        }
    });
}

$("form#addData").submit((event) => {
    event.preventDefault(); // stop the page from refreshing
    var inputText = $("#addData #text").val(); // get the inputted text
    $.ajax({ // send it to the server
        url: "http://127.0.0.1:3000/database",
        type: "POST",
        "headers": {
            "Content-Type": "application/json"
        },
        data: JSON.stringify({text: inputText}),
        success: (data) => {
            loadResultsFromDatabase(); // reload the displayed data
        },
        error: (error) => {
            console.log(error);
        }
    })
});

loadResultsFromDatabase();