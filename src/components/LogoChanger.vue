<template>
  <div id="uploadLogo">
    <h2 style="text-align: center">Logo ändern</h2>
    <div>
      <input type="file" id="imgLogoInput" />
      <br />
      <img
        src=""
        alt="Image preview..."
        id="imageLogo"
        style="
          border: 1px solid black;
          max-height: 100px;
          max-width: 550px;
          padding: 2px;
        "
      />
      <br />
      <button @click="saveLogo()">Save</button>
    </div>
  </div>
</template>

<script>
import { base64File } from "../store/index.js";

export default {
  methods: {
    saveLogo() {
      //Speichert das Logo als Base64 lokal ab
      this.$store.state.setup.base64Code =
        document.getElementById("imageLogo").src;
      //Schreibt das Logo aus dem Vorschaubild in das Logofeld in App.vue
      document.getElementById("logo").src =
        document.getElementById("imageLogo").src;
    },
  },
  mounted() {
    document
      .getElementById("imgLogoInput")
      .addEventListener("change", function () {
        //Liest Dateiauswahl aus, konvertiert zu Base64
        var fr = new FileReader();
        fr.onload = function () {
          //Schreibt Inhalt der Datei im JSON-Format in eine observable Variable
          base64File.data = fr.result;
          document.getElementById("imageLogo").src = fr.result;
          console.log(base64File.data);
        };
        fr.readAsDataURL(this.files[0]);
      });
  },
};
</script>

<style scoped>
#uploadLogo {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  display: block;
  text-align: center;
  margin: 5px;
}
</style>