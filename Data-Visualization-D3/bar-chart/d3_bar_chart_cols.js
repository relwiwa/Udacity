var width = 960;
var height = 500;

var x = d3.scale.ordinal()
  .rangeRoundBands([0, width], .1);

var y = d3.scale.linear()
  .range([height, 0]);

var chart = d3.select(".chart")
  .attr("width", width)
  .attr("height", height);

d3.tsv("letters.tsv", toInteger, function(error, data) {
  x.domain(data.map(function(d) {
    return d.letter;
  }));
  y.domain([0, d3.max(data, function(d) {
    return d.frequency;
  })]);
  
  var barWidth = width/data.length;
  
  var bar = chart.selectAll("g")
    .data(data)
  .enter().append("g")
    .attr("transform", function(d) {
      return "translate(" + x(d.letter) + ",0)";
    });
  
  bar.append("rect")
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