<template>
  <div id="app">
    <h1>Roomacle Setup-Generator</h1>
    <button @click="importData()" class="spaceLeftRight">IMPORT</button>
    <button @click="showAll()" class="spaceLeftRight">SHOW ALL</button>
    <hr />
    <DeviceSetup />
    <br />
    <DatabaseCheck />
    <br />
  </div>
</template>

<script>
import DatabaseCheck from "./components/DatabaseCheck.vue";
import DeviceSetup from "./components/DeviceSetup.vue";
import data from "./assets/data.json";

export default {
  name: "App",
  components: {
    DatabaseCheck,
    DeviceSetup,
  },
  data() {
    return {
      data,
    };
  },
  methods: {
    importData() {
      console.log("Import Data");
      if (document.getElementById("timingsImport").checked) {
        this.$store.commit("importTimings", {
          data: this.data.timings,
        });
      }
      if (document.getElementById("meetingsImport").checked) {
        this.$store.commit("importMeetings", {
          data: this.data.meetings,
        });
      }
      if (document.getElementById("personsImport").checked) {
        this.$store.commit("importPersons", {
          data: this.data.persons,
        });
      }
      console.log(this.$store.state);
    },
    showAll() {
      console.log(this.$store.state);
    },
  },
};
</script>

<style>
h3 {
  margin: 5px 0;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
.dot {
  height: 25px;
  width: 25px;
  background-color: #bbb;
  border-radius: 50%;
  display: inline-block;
}
.spaceLeftRight {
  margin: 0 10px;
}
.horizontal {
  display: flex;
  align-items: center;
  justify-content: space-evenly;
}
.btnAddDelete {
  margin: 0 5px;
  width: 50px;
}
.small {
  display: inline-flex;
  width: 100px;
}
.wide {
  width: 300px;
}
</style>
