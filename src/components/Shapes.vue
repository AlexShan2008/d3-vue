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
    <div>
      <svg class="js-shapes-arc2"></svg>
    </div>
    <div>
      <svg class="js-shapes-lines"></svg>
      <button @click="render('linear')">Linear</button>
      <button @click="render('linearClosed')">Linear Closed</button>
      <button @click="render('basis')">Basis</button>
      <button @click="render('basisClosed')">Basis Closed</button>
      <button @click="render('cardinal')">Cardinal</button>
      <button @click="render('cardinalClosed')">Cardinal Closed</button>
      <br>
      <br>
      <button @click="render('step')">Step</button>
      <button @click="render('stepBefore')">Step Before</button>
      <button @click="render('stepAfter')">Step After</button>
      <button @click="render('bundle')">Bundle</button>
    </div>
    <div>
      <svg class="js-shapes-areas"></svg>
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
    render(curveType) {
      const width = 500;
      const height = 300;
      const margin = 25;
      var xaxisLength = width - 2 * margin;
      var yaxisLength = height - 2 * margin;

      const svgContainerLines = d3
        .select(".js-shapes-lines")
        .attr("width", width)
        .attr("height", height);

      var curveTypeMap = {
        linear: d3.curveLinear,
        linearClosed: d3.curveLinearClosed,
        basis: d3.curveBasis,
        basisClosed: d3.curveBasisClosed,
        cardinal: d3.curveCardinal,
        cardinalClosed: d3.curveCardinalClosed,
        step: d3.curveStep,
        stepBefore: d3.curveStepBefore,
        stepAfter: d3.curveStepAfter,
        bundle: d3.curveBundle
      };

      d3.selectAll("path.line1,path.line2").remove();

      var data1 = [
        { x: 0, y: 4 },
        { x: 1, y: 9 },
        { x: 2, y: 6 },
        { x: 4, y: 5 },
        { x: 6, y: 7 },
        { x: 7, y: 3 },
        { x: 9, y: 2 }
      ];

      var data2 = [
        { x: 0, y: 3 },
        { x: 2, y: 7 },
        { x: 3, y: 4 },
        { x: 4, y: 3 },
        { x: 6, y: 3 },
        { x: 8, y: 4 },
        { x: 9, y: 1 }
      ];

      var lxScale = d3
        .scaleLinear()
        .domain([0, 10])
        .range([0, xaxisLength]);

      var lyScale = d3
        .scaleLinear()
        .domain([10, 0])
        .range([0, yaxisLength]);

      var lxAxis = d3.axisBottom(lxScale);
      var lyAxis = d3.axisLeft(lyScale);

      svgContainerLines
        .append("g")
        .classed("x-axis", true)
        .attr("transform", function() {
          return "translate(" + margin + "," + (height - margin) + ")";
        })
        .call(lxAxis);

      svgContainerLines
        .append("g")
        .classed("y-axis", true)
        .attr("transform", function() {
          return "translate(" + margin + "," + margin + ")";
        })

        .call(lyAxis);

      var line = d3
        .line()
        .x(function(d) {
          return lxScale(d.x);
        })
        .y(function(d) {
          return lyScale(d.y);
        });

      line = d3
        .line()
        .x(function(d) {
          return lxScale(d.x);
        })
        .y(function(d) {
          return lyScale(d.y);
        })
        .curve(curveTypeMap[curveType]); // Specifies the curve type (interpolation)

      svgContainerLines
        .append("path")
        .classed("line1", true)
        .attr("d", line(data1))
        .attr("fill", "none")
        .attr("stroke", "red")
        .attr("transform", function() {
          return "translate(" + margin + "," + margin + ")";
        });

      svgContainerLines
        .append("path")
        .classed("line2", true)
        .attr("d", line(data2))
        .attr("fill", "none")
        .attr("stroke", "blue")
        .attr("transform", function() {
          return "translate(" + margin + "," + margin + ")";
        });
    },
    init() {
      const width = 500;
      const height = 300;
      const padding = {
        top: 10,
        bottom: 20,
        left: 10,
        right: 10
      };
      var ease = d3.easeCubic;

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

      const svgContainerLines = d3
        .select(".js-shapes-lines")
        .attr("width", width)
        .attr("height", height);

      const svgContainerAreas = d3
        .select(".js-shapes-areas")
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
        .y(d => yScale(ease(d.y)))
        .curve(d3.curveBasis); // Specifies the curve type (interpolation)

      var dot1 = svgContainerLine
        .append("circle")
        .attr("r", 5)
        .attr("fill", "green");
      var dot2 = svgContainerLine
        .append("circle")
        .attr("cx", width - 20)
        .attr("r", 5)
        .attr("fill", "green");

      d3.timer(function(elapsed) {
        var t = (elapsed % 3000) / 3000;
        dot1.attr("cx", xScale(t)).attr("cy", yScale(t));
        dot2.attr("cy", yScale(t));
      });

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
        .attr("fill", "green")
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

      const svgContainerArc2 = d3
        .select(".js-shapes-arc2")
        .attr("width", 1000)
        .attr("height", 500);

      var fullAngle = 2 * Math.PI;

      var arc1 = d3
        .arc()
        .innerRadius(0)
        .outerRadius(100)
        .startAngle(0)
        .endAngle(fullAngle / 4);

      var arc2 = d3
        .arc()
        .innerRadius(50)
        .outerRadius(100)
        .startAngle(0)
        .endAngle(fullAngle);

      var group1 = svgContainerArc2.append("g");
      var group2 = svgContainerArc2.append("g");

      group1
        .append("path")
        .attr("d", arc1())
        .attr("fill", "red");

      group2
        .append("path")
        .attr("d", arc2())
        .attr("fill", "blue");

      group1.attr("transform", "translate(" + 200 + "," + 200 + ")");
      group2.attr("transform", "translate(" + 200 + "," + 350 + ")");

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

      var margin = 25;
      var xaxisLength = width - 2 * margin;
      var yaxisLength = height - 2 * margin;

      var data1 = [
        { x: 0, y: 4 },
        { x: 1, y: 9 },
        { x: 2, y: 6 },
        { x: 4, y: 5 },
        { x: 6, y: 7 },
        { x: 7, y: 3 },
        { x: 9, y: 2 }
      ];

      var data2 = [
        { x: 0, y: 3 },
        { x: 2, y: 7 },
        { x: 3, y: 4 },
        { x: 4, y: 3 },
        { x: 6, y: 3 },
        { x: 8, y: 4 },
        { x: 9, y: 1 }
      ];

      var lxScale = d3
        .scaleLinear()
        .domain([0, 10])
        .range([0, xaxisLength]);

      var lyScale = d3
        .scaleLinear()
        .domain([10, 0])
        .range([0, yaxisLength]);

      var lxAxis = d3.axisBottom(lxScale);
      var lyAxis = d3.axisLeft(lyScale);

      svgContainerLines
        .append("g")
        .classed("x-axis", true)
        .attr("transform", function() {
          return "translate(" + margin + "," + (height - margin) + ")";
        })
        .call(lxAxis);

      svgContainerLines
        .append("g")
        .classed("y-axis", true)
        .attr("transform", function() {
          return "translate(" + margin + "," + margin + ")";
        })
        .call(lyAxis);

      var line = d3
        .line()
        .x(function(d) {
          return lxScale(d.x);
        })
        .y(function(d) {
          return lyScale(d.y);
        });

      svgContainerLines
        .append("path")
        .attr("d", line(data1))
        .attr("fill", "none")
        .attr("stroke", "red")
        .attr("transform", function() {
          return "translate(" + margin + "," + margin + ")";
        });

      svgContainerLines
        .append("path")
        .attr("d", line(data2))
        .attr("fill", "none")
        .attr("stroke", "blue")
        .attr("transform", function() {
          return "translate(" + margin + "," + margin + ")";
        });

      this.render("linear"); // Initial rendering

      var areas = d3
        .area()
        .x(function(d) {
          return lxScale(d.x);
        })
        .y0(lyScale(0)) // 闭合曲线
        .y1(function(d) {
          // 闭合曲线
          return lyScale(d.y);
        })
        // .y(function(d) {
        //   return lyScale(d.y);
        // })
        .curve(d3.curveLinear);

      svgContainerAreas
        .append("g")
        .classed("x-axis", true)
        .attr("transform", function() {
          return "translate(" + margin + "," + (height - margin) + ")";
        })
        .call(lxAxis);

      svgContainerAreas
        .append("g")
        .classed("y-axis", true)
        .attr("transform", function() {
          return "translate(" + margin + "," + margin + ")";
        })
        .call(lyAxis);

      // append的顺序决定了图层覆盖的先后顺序

      svgContainerAreas
        .append("path")
        .classed("area1", true)
        .attr("d", areas(data1))
        .attr("fill", "#ffad99")
        .attr("stroke", "red")
        .attr("transform", function() {
          return "translate(" + margin + "," + margin + ")";
        });

      svgContainerAreas
        .append("path")
        .classed("area2", true)
        .attr("d", areas(data2))
        .attr("fill", "#b3d9ff")
        .attr("stroke", "blue")
        .attr("transform", function() {
          return "translate(" + margin + "," + margin + ")";
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
