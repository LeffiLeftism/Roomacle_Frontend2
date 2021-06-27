<template>
  <div id="AddPersonsPopup">
    <h3>Personen bearbeiten</h3>
    <select name="person" id="person" @change="makeAction('Reset')">
      <option
        v-for="(item, index) in $store.state.persons"
        v-bind:key="index"
        :value="index"
      >
        {{ item.name }}, {{ item.titel }}
      </option>
    </select>
    <button @click="makeAction('Delete', index)" class="spaceLeftRight">
      Löschen
    </button>
    <!--button @click="makeAction('Reset')">Bearbeiten</button-->
    <hr />
    <fieldset style="text-align: left">
      <img
        src=""
        height="160"
        alt="Vorschaubild ..."
        id="imagePerson"
        style="border: 2px solid lightgrey; float: right; max-width: 200px"
      />
      <div>
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
        <br />
        <span class="small">Terminkalender:</span>
        <button class="wide" style="margin: 0 4px" @click="openModal()">
          Termine bearbeiten
        </button>
      </div>
      <label for="imgInputPerson" class="small">Profilbild:</label>
      <input type="file" id="imgInputPerson" name="imgInputPerson" />
      <button @click="deleteImage()">Löschen</button>
    </fieldset>
    <span>
      <br />
      <button class="btnAddDelete" @click="makeAction('+')">+</button>
      <button
        class="btnAddDelete"
        style="width: 80px"
        @click="makeAction('Save')"
      >
        Speichern
      </button>
      <button class="btnAddDelete" @click="makeAction('Reset')">Reset</button>
      <button class="btnAddDelete" @click="makeAction('Show')">Show</button>
    </span>
  </div>
</template>


<script>
import AddMeetingPopup from "../components/AddMeetingPopup.vue";
import { base64File } from "../store/index.js";

export default {
  props: {
    persons: Array,
  },
  data() {
    return {};
  },
  methods: {
    openModal() {
      //Öffnet Popup "AddMeetingPopup" zur Veranstaltungserstellung
      try {
        this.$modal.show(
          AddMeetingPopup,
          {
            meetings:
              this.$store.state.persons[document.getElementById("person").value]
                .meetings,
            type: "persons",
            person_index: Number(document.getElementById("person").value),
          },
          { height: "auto" }
        );
      } catch (err) {
        console.log("Error on AddMeetingPopup.");
        console.log(err);
      }
    },
    deleteImage() {
      //Löscht das Bild aus dem Vorschaubild
      document.getElementById("imagePerson").src = "";
    },
    makeAction(name) {
      if (name == "+") {
        //Fügt einen neuen Datensatz hinzu
        //console.log(name);
        let length = this.persons.length;
        if (length != 0) {
          //Wenn Datensätze vorhanden, werden dieses zuerst gespeichert
          this.makeAction("Save");
        }
        let data = {
          name: "",
          titel: "",
          email: "",
          homepage: "",
          telefon: "",
          room: "",
          visitTime: "",
          meetings: [
            {
              num: "",
              name: "",
              name_short: "",
              std_start: Number("1"),
              duration: Number("2"),
              roomnumber: "",
              date: {
                start: "",
                repeatedly: "",
                end: "",
                infinity: true,
              },
              semester: "",
              studigang: "",
              dozent: "",
              pinned: false,
            },
          ],
          base64Code: "",
        };
        this.$store.state.persons.push(data);
      } else if (name == "-") {
        //Löscht den letzten im Array stehenden Datensatz
        //console.log(name);
        this.persons.pop();
      } else if (name == "Save") {
        //Liest die Eingabefelder aus und Speichert diese lokal
        //console.log(name);
        const index = document.getElementById("person").value;
        let oldMeetings = this.persons[index].meetings;
        let person = {
          name: document.getElementById("name").value,
          titel: document.getElementById("titel").value,
          email: document.getElementById("email").value,
          homepage: document.getElementById("homepage").value,
          telefon: document.getElementById("telefon").value,
          room: document.getElementById("room").value,
          visitTime: document.getElementById("visitTime").value,
          base64Code: document.getElementById("imagePerson").src,
          meetings: oldMeetings,
        };
        //console.log(person);
        this.$store.commit("importPersons", {
          data: person,
          index: index,
        });
      } else if (name == "Reset") {
        //Schreibt die Daten erneut aus lokalem Speicher in die Eingabefelder
        //console.log(name);
        if (this.persons.length == 0) {
          this.makeAction("+");
          document.getElementById("person").value = 0;
        } else {
          const index = document.getElementById("person").value;
          let data = this.$store.state.persons[index];
          document.getElementById("name").value = data.name;
          document.getElementById("titel").value = data.titel;
          document.getElementById("email").value = data.email;
          document.getElementById("homepage").value = data.homepage;
          document.getElementById("telefon").value = data.telefon;
          document.getElementById("room").value = data.room;
          document.getElementById("visitTime").value = data.visitTime;
          document.getElementById("imagePerson").src = data.base64Code;
        }
      } else if (name == "Show") {
        //Zeigt die lokale gespeicherten Personen in der Konsole
        //console.log(name);
        let data = this.persons;
        console.log(data);
      } else if (name == "Delete") {
        //Löscht die Daten der gewählten Zeile aus lokalem Speicher
        //console.log(name);
        this.makeAction("Reset");
        const index = Number(document.getElementById("person").value);
        let data = this.persons;
        for (var n = index; n < data.length - 1; n++) {
          this.moveInArray(n + 1, n, data);
        }
        this.makeAction("-");
      } else {
        console.log("Error: On AddPersonsPopup makeAction");
      }
    },
    moveInArray(pos1, pos2, array) {
      //Tauscht in einem Array die Elemente an pos1 und pos2
      let spacer = array[pos1];
      array[pos1] = array[pos2];
      array[pos2] = spacer;
    },
  },
  mounted() {
    this.makeAction("Reset");
    document
      .getElementById("imgInputPerson")
      .addEventListener("change", function () {
        //Liest Bild aus Dateiauswahl aus und speichert als Base64 in observable Variable
        var fr = new FileReader();
        fr.onload = function () {
          base64File.data = fr.result;
          document.getElementById("imagePerson").src = fr.result;
          //console.log(base64File.data);
        };
        fr.readAsDataURL(this.files[0]);
      });
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