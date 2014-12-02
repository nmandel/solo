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
	var mag = 200;
	var directions = [
    [mag, 0], 
    [mag, mag],
    [0, mag],
    [mag, -mag],
    [-mag, mag],
    [-mag, 0],
    [0, -mag],
    [-mag, -mag]
	];
	var circles = [];
	var cursorPositions = [];
	var exploding = false;

	for (var i = 0; i < numBalls; i++) {
		var circle = document.createElement("div");
		circle.setAttribute("id", "circle" + i);
		circle.setAttribute("class", "circle")
		document.body.appendChild(circle);
		circles.push(circle);
		cursorPositions.push([-50, -50]);
	};

  var intervalCount = 0;
	setInterval(function() {
		if (!exploding) {
	    var index = intervalCount % numBalls;
	    intervalCount++;
			cursorPositions[index] = [window.xPos, window.yPos];
			d3.select("#circle" + index).transition()
			    .duration(240)
			    .style("top", (cursorPositions[index][1] + "px"))
			    .style("left", (cursorPositions[index][0] + "px"));
			for (var a = 0; a < circles.length; a++) {
				var xCord = cursorPositions[a][0];
				var yCord = cursorPositions[a][1];
				// var circleElem = document.getElementById("circle" + a)
				// circleElem.style.background = colors[a];
				var circleElem = "#circle" + a;
				d3.select(circleElem).style("background", colors[a]);
				// circleElem.style.top = (yCord) + "px";
			 //  circleElem.style.left = (xCord) + "px";
			  // d3.select(circleElem).style("top", (yCord + "px"));
			  // d3.select(circleElem).style("left", (xCord + "px"));
			}
		}
		// console.log(cursorPositions.toString());
	}, 30)

  $(document).on('click', function() {
  	console.log('click!');
  	exploding = true;
  	for (var a = 0; a < circles.length; a++) {
				var circleElem = "#circle" + a;
				var xCord = parseInt(d3.select(circleElem).style("top"));
				var yCord = parseInt(d3.select(circleElem).style("left"));
				// console.log(xCord + " , " + yCord);
				d3.select(circleElem).transition()
				  .duration(700)
				  .style("top", (xCord + directions[a][0]) + "px")
				  .style("left", (yCord + directions[a][1]) + "px")
				  .each("end", function() {
				  	// console.log(this);
				  	d3.select(this).transition()
				  	  .duration(700)
				  	  .style("top", (xCord + "px") )
				      .style("left", (yCord + "px")	)
				      .each("end", function() {
				      	exploding = false;
				      })
				  });
				// d3.select(circleElem).style("background", colors[a]);
			 //  d3.select(circleElem).style("top", (yCord + "px"));
			 //  d3.select(circleElem).style("left", (xCord + "px"));
			}
  	// console.log(cursorPositions.toString());
    
  })

  $(document).on('mouseup', function() {
  	if (exploding) {
	  	console.log('mouseup!');
	  	exploding = false;
  	}
  })

	$(document).mousemove(function(event) {
		// console.log(event.pageX + " " + event.pageY);
		// console.log($(document).scrollTop());
		window.xPos = parseInt(event.pageX);
		window.yPos = parseInt(event.pageY) - $(document).scrollTop();
		
	});
	
})
