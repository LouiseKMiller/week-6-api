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
	 imagesInfo: []},
	 {action: "fist bumping",
	 imagesInfo: []},
	 {action: "winking",
	 imagesInfo: []},
	 {action: "burping",
	 imagesInfo: []},
	 {action: "whistling",
	 imagesInfo: []},
	 {action: "dancing",
	 imagesInfo: []},
	 {action: "tripping",
	 imagesInfo: []},
	 {action: "snoring",
	 imagesInfo: []},
	 {action: "coding",
	 imagesInfo: []},
	 {action: "eating",
	 imagesInfo: []},
	 {action: "falling",
	 imagesInfo: []},
	];

//=================================
//  THIS CREATES A BUTTON FOR EACH ACTION IN THE allActions OBJECT
// each button has class .actionButton
// and dttributes data-name =action, data-index = allActions array index

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

 	$('#actionsDiv').empty();
 	// get data-name and data-index of button that initiated the event
 	// index points you to correct object in allActions array
 	//
   var action = $(this).data('name');
   var actionIndex = $(this).data('index');
       
    // create the query URL.  it uses an api-key and tag of cats
   var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + action + "&api_key=dc6zaTOxFJmzC&limit=10"

   // make the ajax call
   $.ajax({url: queryURL, method: 'GET'})

   // wait until you get the response
    .done(function(response) {

        // loop through the response array - should be 10
        for (var i=0; i<response.data.length; i++) {
            // store the image URL that is found in the response data field data.image_original_url
         	var stillUrl = response.data[i].images.original_still.url;

   	    	var animateUrl = response.data[i].images.original.url;

   	    	var rating = response.data[i].rating;

      		// store jquery object
      		var ivContainer = $("<div>");
     		var actionImage = $("<img>");
            
      		// to the image or video container, add the ivContainer class
      		ivContainer.addClass('ivContainer');
      		ivContainer.attr('data-imageIndex', i);
           	ivContainer.attr('data-actionIndex', actionIndex);


      		// to the image jquery object, we add the attributes of the giphy still URL and an alt attribute
          	actionImage.attr('src', stillUrl);
           	actionImage.attr('alt', 'GIPHy image');
           	actionImage.height('200px');
           	actionImage.width('250px');
           	actionImage.attr('data-state', "still");

        	// prepend still image to the images div
        	$('#actionsDiv').prepend(ivContainer);
        	$('.ivContainer').eq(0).append("<h2>Rating: "+rating+"</h2>");
        	$('.ivContainer').eq(0).append(actionImage);

        	// store the information in the allActions object
        	allActions[actionIndex].imagesInfo.push({
       			"stillURL": stillUrl,
       			"animateURL" : animateUrl
        		})
            } // end of for loop
    });
});  // end of on click event handler
//======================================
//  EVENT HANDLER FOR IMAGE
//  learning about event delegation 

 $('#actionsDiv').on('click', 'img', function(event) {

 	var actionIndex = $(this).closest('.ivContainer').data('actionindex');
 	var imageIndex = $(this).closest('.ivContainer').data('imageindex');

 	if  ($(this).attr('data-state')=="still") {
 		$(this).attr('src', allActions[actionIndex].imagesInfo[imageIndex].animateURL);
 		$(this).attr('data-state', 'animate');
 	}
 	else {
 		$(this).attr('src', allActions[actionIndex].imagesInfo[imageIndex].stillURL);
 		$(this).attr('data-state', 'still');
 	}
 	
 });



showButtons();

} //end of window.onload function