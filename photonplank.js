async function photonPlank() {

//rectangles and grids

let dimensions = {
    timeDiv: {
        width : 1000,
        height : 600
    },
    rect: {
        width : 250,
        height : 400
    },
    padding: {
        top : 50,
        bottom : 25,
        left : 50,
        right: 50
    },
    gridspacing : 25,
    gridsTime : 125
}

let leftPhotonTime = dimensions.gridsTime * ((dimensions.rect.height/2)/dimensions.gridspacing);



// slider

var slider = d3
    .sliderHorizontal()
    .min(0)
    .max(0.5)
    .tickFormat(d3.format('.0%'))
    .width(450)
    .displayValue(false)
    .handle(
        d3
          .symbol()
          .type(d3.symbolCircle)
          .size(200)()
    );
    
var sliderSvg = d3.select('#slider-plank')
    .append('svg')
    .attr('width', 500)
    .attr('height', 100)
    .style("margin-top", -20)
    .append('g')
    .attr('transform', 'translate(30,30)')
    .call(slider);


var timeDiv = d3
                    .select("#through-time")
                    .append("svg")
                    .attr("width", dimensions.timeDiv.width)
                    .attr("height", dimensions.timeDiv.height);

timeDiv.append('rect')
            .attr('x', dimensions.padding.left)
            .attr('y', dimensions.padding.top)
            .attr('width', dimensions.rect.width)
            .attr('height', dimensions.rect.height)
            .attr('stroke', 'black')
            .attr('fill', 'none');

//lines

var leftLine = timeDiv.append('line')
            .attr('x1', dimensions.rect.width+2*dimensions.padding.left)
            .attr('y1', dimensions.padding.top)
            .attr('x2', dimensions.rect.width+2*dimensions.padding.left)
            .attr('y2', dimensions.rect.height+dimensions.padding.top)
            .attr('stroke', 'black')
            .attr("stroke-width", 1);

var rightLine = timeDiv.append('line')
            .attr('x1', (2*dimensions.rect.width)+2*dimensions.padding.left)
            .attr('y1', dimensions.padding.top)
            .attr('x2', (2*dimensions.rect.width)+2*dimensions.padding.left)
            .attr('y2', dimensions.rect.height+dimensions.padding.top)
            .attr('stroke', 'black')
            .attr("stroke-width", 1);
            
var topLine = timeDiv.append('line')
            .attr('x1', dimensions.rect.width+2*dimensions.padding.left)
            .attr('y1', dimensions.padding.top)
            .attr('x2', (2*dimensions.rect.width)+2*dimensions.padding.left)
            .attr('y2', dimensions.padding.top)
            .attr('stroke', 'black')
            .attr("stroke-width", 1);

var bottomLine = timeDiv.append('line')
            .attr('x1', dimensions.rect.width+2*dimensions.padding.left)
            .attr('y1', dimensions.rect.height+dimensions.padding.top)
            .attr('x2', (2*dimensions.rect.width)+2*dimensions.padding.left)
            .attr('y2', dimensions.rect.height+dimensions.padding.top)
            .attr('stroke', 'black')
            .attr("stroke-width", 1);

//lines end

// top text labels

var leftText = timeDiv.append('text')
            .attr('x', dimensions.padding.left + 10)
            .attr('y', dimensions.padding.top - 20)
            .text("Frame of Reference : Traveller");

var rightText = timeDiv.append('text')
            .attr('x', 2*dimensions.padding.left + 10 + dimensions.rect.width)
            .attr('y', dimensions.padding.top - 20)
            .text("Frame of Reference : Outsider");

// right label simultaneity

var simulText = timeDiv.append('text')
            .attr('x', 2*dimensions.padding.left + 2*dimensions.rect.width)
            .attr('y', dimensions.padding.top - 20)
            .style("opacity", "0")
            .text("Break in simultaneity");

// right label line vertical

var rightLineLabel = timeDiv.append('line')
            .attr('stroke', '#BFBFBF')
            .attr("stroke-width", 1)
            .style("opacity", 0);

var rightLineLabelTop = timeDiv.append('line')
            .attr('stroke', '#BFBFBF')
            .attr("stroke-width", 1)
            .style("opacity", 0);

var rightLineLabelBottom = timeDiv.append('line')
            .attr('stroke', '#BFBFBF')
            .attr("stroke-width", 1)
            .style("opacity", 0);

// inner gridlines

let i = dimensions.rect.width / dimensions.gridspacing ;
let k = dimensions.rect.height / dimensions.gridspacing ;
let leftGridsVert = [];
let leftGridsHor = [];
let rightGridsVert = [];
let rightGridsHor = [];

//horizontal grids

for(let j=0; j<k; j++) {

    leftGridsHor[j] = timeDiv.append("line")
            .attr('stroke', '#BFBFBF')
            .attr("stroke-width", 1);

    rightGridsHor[j] = timeDiv.append("line")
            .attr('stroke', '#BFBFBF')
            .attr("stroke-width", 1);

//inner gridlines animation

    function animLeftHor() {

                leftGridsHor[j]
                        .attr("x1", dimensions.padding.left)
                        .attr("y1", dimensions.padding.top + dimensions.rect.height - dimensions.gridspacing*(j))
                        .attr("x2", dimensions.padding.left + dimensions.rect.width)
                        .attr("y2", dimensions.padding.top + dimensions.rect.height - dimensions.gridspacing*(j))
                        .transition()
                        .duration(dimensions.gridsTime)
                        .ease(d3.easeLinear)
                        .attr("x1", dimensions.padding.left)
                        .attr("y1", dimensions.padding.top + dimensions.rect.height - dimensions.gridspacing*(j) - dimensions.gridspacing)
                        .attr("x2", dimensions.padding.left + dimensions.rect.width)
                        .attr("y2", dimensions.padding.top + dimensions.rect.height - dimensions.gridspacing*(j) - dimensions.gridspacing)
                        .on("end", animLeftHor);
    }

    animLeftHor();

    
    function animRightHor() {

        rightGridsHor[j]
                .attr("x1", dimensions.padding.left*2 + dimensions.rect.width)
                .attr("y1", dimensions.padding.top + dimensions.rect.height - dimensions.gridspacing*(j))
                .attr("x2", dimensions.padding.left*2 + dimensions.rect.width*2)
                .attr("y2", dimensions.padding.top + dimensions.rect.height - dimensions.gridspacing*(j))
                .transition()
                .duration(dimensions.gridsTime)
                .ease(d3.easeLinear)
                .attr("x1", dimensions.padding.left*2 + dimensions.rect.width)
                .attr("y1", dimensions.padding.top + dimensions.rect.height - dimensions.gridspacing*(j) - dimensions.gridspacing)
                .attr("x2", dimensions.padding.left*2 + dimensions.rect.width*2)
                .attr("y2", dimensions.padding.top + dimensions.rect.height - dimensions.gridspacing*(j) - dimensions.gridspacing)
                .on("end", animRightHor);
    }

    animRightHor();

}

// plank

timeDiv.append('line')
            .attr('x1', dimensions.padding.left)
            .attr('y1', dimensions.padding.top + 0.5*dimensions.rect.height)
            .attr('x2', dimensions.padding.left + dimensions.rect.width)
            .attr('y2', dimensions.padding.top + 0.5*dimensions.rect.height)
            .attr('stroke', 'black')
            .attr("stroke-width", 2);

let plankRight = timeDiv.append('line')
            .attr('x1', dimensions.padding.left*2 + dimensions.rect.width)
            .attr('y1', dimensions.padding.top + 0.5*dimensions.rect.height)
            .attr('x2', dimensions.padding.left*2 + dimensions.rect.width*2)
            .attr('y2', dimensions.padding.top + 0.5*dimensions.rect.height)
            .attr('stroke', 'black')
            .attr("stroke-width", 2);


// plank left circle past

let circlePastLeft =  timeDiv.append('circle')
            .attr('r', 7.5)
            .attr('stroke', 'none')
            .attr('fill', 'red')
            .attr('opacity', "15%")

let H1 = dimensions.rect.width/2;
let H2 = dimensions.rect.height - H1;
let kCircle = H1 / H2;

let t2Circle = leftPhotonTime / (1 + kCircle);
let t1Circle = t2Circle * kCircle;

function animLeftCircle() {

    circlePastLeft
            .attr('cx', dimensions.padding.left + dimensions.rect.width/2)
            .attr('cy', dimensions.padding.top + dimensions.rect.height/2 - dimensions.rect.width/2)
            .style("opacity", "15%")
            .transition()
            .duration(t1Circle)
            .ease(d3.easeLinear)
            .attr('cx', dimensions.padding.left + dimensions.rect.width/2)
            .attr('cy', dimensions.padding.top + 7.5)
            .transition()
            .duration(0.001)
            .ease(d3.easeLinear)
            .attr('cx', dimensions.padding.left + dimensions.rect.width/2)
            .attr('cy', dimensions.padding.top + dimensions.rect.height/2)
            .transition()
            .duration(t2Circle)
            .ease(d3.easeLinear)
            .attr('cx', dimensions.padding.left + dimensions.rect.width/2)
            .attr('cy', dimensions.padding.top + dimensions.rect.height/2 - dimensions.rect.width/2)
            .transition()
            .duration(0.001)
            .ease(d3.easeLinear)
            .style("opacity", "100%")
            .on("end", animLeftCircle);

}

animLeftCircle();

// plank right circle past

let circlePastRight = timeDiv.append('circle')
            .attr('cx', 2*dimensions.padding.left + dimensions.rect.width + dimensions.rect.width/2)
            .attr('cy', dimensions.padding.top + dimensions.rect.height/2 - dimensions.rect.width/2)
            .attr('r', 7.5)
            .attr('stroke', 'none')
            .attr('fill', 'red')
            .attr('opacity', "15%");


function animRightCircle() {

    circlePastRight
            .attr('cx', 2*dimensions.padding.left + dimensions.rect.width + dimensions.rect.width/2)
            .attr('cy', dimensions.padding.top + dimensions.rect.height/2 - dimensions.rect.width/2)
            .style("opacity", "15%")
            .transition()
            .duration(t1Circle)
            .ease(d3.easeLinear)
            .attr('cx', 2*dimensions.padding.left + dimensions.rect.width + dimensions.rect.width/2)
            .attr('cy', dimensions.padding.top + 7.5)
            .transition()
            .duration(0.001)
            .ease(d3.easeLinear)
            .attr('cx', 2*dimensions.padding.left + dimensions.rect.width + dimensions.rect.width/2)
            .attr('cy', dimensions.padding.top + dimensions.rect.height/2)
            .transition()
            .duration(t2Circle)
            .ease(d3.easeLinear)
            .attr('cx', 2*dimensions.padding.left + dimensions.rect.width + dimensions.rect.width/2)
            .attr('cy', dimensions.padding.top + dimensions.rect.height/2 - dimensions.rect.width/2)
            .transition()
            .duration(0.001)
            .ease(d3.easeLinear)
            .style("opacity", "100%")
            .on("end", animRightCircle);

}

animRightCircle();

// right circle second

// let rightCircleSecond = timeDiv.append('circle')
//                                     .attr('r', 7.5)
//                                     .attr('stroke', 'none')
//                                     .attr('fill', 'red')
//                                     .style("opacity", "0%");

// timeDiv.append('circle')
//             .attr('cx', dimensions.padding.left + dimensions.rect.width/2)
//             .attr('cy', dimensions.padding.top + dimensions.rect.height/2 - dimensions.rect.width/2)
//             .attr('r', 7.5)
//             .attr('stroke', 'none')
//             .attr('fill', 'red')
//             .attr('opacity', "40%")
//             .transition()
//             .duration(500)
//             .ease(d3.easeLinear)
//             .attr('cx', dimensions.padding.left + dimensions.rect.width/2)
//             .attr('cy', dimensions.padding.top - dimensions.rect.width/2);



// plank circle present

timeDiv.append('circle')
            .attr('cx', dimensions.padding.left + dimensions.rect.width/2)
            .attr('cy', dimensions.padding.top + dimensions.rect.height/2 )
            .attr('r', 7.5)
            .attr('stroke', 'none')
            .attr('fill', 'red');

let circlePresentRight = timeDiv.append('circle')
            .attr('cx', 2*dimensions.padding.left + dimensions.rect.width + dimensions.rect.width/2)
            .attr('cy', dimensions.padding.top + dimensions.rect.height/2 )
            .attr('r', 7.5)
            .attr('stroke', 'none')
            .attr('fill', 'red');

// light photon

let leftLeftPhoton = timeDiv.append('circle')
            .attr('r', 3.5)
            .attr('stroke', 'none')
            .attr('fill', 'orange');

let leftRightPhoton = timeDiv.append('circle')
            .attr('r', 3.5)
            .attr('stroke', 'none')
            .attr('fill', 'orange');

function animLeftPhotons() {

        leftLeftPhoton
            .attr('cx', dimensions.padding.left + dimensions.rect.width/2)
            .attr('cy', dimensions.padding.top + dimensions.rect.height/2 - dimensions.rect.width/2)
            .transition()
            .duration(leftPhotonTime)
            .ease(d3.easeLinear)
            .attr("cx", dimensions.padding.left)
            .attr("cy", dimensions.padding.top + dimensions.rect.height/2)
            .on("end", animLeftPhotons);

        leftRightPhoton
            .attr('cx', dimensions.padding.left + dimensions.rect.width/2)
            .attr('cy', dimensions.padding.top + dimensions.rect.height/2 - dimensions.rect.width/2)
            .transition()
            .duration(leftPhotonTime)
            .ease(d3.easeLinear)
            .attr("cx", dimensions.padding.left + dimensions.rect.width)
            .attr("cy", dimensions.padding.top + dimensions.rect.height/2)
            .on("end", animLeftPhotons);
            
}

animLeftPhotons();

// right light photons

let RightLeftPhoton = timeDiv.append('circle')
            .attr('r', 3.5)
            .attr('stroke', 'none')
            .attr('fill', 'orange');

let RightRightPhoton = timeDiv.append('circle')
            .attr('r', 3.5)
            .attr('stroke', 'none')
            .attr('fill', 'orange');

function animRightPhotons() {

    RightLeftPhoton
        .attr('cx', dimensions.rect.width + 2*dimensions.padding.left + dimensions.rect.width/2)
        .attr('cy', dimensions.padding.top + dimensions.rect.height/2 - dimensions.rect.width/2)
        .transition()
        .duration(leftPhotonTime)
        .ease(d3.easeLinear)
        .attr("cx", 2*dimensions.padding.left + dimensions.rect.width)
        .attr("cy", dimensions.padding.top + dimensions.rect.height/2)
        .on("end", animLeftPhotons);

    RightRightPhoton
        .attr('cx', 2*dimensions.padding.left + dimensions.rect.width/2 + dimensions.rect.width)
        .attr('cy', dimensions.padding.top + dimensions.rect.height/2 - dimensions.rect.width/2)
        .transition()
        .duration(leftPhotonTime)
        .ease(d3.easeLinear)
        .attr("cx", 2*dimensions.padding.left + 2*dimensions.rect.width)
        .attr("cy", dimensions.padding.top + dimensions.rect.height/2)
        .on("end", animRightPhotons);
        
}

animRightPhotons();

// vertical grids

for(let j=1; j<=i; j++) {

    leftGridsVert[j-1] = timeDiv.append('line')
           .attr("x1", dimensions.padding.left + dimensions.gridspacing*(j))
           .attr("y1", dimensions.padding.top)
           .attr("x2", dimensions.padding.left + dimensions.gridspacing*(j))
           .attr("y2", dimensions.rect.height + dimensions.padding.top)
           .attr('stroke', '#BFBFBF')
           .attr("stroke-width", 1);
    

    rightGridsVert[j-1] = timeDiv.append('line')
           .attr('stroke', '#BFBFBF')
           .attr("stroke-width", 1);
    
    rightGridsVert[j-1]
           .attr("x1", dimensions.rect.width + 2*dimensions.padding.left + dimensions.gridspacing*(j))
           .attr("y1", dimensions.padding.top)
           .attr("x2", dimensions.rect.width + 2*dimensions.padding.left + dimensions.gridspacing*(j))
           .attr("y2", dimensions.rect.height + dimensions.padding.top);

}

//inner gridlines end

slider.on('onchange', (val) => {

        let movement = (Math.round(val*100) * 4);
        let leftLineX2 = dimensions.rect.width+2*dimensions.padding.left+(movement);
        let y2 = dimensions.rect.height - Math.sqrt((dimensions.rect.height*dimensions.rect.height) - movement*movement) ;
        let leftLineY2 = dimensions.rect.height + dimensions.padding.top - y2;

            leftLine
                .transition()
                .duration(dimensions.gridsTime)
                .ease(d3.easeLinear)
                .attr('x1', dimensions.rect.width+2*dimensions.padding.left)
                .attr('y1', dimensions.padding.top)
                .attr('x2', leftLineX2)
                .attr('y2', leftLineY2)
                .attr('stroke', 'black')
                .attr("stroke-width", 1);

            rightLine
                .transition()
                .duration(dimensions.gridsTime)
                .ease(d3.easeLinear)
                .attr('x1', (2*dimensions.rect.width)+2*dimensions.padding.left)
                .attr('y1', dimensions.padding.top)
                .attr('x2', (2*dimensions.rect.width)+2*dimensions.padding.left + movement)
                .attr('y2', leftLineY2)
                .attr('stroke', 'black')
                .attr("stroke-width", 1);

            bottomLine
                .transition()
                .duration(dimensions.gridsTime)
                .ease(d3.easeLinear)
                .attr('x1', leftLineX2)
                .attr('y1', leftLineY2)
                .attr('x2', (2*dimensions.rect.width)+2*dimensions.padding.left + movement)
                .attr('y2', leftLineY2)
                .attr('stroke', 'black')
                .attr("stroke-width", 1);
                

            // for inner gridlines

            for(let j=1; j<=i; j++) {

                rightGridsVert[j-1]
                        .attr('stroke', '#BFBFBF')
                        .attr("stroke-width", 1);

                function animRightVert() {

                    
                    rightGridsVert[j-1]
                        .attr("x1", dimensions.rect.width + 2*dimensions.padding.left + dimensions.gridspacing*(j))
                        .attr("y1", dimensions.padding.top)
                        .attr("x2", dimensions.rect.width + 2*dimensions.padding.left + dimensions.gridspacing*(j) + movement)
                        .attr("y2", leftLineY2);
                    
                    
                    function animRightVert2(t,p) {

                        rightGridsVert[j-1]    
                            .transition()
                            .duration(t)
                            .ease(d3.easeLinear)
                            .attr("x1", dimensions.rect.width + 2*dimensions.padding.left + dimensions.gridspacing*(j) - dimensions.gridspacing*p)
                            .attr("y1", dimensions.padding.top)
                            .attr("x2", dimensions.rect.width + 2*dimensions.padding.left + dimensions.gridspacing*(j) + movement - dimensions.gridspacing*p)
                            .attr("y2", leftLineY2)
                            .on("end", animRightVert);
                    }    
                    
                    let t=480 - 1.75 * movement;

                    if(movement < 10) {
                        animRightVert2(dimensions.gridsTime,0);  
                    }
                    else {
                        animRightVert2(t,1);
                    }
               

                }
            
                animRightVert();
            
            }

            for(let j=0; j<k; j++) {

                let xHor = ((k-j)/k) * movement;

                let yHor = y2 * ((k-j)/k);

                rightGridsHor[j]
                        .attr('stroke', '#BFBFBF')
                        .attr("stroke-width", 1);

                function animRightHor() {

                            rightGridsHor[j]
                                    .attr("x1", dimensions.rect.width + 2*dimensions.padding.left + xHor)
                                    .attr("y1", dimensions.padding.top + dimensions.rect.height - dimensions.gridspacing*(j) - yHor)
                                    .attr("x2", 2*dimensions.rect.width + 2*dimensions.padding.left + xHor)
                                    .attr("y2", dimensions.padding.top + dimensions.rect.height - dimensions.gridspacing*(j) - yHor)
                                    .transition()
                                    .duration(dimensions.gridsTime)
                                    .ease(d3.easeLinear)
                                    .attr("x1", dimensions.padding.left*2 + dimensions.rect.width + xHor - movement/k)
                                    .attr("y1", dimensions.padding.top + dimensions.rect.height - dimensions.gridspacing*(j) - yHor - (leftLineY2 - dimensions.padding.top)/k)
                                    .attr("x2", dimensions.padding.left*2 + dimensions.rect.width*2 + xHor - movement/k)
                                    .attr("y2", dimensions.padding.top + dimensions.rect.height - dimensions.gridspacing*(j) - yHor - (leftLineY2 - dimensions.padding.top)/k)
                                    .on("end", animRightHor);
                }
                    
                animRightHor();

            }

    // for right plank

    let q = (movement / (dimensions.rect.height - y2)) * (movement / (dimensions.rect.height - y2));

    let plankX = (dimensions.rect.width * q) / (2 - (2 * q));
    let plankY = Math.sqrt( (plankX * plankX) + ((dimensions.rect.width * plankX) / 2 ) );

    plankRight
        .transition()
        .duration(dimensions.gridsTime)
        .ease(d3.easeLinear)
        .attr('x1', (leftLineX2 - movement/2) - plankX)
        .attr('y1', ((leftLineY2 / 2) + dimensions.padding.top / 2) - plankY)
        .attr('x2', ((2*dimensions.rect.width)+2*dimensions.padding.left + movement/2) + plankX)
        .attr('y2', ((leftLineY2 / 2) + dimensions.padding.top / 2) + plankY)



    // circle right

    let ratio = ((dimensions.rect.height/2) - (dimensions.rect.width/2)) / dimensions.rect.height ;

    let xCircle = movement * ratio;
    let yCircle = y2 * ratio;

    // circlePastRight
    //         .transition()
    //         .duration(250)
    //         .ease(d3.easeLinear)
    //         .attr('cx', 2*dimensions.padding.left + dimensions.rect.width + dimensions.rect.width/2 + xCircle - plankX)
    //         .attr('cy', dimensions.padding.top + dimensions.rect.height/2 - dimensions.rect.width/2 - yCircle - plankY)
    //         .attr('r', 7.5)

    // circle present

    circlePresentRight
            .transition()
            .duration(dimensions.gridsTime)
            .ease(d3.easeLinear)
            .attr('cx', (leftLineX2 - movement/2) + dimensions.rect.width/2)
            .attr('cy', ((leftLineY2 / 2) + dimensions.padding.top / 2))
            .attr('r', 7.5)

    //circle right animation

    let t1CircleRight = t1Circle;
    let t2CircleRight = t2Circle;

    // function animRightCircle() {

    //     circlePastRight
    //             .attr('cx', 2*dimensions.padding.left + dimensions.rect.width + dimensions.rect.width/2 + xCircle - plankX)
    //             .attr('cy', dimensions.padding.top + dimensions.rect.height/2 - dimensions.rect.width/2 - yCircle - plankY)
    //             .style("opacity", "40%")
    //             .transition()
    //             .delay(t1CircleRight)
    //             .duration(0.1)
    //             .ease(d3.easeLinear)
    //             .attr('cx', (leftLineX2 - movement/2) + dimensions.rect.width/2)
    //             .attr('cy', ((leftLineY2 / 2) + dimensions.padding.top / 2))
    //             .transition()
    //             .duration(t2CircleRight)
    //             .ease(d3.easeLinear)
    //             .attr('cx', 2*dimensions.padding.left + dimensions.rect.width + dimensions.rect.width/2 + xCircle - plankX)
    //             .attr('cy', dimensions.padding.top + dimensions.rect.height/2 - dimensions.rect.width/2 - yCircle - plankY)
    //             .transition()
    //             .duration(0.1)
    //             .ease(d3.easeLinear)
    //             .style("opacity", "100%")
    //             .on("end", animRightCircle);
    
    // }

    let x2ForPhotonLeft = 2*dimensions.padding.left + dimensions.rect.width + dimensions.rect.width/2 + xCircle - plankX;
    let y2ForPhotonLeft = dimensions.padding.top + dimensions.rect.height/2 - dimensions.rect.width/2 - yCircle - plankY;
    let x1ForPhotonLeft = (leftLineX2 - movement/2) - plankX;
    let y1ForPhotonLeft = ((leftLineY2 / 2) + dimensions.padding.top / 2) - plankY;

    let x1ForPhotonRight = ((2*dimensions.rect.width)+2*dimensions.padding.left + movement/2) + plankX;
    let y1ForPhotonRight = ((leftLineY2 / 2) + dimensions.padding.top / 2) + plankY;

    let L1 = Math.sqrt ( (x2ForPhotonLeft - x1ForPhotonLeft) * (x2ForPhotonLeft - x1ForPhotonLeft) + (y2ForPhotonLeft - y1ForPhotonLeft) * (y2ForPhotonLeft - y1ForPhotonLeft) );
    let L2 = Math.sqrt ( (x2ForPhotonLeft - x1ForPhotonRight) * (x2ForPhotonLeft - x1ForPhotonRight) + (y2ForPhotonLeft - y1ForPhotonRight) * (y2ForPhotonLeft - y1ForPhotonRight) );

    let t1 = L1 * (leftPhotonTime/176.77);
    let t2 = L2 * (leftPhotonTime/176.77);

    // right circle animation

    function animRightCircle() {

        circlePastRight
                .attr('cx', (leftLineX2 - movement/2) + dimensions.rect.width/2)
                .attr('cy', ((leftLineY2 / 2) + dimensions.padding.top / 2))
                .transition()
                .duration(t2)
                .ease(d3.easeLinear)
                .attr('cx', 2*dimensions.padding.left + dimensions.rect.width + dimensions.rect.width/2 + xCircle - plankX)
                .attr('cy', dimensions.padding.top + dimensions.rect.height/2 - dimensions.rect.width/2 - yCircle - plankY)
                .on("end", animRightCircle);
    
    }
    
    animRightCircle();

    // right circle second

    // console.log(val)

    // if(val <= 0.35) {

    //     let t2SecondCircle = t2 * ratio;

    //     // ratio = 0.1875
    
    //     function animRightCircleSecond() {
    
    //                                 rightCircleSecond
    //                                                 .attr('cx', 2*dimensions.padding.left + dimensions.rect.width + dimensions.rect.width/2 + xCircle - plankX)
    //                                                 .attr('cy', dimensions.padding.top + dimensions.rect.height/2 - dimensions.rect.width/2 - yCircle - plankY)
    //                                                 .style("opacity", "40%")
    //                                                 .transition()
    //                                                 .duration(t2SecondCircle)
    //                                                 .ease(d3.easeLinear)
    //                                                 .attr('cx', 2*dimensions.padding.left + dimensions.rect.width + dimensions.rect.width/2 + movement * 0.1 - plankX)
    //                                                 .attr('cy', dimensions.padding.top + dimensions.rect.height/2 - dimensions.rect.width/2 - y2 - plankY)
    //                                                 .style("opacity", "40%")
    //                                                 .on("end", animRightCircleSecond);
                                        
    //     }
                                        
    //     animRightCircleSecond();                                

    // }

    // else {
    //     rightCircleSecond
    //             .style("opacity", 0);
    // }

    // for right photon animation on slider change

    function animRightLeftPhoton() {

                RightLeftPhoton
                    .attr('cx', 2*dimensions.padding.left + dimensions.rect.width + dimensions.rect.width/2 + xCircle - plankX)
                    .attr('cy', dimensions.padding.top + dimensions.rect.height/2 - dimensions.rect.width/2 - yCircle - plankY)
                    .attr('r', 3.5)
                    .transition()
                    .duration(t1)
                    .ease(d3.easeLinear)
                    .attr("cx", (leftLineX2 - movement/2) - plankX)
                    .attr("cy", ((leftLineY2 / 2) + dimensions.padding.top / 2) - plankY)
                    .transition()
                    .duration(t2-t1)
                    .ease(d3.easeLinear)
                    .attr('r', 0)
                    .on("end", animRightLeftPhoton);
    }

    function animRightRightPhoton() {

                RightRightPhoton
                    .attr('cx', 2*dimensions.padding.left + dimensions.rect.width + dimensions.rect.width/2 + xCircle - plankX)
                    .attr('cy', dimensions.padding.top + dimensions.rect.height/2 - dimensions.rect.width/2 - yCircle - plankY)
                    .transition()
                    .duration(t2)
                    .ease(d3.easeLinear)
                    .attr("cx", ((2*dimensions.rect.width)+2*dimensions.padding.left + movement/2) + plankX)
                    .attr("cy", ((leftLineY2 / 2) + dimensions.padding.top / 2) + plankY)
                    .on("end", animRightRightPhoton);
                    
    }
    
    animRightLeftPhoton();
    animRightRightPhoton();

// right label simultaneity change


if(val<0.025) {
    
    simulText
            .transition()
            .style("opacity", 0);

    rightLineLabel
            .transition()
            .style("opacity", 0);

    rightLineLabelTop
            .transition()
            .style("opacity", 0);

    rightLineLabelBottom
            .transition()
            .style("opacity", 0);
}

else {
    
    simulText
            .attr('x', ((2*dimensions.rect.width)+2*dimensions.padding.left + movement/2) + plankX + 40)
            .attr('y', ((leftLineY2 / 2) + dimensions.padding.top / 2))
            .style("opacity", "100%")
            .text("Break in simultaneity");

    rightLineLabel
            .attr('x1', ((2*dimensions.rect.width)+2*dimensions.padding.left + movement/2) + plankX + 25)
            .attr('y1', ((leftLineY2 / 2) + dimensions.padding.top / 2) - plankY)
            .attr('x2', ((2*dimensions.rect.width)+2*dimensions.padding.left + movement/2) + plankX + 25)
            .attr('y2', ((leftLineY2 / 2) + dimensions.padding.top / 2) + plankY)
            .style("opacity", "100%");

    rightLineLabelTop
            .attr('x1', ((2*dimensions.rect.width)+2*dimensions.padding.left + movement/2) + plankX + 18)
            .attr('y1', ((leftLineY2 / 2) + dimensions.padding.top / 2) - plankY)
            .attr('x2', ((2*dimensions.rect.width)+2*dimensions.padding.left + movement/2) + plankX + 25)
            .attr('y2', ((leftLineY2 / 2) + dimensions.padding.top / 2) - plankY)
            .style("opacity", "100%");

    rightLineLabelBottom
            .attr('x1', ((2*dimensions.rect.width)+2*dimensions.padding.left + movement/2) + plankX + 18)
            .attr('y1', ((leftLineY2 / 2) + dimensions.padding.top / 2) + plankY)
            .attr('x2', ((2*dimensions.rect.width)+2*dimensions.padding.left + movement/2) + plankX + 25)
            .attr('y2', ((leftLineY2 / 2) + dimensions.padding.top / 2) + plankY)
            .style("opacity", "100%");
}

})

}

photonPlank();