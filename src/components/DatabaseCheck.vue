<template>
  <div>
    <fieldset>
      <div class="horizontal">
        <!-- -->
        <span class="horizontal">
          <span
            class="dot"
            :class="[this.countTimings > 0 ? 'green' : 'red']"
          ></span>
          <h2 class="spaceLeftRight">Zeiten</h2>
          <button id="timingsAdd" @click="openModal('timings')">+</button>
          <input id="timingsImport" type="checkbox" />
        </span>
        <!-- -->
        <span class="horizontal">
          <span
            class="dot"
            :class="[this.countMeetings > 0 ? 'green' : 'red']"
          ></span>
          <h2 class="spaceLeftRight">Veranstaltungen</h2>
          <button id="meetingsAdd" @click="openModal('meetings')">+</button>
          <input id="meetingsImport" type="checkbox" />
        </span>
        <!-- -->
        <span class="horizontal">
          <span
            class="dot"
            :class="[this.countPersons > 0 ? 'green' : 'red']"
          ></span>
          <h2 class="spaceLeftRight">Personen</h2>
          <button id="personsAdd" @click="openModal('persons')">+</button>
          <input id="personsImport" type="checkbox" />
        </span>
      </div>
        <hr />
      <div class="horizontal">
        <!-- -->
        <span class="horizontal">
          <span
            class="dot"
            :class="[this.countLostAndFounds > 0 ? 'green' : 'red']"
          ></span>
          <h2 class="spaceLeftRight">LostAndFound</h2>
          <button id="lostandfoundsAdd" @click="openModal('lostandfounds')">+</button>
          <input id="importLostAndFounds" type="checkbox" />
        </span>
        <!-- -->
        <span class="horizontal">
          <span
            class="dot"
            :class="[this.countAnnouncements > 0 ? 'green' : 'red']"
          ></span>
          <h2 class="spaceLeftRight">Announcements</h2>
          <button id="announcementsAdd" @click="openModal('announcements')">+</button>
          <input id="announcementsImport" type="checkbox" />
        </span>
        <!-- -->
      </div>
    </fieldset>
  </div>
</template>

<script>
import db from "../assets/data.json";
import AddTimingsPopup from "../components/AddTimingsPopup.vue";
import AddMeetingPopup from "../components/AddMeetingPopup.vue";
import AddPersonsPopup from "../components/AddPersonsPopup.vue";
import AddLostAndFoundsPopup from "../components/AddLostAndFoundsPopup.vue";
import AddAnnouncementsPopup from "../components/AddAnnouncementsPopup.vue";

export default {
  components: {},
  data() {
    return {
      db,
      countTimings: this.$store.state.timings.length,
      countMeetings: this.$store.state.meetings.length,
      countPersons: this.$store.state.persons.length,
      countLostAndFounds: this.$store.state.lostandfounds.length,
      countAnnouncements: this.$store.state.announcements.length,
    };
  },
  methods: {
    checkStore() {
      this.countTimings = this.$store.state.timings.length;
      this.countMeetings = this.$store.state.meetings.length;
      this.countPersons = this.$store.state.persons.length;
      this.countLostAndFounds = this.$store.state.lostandfounds.length;
      this.countAnnouncements = this.$store.state.announcements.length;
    },
    openModal(name) {
      if (name == "timings") {
        try {
          this.$modal.show(AddTimingsPopup, {}, { height: "auto" });
        } catch (err) {
          console.log("Error on AddTimingsPopup.");
          console.log(err);
        }
      } else if (name == "meetings") {
        try {
          this.$modal.show(AddMeetingPopup, {}, { height: "auto" });
        } catch (err) {
          console.log("Error on AddMeetingPopup.");
          console.log(err);
        }
      } else if (name == "persons") {
        try {
          this.$modal.show(AddPersonsPopup, {}, { height: "auto" });
        } catch (err) {
          console.log("Error on AddPersonsPopup.");
          console.log(err);
        }
      } else if (name == "lostandfounds") {
        try {
          this.$modal.show(AddLostAndFoundsPopup, {}, { height: "auto" });
        } catch (err) {
          console.log("Error on AddLostAndFoundsPopup.");
          console.log(err);
        }
      } else if (name == "announcements") {
        try {
          this.$modal.show(AddAnnouncementsPopup, {}, { height: "auto" });
        } catch (err) {
          console.log("Error on AddAnnouncementsPopup.");
          console.log(err);
        }
      }
    },
    async checkDatabases() {},
  },
  created() {},
  mounted() {
    setInterval(() => {
      this.checkStore();
    }, 1000);
  },
};
</script>

<style scoped>
.green {
  background: green;
}
.red {
  background: red;
}
</style>