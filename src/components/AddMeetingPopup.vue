<template>
  <div id="AddMeetingPopup">
    <h1>Create new Meeting</h1>
    <span v-for="(item, index) in this.$store.state.meetings" :key="index">
      <fieldset style="text-align: left">
        <h3>
          <input
            :id="index + 'num'"
            type="number"
            style="width: calc(20% - 8px)"
          />
          <input
            :id="index + 'name'"
            type="text"
            style="width: calc(70% - 8px)"
          />
          <input
            :id="index + 'name_short'"
            type="text"
            style="width: calc(10% - 8px)"
          />
        </h3>
        Datum:
        <input :id="index + 'dateStart'" type="date" class="date" />
        <input :id="index + 'repeatedly'" type="number" class="repeatedly" />
        wl., bis
        <input :id="index + 'dateEnd'" type="date" />
        <input :id="index + 'infinity'" type="checkbox" />
        Dauerhaft
        <br />
        Zeit:
        <select name="tStart" :id="index + 'tStart'">
          <option
            v-for="(it, ind) in $store.state.timings"
            v-bind:key="ind"
            :value="ind + 1"
          >
            {{ ind + 1 }}.Std. {{ it.tStart }}
          </option>
        </select>
        -
        <select name="tEnd" :id="index + 'tEnd'">
          <option
            v-for="(it, ind) in $store.state.timings"
            v-bind:key="ind"
            :value="ind + 1"
          >
            {{ ind + 1 }}.Std. {{ it.tEnd }}
          </option>
        </select>
        <br />
        Studiengänge:
        <input :id="index + 'studigang'" type="text" />

        Semester:
        <input :id="index + 'semester'" type="text" />
        <br />
        DozentIn:
        <input :id="index + 'dozent'" type="text" />
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
export default {
  data() {
    return {};
  },
  methods: {
    makeAction(name) {
      if (name == "+") {
        console.log(name);
        this.makeAction("Save");
        let arrayLen = this.$store.state.meetings.length;
        let data = {
          id: arrayLen,
          num: "",
          name: "",
          name_short: "",
          std_start: Number("1"),
          duration: Number("2"),
          date: {
            start: "",
            repeatedly: Number("1"),
            end: "",
            infinity: true,
          },
          semester: "",
          studigang: "",
          dozent: "",
        };
        this.$store.state.meetings.push(data);
      } else if (name == "-") {
        console.log(name);
        this.$store.state.meetings.pop();
      } else if (name == "Save") {
        console.log(name);
        let data = [];
        for (
          let index = 0;
          index < this.$store.state.meetings.length;
          index++
        ) {
          let meeting = {
            id: index,
            num: document.getElementById(index + "num").value,
            name: document.getElementById(index + "name").value,
            name_short: document.getElementById(index + "name_short").value,
            std_start: Number(document.getElementById(index + "tStart").value),
            duration: Number(
              document.getElementById(index + "tEnd").value -
                document.getElementById(index + "tStart").value +
                1
            ),
            date: {
              start: document.getElementById(index + "dateStart").value,
              repeatedly: Number(
                document.getElementById(index + "repeatedly").value
              ),
              end: document.getElementById(index + "dateEnd").value,
              infinity: document.getElementById(index + "infinity").checked,
            },
            semester: document.getElementById(index + "semester").value,
            studigang: document.getElementById(index + "studigang").value,
            dozent: document.getElementById(index + "dozent").value,
          };
          data.push(meeting);
        }
        this.$store.commit("importMeetings", {
          data: data,
        });
        console.log(data);
      } else if (name == "Reset") {
        console.log(name);
        for (
          let index = 0;
          index < this.$store.state.meetings.length;
          index++
        ) {
          let data = this.$store.state.meetings[index];
          document.getElementById(index + "num").value = data.num;
          document.getElementById(index + "name").value = data.name;
          document.getElementById(index + "name_short").value = data.name_short;
          document.getElementById(index + "dateStart").value = data.date.start;
          document.getElementById(index + "dateEnd").value = data.date.end;
          document.getElementById(index + "repeatedly").value =
            data.date.repeatedly;
          document.getElementById(index + "infinity").checked =
            data.date.infinity;
          document.getElementById(index + "tStart").value = data.std_start;
          document.getElementById(index + "tEnd").value =
            data.std_start + data.duration - 1;
          document.getElementById(index + "semester").value = data.semester;
          document.getElementById(index + "studigang").value = data.studigang;
          document.getElementById(index + "dozent").value = data.dozent;
          if (data.date.infinity) {
            document.getElementById(index + "dateEnd").disabled = true;
            document.getElementById(index + "dateEnd").background = true;
          } else {
            document.getElementById(index + "dateEnd").disabled = false;
          }
        }
      } else if (name == "Show") {
        console.log(name);
        let data = this.$store.state.meetings;
        console.log(data);
      }
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
#AddMeetingPopup {
  display: block;
  text-align: center;
  margin: 5px;
  overflow: visible;
}
.timing {
  width: 100px;
}
.repeatedly {
  margin: 0 5px;
  width: 40px;
}
</style>