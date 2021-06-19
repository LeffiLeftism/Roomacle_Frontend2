<template>
  <div id="AddMeetingPopup">
    <h3>Veranstaltungen bearbeiten</h3>
    <select name="meeting" id="meeting" @change="makeAction('Reset')">
      <option
        v-for="(item, index) in this.meetings"
        v-bind:key="index"
        :value="index"
      >
        {{ item.num }} | {{ item.name_short }}
      </option>
    </select>
    <!--button @click="makeAction('Reset')">Bearbeiten</button-->
    <button @click="makeAction('Delete')" class="spaceLeftRight">
      Löschen
    </button>
    <hr />
    <fieldset style="text-align: left">
      <span class="small">Nummer:</span>
      <input id="num" type="number" style="width: 60px" />
      <span class="small" style="padding-left: 10px">Abk. Name:</span>
      <input id="name_short" type="text" style="width: 102px" />
      <br />
      <span class="small">Name:</span>
      <input id="meetings_name" type="text" class="wide" />
      <br />
      <span class="small">DozentIn:</span>
      <input id="dozent" type="text" class="wide" />
      <br />
      <span class="small">Studiengänge:</span>
      <input id="studigang" type="text" class="wide" />
      <br />
      <span class="small">Semester:</span>
      <input id="semester" type="text" class="wide" />
      <br />
      <span class="small">Raumnummer:</span>
      <input id="roomnumber" type="text" class="wide" />
      <br />
      <span class="small">Wdhl.:</span>
      <span class="spaceLeftRight" style="margin-left: 0">Alle</span>
      <input id="repeatedly" type="number" style="width: 60px" />
      <span style="padding: 0 10px">Woche(n), </span>
      <input
        id="infinity"
        type="checkbox"
        @click="inputDisabler(['infinity'], ['dateEnd', 'repeatedly'])"
      />
      Dauerhaft
      <br />
      <span class="small">Datum von:</span>
      <input id="dateStart" type="date" class="date" />
      <br />
      <span class="small">Datum bis:</span>
      <input id="dateEnd" type="date" />
      <br />
      <span class="small">Zeit:</span>
      <select name="tStart" id="tStart">
        <option
          v-for="(it, ind) in $store.state.timings"
          v-bind:key="ind"
          :value="ind + 1"
        >
          {{ ind + 1 }}.Std. {{ it.tStart }}
        </option>
      </select>
      -
      <select name="tEnd" id="tEnd">
        <option
          v-for="(it, ind) in $store.state.timings"
          v-bind:key="ind"
          :value="ind + 1"
        >
          {{ ind + 1 }}.Std. {{ it.tEnd }}
        </option>
      </select>
      <br />
      <span class="small">Angepinnt:</span>
      <input id="pinned" type="checkbox" />
    </fieldset>

    <span>
      <br />
      <button class="btnAddDelete" @click="makeAction('+')">+</button>
      <!--button class="btnAddDelete" @click="makeAction('-')">-</button-->
      <button class="btnAddDelete" @click="makeAction('Save')">Save</button>
      <button class="btnAddDelete" @click="makeAction('Reset')">Reset</button>
      <!--button class="btnAddDelete" @click="makeAction('Show')">Show</button-->
    </span>
  </div>
</template>

