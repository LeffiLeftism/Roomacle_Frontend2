<template>
  <div style="border: 2px solid black; padding: 2px">
    <input id="fileupload" type="file" accept=".json" />
    <span id="output"></span>
    <button @click="uploadData()" class="spaceLeftRight" id="uploadButton">
      Upload
    </button>
    <button @click="downloadData()" class="spaceLeftRight" id="downloadButton">
      Download
    </button>
  </div>
</template>

<script>
import { asyncData } from "../store/index.js";

export default {
  methods: {
    async uploadData() {
      //Sendet die Datei der Dateiauswahl zum Backend
      document.getElementById("uploadButton").style.backgroundColor =
        "lightgrey";
      if (asyncData.database == "This is empty") {
        //
        console.log("Keine Datei ausgewählt.");
      } else {
        const options = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(asyncData.database),
        };
        const response = await fetch("/send", options);
        const json = await response.json();
        console.log("Response:");
        console.log(json);
        this.$parent.recieveData();
      }
    },
    downloadData() {
      //Stellt Daten zum Download bereit
      let store = this.$store.state;
      //Lokale Daten werden zusammengestellt
      let data = {};
      data.timings = store.timings;
      data.persons = store.persons;
      data.meetings = store.meetings;
      data.announcements = store.announcements;
      data.setup = store.setup;
      //Festlegen von Dateiname
      var filename = "roomacle_data.json";
      //Daten werden in JSON-Format geschrieben
      var text = JSON.stringify(data);
      //Erstelle HTML Element mit erstelltem JSON Text
      var element = document.createElement("a");
      element.setAttribute(
        "href",
        "data:text/plain;charset=utf-8," + encodeURIComponent(text)
      );
      //Element bekomme download als Attribute, kann damit heruntergeladen werden
      element.setAttribute("download", filename);
      //Element wird nicht angezeigt
      element.style.display = "none";
      document.body.appendChild(element);
      element.click();
      //Element wird entfernt
      document.body.removeChild(element);
    },
  },
  mounted() {
    document
      .getElementById("fileupload")
      .addEventListener("change", function () {
        //Liest Dateiauswahl aus, konvertiert zu JSON-Format
        var fr = new FileReader();
        fr.onload = function () {
          //Schreibt Inhalt der Datei im JSON-Format in eine observable Variable
          asyncData.database = JSON.parse(fr.result);
          document.getElementById("uploadButton").style.backgroundColor =
            "green";
        };
        fr.readAsText(this.files[0]);
      });
  },
};
</script>