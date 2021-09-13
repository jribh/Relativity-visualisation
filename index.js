let slider = document.querySelector("#speedslider");
let rocket = document.querySelector("#moveablerocket")
let stars = document.querySelector("#stars");
let speedometerDot = document.querySelector("#speedometerdot");
let speedometerGraph = document.querySelector("#speedometergraph");
let polyline = document.querySelector("#polyline");
let canvas = document.querySelector("#canvas");
let velocity = document.querySelector("#velocity");
let length = document.querySelector("#length");
let time = document.querySelector("#time");

let speedometerWidth = speedometerGraph.offsetWidth;


slider.addEventListener("input", function() {
let v=slider.value;

let x = Math.round(251*(1-((v*v)/90000)));

rocket.setAttribute("width",x);


let dotX = (v/300) * speedometerWidth;
let dotY = speedometerWidth - Math.sqrt((speedometerWidth*speedometerWidth)-(dotX*dotX));

speedometerDot.style.margin = dotY + "px 0 0 " + dotX + "px";

polyline.points[0].x = 0;
polyline.points[0].y = speedometerWidth*(3.09/4);

polyline.points[1].x = dotX*(3.09/4);
polyline.points[1].y = dotY*(3.09/4);

let newLength = (1-(v*v)/90000).toFixed(2);

velocity.innerText = "Velocity = " + v + "000 m/s";
length.innerText = "Length = Original length * " +newLength; 
time.innerText = "Proper time = Time * " + newLength;

});


slider.addEventListener("change", function() {
    let v=slider.value;
    let speed = -0.3167*v + 100;


    stars.style.animation = "animStar 0s linear infinite";
    stars.style.animation = "animStar "+ speed +"s linear infinite";

})

