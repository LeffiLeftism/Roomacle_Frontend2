<template>
  <div>
    <fieldset>
      <legend>Datenbank-Check</legend>
      <div class="horizontal">
        <span class="horizontal">
          <span
            class="dot"
            :class="[this.countMeetings > 0 ? 'green' : 'red']"
          ></span>
          <h2 class="spaceLeftRight">Veranstaltungen</h2>
          <button id="meetingsAdd" @click="openModal('meetings')">+</button>
        </span>
        <span class="horizontal">
          <span
            class="dot"
            :class="[this.countPersons > 0 ? 'green' : 'red']"
          ></span>
          <h2 class="spaceLeftRight">Personen</h2>
          <button id="personsAdd" @click="openModal('persons')">+</button>
        </span>
      </div>
      <hr />
      <div class="horizontal">
        <span class="horizontal">
          <span
            class="dot"
            :class="[this.countAnnouncements > 0 ? 'green' : 'red']"
          ></span>
          <h2 class="spaceLeftRight">Benachrichtigungen</h2>
          <button id="announcementsAdd" @click="openModal('announcements')">
            +
          </button>
        </span>
        <span class="horizontal">
          <span
            class="dot"
            :class="[this.countTimings > 0 ? 'green' : 'red']"
          ></span>
          <h2 class="spaceLeftRight">Zeiten</h2>
          <button id="timingsAdd" @click="openModal('timings')">+</button>
        </span>
      </div>
    </fieldset>
  </div>
</template>

<script>
import AddTimingsPopup from "../components/AddTimingsPopup.vue";
import AddMeetingPopup from "../components/AddMeetingPopup.vue";
import AddPersonsPopup from "../components/AddPersonsPopup.vue";
import AddAnnouncementsPopup from "../components/AddAnnouncementsPopup.vue";

export default {
  components: {},
  data() {
    return {
      countTimings: this.$store.state.timings.length,
      countMeetings: this.$store.state.meetings.length,
      countPersons: this.$store.state.persons.length,
      countAnnouncements: this.$store.state.announcements.length,
    };
  },
  methods: {
    checkStore() {
      //Liest die Länge der Arrays der Kategorien aus
      this.countTimings = this.$store.state.timings.length;
      this.countMeetings = this.$store.state.meetings.length;
      this.countPersons = this.$store.state.persons.length;
      this.countAnnouncements = this.$store.state.announcements.length;
    },
    openModal(name) {
      //Öffnet Popups für verschiedene Kategorien, Kategorie wird mit "name" übergeben
      //Beim Öffnen der Popups können Variable und Objekte übergeben werden, welche die dort geöffnete Komponente verarbeitet
      if (name == "timings") {
        //Popup für Zeiten
        try {
          this.$modal.show(AddTimingsPopup, {}, { height: "auto" });
        } catch (err) {
          console.log("Error open AddTimingsPopup.");
          console.log(err);
        }
      } else if (name == "meetings") {
        //Popup für Veranstaltungen
        try {
          this.$modal.show(
            AddMeetingPopup,
            { meetings: this.$store.state.meetings, type: "calendar" },
            { height: "auto" }
          );
        } catch (err) {
          console.log("Error open AddMeetingPopup.");
          console.log(err);
        }
      } else if (name == "persons") {
        //Popup für Personen
        try {
          this.$modal.show(
            AddPersonsPopup,
            {
              persons: this.$store.state.persons,
            },
            { height: "auto", width: "700px" }
          );
        } catch (err) {
          console.log("Error open AddPersonsPopup.");
          console.log(err);
        }
      } else if (name == "announcements") {
        //Popup für Benachrichtigungen
        try {
          this.$modal.show(
            AddAnnouncementsPopup,
            {
              announcements: this.$store.state.announcements,
            },
            { height: "auto" }
          );
        } catch (err) {
          console.log("Error open AddAnnouncementsPopup.");
          console.log(err);
        }
      }
    },
  },
  mounted() {
    //Führt jede 1000ms die Funktion checkStore aus
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