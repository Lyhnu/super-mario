$(function(){
	var images = new Array()
	function preload() {
		for (i = 0; i < preload.arguments.length; i++) {
			images[i] = new Image()
			images[i].src = preload.arguments[i]
		}
	}
	preload(
		"images/coin.gif",
		"images/flower.png",
		"images/logo.png",
		"images/map-peach.png",
		"images/peach-face.gif",
		"images/peach-jump.gif",
		"images/peach-left.gif",
		"images/peach-right.gif",
		"images/texture.png"
	)
});