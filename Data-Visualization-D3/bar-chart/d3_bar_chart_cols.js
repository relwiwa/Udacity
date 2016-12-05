var margin = {
  top: 20,
  right: 30,
  bottom: 30,
  left: 40
};
var width = 960 - margin.left - margin.right;
var height = 500 - margin.top - margin.bottom;

var x = d3.scale.ordinal()
  .rangeRoundBands([0, width], .1);

var xAxis = d3.svg.axis()
  .scale(x)
  .orient("bottom");

var y = d3.scale.linear()
  .range([height, 0]);

var yAxis = d3.svg.axis()
  .scale(y)
  .orient("left")
  .ticks(10, "%");

/*  "To apply the margins to the SVG container, we set the width
    and height of the SVG element to the outer dimensions, and add
    a g element to offset the origin of the chart area by the
    top-left margin." */
var chart = d3.select(".chart")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

d3.tsv("letters.tsv", toInteger, function(error, data) {
  x.domain(data.map(function(d) {
    return d.letter;
  }));
  y.domain([0, d3.max(data, function(d) {
    return d.frequency;
  })]);
  
  chart.append("g")
    .attr("class", "x axis")
    .attr("transform", "translate(0," + height + ")")
    .call(xAxis);
  
  chart.append("g")
    .attr("class", "y axis")
    .call(yAxis)
    .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", ".71em")
      .style("text-anchor", "end")
      .text("Frequency");

  chart.selectAll(".bar")
    .data(data)
  .enter().append("rect")
    .attr("class", "bar")
    .attr("x", function(d) {
      return x(d.letter);
    })
    .attr("y", function(d) {
      return y(d.frequency);
    })
    .attr("height", function(d) {
      return height - y(d.frequency);
    })
    .attr("width", x.rangeBand());
  
});

function toInteger(d) {
  d.frequency = +d.frequency;
  return d;
}