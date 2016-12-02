$(document).ready(function() {

  // empty main content area
  d3.select('.main').html('');
  
  // setup svg
  var svg = d3.select('.main').append('svg');
  svg.attr('width', 600).attr('height', 300);

  // setup y function mapping values to pixels at y axis
  // highest value needs to be mapped to minimum pixel,
  // lowest value needs to be mapped to maximum pixel
  // y(15) = 250
  var y = d3.scale.linear().domain([15, 90]).range([250, 0]);
  
  // setup x function
  var x = d3.scale.log().domain([250, 100000]).range([0, 600]);

  // Area of Circle representing Population of China P = PI * r²
  // r = sqrt(P/PI)
  // r = constant * sqrt(P)
  var r = d3.scale.sqrt().domain([52070, 1380000000]).range([10, 40]);

  svg.style('border', '1px solid lightgray');
  svg.style('background-color', 'eee')

  svg.append('circle')
  .attr('fill', 'red')
  .attr('r', r(1380000000))
  .attr('cx', x(13330))
  .attr('cy', y(77));

});

