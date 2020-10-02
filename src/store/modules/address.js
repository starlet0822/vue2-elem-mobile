import api from "../../api";

export default {
    // namespaced: true,
    state: {
        keyword: "",
        // poisList: [],
    },
    mutations: {
        SET_KEYWORD(state, payload) {
            state.keyword = payload
        }
    },
    actions: {
    },
    modules: {
    }
}