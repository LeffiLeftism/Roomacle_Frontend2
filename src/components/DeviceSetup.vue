<template>
  <div>
    <fieldset>
      <legend>Geräte-Setup</legend>
      <div class="horizontal" style="display: flex">
        <div
          style="display: flex; justify-content: space-evenly"
          class="spaceLeftRight"
        >
          <div
            style="display: flex; justify-content: center"
            class="spaceLeftRight"
          >
            <div>
              <input
                type="radio"
                name="roomtype"
                id="buero"
                value="nameA"
              />
              <br />
              <input
                type="radio"
                name="roomtype"
                id="vl"
                value="nameB"
              />
            </div>
            <div style="text-align: left">
              <label class="spaceLeftRight" for="buero">Büroraum</label>
              <br />
              <label class="spaceLeftRight" for="vl">Vorlesungsraum</label>
            </div>
          </div>
          <div style="border-left: 1px solid black; padding-left: 5px">
            <label for="desc" class="small">Beschreibung:</label>
            <br />
            <input id="desc" name="desc" type="text" style="width: 200px" />
          </div>
          <div class="spaceLeftRight">
            <button @click="openModal()">Logo ändern</button>
          </div>
        </div>
      </div>
      <br />
      <div style="display: flex; justify-content: center" class="horizontal">
        <div style="display: flex; justify-content: center">
          <div class="spaceLeftRight">
            <label class="spaceLeftRight" for="raumnummer">Raumnummer:</label>
            <br />
            <input type="text" name="raumnummer" id="raumnummer" />
          </div>
          <div class="spaceLeftRight">
            <label class="spaceLeftRight" for="fachbereich">Fachbereich:</label>
            <br />
            <input type="text" id="fachbereich" />
          </div>
          <div class="spaceLeftRight">
            <label class="spaceLeftRight" for="studienbereich"
              >Studienbereich:</label
            >
            <br />
            <input type="text" name="studienbereich" id="studienbereich" />
          </div>
        </div>
      </div>
    </fieldset>
  </div>
</template>

<script>
import LogoChanger from "./LogoChanger.vue";

export default {
  components: {},
  methods: {
    openModal() {
      //Öffnet das Popup mit LogoChanger Komponente
      try {
        this.$modal.show(LogoChanger, {}, { height: "auto", width: "610px" });
      } catch (err) {
        console.log("Error on LogoChanger.");
        console.log(err);
      }
    },
    writeSetup() {
      //Schreibt Setupdaten aus lokalem Speicher in Eingabefelder
      let data = this.$store.state.setup;
      document.getElementById("raumnummer").value = data.room.num;
      document.getElementById("fachbereich").value = data.fachbereich;
      document.getElementById("studienbereich").value = data.studienbereich;
      document.getElementById("desc").value = data.room.desc;

      if (data.room.type == "buero") {
        document.getElementById("buero").checked = true;
      } else if (data.room.type == "vl") {
        document.getElementById("vl").checked = true;
      }
    },
  },
  watch: {
    "$store.state.setup": {
      //Überwacht Setup-Speicherplatz, bei Änderungen wird Funktion ausgeführt
      handler: function () {
        console.log("Setup updated!");
        this.writeSetup();
      },
    },
  },
};
</script>