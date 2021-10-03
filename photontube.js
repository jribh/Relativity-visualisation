async function photonTube() {

let dimensions = {
        width: 450,
        height: 450,
        margin: {
          top: 70,
          right: 70,
          bottom: 70,
          left: 70,
        },
      };
    dimensions.boundedWidth =
        dimensions.width - dimensions.margin.left - dimensions.margin.right;
    dimensions.boundedHeight =
        dimensions.height - dimensions.margin.top - dimensions.margin.bottom;

var slider = d3
    .sliderHorizontal()
    .min(0)
    .max(1)
    .tickFormat(d3.format('.0%'))
    .width(dimensions.width - 2*dimensions.margin.left)
    .displayValue(false)
    .handle(
        d3
          .symbol()
          .type(d3.symbolCircle)
          .size(200)()
      );
    

var sliderSvg = d3.select('#slider-tube')
    .append('svg')
    .attr('width', dimensions.width)
    .attr('height', 100)
    .style("transform", 25)
    .append('g')
    .style('transform', `translate(${dimensions.margin.left}px,${dimensions.margin.top/6}px)`)
    .call(slider);


const dataset = await d3.csv("For_circle.csv");

const xAccessor = (d) => d.X;
const yAccessor = (d) => d.Y;

// wrapper left

const wrapperLeft = d3
                    .select("#photontubecontainerstationary")
                    .append("svg")
                    .attr("width", dimensions.width/2)
                    .attr("height", dimensions.height);

const boundsLeft = wrapperLeft
                  .append("g")
                  .style("transform",
                  `translate(${dimensions.margin.left}px,${dimensions.margin.top}px)`);

//wrapper right

const wrapper = d3
                   .select("#photontubecontainer")
                   .append("svg")
                   .attr("width", dimensions.width)
                   .attr("height", dimensions.height);

const bounds = wrapper
                  .append("g")
                  .style("transform",
                  `translate(${dimensions.margin.left}px,${dimensions.margin.top}px)`);

    
    const x = d3.scaleLinear().domain(d3.extent(dataset, xAccessor)).range([0, dimensions.boundedWidth]);
    const yScale = d3.scaleLinear().domain(d3.extent(dataset, yAccessor)).range([dimensions.boundedHeight, 0]);


    const lineGenerator = d3.line().x((d) => x(xAccessor(d))).y((d) => yScale(yAccessor(d))).curve(d3.curveBasis);

    const line = bounds.append("path").attr("d", lineGenerator(dataset)).attr("fill", "none").attr("stroke", "orange").attr("stroke-width", 1).style('stroke-dasharray', ("3,3"));


var horLine = bounds.append('line')
        .style('opacity', 0)
        .attr('stroke', 'grey');

var verLine = bounds.append('line')
      .attr('stroke', 'grey');

// top text

var leftText = wrapperLeft.append('text')
            .attr('x', dimensions.margin.left)
            .attr('y', dimensions.margin.top - 20)
            .text("FOR : Traveller");

var rightText = wrapper.append('text')
            .attr('x', 20)
            .attr('y', dimensions.margin.top - 20)
            .text("FOR : Outsider");

// rectangle

var rectangleRightLight = bounds.append('rect')
                            .attr('x', -20)
                            .attr('y', 0)
                            .attr('width', 40)
                            .attr('height', dimensions.boundedHeight)
                            .attr('stroke', 'black')
                            .style("stroke-width", 0.8)
                            .style('stroke-dasharray', ("3,3"))
                            .attr('fill', '#ECF0F1')
                            .style("opacity", "25%");

var rectangleRightDark = bounds.append('rect')
                            .attr('x', -20)
                            .attr('y', 0)
                            .attr('width', 40)
                            .attr('height', dimensions.boundedHeight)
                            .attr('stroke', 'black')
                            .style("stroke-width", 1.5)
                            .attr('fill', '#ECF0F1')
                            .style("z-index", "-1");

// rectangle left

var rectangleLefttDark = boundsLeft.append('rect')
                            .attr('x', 0)
                            .attr('y', 0)
                            .attr('width', 40)
                            .attr('height', dimensions.boundedHeight)
                            .attr('stroke', 'black')
                            .style("stroke-width", 1.5)
                            .attr('fill', '#ECF0F1')
                            .style("z-index", "-1");

// photon left

let circleLeft =  boundsLeft.append('circle')
                            .attr('r', 3.5)
                            .attr('stroke', 'none')
                            .attr('fill', 'orange')

function animCircleLeft() {

        circleLeft
                .attr('cx', 20)
                .attr('cy', dimensions.boundedHeight)
                .transition()
                .duration(750)
                .ease(d3.easeLinear)
                .attr('cx', 20)
                .attr('cy', 0)
                .on("end", animCircleLeft)

}

animCircleLeft();


// photon right

let circleRight =  bounds.append('circle')
                            .attr('r', 3.5)
                            .attr('stroke', 'none')
                            .attr('fill', 'orange')

function animCircleRight() {

        circleRight
                .attr('cx', 0)
                .attr('cy', dimensions.boundedHeight)
                .transition()
                .duration(750)
                .ease(d3.easeLinear)
                .attr('cx', 0)
                .attr('cy', 0)
                .on("end", animCircleRight)

}

animCircleRight();

var arc = d3.arc()
    .innerRadius(0)
    .outerRadius(dimensions.boundedHeight)
    .startAngle(0) //convert from degs to radians
    .endAngle(90 * (Math.PI/180)) //just radians

let circleRightBeam = bounds.append("path")
    .attr("d", arc)
    
    .attr("transform", "translate(0, " + dimensions.boundedHeight + ") scale(0.5)")
    .attr('stroke', 'none')
    .attr('fill', 'orange')
    .style("opacity", "7.5%")
    .style("position","absolute");

function animCircleRightBeam() {

        circleRightBeam
                .attr("transform", "translate(0, " + dimensions.boundedHeight + ") scale(0)")
                .transition()
                .duration(750)
                .ease(d3.easeLinear)
                .attr("transform", "translate(0, " + dimensions.boundedHeight + ") scale(1)")
                .on("end", animCircleRightBeam)

}

animCircleRightBeam();

slider.on('onchange', (val) => {
    
                            let sliderSpeed = (Math.round(val * 1000))/10;

                            let cxCircle = sliderSpeed*.01*dimensions.boundedWidth;
                            let cyCircle = dimensions.boundedHeight - Math.sqrt((dimensions.boundedHeight*dimensions.boundedHeight)-(cxCircle*cxCircle));
                            
                            horLine
                                .attr('x1', -35)
                                .attr('y1', cyCircle)
                                .attr('x2', cxCircle)
                                .attr('y2', cyCircle)
                                .style("opacity", "100%")
                                .style('stroke-dasharray', ("3,3"));

                            verLine
                                .attr('x1', cxCircle)
                                .attr('y1', dimensions.boundedWidth)
                                .attr('x2', cxCircle)
                                .attr('y2', cyCircle)
                                .style('opacity', "100%")
                                .style('stroke-dasharray', ("3,3"));

                            let speedLorentz = sliderSpeed*3;

                            let x = Math.round(251*(1-((speedLorentz*speedLorentz)/90000)));
                            rocket.setAttribute("width",x);

                            let speed = -0.3167*speedLorentz + 100;
                                
                            stars.style.animation = "animStar 0s linear infinite";
                            stars.style.animation = "animStar "+ speed +"s linear infinite";
                            
                    // rectangle

                    rectangleRightLight
                            .transition()
                            .duration(750)
                            .ease(d3.easeLinear)
                            .attr('x', cxCircle-20)
                            .attr('y', 0)
                            .attr('width', 40)
                            .attr('height', dimensions.boundedHeight);

                    rectangleRightDark
                            .transition()
                            .duration(750)
                            .ease(d3.easeLinear)
                            .attr('x', cxCircle-20)
                            .attr('y', cyCircle)
                            .attr('width', 40)
                            .attr('height', dimensions.boundedHeight-cyCircle);

                    // circle animation

                    function animCircleRight2() {

                        circleRight
                                .attr('cx', 0)
                                .attr('cy', dimensions.boundedHeight)
                                .transition()
                                .duration(750)
                                .ease(d3.easeLinear)
                                .attr('cx', cxCircle)
                                .attr('cy', cyCircle)
                                .on("end", animCircleRight2)
                
                }
                
                animCircleRight2();

            function animCircleRightBeam() {

                    circleRightBeam
                            .attr("transform", "translate(0, " + dimensions.boundedHeight + ") scale(0)")
                            .transition()
                            .duration(750)
                            .ease(d3.easeLinear)
                            .attr("transform", "translate(0, " + dimensions.boundedHeight + ") scale(1)")
                            .on("end", animCircleRightBeam)
            
            }
            
            animCircleRightBeam();

            // circle left

            function animCircleLeft() {

                circleLeft
                        .attr('cx', 20)
                        .attr('cy', dimensions.boundedHeight)
                        .transition()
                        .duration(750)
                        .ease(d3.easeLinear)
                        .attr('cx', 20)
                        .attr('cy', 0)
                        .on("end", animCircleLeft)
        
            }
            
            animCircleLeft();

});



    // axes
    
    const xAccessor2 = (d) => d.X/100;
    const x2 = d3.scaleLinear().domain(d3.extent(dataset, xAccessor2)).range([0, dimensions.boundedWidth]);

    const yAccessor2 = (d) => d.Y/100;
    const y2 = d3.scaleLinear().domain(d3.extent(dataset, yAccessor2)).range([dimensions.boundedHeight, 0]);

    const yAxisGenerator = d3.axisLeft().scale(y2).ticks(5).tickFormat(d3.format(".0%"));
    const yAxis = bounds.append("g")
                                    .call(yAxisGenerator)
                                    .style("transform", "translate(-35px, 0)")
                                    .style("opacity", 0.5);

    const xAxisGenerator = d3.axisBottom().scale(x2).ticks(5).tickFormat(d3.format(".0%"));
    const xAxis = bounds.append("g").call(xAxisGenerator).style("transform", `translateY(${dimensions.boundedHeight}px)`);

}

photonTube();
