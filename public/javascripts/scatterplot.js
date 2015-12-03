var dataset = [];
var numDataPoints = 50;
var w = 500;
var h = 300;
var padding = 30;

var svg = d3.select("#scatterplot")
            .append("svg")
            .attr('width', w)
            .attr('height', h);

var circles = svg.selectAll("circle");


var xScale, yScale, rScale;

document.getElementById("generate-data").addEventListener("click", function(e){
  e.preventDefault();
  e.stopImmediatePropagation();
  generateData();
});

document.addEventListener("gotData", function(){

  xScale = d3.scale.linear()
            .domain([0, d3.max(dataset, getXCoordinate)])
            .range([padding, w-padding]);

  yScale = d3.scale.linear()
            .domain([0, d3.max(dataset, getYCoordiante)])
            .range([h-padding, padding]);

  rScale = d3.scale.linear()
            .domain([0, d3.max(dataset, getYCoordiante)])
            .range([4,10]);

  circles
    .data(dataset)
    .enter()
    .append("circle")
    .attr('cx', w/2)
    .attr('cy', h/2)
    .attr('r', 20)
    .attr('fill', 'white')
    .attr('stroke', 'rgb(245,245,245)')
    .transition()
    .delay(function(d, i){
      return i * 100;
    })
    .duration(3000)
    .attr('r', function(d){ return rScale(d[1]); })
    .attr('cx', function(d){
      return xScale(d[0]);
    })
    .attr('cy', function(d){
      return yScale(d[1]);
    })
    .attr('fill', function(){
      return "hsl(" + (Math.random() * 360) + ",100%, 50%)";
    });
});


var getXCoordinate = function(d){
  return d[0];
};

var getYCoordiante = function(d){
  return d[1];
};

function generateData () {
  if (dataset.length > 0) {
    dataset.length = 0;
  }
  var xRange = Math.random() * 1000;
  var yRange = Math.random() * 1000;
  for (var i = 0; i < numDataPoints; i++) {
      var newNumber1 = Math.round(Math.random() * xRange);
      var newNumber2 = Math.round(Math.random() * yRange);
      dataset.push([newNumber1, newNumber2]);
  }

  var e = new CustomEvent("gotData");
  document.dispatchEvent(e);
}


// var colorScale = d3.scale.linear()
//                   .domain([0, d3.max(totalDataValue)])
//                   .rangeRound([0,255]);







// circles
//   .attr('cx', padding + 10)
//   .attr('cy', padding)
//   .attr('r', 5);

// circles
//   .transition()
//   .delay(function(d, i){
//     return i * 100;
//   })
//   .duration(3000)
//   .attr('cx', function(d){
//     return xScale(d[0]);
//   })
//   .attr('cy', function(d){
//     return yScale(d[1]);
//   })
//   .attr('fill', function(){
//     return "hsl(" + (Math.random() * 360) + ",100%, 50%)";
//   })
//   .each("end", function(){
//     d3.select(this)
//       .transition()
//       .delay(function(d, i){
//         return i * 100;
//       })
//       .duration(3000)
//       .attr('cx', padding + 10)
//       .attr('cy', padding)
//       .attr('fill', 'black');
//   });

// svg.append('g')
//   .attr("class", "axis")
//   .attr("transform", "translate(0," + (h-padding) + ")")
//   .call(xAxis);

// svg.append('g')
//   .attr("class", "axis")
//   .attr("transform", "translate(" + padding + ",0)")
//   .call(yAxis);

// setInterval(generateData, 3000);

// generateData();