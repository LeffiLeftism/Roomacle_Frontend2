import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        timings: [],
        meetings: [],
        persons: [],
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
        importSetup(state, payload) {
            state.setup = payload.data;
        },
    },
    actions: {}
});