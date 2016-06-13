$(function(){

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
			$(".peach").addTemporaryClass("top", 600);
		}
	});

	$(document).keyup(function(event){
		if (event.which == 68) {
			$(".peach").removeClass("right");
		} else if (event.which == 81 || event.which == 65) {
			$(".peach").removeClass("left");
		}
	});

	//movement map + peach
	var pos = $('.peach').position();

	moveRight = {
		right: "+=20px"
	}

	moveLeft = {
		right: "-=20px"
	}

	$(document).keydown(function(event){
		if (event.which == 68) {
			$(".game").animate(moveRight, 0);
		} else if (event.which == 81 || event.which == 65) {
			$(".game").animate(moveLeft, 0);
		} else if (event.which == 90 || event.which == 87) {
			$(".peach").animate({'top':pos.top - 100 + 'px'}, 400);
			setTimeout(function(){
		    	$('.peach').animate({'top': pos.top + 'px'}, 90);
		    }, 400);
		}
	});
});