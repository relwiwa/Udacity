var data = [4, 8, 15, 16, 23, 42];

var width = 420,
    barHeight = 20;

// function that links values to pixels
var x = d3.scale.linear()
    .domain([0, d3.max(data)])
    .range([0, width]);

// setup size of chart
var chart = d3.select(".chart")
    .attr("width", width)
    .attr("height", barHeight * data.length);

// link data to g elements
// g elements are containers for other svg elements
// as no g element exists yet, they are accessible via enter function
// position g via transform attribute
// QUESTION: not exactly clear, why it's necessary to do append("g")
/* Each bar consists of a g element which in turn contains a rect and
   a text. We use a data join (an enter selection) to create a g element
   for each data point. We then translate the g element vertically,
   creating a local origin for positioning the bar and its associated
   label. */
var bar = chart.selectAll("g")
    .data(data)
  .enter().append("g")
    .attr("transform", function(d, i) {
      return "translate(0," + i * barHeight + ")";
    });

/*  Since there is exactly one rect and one text element per g element,
    we can append these elements directly to the g, without needing
    additional data joins. Data joins are only needed when creating a
    variable number of children based on data; here we are appending
    just one child per parent. The appended rects and texts inherit
    data from their parent g element, and thus we can use data to
    compute the bar width and label position. */

// add rectangular to each bar's g element
bar.append("rect")
    .attr("width", x)
    .attr("height", barHeight - 1);

// add text to each bar's g element
bar.append("text")
    .attr("x", function(d) {
      return x(d) - 3;
    })
    .attr("y", barHeight / 2)
    .attr("dy", ".35em")
    .text(function(d) {
      return d;
    });