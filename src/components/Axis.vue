<template>
  <div class="hello">
    <h2>{{ msg }}</h2>
    <div class="js-svg"></div>
  </div>
</template>

<script>
const d3 = require("d3");

export default {
  name: "Axis",
  props: {
    msg: String
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      // First declare some variables for dimension and margin for the container
      var width = 500;
      var height = 500;
      var margin = 25;
      var axisLength = height - 2 * margin; // Leave margin on both sides left-right or top-bottom

      // The main container to house our axes groups
      var svgContainer = d3
        .select(".js-svg")
        .append("svg")
        .attr("width", width)
        .attr("height", height)
        .style("border", "1px solid");

      // Renders the X-axis and the vertical grid lines
      function renderXAxis() {
        var xScale = d3
          .scaleLinear()
          .domain([0, 100])
          .range([0, axisLength]);

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

        // For each of the tick component create a line element inside the group
        // This creates the vertical lines of the grid
        svgContainer
          .selectAll("g.x-axis g.tick")
          .append("line")
          .classed("grid-line", true)
          // x1,y1 sets the starting point of the line
          // x2,y2 sets the destination point of the line
          // Since the line is inside the g element and the g element is already
          // translated we just need to set the y2 value
          .attr("x1", 0)
          .attr("y1", 0)
          .attr("x2", 0)
          .attr("y2", -(height - 2 * margin));
      }

      // This creates the horizontal lines of the grid
      function renderYAxis() {
        var yScale = d3
          .scaleLinear()
          .domain([100, 0])
          .range([0, axisLength]);

        var yAxis = d3.axisLeft(yScale);

        svgContainer
          .append("g")
          .classed("y-axis", true)
          .attr("transform", function() {
            return "translate(" + margin + "," + margin + ")";
          })
          .call(yAxis);

        svgContainer
          .selectAll("g.y-axis g.tick")
          .append("line")
          .classed("grid-line", true)
          .attr("x1", 0)
          .attr("y1", 0)
          .attr("x2", axisLength)
          .attr("y2", 0);
      }

      renderXAxis();
      renderYAxis();
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
</style>
<style>
/* 坐标轴背景线颜色 */
.x-axis line {
  stroke: #f1f1f1;
}
/* .y-axis line {
  stroke: #f1f1f1;
} */

.x-axis path {
  fill: none;
  shape-rendering: crispEdges;
}

.x-axis text {
  font-family: sans-serif;
  font-size: 11px;
}
</style>