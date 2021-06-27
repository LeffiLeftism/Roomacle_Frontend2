<template>
  <div>
    <label v-show="this.$store.state.logged_in == false" for="pw"
      >Passwort:</label
    >
    <input
      v-show="this.$store.state.logged_in == false"
      type="text"
      id="pw"
      name="pw"
      style="margin: 0 5px"
    />
    <button
      v-show="this.$store.state.logged_in == false"
      @click="checkPW()"
      id="bt_login"
    >
      Login
    </button>
  </div>
</template>

<script>
export default {
  methods: {
    checkPW: async function () {
      //Sendet Eingabe aus Textfeld an Backend zur Überprüfung
      console.log("Login");
      let data = {};
      data.input = document.getElementById("pw").value;
      console.log("Check PW");
      console.log("Input: ");
      console.log(data);
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      };
      const response = await fetch("/pw", options);
      const json = await response.json();
      console.log("Response:");
      //Antwort des Backends wird ausgewertet
      if (json == "correct password") {
        console.log("Correct Password");
        this.$store.state.logged_in = true;
      } else {
        console.log("Wrong Password");
        document.getElementById("pw").value = "";
        this.$store.state.logged_in = false;
      }
    },
  },
};
</script>

<style scoped>
</style>