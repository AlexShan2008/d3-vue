<template>
  <div class="hello">
    <h2>{{ msg }}</h2>
    <div class="svg-container"></div>
    <!-- <div name="originData" id="originData" cols="30" rows="10" v-html="newData"></div> -->
  </div>
</template>

<script>
const d3 = require("d3");
import { hierarchy, tree } from "d3-hierarchy";

export default {
  name: "Tree",
  mounted() {
    this.init();
  },
  data() {
    return {
      msg: "Stack",
      csvData: []
    };
  },
  methods: {
    init() {
      const width = 1000;
      const height = 600;
      const margin = {
        top: 10,
        right: 10,
        bottom: 20,
        left: 40
      };

      d3.csv("/data/tree.csv", d => d).then(data => {
        this.csvData = data;
        const stratify = d3
          .stratify()
          .id(d => d.name)
          .parentId(d => d.parent);

        const root = stratify(data);
        console.log(root);

        const treeG = d3
          .select(".svg-container")
          .append("svg")
          .style("width", width)
          .style("height", height)
          .style("border", "1px solid #999")
          .attr("class", "stack");

        // create a hierarchy from the root
        const treeRoot = hierarchy(root);
        tree(treeRoot);
        // nodes
        const nodes = treeRoot.descendants();
        // links
        const links = treeRoot.links();

        treeG
          .selectAll(".links")
          .data(
            tree(root)
              .descendants()
              .slice(1)
          )
          .enter()
          .append("path")
          .classed("link", true)
          .attr("d", function(d) {
            return (
              "M" +
              d.y +
              "," +
              d.x +
              "C" +
              (d.y + d.parent.y) / 2 +
              "," +
              d.x +
              " " +
              (d.y + d.parent.y) / 2 +
              "," +
              d.parent.x +
              " " +
              d.parent.y +
              "," +
              d.parent.x
            );
          });

        var nodesG = treeG
          .selectAll(".nodes")
          .data(root.descendants())
          .enter()
          .append("g") // This g will contain node + labels
          .attr("transform", function(d) {
            return "translate(" + d.y + "," + d.x + ")";
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