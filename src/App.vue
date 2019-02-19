<template>
  <div id="app">
    <h1>{{title}}</h1>
    <Axis msg="Axis"/>
    <Transition msg="Transition"/>
    <Shapes msg="Shapes"/>
    <Layouts msg="Layouts"/>
  </div>
</template>

<script>
import Axis from "./components/Axis.vue";
import Transition from "./components/Transition.vue";
import Shapes from "./components/Shapes.vue";
import Layouts from "./components/Layouts.vue";

export default {
  name: "app",
  data() {
    return {
      title: "D3.js & Vue.js"
    };
  },
  components: {
    Axis,
    Transition,
    Shapes,
    Layouts
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
