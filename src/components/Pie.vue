<template>
  <div class="hello">
    <h2>{{ msg }}</h2>
    <div class="js-svg-pie container"></div>
  </div>
</template>

<script>
const d3 = require("d3");

export default {
  name: "Pie",
  props: {
    msg: String
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      var width = 500;
      var height = 500;
      var color = d3.scaleOrdinal(d3.schemeCategory10);

      var svgContainer = d3
        .select(".js-svg-pie")
        .append("svg")
        .attr("width", width)
        .attr("height", height)
        .style("border", "1px solid");

      var data = [1, 2, 1, 5, 6, 8, 10];

      var arc = d3
        .arc()
        .outerRadius(100)
        .innerRadius(50);

      var group = svgContainer
        .append("g")
        .attr("transform", "translate(" + 200 + "," + 250 + ")");

      // 默认是按所占比例的大小，从小到大按逆时针方向排序；
      var arcs = d3.pie()(data);
      // .sort(function(a, b) {
      //   return b - a;
      // });
      console.log(arcs);

      // [
      //   {"data":  1, "value":  1, "index": 6, "startAngle": 6.050474740247008, "endAngle": 6.166830023713296, "padAngle": 0},
      //   {"data":  1, "value":  1, "index": 7, "startAngle": 6.166830023713296, "endAngle": 6.283185307179584, "padAngle": 0},
      //   {"data":  2, "value":  2, "index": 5, "startAngle": 5.817764173314431, "endAngle": 6.050474740247008, "padAngle": 0},
      //   {"data":  3, "value":  3, "index": 4, "startAngle": 5.468698322915565, "endAngle": 5.817764173314431, "padAngle": 0},
      //   {"data":  5, "value":  5, "index": 3, "startAngle": 4.886921905584122, "endAngle": 5.468698322915565, "padAngle": 0},
      //   {"data":  8, "value":  8, "index": 2, "startAngle": 3.956079637853813, "endAngle": 4.886921905584122, "padAngle": 0},
      //   {"data": 13, "value": 13, "index": 1, "startAngle": 2.443460952792061, "endAngle": 3.956079637853813, "padAngle": 0},
      //   {"data": 21, "value": 21, "index": 0, "startAngle": 0.000000000000000, "endAngle": 2.443460952792061, "padAngle": 0}
      // ]

      arcs.map(function(d, i) {
        group
          .append("path")
          .attr("d", arc(d))
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

      //
    }
  }
};
</script>
<style scoped>
.container {
  margin: 20px auto;
}
</style>