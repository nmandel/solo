// document.body.style.backgroundColor="green";

$(document).ready(function() {

	var numBalls = 8;
	var colors = [
	  "#FF0000",
	  "#FF8000",
	  "#FFFF00",
	  "#40FF00",
	  "#00FFFF",
	  "#0000FF",
	  "#8000FF",
	  "#FF00FF"
	];
	var circles = [];
	var cursorPositions = [];

	for (var i = 0; i < numBalls; i++) {
		var circle = document.createElement("div");
		circle.setAttribute("id", "circle" + i);
		circle.setAttribute("class", "circle")
		document.body.appendChild(circle);
		circles.push(circle);
		cursorPositions.push([0, 0]);
	};

  var intervalCount = 0;
	setInterval(function() {
    var index = intervalCount % numBalls;
    intervalCount++;
		cursorPositions[index] = [window.xPos, window.yPos];
		// console.log(cursorPositions[index]);
	}, 50)

	$(document).mousemove(function(event) {
		// console.log(event.pageX + " " + event.pageY);
		// console.log($(document).scrollTop());
		window.xPos = parseInt(event.pageX);
		window.yPos = parseInt(event.pageY) - $(document).scrollTop();
		for (var a = 0; a < circles.length; a++) {
			var xCord = cursorPositions[a][0];
			var yCord = cursorPositions[a][1];
			var circleElem = document.getElementById("circle" + a)
			circleElem.style.background = colors[a];
			circleElem.style.top = (yCord) + "px";
		  circleElem.style.left = (xCord) + "px";
		}
	});
	
})
