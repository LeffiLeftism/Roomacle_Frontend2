<template>
  <div>
    <fieldset class="horizontal">
        <legend>Raumart</legend>
        <span>
          <label class="spaceLeftRight" for="buero">Büro</label>
          <input type="radio" name="roomtype" id="buero" value="nameA" />
        </span>
        <span>
          <label class="spaceLeftRight" for="vl">Vorlesung/Seminar</label>
          <input type="radio" name="roomtype" id="vl" value="nameB" />
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
export default {};
</script>

<style scoped>
</style>