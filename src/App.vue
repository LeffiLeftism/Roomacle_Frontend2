<template>
  <div id="app">
    <div
      style="
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 10%;
      "
    >
      <img
        v-if="this.$store.state.logged_in"
        style="margin-right: 20px"
        :src="this.$store.state.setup.base64Code"
        alt=""
        id="logo"
      />
      <br />
      <h2>Roomacle Dateneingabe</h2>
    </div>
    <div v-if="this.$store.state.logged_in == false">
      <Login />
    </div>
    <div v-show="this.$store.state.logged_in">
      <div class="buttonrow">
        <ImportExport />
        <Logout class="spaceLeftRight" style="margin-top: 4px" />
      </div>
      <hr />
      <DeviceSetup />
      <br />
      <DatabaseCheck />
    </div>
  </div>
</template>

<script>
import DatabaseCheck from "./components/DatabaseCheck.vue";
import DeviceSetup from "./components/DeviceSetup.vue";
import Login from "./components/Login.vue";
import Logout from "./components/Logout.vue";
import ImportExport from "./components/ImportExport.vue";

export default {
  name: "App",
  components: {
    DatabaseCheck,
    DeviceSetup,
    Login,
    Logout,
    ImportExport,
  },
  methods: {
    saveSetup() {
      //Liets Eingabefelder des Setups aus und speichert diese lokal
      let roomtype;
      let typeA = document.getElementById("buero").checked;
      let typeB = document.getElementById("vl").checked;
      if (typeA) {
        roomtype = "buero";
      } else if (typeB) {
        roomtype = "vl";
      }
      let data = {
        base64Code: document.getElementById("logo").src,
        room: {
          num: document.getElementById("raumnummer").value,
          type: roomtype,
          desc: document.getElementById("desc").value,
        },
        fachbereich: document.getElementById("fachbereich").value,
        studienbereich: document.getElementById("studienbereich").value,
      };
      this.$store.state.setup = data;
    },
    sendData: async function () {
      //Pakt Daten in data zusammen und sendet diese Daten an das Backend
      this.saveSetup();
      let data = {};
      data.timings = this.$store.state.timings;
      data.meetings = this.$store.state.meetings;
      data.persons = this.$store.state.persons;
      data.setup = this.$store.state.setup;
      data.announcements = this.$store.state.announcements;
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
      //Fragt die Daten des Backends an und schreibt diese in den lokalen Speicher
      let response;
      //("Recieve all Data");
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
      //Daten werden für die einzelnen Kategorien angefragt
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

      for (let index = 0; index < json.meetings.length; index++) {
        this.$store.commit("importMeetings", {
          data: json.meetings[index],
          index: index,
        });
      }

      for (let index = 0; index < json.persons.length; index++) {
        this.$store.commit("importPersons", {
          data: json.persons[index],
          index: index,
        });
      }

      for (let index = 0; index < json.announcements.length; index++) {
        this.$store.commit("importAnnouncements", {
          data: json.announcements[index],
          index: index,
        });
      }

      this.$store.commit("importSetup", {
        data: json.setup[0],
      });
      //console.log("Response:");
      //console.log(json);
    },
  },
  watch: {
    "$store.state.logged_in": {
      //Überprüft Login Status, wenn dieser sich ändert werden die Daten empfangen
      handler: function () {
        this.recieveData();
      },
    },
  },
};
</script>

<style>
h3 {
  margin: 5px 0;
}
button {
  background-color: lightgrey;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#logo {
  width: auto;
  max-height: 70px;
  max-width: 25%;
  padding: 6px;
}
.dot {
  height: 15px;
  width: 15px;
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
  width: 120px;
}
.wide {
  width: 300px;
}
.buttonrow {
  display: flex;
  align-content: space-between;
  justify-content: center;
}
</style>
