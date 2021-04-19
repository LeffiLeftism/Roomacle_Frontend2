import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        timings: [],
        meetings: [],
        persons: [],
        lostandfounds: [],
        announcements: [],
        setup: {},
    },
    getters: {},
    mutations: {
        importTimings(state, payload) {
            state.timings = payload.data;
        },
        importMeetings(state, payload) {
            state.meetings = payload.data;
        },
        importPersons(state, payload) {
            state.persons = payload.data;
        },
        importLostAndFounds(state, payload) {
            state.lostandfounds = payload.data;
        },
        importAnnouncements(state, payload) {
            state.announcements = payload.data;
        },
        importSetup(state, payload) {
            state.setup = payload.data;
        },
    },
    actions: {}
});