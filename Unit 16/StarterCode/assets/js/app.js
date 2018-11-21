// Set SVG Width & Height; 2-D3-Line-and-Bar-Charts/ 04-Evr_Scales
var svgWidth = 1000;
var svgHeight = 700;

// Set margins
var margin = {
  top: 20,
  right: 40,
  bottom: 60,
  left: 100,
};

// set chart area
var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;

// Create an SVG wrapper, append an SVG group that will hold our scatter plot, and shift the latter by left and top margins. Line #29 starter HTML Code.
var svg = d3.select("#scatter")
.append("svg")
.attr("width", svgWidth)
.attr("height", svgHeight);

var chart = svg.append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);

// Import data  2-D3-Line-and-Bar-Charts/02-Ins_Loading_Data
d3.csv("assets/data/data.csv", function(err, healthData) {
  if (err) throw err;
 
// Step 1: Parse Data/Cast as numbers
 healthData.forEach(function(d) {
    d.poverty = +d.poverty;
    d.healthcare= +d.healthcare;  
  });

// Step 2: Create scale functions
var xLinearScale = d3.scaleLinear()
  .domain([d3.min(healthData, d => d.poverty)-0.5, 
  	d3.max(healthData, d => d.poverty)+0.5, 30])
  .range([0, width]);

var yLinearScale = d3.scaleLinear()
  .domain([d3.min(healthData, d => d.healthcare)-1, 
  	d3.max(healthData, d => d.healthcare)+1.1])
  .range([height, 0]);
  
// Step 3: Create axis functions
var bottomAxis = d3.axisBottom(xLinearScale);
var leftAxis = d3.axisLeft(yLinearScale);

// Step 4: Append Axes to the chart
chart.append("g")
  .attr("transform", `translate(0, ${height})`)
  .call(bottomAxis);

chart.append("g")
  .call(leftAxis);

// Step 5: Create Circles
var circlesGroup = chart.selectAll("circle").data(healthData).enter();
  
var cTip=circlesGroup
  .append("circle")  
  .classed("stateCircle", true)
  .attr("cx", d => xLinearScale(d.poverty))
  .attr("cy", d => yLinearScale(d.healthcare))
  .attr("r", "20")
  .attr("opacity", ".5");
  
//Create text labels with state abbreviation for each circle
circlesGroup.append("text")
  .classed("stateText", true)
  .attr("x", d => xLinearScale(d.poverty))
  .attr("y", d => yLinearScale(d.healthcare))
  .attr("stroke", "blue")
  .attr("font-size", "10px")
  .text(d => d.abbr)
    
// Step 6: Initialize tool tip 3-D3-Line-Scatter-More/08-Ins_D3_Tip

var toolTip = d3.tip()
    .attr("class", "d3-tip")
    .offset([-8, 0])
    .html(function(d) {
      return (`${d.state}<br>Poverty: ${d.poverty}%<br>Healthcare: ${d.healthcare}%`);
  });

// Step 7: Create tooltip in the chart
cTip.call(toolTip);

// Step 8: Create event listeners to display and hide the tooltip
cTip.on("mouseover", function(d) {
  d3.select(this).style("stroke", "black")
  toolTip.show(d, this);
})
  //on mouseout event
  .on("mouseout", function(d, index) {
    d3.select(this).style("stroke", "red")
    .attr("r", "15")
    toolTip.show(d);
  });

// Create axes labels
chart.append("text")
.attr("transform", "rotate(-90)")
.attr("y", 0 - margin.left + 40)
.attr("x", 0 - (height / 2))
.attr("dy", "1em")
.attr("class", "axisText")
.text("% Lacking Healthcare");

chart.append("text")
.attr("transform", `translate(${width / 2}, ${height + margin.top + 30})`)
.attr("class", "axisText")
.text("% In Poverty");
});