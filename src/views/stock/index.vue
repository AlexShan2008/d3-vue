<template>
  <div class="hello">
    <h2>{{ msg }}</h2>
    <canvas width="960" height="500"></canvas>
  </div>
</template>

<script>
const d3 = require("d3");

export default {
  name: "Stock",
  mounted() {
    this.init();
  },
  data() {
    return {
      msg: "Stock"
    };
  },
  methods: {
    init() {
      var canvas = document.querySelector("canvas"),
        context = canvas.getContext("2d");

      var margin = { top: 20, right: 20, bottom: 30, left: 50 },
        width = canvas.width - margin.left - margin.right,
        height = canvas.height - margin.top - margin.bottom;

      // a abbreviated weekday name
      // b abbreviated month name.
      // c date and time, as "%a %b %e %H:%M:%S %Y".
      // d zero-padded day of the month as a decimal number [01,31].
      // y year without century as a decimal number [00,99].
      var parseTime = d3.timeParse("%d-%b-%y");

      var x = d3.scaleTime().range([0, width]);

      var y = d3.scaleLinear().range([height, 0]);

      var line = d3
        .line()
        .x(function(d) {
          return x(d.date);
        })
        .y(function(d) {
          return y(d.close);
        })
        .curve(d3.curveStep)
        .context(context);

      context.translate(margin.left, margin.top);

      // let arr = [5, 8, 12, 26, 18];
      // d3.extent(arr); //[5,26]

      d3.tsv("/data/stock.csv", function(d) {
        d.date = parseTime(d.date);

        d.close = +d.close;
        return d;
      }).then(function(data) {
        x.domain(
          d3.extent(data, function(d) {
            return d.date;
          })
        );
        y.domain(
          d3.extent(data, function(d) {
            return d.close;
          })
        );

        xAxis();
        yAxis();

        context.beginPath();
        line(data);
        context.lineWidth = 1.5;
        context.strokeStyle = "steelblue";
        context.stroke();
      });

      function xAxis() {
        var tickCount = 10,
          tickSize = 6,
          ticks = x.ticks(tickCount),
          tickFormat = x.tickFormat();

        context.beginPath();
        ticks.forEach(function(d) {
          context.moveTo(x(d), height);
          context.lineTo(x(d), height + tickSize);
        });
        context.strokeStyle = "black";
        context.stroke();

        context.textAlign = "center";
        context.textBaseline = "top";
        ticks.forEach(function(d) {
          context.fillText(tickFormat(d), x(d), height + tickSize);
        });
      }

      function yAxis() {
        var tickCount = 10,
          tickSize = 6,
          tickPadding = 3,
          ticks = y.ticks(tickCount),
          tickFormat = y.tickFormat(tickCount);

        context.beginPath();
        ticks.forEach(function(d) {
          context.moveTo(0, y(d));
          context.lineTo(-6, y(d));
        });
        context.strokeStyle = "black";
        context.stroke();

        context.beginPath();
        context.moveTo(-tickSize, 0);
        context.lineTo(0.5, 0);
        context.lineTo(0.5, height);
        context.lineTo(-tickSize, height);
        context.strokeStyle = "black";
        context.stroke();

        context.textAlign = "right";
        context.textBaseline = "middle";
        ticks.forEach(function(d) {
          context.fillText(tickFormat(d), -tickSize - tickPadding, y(d));
        });

        context.save();
        context.rotate(-Math.PI / 2);
        context.textAlign = "right";
        context.textBaseline = "top";
        context.font = "bold 10px sans-serif";
        context.fillText("Price (US$)", -10, 10);
        context.restore();
      }
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
</style>