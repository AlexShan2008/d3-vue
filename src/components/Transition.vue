<template>
  <div class="transition">
    <h2>{{ msg }}</h2>
    <div
      class="js-transition"
      style="width:100px; height:100px; position:absolute; background-color:red"
    ></div>
  </div>
</template>

<script>
const d3 = require("d3");

export default {
  name: "Transition",
  props: {
    msg: String
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      const transitionObj = d3.select(".js-transition");

      // transitionObj
      //   .transition()
      //   .delay(1000)
      //   .duration(2000)
      //   .style("left", "400px")
      //   .style("background-color", "blue");

      // Transition 1
      transitionObj
        .transition()
        .delay(1000)
        .duration(2000)
        .style("background-color", "red")
        .style("border-radius", "50%")
        // Transition 2
        .transition()
        .delay(1000)
        .duration(2000)
        .ease(d3.easeBounceIn)
        .style("background-color", "blue")
        .style("border-radius", "0px")
        .on("start", function() {
          console.log("Started");
        })
        .on("end", function() {
          console.log("Finished");
        });

      // D3 provides the on() method to register listener for transitional events:
      // transition.on(eventType, [listener])

      // Here the eventType can be any of the following string:

      // start : triggered when the transition starts
      // end : triggered when the transition ends
      // interrupt : triggered when the transition is interrupted
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

.transition {
  height: 150px;
}
</style>
