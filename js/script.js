$(function(){
	//start screen
	$(".start-screen span").css('cursor', 'pointer'); //change cursor
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
			$(".count").addClass('endCount');
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
	var tabFlower = new Array();
	var tabCoin = new Array();
	$(".flower").each(function(index){
		tabFlower.push({"objectFlower": $(this),
			             "posFlowerLeft": $(this).position().left});
	});
	$(".coin").each(function(index){
		tabCoin.push({"objectCoin": $(this),
			          "posCoinLeft": $(this).position().left,
					  "posCoinTop": $(this).position().top});
	});

	//movement map + peach + stop map
	var pos = $(".peach").position();

	moveRight = {
		left: "-=10px"
	}
	moveLeft = {
		left: "+=10px"
	}

	moveTop = {
		top: "-=30px"
	}

	$(document).keydown(function(event){
		var posX = $(".map").position().left;
		if (event.which == 68 && posX > -2600) { //68 = D
			$(".map").animate(moveRight, 0);
		} else if (event.which == 81 && posX < 0 || event.which == 65 && posX < 0) { //81 = Q, 65 = A
			$(".map").animate(moveLeft, 0);
		} else if (event.which == 90 || event.which == 87) { //90 = Z, 87 = W
			$(".peach").animate({'top':pos.top - 120 + 'px'}, 250);
			setTimeout(function(){
		    	$('.peach').animate({'top': pos.top + 'px'}, 50);
		    }, 400);
		}

		//catch flowers & add score
		var posMapX = $(".map").position().left;
		var posPeachX = Math.abs(posMapX) + 165;
		var nbFlowers = parseInt($(".flowers span").text());
		var removeFlower = -1;

		$.each(tabFlower, function(index, value) {
			var distX = Math.abs(value.posFlowerLeft - posPeachX);
			console.log(index + ": ", distX);
			if (distX < 46) {
				$(value.objectFlower).animate({opacity: 0, bottom: "80px"}, 600);
				removeFlower = index;
				nbFlowers++
				$(".flowers span").text(nbFlowers);
			}
		});

		if (removeFlower !== -1) {
			tabFlower.splice(removeFlower, 1);
		}

		//catch coins & add score
		var posMapY = $(".map").position().top;
		var topPeach = $(".peach").position().top;
		var posPeachY = topPeach - 10;
		var nbCoins = parseInt($(".coins span").text());
		var removeCoin = -1;

		$.each(tabCoin, function(index, value) {
			var distY = Math.abs(value.posCoinTop - posPeachY);
			var distX = Math.abs(value.posCoinLeft - posPeachX);
			console.log(index + ": ", distX);
			if (distX < 46 && distY < 50) {
				$(value.objectCoin).animate({opacity:0}, {queue: false, duration: 600});
				$(value.objectCoin).animate(moveTop, {queue: false, duration: 600});
				removeCoin = index;
				nbCoins++
				$(".coins span").text(nbCoins);
			}
		});

		if (removeCoin !== -1) {
			tabCoin.splice(removeCoin, 1);
		}
	});
});