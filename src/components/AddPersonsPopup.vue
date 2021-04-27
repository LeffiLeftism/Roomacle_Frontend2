<template>
  <div id="AddPersonsPopup">
    <h1>Personen bearbeiten</h1>
    <select name="person" id="person">
      <option
        v-for="(item, index) in $store.state.persons"
        v-bind:key="index"
        :value="index"
      >
        {{ item.name }}, {{ item.titel }}
      </option>
    </select>
    <button @click="makeAction('Reset')">Bearbeiten</button>
    <hr />
    <fieldset style="text-align: left">
      <span class="small">Name, Titel:</span>
      <input :id="'name'" type="text" class="name" />
      ,
      <input :id="'titel'" type="text" class="titel" />
      <br />
      <span class="small">E-Mail:</span>
      <input :id="'email'" type="mail" class="wide" />
      <br />
      <span class="small">Homepage:</span>
      <input :id="'homepage'" type="url" class="wide" />
      <br />
      <span class="small">Tel.:</span>
      <input :id="'telefon'" type="tel" class="wide" />
      <br />
      <span class="small">Büroraum:</span>
      <input :id="'room'" type="text" class="wide" />
      <br />
      <span class="small">Sprechzeiten:</span>
      <input :id="'visitTime'" type="text" class="wide" />
      <!--button @click="makeAction('Delete', index)" class="spaceLeftRight">
        Delete
      </button-->
    </fieldset>

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
    makeAction(name, ind) {
      if (name == "+") {
        console.log(name);
        this.makeAction("Save");
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
        const index = document.getElementById("person").value;
        let person = {
          name: document.getElementById("name").value,
          titel: document.getElementById("titel").value,
          email: document.getElementById("email").value,
          homepage: document.getElementById("homepage").value,
          telefon: document.getElementById("telefon").value,
          room: document.getElementById("room").value,
          visitTime: document.getElementById("visitTime").value,
        };
        this.$store.commit("importPersons", {
          data: person,
          index: index,
        });
        console.log(person);
      } else if (name == "Reset") {
        console.log(name);
        for (let index = 0; index < this.$store.state.persons.length; index++) {
          const index = document.getElementById("person").value;
          let data = this.$store.state.persons[index];
          document.getElementById("name").value = data.name;
          document.getElementById("titel").value = data.titel;
          document.getElementById("email").value = data.email;
          document.getElementById("homepage").value = data.homepage;
          document.getElementById("telefon").value = data.telefon;
          document.getElementById("room").value = data.room;
          document.getElementById("visitTime").value = data.visitTime;
        }
      } else if (name == "Show") {
        console.log(name);
        let data = this.$store.state.persons;
        console.log(data);
      } else if (name == "Delete") {
        console.log(name);
        console.log("Ind: " + ind);
        let data = this.$store.state.persons;
        for (let n = ind; n < data.length - 1; n++) {
          console.log("N: " + n);
          this.moveInArray(n + 1, n, data);
        }
        this.makeAction("-");
      } else {
        console.log("Error: On makeAction");
      }
    },
    moveInArray(pos1, pos2, array) {
      let spacer = array[pos1];
      array[pos1] = array[pos2];
      array[pos2] = spacer;
      console.log("Moved " + pos1 + " to " + pos2 + "on Array " + array);
    },
  },
  mounted() {
    this.makeAction("Reset");
  },
  updated() {
    this.makeAction("Reset");
  },
};
</script>

<style scoped>
#AddPersonsPopup {
  font-family: Avenir, Helvetica, Arial, sans-serif;
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