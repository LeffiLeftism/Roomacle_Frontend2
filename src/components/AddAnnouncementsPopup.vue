<template>
  <div id="AddAnnouncementsPopup">
    <h3>Benachrichtigungen bearbeiten</h3>
    <select name="announcement" id="announcement" @change="makeAction('Reset')">
      <option
        v-for="(item, index) in this.announcements"
        v-bind:key="index"
        :value="index"
      >
        {{ item.date }} | {{ item.title }}
      </option>
    </select>
    <button @click="makeAction('Delete')" class="spaceLeftRight">
      Löschen
    </button>
    <hr />
    <fieldset>
      <span class="small">Datum:</span>
      <input :id="'date'" type="date" class="wide" />
      <br />
      <span class="small">Uhrzeit:</span>
      <input :id="'time'" type="time" class="wide" />
      <br />
      <span class="small">Titel:</span>
      <input :id="'title'" type="text" class="wide" />
      <br />
      <span class="small">Beschreibung:</span>
      <input :id="'content'" type="text" class="wide" />
      <br />
      <span class="small">Ersteller:</span>
      <input :id="'creator'" type="text" class="wide" />
      <br />
      <span class="small">Anpinnen:</span>
      <input
        :id="'pinned'"
        type="checkbox"
        class="wide"
        @click="inputDisabler('pinned', [], ['timerActive'])"
      />
      <br />
      <span class="small">Timer:</span>
      <input
        :id="'timerActive'"
        type="checkbox"
        class="wide"
        @click="inputDisabler('timerActive', [], ['timerDateTime'])"
      />
      <br />
      <span class="small"></span>
      <input :id="'timerDateTime'" type="datetime-local" class="wide" />
      <br />
    </fieldset>

    <span>
      <br />
      <button class="btnAddDelete" @click="makeAction('+')">+</button>
      <button
        class="btnAddDelete"
        style="width: 80px"
        @click="makeAction('Save')"
      >
        Speichern
      </button>
      <button class="btnAddDelete" @click="makeAction('Reset')">Reset</button>
      <!--button class="btnAddDelete" @click="makeAction('Show')">Show</button-->
    </span>
  </div>
</template>

<script>
export default {
  props: {
    announcements: Array,
  },
  methods: {
    inputDisabler(idSource, idDestinationDisable, idDestinationEnable) {
      //Aktiviert und Deaktiviert Eingabemöglichkeiten
      //idSource = Quelle, auf derer Eingabe Elemente aktiviert und deaktiviert werden
      //idDestinationDisable = Elemente, welche deaktiviert werden sollen
      //idDestinationEnable = Elemente, welche aktiviert werden sollen
      if (typeof idDestinationDisable != "undefined") {
        idDestinationDisable.forEach((element) => {
          document.getElementById(element).disabled =
            document.getElementById(idSource).checked;
        });
      }
      if (typeof idDestinationEnable != "undefined") {
        idDestinationEnable.forEach((element) => {
          document.getElementById(element).disabled =
            !document.getElementById(idSource).checked;
        });
      }
    },
    makeAction(name) {
      if (name == "+") {
        //Fügt einen neuen Datensatz hinzu
        //console.log(name);
        let length = this.announcements.length;
        if (length != 0) {
          //Wenn Datensätze vorhanden, werden dieses zuerst gespeichert
          this.makeAction("Save");
        }
        let data = {
          date: "",
          time: "",
          content: "",
          creator: "",
          title: "",
          pinned: "",
          countDownDate: "",
        };
        this.$store.state.announcements.push(data);
      } else if (name == "-") {
        //Löscht den letzten im Array stehenden Datensatz
        //console.log(name);
        this.announcements.pop();
      } else if (name == "Save") {
        //Liest die Eingabefelder aus und Speichert diese lokal
        console.log(name);
        const index = document.getElementById("announcement").value;

        let announcement = {
          date: document.getElementById("date").value,
          time: document.getElementById("time").value,
          content: document.getElementById("content").value,
          creator: document.getElementById("creator").value,
          title: document.getElementById("title").value,
          pinned: document.getElementById("pinned").checked,
          timerActive:
            document.getElementById("timerActive").checked &&
            document.getElementById("pinned").checked,
          countDownDate: document.getElementById("timerDateTime").value,
        };
        this.$store.commit("importAnnouncements", {
          data: announcement,
          index: index,
        });
      } else if (name == "Reset") {
        //Schreibt die Daten erneut aus lokalem Speicher in die Eingabefelder
        //console.log(name);
        if (this.announcements.length == 0) {
          this.makeAction("+");
          document.getElementById("announcement").value = 0;
        } else {
          const index = document.getElementById("announcement").value;
          let data = this.announcements[index];
          document.getElementById("date").value = data.date;
          document.getElementById("time").value = data.time;
          document.getElementById("content").value = data.content;
          document.getElementById("creator").value = data.creator;
          document.getElementById("title").value = data.title;
          document.getElementById("pinned").checked = data.pinned;
          document.getElementById("timerActive").checked = data.timerActive;
          if (data.pinned) {
            document.getElementById("timerDateTime").disabled = false;
            document.getElementById("timerActive").disabled = false;
            if (data.timerActive) {
              document.getElementById("timerDateTime").value =
                data.countDownDate;
            } else {
              document.getElementById("timerDateTime").value = "";
              document.getElementById("timerDateTime").disabled = true;
            }
          } else {
            document.getElementById("timerDateTime").value = "";
            document.getElementById("timerActive").checked = false;
            document.getElementById("timerDateTime").disabled = true;
            document.getElementById("timerActive").disabled = true;
          }
        }
      } else if (name == "Show") {
        //Zeigt die lokale gespeicherten Veranstaltungen in der Konsole
        //console.log(name);
        let data = this.announcements;
        console.log(data);
      } else if (name == "Delete") {
        //Löscht die Daten der gewählten Zeile aus lokalem Speicher
        //console.log(name);
        this.makeAction("Reset");
        const index = Number(document.getElementById("announcement").value);
        let data = this.announcements;
        for (var n = index; n < data.length - 1; n++) {
          this.moveInArray(n + 1, n, data);
        }
        this.makeAction("-");
      } else {
        //console.log("Error: On AnnouncementsPopup makeAction");
      }
    },
    moveInArray(pos1, pos2, array) {
      //Tauscht in einem Array die Elemente an pos1 und pos2
      let spacer = array[pos1];
      array[pos1] = array[pos2];
      array[pos2] = spacer;
      //console.log("Moved " + pos1 + " to " + pos2 + "on Array " + array);
    },
  },
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
  font-family: Avenir, Helvetica, Arial, sans-serif;
  display: block;
  text-align: center;
  margin: 5px;
}
</style>