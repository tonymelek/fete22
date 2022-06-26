import { createStore } from 'vuex'

export default createStore({
    state: () => ({
        selectedForm: 'Sign in',
        loggedInUser: null
    }),
    mutations: {
        setLoggedInUser: (state, payload) => {
            state.loggedInUser = payload;
        },
        setSelectedForm: (state, payload) => {
            state.selectedForm = payload;
        }
    },
    getters: {
        getUser: ({ loggedInUser }) => loggedInUser,
        getSelectedForm: ({ selectedForm }) => selectedForm
    }
})