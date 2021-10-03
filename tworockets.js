let rocket = document.querySelector("#moveablerocket")
let stars = document.querySelector("#stars");
let hoverRect = document.querySelector("#hoverRect");

var slider = d3
    .sliderHorizontal()
    .min(0)
    .max(1)
    .tickFormat(d3.format('.0%'))
    .width(450)
    .displayValue(false)
    .handle(
        d3
          .symbol()
          .type(d3.symbolCircle)
          .size(200)()
      );
    

 var sliderSvg = d3.select('#slider')
    .append('svg')
    .attr('width', 500)
    .attr('height', 100)
    .style("margin-top", -20)
    .append('g')
    .attr('transform', 'translate(30,30)')
    .call(slider);
    


async function drawLineChart() {
    const dataset = await d3.csv("Assets/Two_rockets/For_circle.csv");

    const xAccessor = (d) => d.X;
    const yAccessor = (d) => d.Y;

    let dimensions = {
        width: 600,
        height: 600,
        margin: {
          top: 100,
          right: 100,
          bottom: 100,
          left: 100,
        },
      };
    dimensions.boundedWidth =
        dimensions.width - dimensions.margin.left - dimensions.margin.right;
      dimensions.boundedHeight =
        dimensions.height - dimensions.margin.top - dimensions.margin.bottom;

    const wrapper = d3
                    .select("#wrapper")
                    .append("svg")
                    .attr("width", dimensions.width)
                    .attr("height", dimensions.height)
                    .style("margin", "-50");

    const sliderWrapper = d3
                    .select("#hoverRect")
                    .append("svg")
                    .attr("width", 500)
                    .attr("height", 40);

    const bounds = wrapper
                   .append("g")
                   .style("transform",
                   `translate(${dimensions.margin.left}px,${dimensions.margin.top}px)`
                   );

    
    const x = d3.scaleLinear().domain(d3.extent(dataset, xAccessor)).range([0, dimensions.boundedWidth]);
    const yScale = d3.scaleLinear().domain(d3.extent(dataset, yAccessor)).range([dimensions.boundedHeight, 0]);


    const lineGenerator = d3.line().x((d) => x(xAccessor(d))).y((d) => yScale(yAccessor(d))).curve(d3.curveBasis);

    const line = bounds.append("path").attr("d", lineGenerator(dataset)).attr("fill", "none").attr("stroke", "Red").attr("stroke-width", 1);

    var circle = bounds
        .append('g')
        .append('circle')
        .style("fill", "red")
        .attr("stroke", "red")
        .attr('r', 8.5)
        .style('z-index', 1);

    
    var movingLine = bounds.append('line')
      .attr('x1', 0)
      .attr('y1', dimensions.boundedHeight)
      .attr('stroke', 'red')
      .attr("stroke-width", 2);

    var horLine = bounds.append('line')
      .attr('stroke', 'red');

    var verLine = bounds.append('line')
      .attr('stroke', 'red');

    var verLineTime = bounds.append('line')
        .attr('stroke', 'black')
        .attr("stroke-width", 2);

    var horLineVel = bounds.append('line')
        .attr('stroke', 'black')
        .attr("stroke-width", 2);

    var textRectY = wrapper.append('rect')
                            .attr('x', 5)
                            .attr('y', dimensions.margin.top-5)
                            .attr('width', 50)
                            .attr('height', 20)
                            .attr('stroke', 'black')
                            .attr('fill', 'none')
                            .style("display", "none");
                            
    var textTime = wrapper.append('text')
                            .attr('x',10)
                            .attr('y', dimensions.margin.top+10)
                            .text('T')
                            .style("display", "none");


    var textRectX = wrapper.append('rect')
                            .attr('x',70)
                            .attr('y', dimensions.height-70)
                            .attr('width', 50)
                            .attr('height', 20)
                            .attr('stroke', 'black')
                            .attr('fill', 'none')
                            .attr("display", "none")
                            .attr("fill", "#ECF0F1")
                            .attr('stroke', '#BFBFBF');
                            
    var textSpeed = wrapper.append('text')
                            .attr('x', 81)
                            .attr('y', dimensions.height-54)
                            .text('v')
                            .style("display", "none");
                            
    var sliderTextRect = sliderWrapper.append("rect")
                            .attr('x', 10)
                            .attr('y', 10)
                            .attr('width', 20)
                            .attr('height', 25)
                            .attr("fill", "red")
                            .style("transition", "0.25s")
                            .style("opacity", "0")
                            .attr("fill", "#ECF0F1")
                            .attr('stroke', '#BFBFBF');
    
    var sliderText = sliderWrapper.append('text')
                            .attr('x', 15)
                            .attr('y', 30)
                            .style("opacity", "0")
                            .style("transition", ".25s")
                            .text("0")
                            .style("z-index", "1")
                            .style("font-weight", "500");

        sliderSvg.on("mouseover", function(d) {
            sliderText.style("opacity", "1");
            sliderTextRect.style("opacity", "1");
        })
        sliderSvg.on("mouseout", function(d) {
            sliderText.style("opacity", "0");
            sliderTextRect.style("opacity", "0");
        })                    

    slider.on('onchange', (val) => {
    
                            let sliderSpeed = (Math.round(val * 1000))/10;

                            let cxCircle = sliderSpeed*.01*dimensions.boundedWidth;
                            let cyCircle = dimensions.boundedHeight - Math.sqrt((dimensions.boundedHeight*dimensions.boundedHeight)-(cxCircle*cxCircle));

                            circle.attr('cx', cxCircle);
                            circle.attr('cy', cyCircle);

                            movingLine
                                .attr('x2', cxCircle)
                                .attr('y2', cyCircle)
                                .attr('stroke', 'red');

                            
                            horLine
                                .attr('x1', 0)
                                .attr('y1', cyCircle)
                                .attr('x2', cxCircle)
                                .attr('y2', cyCircle)
                                .style('stroke-dasharray', ("3,3"));

                            verLine
                                .attr('x1', cxCircle)
                                .attr('y1', dimensions.boundedWidth)
                                .attr('x2', cxCircle)
                                .attr('y2', cyCircle)
                                .style('stroke-dasharray', ("3,3"));

                            verLineTime
                                .attr("x1", 0)
                                .attr("y1", 0)
                                .attr("x2", 0)
                                .attr("y2", cyCircle);

                            horLineVel
                                .attr("x1", 0)
                                .attr("y1", dimensions.boundedHeight)
                                .attr("x2", cxCircle)
                                .attr("y2", dimensions.boundedWidth);

                            textRectY
                                .attr('x', 5)
                                .attr('y', dimensions.margin.top+cyCircle-5)
                                .attr("fill", "#ECF0F1")
                                .attr('stroke', '#BFBFBF');
                            
                            var percentT = (100 - Math.round(cyCircle/4))/100;

                            if(percentT < 1 && percentT !== 0)
                            {
                            textTime
                                .text(`${percentT} t`)
                                .attr('y', dimensions.margin.top+11+cyCircle)
                                .style("display", "block")
                                .attr('x', 10)
                                .style("transition", "1s");

                            textRectY
                                .style("display", "block")
                                .attr('width', 55)
                                .attr('height', 20);

                            textRectX
                                .style("display", "block")
                                .attr("x", 70 + cxCircle)
                                .attr("width",50);
                            
                            textSpeed
                                .style("display", "block")
                                .attr("x", 73 + cxCircle)
                                .text(`${Math.round(sliderSpeed)/100} c`);
                            }
                            else if (percentT === 0){
                                textTime
                                    .text("0")
                                    .attr('y', dimensions.margin.top+11+cyCircle)
                                    .style("display", "block")
                                    .style("transition", "1s")
                                    .attr('x', 30);

                                textRectY
                                    .style("display", "block")
                                    .attr('width', 20)
                                    .attr('height', 20)
                                    .attr('x', 25);

                                textRectX
                                    .style("display", "block")
                                    .attr("x", 70 + cxCircle)
                                    .attr("width",20);
                                
                                textSpeed
                                    .style("display", "block")
                                    .attr("x", 75 + cxCircle)
                                    .text("c");
                            }
                            else {
                                textTime
                                    .style("display", "none")
                                    .style("transition", "1s");

                                textRectY
                                    .style("display", "none")
                                    .attr('width', 20)
                                    .attr('height', 20);

                                textRectX
                                    .style("display", "none")
                                    .attr("x", 70 + cxCircle)
                                    .attr("width",50);
                                
                                textSpeed
                                    .style("display", "none")
                                    .attr("x", 78 + cxCircle)
                                    .text(`${Math.round(sliderSpeed)/100} c`);
                            }

                            let speedLorentz = sliderSpeed*3;

                            let x = Math.round(251*(1-((speedLorentz*speedLorentz)/90000)));
                            rocket.setAttribute("width",x);

                            let speed = -0.3167*speedLorentz + 100;
                                
                            stars.style.animation = "animStar 0s linear infinite";
                            stars.style.animation = "animStar "+ speed +"s linear infinite";
                            
                            // slider hover

                            sliderText.attr('x', Math.round(sliderSpeed)*4.5+20)
                                        .attr('y', 30)
                                        .style("opacity", "1")
                                        .style("transition", "0.2s");

                            sliderTextRect.attr('x', Math.round(sliderSpeed)*4.5+15)
                                            .style("opacity", "1")
                                            .style("transition", "opacity 0.2s")
                                            .attr("width", 55);

                                if(sliderSpeed === 0) {
                                    
                                    sliderText.text(0);

                                    sliderTextRect.attr("width", "20")

                                } else if(sliderSpeed === 100) {

                                    sliderText.text("c");
                                    sliderTextRect.attr("width", 20)

                                }
                                else if(sliderSpeed>95 && sliderSpeed <100) {
                                    sliderTextRect.attr("x", 450*0.98);
                                    sliderText.attr("x", 450*0.99).text(`${Math.round(sliderSpeed)/100} c`);
                                }
                                else {

                                    sliderText.text(`${Math.round(sliderSpeed)/100} c`);
                                }

                            
        });

    const xAccessor2 = (d) => d.X/100;
    const x2 = d3.scaleLinear().domain(d3.extent(dataset, xAccessor2)).range([0, dimensions.boundedWidth]);

    const yAccessor2 = (d) => d.Y/100;
    const y2 = d3.scaleLinear().domain(d3.extent(dataset, yAccessor2)).range([dimensions.boundedHeight, 0]);


    const yAxisGenerator = d3.axisLeft().scale(y2).ticks(5).tickFormat(d3.format(".0%"));
    const yAxis = bounds.append("g").call(yAxisGenerator);

    const xAxisGenerator = d3.axisBottom().scale(x2).ticks(5).tickFormat(d3.format(".0%"));
    const xAxis = bounds.append("g").call(xAxisGenerator).style("transform", `translateY(${dimensions.boundedHeight}px)`);

}

drawLineChart();