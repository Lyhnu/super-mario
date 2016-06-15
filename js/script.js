$(function(){
	//start screen
	$(".start-screen span").css( 'cursor', 'pointer' ); //change cursor
	$(".start-screen span").click(function() {
		$(".start-screen").fadeOut(200, function() {
		//animation complete.
		});
	});

	//end screen
	$(document).keydown(function(event){
		var posX = $(".map").position().left;
		if (posX == -2600 ) {
			$(".end-screen").fadeIn(200, function() {
			});
		}
	});

	//set temporary class
	$.fn.extend({
        addTemporaryClass: function(className, duration) {
            var elements = this;
            setTimeout(function() {
                elements.removeClass(className);
            }, duration);
            return this.each(function() {
                $(this).addClass(className);
            });
        }
    });

	//animation peach
	$(document).keydown(function(event){
		if (event.which == 68) {
			$(".peach").addClass("right");
		} else if (event.which == 81 || event.which == 65) {
			$(".peach").addClass("left");
		} else if (event.which == 90 || event.which == 87) {
			$(".peach").addTemporaryClass("top", 400);
		}
	});

	$(document).keyup(function(event){
		if (event.which == 68) {
			$(".peach").removeClass("right");
		} else if (event.which == 81 || event.which == 65) {
			$(".peach").removeClass("left");
		}
	});

	//movement map + peach + stop map
	var pos = $(".peach").position();

	moveRight = {
		left: "-=10px"
	}
	moveLeft = {
		left: "+=10px"
	}

	$(document).keydown(function(event){		
		var posX = $(".map").position().left;
		if (event.which == 68 && posX > -2600 ) {
			$(".map").animate(moveRight, 0);
		} else if (event.which == 81 && posX < 0 || event.which == 65 && posX < 0) {
			$(".map").animate(moveLeft, 0);
		} else if (event.which == 90 || event.which == 87) {
			$(".peach").animate({'top':pos.top - 100 + 'px'}, 250);
			setTimeout(function(){
		    	$('.peach').animate({'top': pos.top + 'px'}, 50);
		    }, 200);
		}
	});

	//catch coins & flowers
});