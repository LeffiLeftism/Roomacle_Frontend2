<template>
  <div id="AddTimingsPopup">
    <h3>Zeiten bearbeiten</h3>
    <span v-for="(item, index) in this.$store.state.timings" :key="index">
      <span class="small">{{ index + 1 }}. Std:</span>
      <input :id="index + 'tStart'" class="spaceLeftRight" type="time" />
      -
      <input :id="index + 'tEnd'" class="spaceLeftRight" type="time" />

      <button @click="makeAction('Delete', index)" class="spaceLeftRight">
        Löschen
      </button>
      <br />
    </span>

    <span>
      <br />
      <button class="btnAddDelete" @click="makeAction('+')">+</button>
      <!--button class="btnAddDelete" @click="makeAction('-')">-</button-->
      <button class="btnAddDelete" @click="makeAction('Save')">Save</button>
      <button class="btnAddDelete" @click="makeAction('Reset')">Reset</button>
      <!--button class="btnAddDelete" @click="makeAction('Show')">Show</button-->
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
    makeAction(name, ind) {
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
      } else if (name == "Delete") {
        console.log(name);
        console.log("Ind: " + ind);
        let data = this.$store.state.timings;
        for (let n = ind; n < data.length - 1; n++) {
          console.log("N: " + n);
          this.moveInArray(n + 1, n, data);
        }
        this.makeAction("-");
      } else {
        console.log("Error: On makeAction");
      }
    },
    moveInArray(pos1, pos2, array) {
      let spacer = array[pos1];
      array[pos1] = array[pos2];
      array[pos2] = spacer;
      console.log("Moved " + pos1 + " to " + pos2 + "on Array " + array);
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
  font-family: Avenir, Helvetica, Arial, sans-serif;
  display: block;
  text-align: center;
  margin: 5px;
}
</style>