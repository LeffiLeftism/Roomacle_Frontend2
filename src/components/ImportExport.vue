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
      document.getElementById("uploadButton").style.backgroundColor =
        "lightgrey";
      if (asyncData.database == "This is empty") {
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
      let store = this.$store.state;
      let data = {};
      data.timings = store.timings;
      data.persons = store.persons;
      data.meetings = store.meetings;
      data.announcements = store.announcements;
      data.setup = store.setup;
      var filename = "test.json";
      var text = JSON.stringify(data);
      var element = document.createElement("a");
      element.setAttribute(
        "href",
        "data:text/plain;charset=utf-8," + encodeURIComponent(text)
      );
      element.setAttribute("download", filename);

      element.style.display = "none";
      document.body.appendChild(element);

      element.click();

      document.body.removeChild(element);
    },
  },
  mounted() {
    document
      .getElementById("fileupload")
      .addEventListener("change", function () {
        var fr = new FileReader();
        fr.onload = function () {
          asyncData.database = JSON.parse(fr.result);
          document.getElementById("uploadButton").style.backgroundColor =
            "green";
        };

        fr.readAsText(this.files[0]);
      });
  },
};
</script>

<style scoped>
</style>