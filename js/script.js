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

	//detect flowers and coins positions
	var tab_flower = new Array();
	$(".flower").each(function(index){
		tab_flower.push({"flower_object": $(this),
			             "position_left": $(this).position().left});
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
		if (event.which == 68 && posX > -2600) { //68 = D
			$(".map").animate(moveRight, 0);
		} else if (event.which == 81 && posX < 0 || event.which == 65 && posX < 0) { //81 = Q, 65 = A
			$(".map").animate(moveLeft, 0);
		} else if (event.which == 90 || event.which == 87) { //90 = Z, 87 = W
			$(".peach").animate({'top':pos.top - 100 + 'px'}, 250);
			setTimeout(function(){
		    	$('.peach').animate({'top': pos.top + 'px'}, 50);
		    }, 200);
		}

		//catch flowers
		var posMapX = $(".map").position().left;
		var posPeachX = Math.abs(posMapX) + 165;
		var nbFlowers = parseInt($(".flowers span").text());
		var flower_to_remove = -1;

		$.each(tab_flower, function(index, value) {
			var distX = Math.abs(value.position_left - posPeachX);
			console.log( index + ": ", distX );
			if (distX < 46) {
				$(value.flower_object).animate({ opacity: 0, bottom: "80px" }, 600);
				flower_to_remove = index;
				nbFlowers++
				$(".flowers span").text(nbFlowers);
			}
		});

		if (flower_to_remove !== -1) {
			tab_flower.splice(flower_to_remove, 1);
		}
	});
});