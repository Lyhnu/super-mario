$(function(){
	//start screen
	$(".start-screen h3").css('cursor', 'pointer'); //change cursor on h3
	$(".start-screen span").click(function() {
		$(".start-screen").fadeOut(200, function() {
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

	//flowers and coins positions on tables
	var tabFlower = new Array(); //initialize Flower table
	var tabCoin = new Array(); //initialize Coin table
	$(".flower").each(function(index){
		tabFlower.push({
			"objectFlower": $(this),
			"posFlowerLeft": $(this).position().left});
	});
	$(".coin").each(function(index){
		tabCoin.push({
			"objectCoin": $(this),
			"posCoinLeft": $(this).position().left,
			"posCoinTop": $(this).position().top});
	});

	//animations map + Peach + stop map
		//1. set temporary class for peach jump
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

		//2. add move options
	moveRight = {
		left: "-=10px"
	}
	moveLeft = {
		left: "+=10px"
	}
	moveTop = {
		top: "-=30px"
	}
		//3. Initialize pos of Peach
	var pos = $(".peach").position();
		//4. on keydown effects with qwerty / azerty compatibilities
	$(document).keydown(function(event){
		var posX = $(".map").position().left;
		if (event.which == 68 && posX > -2600) { //68 = D
			$(".peach").addClass("right");
			$(".map").animate(moveRight, 0);
		} else if (event.which == 81 && posX < 0 || event.which == 65 && posX < 0) { //81 = Q, 65 = A
			$(".peach").addClass("left");
			$(".map").animate(moveLeft, 0);
		} else if (event.which == 90 || event.which == 87) { //90 = Z, 87 = W
			$(".peach").addTemporaryClass("top", 400);
			$(".peach").animate({'top':pos.top - 120 + 'px'}, 250);
			setTimeout(function(){
		    	$('.peach').animate({'top': pos.top + 'px'}, 50);
		    }, 400);
		} 

		//5. catch flowers & add score
		var posMapX = $(".map").position().left; //initialize map X position
		var posPeachX = Math.abs(posMapX) + 165; //initialize peach X position + 165 ==> hitbox
		var nbFlowers = parseInt($(".flowers span").text()); //make string 0 to an integer
		var removeFlower = -1; //initialize a fake number to remove elements of tableFlower

		$.each(tabFlower, function(index, value) { //for each element of tableFlower
			var distX = Math.abs(value.posFlowerLeft - posPeachX); //initialize distance X between Peach and flowers
			console.log(index + "flowerX: ", distX); //check distance X
			if (distX < 46) { //if dist is inferior to 46, animate to fadeOut with opacity ad move at the same time
				$(value.objectFlower).animate({opacity: 0, bottom: "80px"}, 600);
				removeFlower = index;//stock this index
				nbFlowers++//increment +1 number of flowers
				$(".flowers span").text(nbFlowers);//add +1 in html
			}
		});

		if (removeFlower !== -1) {
			tabFlower.splice(removeFlower, 1); //if i touch a flower, remove it from the table tabFlower
		}

		//6. catch coins & add score
		var posMapY = $(".map").position().top; //initialize map Y position
		var topPeach = $(".peach").position().top; //initialize peach Y position
		var posPeachY = topPeach - 10; //initialize peach position -10 ==> hitbox
		var nbCoins = parseInt($(".coins span").text()); //make string 0 to an integer
		var removeCoin = -1; //initialize a fake number to remove elements of tableCoin

		$.each(tabCoin, function(index, value) { //for each element of tableCoin
			var distY = Math.abs(value.posCoinTop - posPeachY); //initialize distance Y between Peach and flowers
			var distX = Math.abs(value.posCoinLeft - posPeachX); //initialize distance X between Peach and flowers
			console.log(index + "coinX: ", distX); //check distance X
			console.log(index + "xoinY: ", distY); //check distance Y
			if (distX < 46 && distY < 50) { //if distX is inferior to 46 and distY to 50, animate to fadeOut with opacity ad move at the same time
				$(value.objectCoin).animate({opacity:0}, {queue: false, duration: 600});
				$(value.objectCoin).animate(moveTop, {queue: false, duration: 600});
				removeCoin = index;//stock this index
				nbCoins++//increment +1 number of coins
				$(".coins span").text(nbCoins);//add +1 in html
			}
		});

		if (removeCoin !== -1) {
			tabCoin.splice(removeCoin, 1); //if i touch a coin, remove it from the table tabCoin
		}
	});

	//keyup (removeClass for animations peach)

	$(document).keyup(function(event){
		if (event.which == 68) { //68 = D
			$(".peach").removeClass("right");
		} else if (event.which == 81 || event.which == 65) { //81 = Q, 65 = A
			$(".peach").removeClass("left");
		}
	});
});