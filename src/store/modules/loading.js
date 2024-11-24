const state = () => ({
  isLoading: false,
});

const mutations = {
  setLoading(state, isLoading) {
    state.isLoading = isLoading;
  },
};

const actions = {
  startLoading({ commit }) {
    commit("setLoading", true);
  },
  stopLoading({ commit }) {
    commit("setLoading", false);
  },
};

const getters = {
  isDataLoading: (state) => state.isLoading,
};

export default {
  namespaced: true, // Позволяет изолировать модуль
  state,
  mutations,
  actions,
  getters,
};
