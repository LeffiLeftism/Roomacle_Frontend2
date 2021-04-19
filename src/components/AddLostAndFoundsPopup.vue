<template>
  <div id="AddAnnouncementsPopup">
    <h1>Create new Timing</h1>
    <span v-for="(item, index) in this.$store.state.lostandfounds" :key="index">
      <fieldset>
        <span class="small">Titel:</span>
        <input :id="index + 'title'" type="text" class="wide" />
        <br />
        <span class="small">Datum:</span>
        <input :id="index + 'date'" type="date" class="wide" />
        <br />
        <span class="small">Beschreibung:</span>
        <input :id="index + 'description'" type="text" class="wide" />
        <br />
        <span class="small">Ersteller:</span>
        <input :id="index + 'creator'" type="text" class="wide" />
        <br />
        <button @click="makeAction('Delete', index)" class="spaceLeftRight">
          Delete
        </button>
        <br />
      </fieldset>
    </span>

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
import data from "../assets/data.json";

export default {
  data() {
    return {
      data,
    };
  },
  methods: {
    makeAction(name, ind) {
      if (name == "+") {
        console.log(name);
        this.makeAction("Save");
        let lostandfound = {
          title: "",
          date: "",
          description: "",
          creator: "",
        };
        this.$store.state.lostandfounds.push(lostandfound);
      } else if (name == "-") {
        console.log(name);
        this.$store.state.lostandfounds.pop();
      } else if (name == "Save") {
        console.log(name);
        let data = [];
        for (let index = 0; index < this.$store.state.lostandfounds.length; index++) {
          let std = {
            title: document.getElementById(index + "title").value,
            date: document.getElementById(index + "date").value,
            description: document.getElementById(index + "description").value,
            creator: document.getElementById(index + "creator").value,
          };
          data.push(std);
        }
        this.$store.commit("importLostAndFounds", {
          data: data,
        });
        console.log(data);
      } else if (name == "Reset") {
        console.log(name);
        let data = this.$store.state.lostandfounds;
        for (let index = 0; index < data.length; index++) {
          document.getElementById(index + "title").value = data[index].title;
          document.getElementById(index + "date").value = data[index].date;
          document.getElementById(index + "description").value = data[index].description;
          document.getElementById(index + "creator").value =
            data[index].creator;
        }
      } else if (name == "Show") {
        console.log(name);
        let data = this.$store.state.lostandfounds;
        console.log(data);
      } else if (name == "Delete") {
        console.log(name);
        console.log("Ind: " + ind);
        let data = this.$store.state.lostandfounds;
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
  created() {},
  mounted() {
    this.makeAction("Reset");
  },
  updated() {
    this.makeAction("Reset");
  },
};
</script>

<style scoped>
#AddAnnouncementsPopup {
  display: block;
  text-align: center;
  margin: 5px;
}
</style>