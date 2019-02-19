<template>
  <div class="hello">
    <h2>{{ msg }}</h2>
    <svg class="js-layout"></svg>
  </div>
</template>

<script>
const d3 = require("d3");

export default {
  name: "Layouts",
  props: {
    msg: String
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      const keys = ["apples", "bananas", "oranges"];
      var data = [
        { month: 2013, apples: 100, bananas: 200, oranges: 130 },
        { month: 2014, apples: 300, bananas: 150, oranges: 120 },
        { month: 2015, apples: 200, bananas: 280, oranges: 200 },
        { month: 2016, apples: 400, bananas: 100, oranges: 300 },
        { month: 2017, apples: 230, bananas: 400, oranges: 100 }
      ];

      const margin = 50;
      const width = 1000;
      const height = 1000;

      const svgContainer = d3
        .select(".js-layout")
        .attr("width", width)
        .attr("height", height)
        .style("border", "1px solid");

      const axisLength = height; //TODO:

      // const colorScale = function(key) {
      //   const color = {
      //     apples: "red",
      //     bananas: "green",
      //     oranges: "yellow"
      //   };
      //   return color[key];
      // };

      //颜色比例尺
      var colorScale = d3.scaleOrdinal(d3.schemeCategory10);

      var stack = d3.stack().keys(keys);
      var series = stack(data);
      console.log(series);

      var yDomain = d3.max(data, d => d.month);

      // domain 定义域[min, max]
      // range 值域[0, width] [height, 0]

      //添加坐标轴
      //外边框
      var padding = { left: 50, right: 100, top: 30, bottom: 30 };

      //创建x轴比例尺
      var xRangeWidth = width - padding.left - padding.right;

      //创建x轴比例尺
      var xScale = d3
        .scaleOrdinal()
        .domain([2013, 2017])
        .range([0, xRangeWidth], 0.3);
      var xAxis = d3.axisBottom(xScale);
      svgContainer
        .append("g")
        // Give a class name to the x-axis group so that we can target it
        .classed("x-axis", true)
        .attr("transform", function() {
          // Translate the x-axis to the bottom of the container leaving
          // margin on the left and bottom
          return "translate(" + margin + "," + (height - margin) + ")";
        })
        .call(xAxis);

      //最大高度（值域的最大值）
      var yRangeWidth = height - 2 * margin;
      var yScale = d3
        .scaleLinear()
        .domain([height, 0])
        .range([0, yRangeWidth]);

      var yAxis = d3.axisLeft(yScale);
      svgContainer
        .append("g")
        .classed("y-axis", true)
        .attr("transform", function() {
          return "translate(" + margin + "," + margin + ")";
        })
        .call(yAxis);

      svgContainer
        .append("g") // Create a group so that it can be transformed to match the axes
        .classed("stack-bar", true)
        .attr("transform", "translate(" + margin + "," + -margin + ")") // transform the chart to match the axes
        .selectAll("g")
        .data(series)
        .enter()
        .append("g") // For each fruit category append a g element
        .attr("fill", function(d, i) {
          return colorScale(i);
          // return colorScale(d.key);
        }) // Fill each fruit type with a particular color using the color scale
        .selectAll("rect")
        .data(function(d) {
          return d;
        })
        .enter()
        .append("rect") // For each year append a rectangle element
        .attr("x", function(d, i) {
          return 100 + i * 100;
        }) // Place the rectangles with a space of 50px between them
        .attr("y", function(d) {
          return yScale(d["1"]);
        }) // Set the y attribute to the topline value in the series
        .attr("width", 80)
        // Set the height to the difference between the topline and the baseline value
        // and subtract it from the height of the container leaving room for the top and bottom margins
        .attr("height", function(d) {
          return axisLength - yScale(d["1"] - d["0"]);
        });

      //添加分组标签
      const names = ["apples", "bananas", "oranges"];

      var labHeight = 50;
      var labRadius = 10;

      var labelCircle = svgContainer
        .append("circle")
        .attr("cx", function(d) {
          return width - padding.right * 0.98;
        })
        .attr("cy", function(d, i) {
          return padding.top * 2 + labHeight * i;
        })
        .attr("fill", (d, i) => colorScale(i))
        // .attr("fill", (d, i) => colorScale(names[i]))
        .attr("r", labRadius);

      var labelText = svgContainer
        .append("text")
        .attr("x", function(d) {
          return width - padding.right * 0.8;
        })
        .attr("y", function(d, i) {
          return padding.top * 2 + labHeight * i;
        })
        .attr("dy", labRadius / 2)
        .text(function(d, i) {
          return names[i];
        });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h2 {
  color: #666;
  text-decoration: underline;
  margin: 40px 0 20px;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
.axis path,
.axis line {
  fill: none;
  stroke: black;
  shape-rendering: crispEdges;
}

.axis text {
  font-family: sans-serif;
  font-size: 11px;
}
</style>
