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
      console.log("Logout");
      this.$store.state.logged_in = false;
    },
  },
};
</script>

<style scoped>
</style>