<script>
export default {
  props: {
    meetings: Array,
    type: String,
    person_index: Number,
  },
  components: {},
  data() {
    return {
      selectedMeeting: "",
    };
  },
  methods: {
    inputDisabler(idSource, idDestinationDisable, idDestinationEnable) {
      if (typeof idDestinationDisable != "undefined") {
        idDestinationDisable.forEach((element) => {
          document.getElementById(element).disabled =
            document.getElementById(idSource).checked;
        });
      }
      if (typeof idDestinationEnable != "undefined") {
        idDestinationEnable.forEach((element) => {
          document.getElementById(element).disabled =
            !document.getElementById(idSource).checked;
        });
      }
    },
    makeAction(name) {
      if (name == "+") {
        console.log(name);
        let length = this.meetings.length;
        if (length != 0) {
          this.makeAction("Save");
        }
        let data = {
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
        };
        console.log("Data");
        console.log(data);

        if (this.type == "calendar") {
          this.$store.state.meetings.push(data);
        } else if (this.type == "persons") {
          this.$store.state.persons[this.person_index].meetings.push(data);
        }
        if (length != 0) {
          this.makeAction("Reset");
        }
      } else if (name == "-") {
        console.log(name);
        this.meetings.pop();
      } else if (name == "Save") {
        console.log(name);
        let index = document.getElementById("meeting").value;
        if (!index) {
          index = 0;
        }
        let meeting = {
          num: document.getElementById("num").value,
          name: document.getElementById("meetings_name").value,
          name_short: document.getElementById("name_short").value,
          std_start: Number(document.getElementById("tStart").value),
          duration: Number(
            document.getElementById("tEnd").value -
              document.getElementById("tStart").value +
              1
          ),
          roomnumber: document.getElementById("roomnumber").value,
          date: {
            start: document.getElementById("dateStart").value,
            repeatedly: Number(document.getElementById("repeatedly").value),
            end: document.getElementById("dateEnd").value,
            infinity: document.getElementById("infinity").checked,
          },
          semester: document.getElementById("semester").value,
          studigang: document.getElementById("studigang").value,
          dozent: document.getElementById("dozent").value,
          pinned: document.getElementById("pinned").checked,
        };

        if (this.type == "calendar") {
          this.$store.commit("importMeetings", {
            data: meeting,
            index: index,
          });
        } else if (this.type == "persons") {
          console.log(meeting);
          console.log(index);
          console.log(this.person_index);
          this.$store.commit("importMeetingsPerson", {
            data: meeting,
            index: index,
            person_index: this.person_index,
          });
        }
        console.log(meeting);
      } else if (name == "Reset") {
        console.log(name);
        if (this.meetings.length == 0) {
          this.makeAction("+");
          console.log("Set value");
          document.getElementById("meeting").value = 0;
        } else {
          const index = document.getElementById("meeting").value;
          let data = this.meetings[index];
          console.log(data);
          document.getElementById("num").value = data.num;
          document.getElementById("meetings_name").value = data.name;
          document.getElementById("name_short").value = data.name_short;
          document.getElementById("dateStart").value = data.date.start;
          document.getElementById("dateEnd").value = data.date.end;
          document.getElementById("repeatedly").value = data.date.repeatedly;
          document.getElementById("infinity").checked = data.date.infinity;
          document.getElementById("roomnumber").value = data.roomnumber;
          document.getElementById("tStart").value = data.std_start;
          document.getElementById("tEnd").value =
            data.std_start + data.duration - 1;
          document.getElementById("semester").value = data.semester;
          document.getElementById("studigang").value = data.studigang;
          document.getElementById("dozent").value = data.dozent;
          document.getElementById("pinned").checked = data.pinned;
          if (data.date.infinity) {
            document.getElementById("dateEnd").disabled = true;
            document.getElementById("repeatedly").disabled = true;
          } else {
            document.getElementById("dateEnd").disabled = false;
            document.getElementById("repeatedly").disabled = false;
          }
        }
      } else if (name == "Show") {
        console.log(name);
        let data = this.meetings;
        console.log(data);
      } else if (name == "Delete") {
        console.log(name);
        this.makeAction("Reset");
        const index = Number(document.getElementById("meeting").value);
        console.log("Ind: " + index);
        let data = this.meetings;
        for (var n = index; n < data.length - 1; n++) {
          //console.log("n: " + n);
          this.moveInArray(n + 1, n, data);
          //console.log("--------------");
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
      //console.log("Moved " + pos1 + " to " + pos2 + " on Array " + array);
    },
  },
  mounted() {
    console.log("Mount");
    this.makeAction("Reset");
  },
  updated() {
    console.log("Update");
    this.makeAction("Reset");
  },
};
</script>

<style scoped>
#AddMeetingPopup {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  display: block;
  text-align: center;
  margin: 5px;
  overflow: visible;
}
.timing {
  width: 100px;
}
</style>