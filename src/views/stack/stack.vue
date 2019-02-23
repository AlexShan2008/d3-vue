<template>
  <div class="hello">
    <h2>{{ msg }}</h2>
    <div class="js-svg"></div>
  </div>
</template>

<script>
const d3 = require("d3");

export default {
  name: "newStack",
  mounted() {
    this.init();
  },
  data() {
    return {
      msg: "newStack"
    };
  },
  methods: {
    init() {
      var width = 800;
      var height = 500;
      var margin = 25;
      var xAxisLength = width - 2 * margin;
      var yAxisLength = height - 2 * margin;

      var data = [
        { month: "2013", apples: 100, bananas: 200, oranges: 130 },
        { month: "2014", apples: 300, bananas: 150, oranges: 120 },
        { month: "2015", apples: 200, bananas: 280, oranges: 200 },
        { month: "2016", apples: 400, bananas: 100, oranges: 300 },
        { month: "2017", apples: 230, bananas: 400, oranges: 100 }
      ];

      var stack = d3.stack().keys(["apples", "bananas", "oranges"]);

      var series = stack(data);
      console.log(series, "/////////");

      var xScale = d3
        .scaleBand()
        .domain(
          data.map(function(d) {
            return d.month;
          })
        )
        .rangeRound([0, xAxisLength]);

      var yScale = d3
        .scaleLinear()
        .domain([stackMax(), stackMin()])
        .range([0, yAxisLength])
        .clamp(true);

      var colorScale = d3.scaleOrdinal(d3.schemeCategory10); // 选取颜色

      function extractValues(series) {
        var values = [];
        series.forEach(function(value) {
          value.forEach(function(item) {
            values = values.concat(item);
          });
        });
        return values;
      }

      function stackMin() {
        var values = extractValues(series);
        return d3.min(values);
      }

      function stackMax() {
        var values = extractValues(series);
        return d3.max(values);
      }

      var svgContainer = d3
        .select(".js-svg")
        .append("svg")
        .attr("width", width)
        .attr("height", height)
        .style("border", "1px solid")
        .classed("svg", true);

      function renderXAxis() {
        var xAxis = d3.axisBottom(xScale);

        svgContainer
          .append("g")
          .classed("x-axis", true)
          .attr("transform", function() {
            return "translate(" + margin + "," + (height - margin) + ")";
          })
          .call(xAxis);
      }

      function renderYAxis() {
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
          .attr("x2", xAxisLength)
          .attr("y2", 0);
      }

      renderXAxis();
      renderYAxis();

      svgContainer
        .append("g")
        .classed("stack-bar", true)
        .attr("transform", "translate(" + margin + "," + margin + ")")
        .selectAll("g")
        .data(series)
        .enter()
        .append("g")
        .attr("fill", function(d) {
          return colorScale(d.key);
        })
        .selectAll("rect")
        .data(function(d) {
          return d;
        })
        .enter()
        .append("rect")
        .attr("x", function(d, i) {
          return i * 150 + 50;
        })
        .attr("y", function(d) {
          return yScale(d["1"]);
        })
        .attr("width", 50)
        .attr("height", function(d) {
          return yAxisLength - yScale(d["1"] - d["0"]);
        });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.svg {
  margin: 20px auto;
}
</style>