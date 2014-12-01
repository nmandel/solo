// document.body.style.backgroundColor="green";

var circle = document.createElement("div");
circle.setAttribute("id", "circle");
document.body.appendChild(circle);
// document.getElementById("circle").style.top = "200px";
// document.getElementById("circle").style.right = "500px";
$(document).mousemove(function(event) {
	// console.log(event.pageX + " " + event.pageY);
	var xPos = window.innerWidth - parseInt(event.pageX);
	var yPos = event.pageY;
	var circleElem = document.getElementById("circle")
	circleElem.style.top = yPos+ "px";
  circleElem.style.right = xPos + "px";
})
console.log($("#circle"));