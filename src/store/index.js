import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

//observable Variable für JSON-File Import
export const asyncData = Vue.observable({
    database: "This is empty"
})
//observable Variable für Bild Import
export const base64File = Vue.observable({
    data: "This is base64File"
})

//Vuex Store mit Arrays für die Kategorien
export default new Vuex.Store({
    state: {
        timings: [],
        meetings: [],
        persons: [],
        announcements: [],
        setup: {},
        logged_in: false,
    },
    getters: {},
    mutations: {
        //Regeln um Vuex Store zu beschreiben
        importTimings(state, payload) {
            state.timings = payload.data;
        },
        importMeetings(state, payload) {
            state.meetings[payload.index] = payload.data;
        },
        importMeetingsPerson(state, payload) {
            state.persons[payload.person_index].meetings[payload.index] = payload.data;
        },
        importPersons(state, payload) {
            state.persons[payload.index] = payload.data;
        },
        importAnnouncements(state, payload) {
            state.announcements[payload.index] = payload.data;
        },
        importSetup(state, payload) {
            state.setup = payload.data;
        },
    },
    actions: {}
});