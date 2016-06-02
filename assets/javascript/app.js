// javascript file for UT BootCamp Assignment 6
// AJAX API app for Week 6 - Louise K Miller

window.onload = function(){

//======================================================
// OBJECT THAT HOLDS ALL GIPH INFORMATION

var allActions = [
	{action: "pointing",
	 status: "still"},
	 {action: "laughing",
	 status: "still"},
	 {action: "sneezing",
	 status: "still"},
	 {action: "crying",
	 status: "still"},
	 {action: "driving",
	 status: "still"},
	];

//=================================
//  THIS CREATES A BUTTON FOR EACH ACTION IN THE allActions OBJECT

function showButtons() {
	$('#buttonDiv').empty();
	for (var i =0; i<allActions.length; i++) {
		$newButton = $('<button>');
		$newButton.addClass("actionButton");
		$newButton.text(allActions[i].action);
		$('#buttonDiv').append($newButton);
	}
};

//======================================
//  EVENT HANDLER FOR USER SUBMISSION OF NEW ACTION

$('#inputButton').on("click", function(event){
	allActions.push(
		{action:($('#userInput').val()),
		status: "still"});
	showButtons();
	event.preventDefault(); // prevent default action associated with form submit
});

showButtons();

} //end of window.onload function