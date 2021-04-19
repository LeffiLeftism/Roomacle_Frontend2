<template>
  <div id="AddTimingsPopup">
    <h1>Create new Timing</h1>
    <span v-for="(item, index) in this.$store.state.timings" :key="index">
      <span class="small" style="width: 50px">{{ index + 1 }}. Std:</span>
      <input :id="index + 'tStart'" class="spaceLeftRight" type="time" />
      -
      <input :id="index + 'tEnd'" class="spaceLeftRight" type="time" />
      <br />
    </span>
    <span>
      <br />
      <br />
      <button class="btnAddDelete" @click="makeAction('+')">+</button>
      <button class="btnAddDelete" @click="makeAction('-')">-</button>
      <button class="btnAddDelete" @click="makeAction('Save')">Save</button>
      <button class="btnAddDelete" @click="makeAction('Reset')">Reset</button>
      <button class="btnAddDelete" @click="makeAction('Show')">Show</button>
    </span>
  </div>
</template>

<script>
import data from "../assets/data.json";

export default {
  data() {
    return {
      data,
    };
  },
  methods: {
    makeAction(name) {
      if (name == "+") {
        console.log(name);
        this.makeAction("Save");
        let timing = {
          tStart: "",
          tEnd: "",
        };
        this.$store.state.timings.push(timing);
      } else if (name == "-") {
        console.log(name);
        this.$store.state.timings.pop();
      } else if (name == "Save") {
        console.log(name);
        let data = [];
        for (let index = 0; index < this.$store.state.timings.length; index++) {
          let std = {
            tStart: document.getElementById(index + "tStart").value,
            tEnd: document.getElementById(index + "tEnd").value,
          };
          data.push(std);
        }
        this.$store.commit("importTimings", {
          data: data,
        });
        console.log(data);
      } else if (name == "Reset") {
        console.log(name);
        let data = this.$store.state.timings;
        for (let index = 0; index < data.length; index++) {
          document.getElementById(index + "tStart").value = data[index].tStart;
          document.getElementById(index + "tEnd").value = data[index].tEnd;
        }
      } else if (name == "Show") {
        console.log(name);
        let data = this.$store.state.timings;
        console.log(data);
      }
    },
  },
  created() {},
  mounted() {
    this.makeAction("Reset");
  },
  updated() {
    this.makeAction("Reset");
  },
};
</script>

<style scoped>
#AddTimingsPopup {
  display: block;
  text-align: center;
  margin: 5px;
}
</style>