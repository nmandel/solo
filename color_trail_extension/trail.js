$(document).ready(function() {
  
  // explosion magnitude:
  var mag;

  // directions that balls go upon explosion:
  var directions;

  // the number of colored balls:
  var numBalls = 8;

  // the possible colors the balls can be:
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

  // array containing ball elements with unique ids to be appended to DOM
  var circles = [];

  // array containing current position of cursor, plus
  // position 30ms prior, 60ms prior, etc.
  var cursorPositions = [];

  // this variable activates on click to track whether explosion has been triggered
  var exploding = false;

  // keeps track of points where cursor location is tracked for ball position
  var intervalCount = 0;

  // adds a colored ball to the DOM and sets its starting position offscreen
  function addBall () {
    console.log('adds ball');
    var circle = document.createElement("div");
    circle.setAttribute("id", "circle" + i);
    circle.setAttribute("class", "circle")
    document.body.appendChild(circle);
    circles.push(circle);
    cursorPositions.push([-50, -50]);
  }

  // sets magnitude of explosion based upon value set from options
  // or defaults to 100px
  function setMag (response) {
    mag = parseInt(response.status) || 100;
    // directions that balls travel upon explosion
    directions = [
      [mag, 0], 
      [mag, mag],
      [0, mag],
      [mag, -mag],
      [-mag, mag],
      [-mag, 0],
      [0, -mag],
      [-mag, -mag]
    ];
  }

  // if the balls are not currently exploding,
  // they will follow the cursor
  function followCursor() {
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
        var circleElem = "#circle" + a;
        d3.select(circleElem).style("background", colors[a]);
      }
    }
  }

  // handles the exploding functionality- transitions the balls
  // outward and then back in using d3
  function explosion() {
    exploding = true;
    for (var a = 0; a < circles.length; a++) {
      var circleElem = "#circle" + a;
      var xCord = parseInt(d3.select(circleElem).style("top"));
      var yCord = parseInt(d3.select(circleElem).style("left"));
      d3.select(circleElem).transition()
        .duration(700)
        .style("top", (xCord + directions[a][0]) + "px")
        .style("left", (yCord + directions[a][1]) + "px")
        .each("end", function() {
          d3.select(this).transition()
            .duration(700)
            .style("top", (xCord + "px") )
            .style("left", (yCord + "px") )
            .each("end", function() {
              exploding = false;
            })
        });
    }
  }

  // gets magnitude value and sets explosion magnitude
  chrome.runtime.sendMessage({method: "getMag"}, function(response) {
	  setMag(response);
	});
  
  // adds balls to the dom
	for (var i = 0; i < numBalls; i++) {
		addBall();
	};


  // position of cursor is taken every 30ms so that balls
  // follow the cursor relatively quickly
	setInterval(followCursor, 30)

  // finds the current magnitude and triggers the explosion
  $(document).on('click', function() {
	  chrome.runtime.sendMessage({method: "getMag"}, function(response) {
		  setMag(response);
		  explosion();
		}); 	
  })

  // tracks the position of the mouse, setting globals to hold x and y coords
	$(document).mousemove(function(event) {
		window.xPos = parseInt(event.pageX);
		window.yPos = parseInt(event.pageY) - $(document).scrollTop();
	});

})
