var data = [4, 8, 15, 16, 23, 42];

var x = d3.scale.linear()
  .domain([0, d3.max(data)])
  .range([0, 420]);

// UNCHAINED VERSION

var chart = d3.select('.chart');

// 'data join pattern' is used to generally create, update or destroy elements
var bar = chart.selectAll('div')

// link data to div elements that get created
// also specifies enter and exit functions
var barUpdate = bar.data(data);

// deal with enter selection which represents new data for which there was no existing element
// missing elements get instantiated by appending to the enter selection
var barEnter = barUpdate.enter().append('div');

// d in function refers to data that was linked via data-function
barEnter.style('width', function(d) {
  return x(d) + "px";
});

barEnter.text(function(d) {
  return d;
});

// CHAINED VERSION

/*

d3.select(".chart")
  .selectAll("div")
    .data(data)
  .enter().append("div")
    .style("width", function(d) {
      return x(d) + "px";
    })
    .text(function(d) {
      return d;
    });

*/