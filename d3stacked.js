// // main source: https://www.d3-graph-gallery.com/graph/barplot_stacked_basicWide.html

// // set the dimensions and margins of the graph
// function d3Stacked(starterMons) {
//   const margin = {
//       top: 10,
//       right: 30,
//       bottom: 20,
//       left: 50
//     },
//     width = 460 - margin.left - margin.right,
//     height = 400 - margin.top - margin.bottom;

//   // append the svg object to the body of the page
//   const svg = d3.select("#stackedBar")
//     .attr("width", width + margin.left + margin.right)
//     .attr("height", height + margin.top + margin.bottom);

//   const g = svg.append("g")
//     .attr("transform", `translate(${margin.left},${margin.top})`);

//   // Parse the Data
//   let dataStacked = starterMons;

//   function stacked(dataStacked) {

//     // List of subgroups = header of the csv files = soil condition here
//     console.log(dataStacked)
//     const subgroups = dataStacked.column.slice(1)

//     // List of groups = species here = value of the first column called group -> I show them on the X axis
//     const groups = dataStacked.map(d => (d.chain))

//     // Add X axis
//     const x = d3.scaleBand()
//       .domain(groups)
//       .range([0, width])
//       .padding([0.2])
//     svg.append("g")
//       .attr("transform", `translate(0, ${height})`)
//       .call(d3.axisBottom(x).tickSizeOuter(0));

//     // Add Y axis
//     const y = d3.scaleLinear()
//       .domain([0, 60])
//       .range([height, 0]);
//     svg.append("g")
//       .call(d3.axisLeft(y));

//     // color palette = one color per subgroup
//     const color = d3.scaleOrdinal()
//       .domain(subgroups)
//       .range(['#e41a1c', '#377eb8', '#4daf4a'])

//     //stack the data? --> stack per subgroup
//     const stackedData = d3.stack()
//       .keys(subgroups)
//       (dataStacked)

//     // Show the bars
//     svg.append("g")
//       .selectAll("g")
//       // Enter in the stack data = loop key per key = group per group
//       .data(stackedData)
//       .join("g")
//       .attr("fill", d => color(d.key))
//       .selectAll("rect")
//       // enter a second time = loop subgroup per subgroup to add all rectangles
//       .data(d => d)
//       .join("rect")
//       .attr("x", d => x(d.dataStacked.chain))
//       .attr("y", d => y(d[1]))
//       .attr("height", d => y(d[0]) - y(d[1]))
//       .attr("width", x.bandwidth())
//   }
// stacked(dataStacked);
// }
function d3Stacked(starterMons) {
  var margin = {
    top: 20,
    right: 160,
    bottom: 35,
    left: 30
  };

  var width = 960 - margin.left - margin.right;
  var height = 500 - margin.top - margin.bottom;

  var svg = d3.select(".stackedBar")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");


  /* Data in strings like it would be if imported from a csv */

  var data = starterMons;

  // Transpose the data into layers
  var dataset = ["grass", "fire", "water"].map(typeName =>data.filter(p => p.type === typeName));
   
  // Set x, y and colors
  var x = d3.scaleBand()
    .domain(["grass", "fire", "water"])
    //.rangeRoundBands([10, width-10], 0.02);
    .rangeRound([10, width - 10])
    .padding(0.02);

  var y = d3.scaleLinear()
    .domain([300, d3.max(dataset, function (d) {
      return d3.max(d, function (d) {
        return d.totaal;
      });
    })])
    .range([height, 0]);

  var colors = ["#b33040", "#d25c4d", "#f2b447", "#d9d574"];


  // Define and draw axes
  var yAxis = d3.axisLeft()
    .scale(y);

  var xAxis = d3.axisBottom()
    .scale(x);

  svg.append("g")
    .attr("class", "y axis")
    .call(yAxis);

  svg.append("g")
    .attr("class", "x axis")
    .attr("transform", "translate(0," + height + ")")
    .call(xAxis);


  // Create groups for each series, rects for each segment 
  var groups = svg.selectAll("g.cost")
    .data(dataset)
    .enter().append("g")
    .attr("class", "cost")
    .style("fill", function (d, i) {
      return colors[i];
    });

  var rect = groups.selectAll("rect")
    .data(function (d) {
      return d;
    })
    .enter()
    .append("rect")
    .attr("x", function (d) {
      return x(d.type);
    })
    .attr("y", d => height - y(d.totaal))
    .attr("height", function (d) {
      return y(d.totaal);
    })
    .attr("width", x.bandwidth())
}