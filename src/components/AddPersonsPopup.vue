<template>
  <div id="AddPersonsPopup">
    <h1>Create new Person</h1>
    <form>
      <span v-for="(item, index) in this.$store.state.persons" :key="index">
        <fieldset style="text-align: left">
          <span class="small">Name, Titel:</span>
          <input :id="index + 'name'" type="text" class="name" />
          ,
          <input :id="index + 'titel'" type="text" class="titel" />
          <br />
          <span class="small">E-Mail:</span>
          <input :id="index + 'email'" type="mail" class="wide" />
          <br />
          <span class="small">Homepage:</span>
          <input :id="index + 'homepage'" type="url" class="wide" />
          <br />
          <span class="small">Tel.:</span>
          <input :id="index + 'telefon'" type="tel" class="wide" />
          <br />
          <span class="small">Büroraum:</span>
          <input :id="index + 'room'" type="text" class="wide" />
          <br />
          <span class="small">Sprechzeiten:</span>
          <input :id="index + 'visitTime'" type="text" class="wide" />
        </fieldset>
      </span>
    </form>

    <span>
      <br />
      <br />
      <button class="btnAddDelete" @click="makeAction('+')">+</button>
      <button class="btnAddDelete" @click="makeAction('-')">-</button>
      <button class="btnAddDelete" @click="makeAction('Save')">Save</button>
      <button class="btnAddDelete" @click="makeAction('Reset')">Reset</button>
      <button class="btnAddDelete" @click="makeAction('Show')">Show</button>
    </span>
  </div>
</template>


<script>
export default {
  data() {
    return {};
  },
  methods: {
    makeAction(name) {
      if (name == "+") {
        console.log(name);
        let data = {
          name: "",
          titel: "",
          email: "",
          homepage: "",
          telefon: "",
          room: "",
          visitTime: "",
        };
        this.$store.state.persons.push(data);
      } else if (name == "-") {
        console.log(name);
        this.$store.state.persons.pop();
      } else if (name == "Save") {
        console.log(name);
        let data = [];
        for (
          let index = 0;
          index < this.$store.state.persons.length;
          index++
        ) {
          let person = {
            name: document.getElementById(index + "name").value,
            titel: document.getElementById(index + "titel").value,
            email: document.getElementById(index + "email").value,
            homepage: document.getElementById(index + "homepage").value,
            telefon: document.getElementById(index + "telefon").value,
            room: document.getElementById(index + "room").value,
            visitTime: document.getElementById(index + "visitTime").value,
          };
          data.push(person);
        }
        this.$store.commit("importPersons", {
          data: data,
        });
        console.log(data);
      } else if (name == "Reset") {
        console.log(name);
        for (let index = 0; index < this.$store.state.persons.length; index++) {
          let data = this.$store.state.persons[index];
          document.getElementById(index + "name").value = data.name;
          document.getElementById(index + "titel").value = data.titel;
          document.getElementById(index + "email").value = data.email;
          document.getElementById(index + "homepage").value = data.homepage;
          document.getElementById(index + "telefon").value = data.telefon;
          document.getElementById(index + "room").value = data.room;
          document.getElementById(index + "visitTime").value = data.visitTime;
        }
      } else if (name == "Show") {
        console.log(name);
        let data = this.$store.state.persons;
        console.log(data);
      }
    },
  },
  mounted() {
    this.makeAction("Reset");
  },
  updated() {
    this.makeAction("Reset");
  }
};
</script>

<style scoped>
#AddPersonsPopup {
  display: block;
  text-align: center;
  margin: 5px;
  overflow: visible;
}
.name {
  width: 200px;
}
.titel {
  width: 80px;
}
</style>