var width = 960;
var height = 500;

var y = d3.scale.linear()
  .range([height, 0]);

var chart = d3.select(".chart")
  .attr("width", width)
  .attr("height", height);

d3.tsv("letters.tsv", toInteger, function(error, data) {
  console.log(data);
  y.domain([0, d3.max(data, function(d) {
    return d.frequency;
  })]);
  
  var barWidth = width/data.length;
  
  var bar = chart.selectAll("g")
    .data(data)
  .enter().append("g")
    .attr("transform", function(d, i) {
      return "translate(" + i * barWidth + ",0)";
    });
  
  bar.append("rect")
    .attr("y", function(d) {
      return y(d.frequency);
    })
    .attr("height", function(d) {
      return height - y(d.frequency);
    })
    .attr("width", barWidth - 1);
  
});

function toInteger(d) {
  d.frequency = +d.frequency;
  return d;
}