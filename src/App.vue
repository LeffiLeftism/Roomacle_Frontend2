<template>
  <div id="app">
    <h1>Roomacle Setup-Generator</h1>
    <button @click="importData()" class="spaceLeftRight">IMPORT</button>
    <button @click="showAll()" class="spaceLeftRight">SHOW ALL</button>
    <button @click="sendData()" class="spaceLeftRight">SEND ALL DATA</button>
    <button @click="recieveData()" class="spaceLeftRight">
      RECIEVE ALL DATA
    </button>
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
    saveSetup() {
      let roomtype;
      let typeA = document.getElementById("buero").checked;
      let typeB = document.getElementById("vl").checked;
      if (typeA) {
        roomtype = "buero";
      } else if (typeB) {
        roomtype = "vl";
      }
      let data = {
        room: {
          num: document.getElementById("raumnummer").value,
          type: roomtype,
          seats: document.getElementById("seats").value,
        },
        fachbereich: document.getElementById("fachbereich").value,
        studienbereich: document.getElementById("studienbereich").value,
      };
      //console.log(data);
      this.$store.state.setup = data;
    },
    sendData: async function () {
      this.saveSetup();
      console.log("Send all Data");
      let data = {};
      data.timings = this.$store.state.timings;
      data.meetings = this.$store.state.meetings;
      data.persons = this.$store.state.persons;
      data.setup = this.$store.state.setup;
      data.announcements = this.$store.state.announcements;
      //console.log(data);
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      };
      const response = await fetch("/send", options);
      const json = await response.json();
      console.log("Response:");
      console.log(json);
    },
    recieveData: async function () {
      let response;
      console.log("Recieve all Data");
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      };
      let data = {
        type: "",
      };
      let json = [];

      data.type = "timings";
      options.body = JSON.stringify(data);
      response = await fetch("/recieve", options);
      json.timings = await response.json();

      data.type = "meetings";
      options.body = JSON.stringify(data);
      response = await fetch("/recieve", options);
      json.meetings = await response.json();

      data.type = "persons";
      options.body = JSON.stringify(data);
      response = await fetch("/recieve", options);
      json.persons = await response.json();

      data.type = "announcements";
      options.body = JSON.stringify(data);
      response = await fetch("/recieve", options);
      json.announcements = await response.json();

      data.type = "setup";
      options.body = JSON.stringify(data);
      response = await fetch("/recieve", options);
      json.setup = await response.json();

      this.$store.commit("importTimings", {
        data: json.timings,
      });
      this.$store.commit("importMeetings", {
        data: json.meetings,
      });
      this.$store.commit("importPersons", {
        data: json.persons,
      });
      this.$store.commit("importAnnouncements", {
        data: json.announcements,
      });
      this.$store.commit("importSetup", {
        data: json.setup[0],
      });
      console.log(this.$store.state.setup);

      console.log("Response:");
      console.log(json);
    },

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
      if (document.getElementById("announcementsImport").checked) {
        this.$store.commit("importAnnouncements", {
          data: this.data.announcements,
        });
      }

      
            console.log(this.$store.state.announcements.length);
            console.log(this.$store.state.persons.length);



      // Setup wird importiert und angezeigt
      this.$store.commit("importSetup", {
        data: this.data.setup,
      });
      console.log(this.$store.state);

      if (this.$store.state.setup.room.type == "buero") {
        document.getElementById("buero").checked = true;
      } else if (this.$store.state.setup.room.type == "vl") {
        document.getElementById("vl").checked = true;
      }
      document.getElementById(
        "raumnummer"
      ).value = this.$store.state.setup.room.num;
      document.getElementById(
        "fachbereich"
      ).value = this.$store.state.setup.fachbereich;
      document.getElementById(
        "studienbereich"
      ).value = this.$store.state.setup.studienbereich;
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
