<template>
  <div id="AddAnnouncementsPopup">
    <h1>Create new Timing</h1>
    <span v-for="(item, index) in this.$store.state.announcements" :key="index">
      <fieldset>
        <span class="small">Datum:</span>
        <input :id="index + 'date'" type="date" class="wide" />
        <br />
        <span class="small">Uhrzeit:</span>
        <input :id="index + 'time'" type="time" class="wide" />
        <br />
        <span class="small">Nachricht:</span>
        <input :id="index + 'content'" type="text" class="wide" />
        <br />
        <span class="small">Ersteller:</span>
        <input :id="index + 'creator'" type="text" class="wide" />
        <br />
      </fieldset>
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
        let announcement = {
          date: "",
          time: "",
          content: "",
          creator: "",
        };
        this.$store.state.announcements.push(announcement);
      } else if (name == "-") {
        console.log(name);
        this.$store.state.announcements.pop();
      } else if (name == "Save") {
        console.log(name);
        let data = [];
        for (let index = 0; index < this.$store.state.announcements.length; index++) {
          let std = {
            date: document.getElementById(index + "date").value,
            time: document.getElementById(index + "time").value,
            content: document.getElementById(index + "content").value,
            creator: document.getElementById(index + "creator").value,
          };
          data.push(std);
        }
        this.$store.commit("importAnnouncements", {
          data: data,
        });
        console.log(data);
      } else if (name == "Reset") {
        console.log(name);
        let data = this.$store.state.announcements;
        for (let index = 0; index < data.length; index++) {
          document.getElementById(index + "date").value = data[index].date;
          document.getElementById(index + "time").value = data[index].time;
          document.getElementById(index + "content").value = data[index].content;
          document.getElementById(index + "creator").value =
            data[index].creator;
        }
      } else if (name == "Show") {
        console.log(name);
        let data = this.$store.state.announcements;
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
#AddAnnouncementsPopup {
  display: block;
  text-align: center;
  margin: 5px;
}
</style>