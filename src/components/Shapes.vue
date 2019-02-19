<template>
  <div class="hello">
    <h2>{{ msg }}</h2>
    <svg class="js-shapes-line"></svg>
    <svg class="js-shapes-area"></svg>
    <div>
      <svg class="js-shapes-circle"></svg>
    </div>
    <div>
      <svg class="js-shapes-rect"></svg>
    </div>
    <div>
      <svg class="js-shapes-arc"></svg>
    </div>
  </div>
</template>

<script>
const d3 = require("d3");

export default {
  name: "Shapes",
  props: {
    msg: String
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      const width = 500;
      const height = 300;
      const padding = {
        top: 10,
        bottom: 20,
        left: 10,
        right: 10
      };

      const svgContainerLine = d3
        .select(".js-shapes-line")
        .attr("width", width)
        .attr("height", height);

      const svgContainerArea = d3
        .select(".js-shapes-area")
        .attr("width", width)
        .attr("height", height);

      const svgContainerCircle = d3
        .select(".js-shapes-circle")
        .attr("width", width)
        .attr("height", height);

      const svgContainerRect = d3
        .select(".js-shapes-rect")
        .attr("width", width)
        .attr("height", height);

      // Sample data points to draw a line
      // Each data point has an x and y coordinate value
      var data = [
        { x: 0, y: 4 },
        { x: 1, y: 9 },
        { x: 2, y: 6 },
        { x: 4, y: 5 },
        { x: 6, y: 7 },
        { x: 7, y: 3 },
        { x: 9, y: 2 }
      ];
      //x轴的比例尺
      var xScale = d3
        .scaleLinear()
        .domain([0, d3.max(data, d => d.x)])
        .range([0, width - padding.left - padding.right]);
      //y轴的比例尺
      var yScale = d3
        .scaleLinear()
        .domain([0, d3.max(data, d => d.y)])
        .range([height - padding.top - padding.bottom, 0]);

      /**
       * curveLinear 折线
       * curveBasis 弧线（平滑）
       * curveCardinal 弧线（陡峭）
       * curveStep 梯形图
       */
      var line = d3
        .line()
        .x(d => xScale(d.x))
        .y(d => yScale(d.y))
        .curve(d3.curveBasis); // Specifies the curve type (interpolation)

      var area = d3
        .area()
        .x(function(d) {
          return xScale(d.x);
        })
        .y0(yScale(0))
        .y1(function(d) {
          return yScale(d.y);
        })
        .curve(d3.curveBasis);

      // Create a path element and set its d attribute value using the line generator created above
      svgContainerLine
        .append("path")
        .attr("d", line(data))
        .attr("fill", "none")
        .attr("stroke", "red");

      svgContainerArea
        .append("path")
        .attr("d", area(data))
        .attr("fill", "none")
        .attr("stroke", "red");

      // arc
      // innerRadius(r) : If r > 0, it will create an annulus (donut) arc with the inner radius of the arc as r.
      // outerRadius(r) : This sets the outer radius of the arc.
      // startAngle(angle) : Sets the start angle of the arc. The angle is in radians with 0 at –y (12 o’clock) and positive angles proceeding clockwise.
      // endAngle(angle) :  Sets the start angle of the arc. The angle is in radians with 0 at –y (12 o’clock) and positive angles proceeding clockwise.

      const svgContainerArc = d3
        .select(".js-shapes-arc")
        .attr("width", width)
        .attr("height", height);
      var arcData = [1, 2, 1, 5, 6, 8, 10];
      var color = function(i) {
        const colors = ["red", "green", "yellow", "blue", "purple"];
        return colors[i];
      };

      //画圆形
      var circle = svgContainerCircle
        .append("circle")
        .attr("cx", 30)
        .attr("cy", 30)
        .attr("r", 20)
        .attr("fill", "green")
        .attr("stroke", "purple")
        .attr("stroke-width", "5");

      //画长方形
      var rectangle = svgContainerRect
        .append("rect")
        .attr("x", 10)
        .attr("y", 10)
        .attr("width", 50)
        .attr("height", 100);

      // 圆弧
      // var arc = d3
      //   .arc()
      //   .innerRadius(0)
      //   .outerRadius(100)
      //   .startAngle(0)
      //   .endAngle(Math.PI / 2);

      var arc = d3
        .arc()
        .outerRadius(100)
        .innerRadius(0);
      var arcs = d3.pie()(arcData);

      arcs.forEach(function(d, i) {
        svgContainerArc
          .append("path")
          .attr("fill", color(i))
          .transition()
          .duration(2000)
          .attrTween("d", function() {
            var start = { startAngle: 0, endAngle: 0 };
            var interpolate = d3.interpolate(start, d);
            return function(t) {
              return arc(interpolate(t));
            };
          });
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
</style>
