import { createStore } from 'vuex'

export default createStore({
    state: () => ({
        selectedForm: 'Sign in',
        loggedInUser: null,
        modalData: { display: 'd-none', modalType: 'success', modalText: '' }
    }),
    mutations: {
        setLoggedInUser: (state, payload) => {
            state.loggedInUser = payload;
        },
        setSelectedForm: (state, payload) => {
            state.selectedForm = payload;
        },
        setModalData: (state, payload) => {
            state.modalData = payload;
        }
    },
    getters: {
        getUser: ({ loggedInUser }) => loggedInUser,
        getSelectedForm: ({ selectedForm }) => selectedForm
    }
})