var baseURL = "https://api.giphy.com/v1/gifs/search?";
var apiKey = "dc6zaTOxFJmzC";
var inputVal = "";
var topics = ["Hero", "Grumpycat", "Babies", "Hacker", "Rainbow"];
var queryURL = "";
var imgURL = "";

function createButtons() {
	
	for (var i=0; i<topics.length; i++) {
		var newButton = $("<button>");
		newButton.addClass("allButtons");
		newButton.attr("data", topics[i]);
		newButton.text(topics[i]);
		$("#buttons").append(newButton).append(" ").append(" ");
	}
}
createButtons();

$("#submit").on('click', function(event) {
    event.preventDefault();

	inputVal = $("#newSearch").val().trim();

	var newButton = $("<button>");
	newButton.addClass("allButtons");
	newButton.attr("data", inputVal);
	newButton.text(inputVal);
	$("#buttons").append(newButton).append(" ");

});

$(document).on("click", ".allButtons", function(event) {
    event.preventDefault();

    var topic = $(this).attr("data");
    queryURL = baseURL + "q=" + topic +"&limit=6&api_key=" + apiKey;
    console.log(queryURL);
    $("#showImage").empty();

    $.ajax({
	    url: queryURL,
	    method: "GET"
  	}).done(function(response) {
  		console.log(response);

  		var imgElem;
  		for (var i=0; i<6; i++) {
  			imgURL = response.data[i].images.fixed_width_still.url;
  			gifURL = response.data[i].images.fixed_width.url;
  			imgElem = $("<img>");
  			imgElem.attr("src", imgURL);
  			imgElem.attr("data-still", imgURL);
  			imgElem.attr("data-animate", gifURL);
  			imgElem.attr("data-state", "still");
  			imgElem.addClass("newImg");
  			$("#showImage").append(imgElem);
  		}
  	});
  });

$(document).on("click", ".newImg", function(event) {
    event.preventDefault();

    var state = $(this).attr("data-state");
    if (state === "still") {
    	$(this).attr("src", $(this).attr("data-animate"));
    	$(this).attr("data-state", "animate");
    } else {
    	$(this).attr("src", $(this).attr("data-still"));
    	$(this).attr("data-state", "still");
    }

    });