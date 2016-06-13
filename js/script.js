$(function(){

	//animation peach
	$(document).keydown(function(event){
		if (event.which == 68) {
			$(".peach").addClass("right");
			$("game").css("background-position","50%");
		} else if (event.which == 81) {
			$(".peach").addClass("left");
		} else if (event.which == 90) {
			$(".peach").addClass("top");
		}
	});

	$(document).keyup(function(event){
		if (event.which == 68) {
			$(".peach").removeClass("right");
		} else if (event.which == 81) {
			$(".peach").removeClass("left");
		} else if (event.which == 90) {
			$(".peach").removeClass("top");
		}
	});

	// animation map
	moveRight = {
		right: "+=20px"
	}

	$(document).keypress(function(event){
		$(".game").animate(moveRight, 10);
	});
});