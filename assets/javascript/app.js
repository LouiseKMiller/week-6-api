// javascript file for UT BootCamp Assignment 6
// AJAX API app for Week 6 - Louise K Miller

window.onload = function(){

//======================================================
// OBJECT THAT HOLDS ALL GIPH INFORMATION

var allActions = [
	{action: "pointing",
	 imagesInfo: []},
	 {action: "laughing",
	 imagesInfo: []},
	 {action: "sneezing",
	 imagesInfo: []},
	 {action: "crying",
	 imagesInfo: []},
	 {action: "driving",
	 imagesInfo: []}
	];

//=================================
//  THIS CREATES A BUTTON FOR EACH ACTION IN THE allActions OBJECT

function showButtons() {
	$('#buttonDiv').empty();
	for (var i =0; i<allActions.length; i++) {
		var $newButton = $('<button>');
		$newButton.addClass("actionButton");
		$newButton.attr('data-name', allActions[i].action);
		$newButton.attr('data-index', i);
		$newButton.text(allActions[i].action);
		$('#buttonDiv').append($newButton);
	};
};

//======================================
//  EVENT HANDLER FOR USER SUBMISSION OF NEW ACTION

$('#inputButton').on("click", function(event){
	allActions.push(
		{action:($('#userInput').val()),
		imagesInfo: []});
	console.log ($('#userInput').val());
	showButtons();
	$("#userInput").val("");
	event.preventDefault(); // prevent default action associated with form submit
});

//======================================
//  EVENT HANDLER FOR GIPHY ACTION BUTTON
//  learning about event delegation 

 $('#buttonDiv').on('click', '.actionButton', function(event) {

 	// get data-name of button that initiated the event
   var action = $(this).attr('data-name');
   var actionIndex = $(this).attr('data-index');
       
    // create the query URL.  it uses an api-key and tag of cats
   var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + action + "&api_key=dc6zaTOxFJmzC&limit=10"

   // make the ajax call
   $.ajax({url: queryURL, method: 'GET'})

   // wait until you get the response
    .done(function(response) {

        // loop through the response array - should be 10
        for (var i=0; i<response.data.length; i++) {
            // store the image URL that is found in the response data field data.image_original_url
         	var imageUrl = response.data[i].images.original_still.url;

   	    	var videoUrl = response.data[i].images.original.url;

      		// store jquery object
      		var ivContainer = $("<div>");
     		var actionImage = $("<img>");
      		var actionVideo = $("<video>");
            
      		// to the image or video container, add the ivContainer class
      		ivContainer.addClass('ivContainer');

      		// to the image jquery object, we add the attributes of the giphy still URL and an alt attribute
          	actionImage.attr('src', imageUrl);
           	actionImage.attr('alt', 'GIPHy image');
           	actionImage.attr('data-index', i);
           	actionImage.height('200px');
           	actionImage.width('250px');
           	actionImage.addClass('imageVideoObj');

           	// to the video jquery object, we add the attributes of the giphy video URL and video type
           	actionVideo.attr('src', videoUrl);
           	actionVideo.addClass('imageVideoObj');

        	// prepend still image to the images div
        	$('#actionsDiv').prepend(ivContainer);
        	$('.ivContainer').eq(0).append(actionImage);

        	// store the information in the allActions object
        	allActions[actionIndex].imagesInfo.push({
       			"stillElement": actionImage,
       			"videoElement" : actionVideo,
       			"status" : "still"
        		})
            } // end of for loop
    });
});  // end of on click event handler

 $('#actionsDiv').on('click', '.imageVideoObj', function(event) {
 	var imageIndex = $(this).attr('data-index');
 	var imageStatus = $(this).status;
 	console.log ('you are here');

 });



showButtons();

} //end of window.onload function