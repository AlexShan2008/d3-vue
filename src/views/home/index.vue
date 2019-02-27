<template>
  <div>
    <h1>{{title}}</h1>
    <Axis msg="Axis"/>
    <Transition msg="Transition"/>
    <Shapes msg="Shapes"/>
    <Layouts msg="Layouts"/>
    <Pie msg="Pie"/>
  </div>
</template>

<script>
import Axis from "../../components/Axis.vue";
import Transition from "../../components/Transition.vue";
import Shapes from "../../components/Shapes.vue";
import Layouts from "../../components/Layouts.vue";
import Pie from "../../components/Pie.vue";

export default {
  name: "home",
  data() {
    return {
      title: "D3.js & Vue.js"
    };
  },
  components: {
    Axis,
    Transition,
    Shapes,
    Layouts,
    Pie
  }
};
</script>

