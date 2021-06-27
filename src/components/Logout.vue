<template>
  <div>
    <button
      v-show="this.$store.state.logged_in == true"
      @click="logout()"
      id="bt_logout"
    >
      Logout
    </button>
  </div>
</template>

<script>
export default {
  methods: {
    logout() {
      //Sendet alle Daten an das Backend
      this.$parent.sendData();
      //console.log("Logout");
      //Setzt die lokale Login Variable auf false -> Nicht eingeloggt
      this.$store.state.logged_in = false;
    },
  },
};
</script>