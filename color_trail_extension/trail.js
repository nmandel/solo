// document.body.style.backgroundColor="green";

var circle = document.createElement("div");
circle.setAttribute("id", "circle");
document.body.appendChild(circle);
// document.getElementById("circle").style.top = "200px";
// document.getElementById("circle").style.right = "500px";
$(document).mousemove(function(event) {
	// console.log(event.pageX + " " + event.pageY);
	// console.log($(document).scrollTop());
	var xPos = event.pageX;
	var yPos = parseInt(event.pageY) - $(document).scrollTop();
	var circleElem = document.getElementById("circle")
	circleElem.style.top = yPos + "px";
  circleElem.style.left = xPos + "px";
})
console.log($("#circle"));