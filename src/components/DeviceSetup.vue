<template>
  <div>
    <fieldset class="horizontal">
      <legend>Raumart</legend>
      <span>
        <label class="spaceLeftRight" for="buero">Büro</label>
        <input
          type="radio"
          name="roomtype"
          id="buero"
          value="nameA"
          @click="
            inputDisabler(
              '',
              'buero',
              [
                'meetingsAdd',
                'meetingsImport',
                'timingsAdd',
                'timingsImport',
                'seats',
              ],
              ['personsAdd', 'personsImport']
            )
          "
        />
      </span>
      <span>
        <label class="spaceLeftRight" for="vl">Vorlesung/Seminar</label>
        <input
          type="radio"
          name="roomtype"
          id="vl"
          value="nameB"
          @click="
            inputDisabler(
              '',
              'vl',
              ['personsAdd', 'personsImport'],
              [
                'meetingsAdd',
                'meetingsImport',
                'timingsAdd',
                'timingsImport',
                'seats',
              ]
            )
          "
        />
        <label for="seats" class="spaceLeftRight">Sitze:</label>
        <input type="text" name="seats" id="seats" />
      </span>
    </fieldset>
    <fieldset style="display: flex" class="horizontal">
      <legend>Raumeigenschaften</legend>

      <span class="spaceLeftRight">
        <label class="spaceLeftRight" for="raumnummer">Raumnummer:</label>
        <input type="text" name="raumnummer" id="raumnummer" />
      </span>
      <span class="spaceLeftRight">
        <label class="spaceLeftRight" for="fachbereich">Fachbereich:</label>
        <input type="text" id="fachbereich" />
      </span>
      <span class="spaceLeftRight">
        <label class="spaceLeftRight" for="studienbereich"
          >Studienbereich:</label
        >
        <input type="text" name="studienbereich" id="studienbereich" />
      </span>
    </fieldset>
  </div>
</template>

<script>
export default {
  methods: {
    inputDisabler(index, idSource, idDestinationDisable, idDestinationEnable) {
      if (typeof idDestinationDisable != "undefined") {
        idDestinationDisable.forEach((element) => {
          document.getElementById(
            index + element
          ).disabled = document.getElementById(index + idSource).checked;
        });
      }
      if (typeof idDestinationEnable != "undefined") {
        idDestinationEnable.forEach((element) => {
          document.getElementById(
            index + element
          ).disabled = !document.getElementById(index + idSource).checked;
        });
      }
    },
    writeSetup() {
      let data = this.$store.state.setup;

      document.getElementById("raumnummer").value = data.room.num;
      document.getElementById("fachbereich").value = data.fachbereich;
      document.getElementById("studienbereich").value = data.studienbereich;
      document.getElementById("seats").value = data.room.seats;

      if (data.room.type == "buero") {
        document.getElementById("buero").checked = true;
      } else if (data.room.type == "vl") {
        document.getElementById("vl").checked = true;
      }
    },
  },
  watch: {
    "$store.state.setup": {
      handler: function () {
        console.log("Setup updated!");
        this.writeSetup();
      },
    },
  },
};
</script>

<style scoped>
</style>