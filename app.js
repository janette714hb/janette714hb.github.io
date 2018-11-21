// 03-Evr_D3_Table & 04-Ins_Event_Listeners
// Assign the data from "data.js" to a descriptive variable
var ufo = data;
var tbody = d3.select("tbody");

// Add an event listener to the searchButton, call handleSearchButtonClick when clicked
var submit = d3.select("#filter-btn");

submit.on("click", function() {

//Prevent page from refreshing
d3.event.preventDefault();	

//Select the input element and get the raw HTML node
var inputElement = d3.select("#datetime");

//Get the value property of the input element
var inputValue = inputElement.property("inputValue");

console.log(inputValue);
console.log(ufo);

function filteredData(data, key, result)
{
	var filteredData = ufo.filter(ufo => ufo.dateTime === inputValue);
	return filteredData;
}
	
console.log(filteredData);
});

//Loop Through `data` and console.log each UFO object
data.forEach(function(filteredData) {
//console.log(filteredData);
});

//Use d3 to append one table row `tr` for each UFO report object
data.forEach(function(filteredData) {
//console.log(filteredData);
var row = tbody.append("tr");
});

//Use `Object.entries` to console.log each UFO report value
data.forEach(function(filteredData) {
//console.log(filteredData);
var row = tbody.append("tr");

Object.entries(filteredData).forEach(function([key, value]) {
//console.log(key, value);
});
});

//Step 4: Use d3 to append 1 cell per UFO report value (datetime, city, state, country, shape, durationMinutes, comments
data.forEach(function(filteredData) {
//console.log(filteredData);
var row = tbody.append("tr");

Object.entries(filteredData).forEach(function([key, value]) {
//console.log(key, value);
//Append a cell to the row for each value in the UFO report object
var cell = tbody.append("td");
});
});

//Step 5: Use d3 to update each cell's text with UFO report values
data.forEach(function(filteredData) {
console.log(filteredData);
var row = tbody.append("tr");
Object.entries(filteredData).forEach(function([key, value]) {
console.log(key, value);

//Append a cell to the row for each value in the UFO report object
var cell = tbody.append("td");
cell.text(value);
});
});