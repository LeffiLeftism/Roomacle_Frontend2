import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        timings: [],
        meetings: [],
        persons: [],
        announcements: [],
        setup: {},
    },
    getters: {},
    mutations: {
        importTimings(state, payload) {
            state.timings = payload.data;
        },
        importMeetings(state, payload) {
            state.meetings[payload.index] = payload.data;
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