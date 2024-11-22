import apiClient from '@/apiClient';

const editeAppeal = {
  namespaced: true,

  state: {
    appeals: [],         // Список заявок
    errorMessage: '',    // Сообщение об ошибке
  },

  mutations: {
    setAppeals(state, appeals) {
      state.appeals = appeals;
    },
    setErrorMessage(state, message) {
      state.errorMessage = message;
    },
  },

  actions: {
    async fetchAppeals({ commit }, token) {
      try {
        const response = await apiClient.get('/appeals/v1.0/appeals', {
          headers: { Authorization: `Token ${token}` },
        });
        commit('setAppeals', response.data.results);
      } catch (error) {
        console.error('Ошибка загрузки заявок:', error);
        commit('setErrorMessage', 'Не удалось загрузить список заявок.');
      }
    },

    async editeSelectedAppeal({ dispatch }, { appealData, token }) {
      const params = {
        ...appealData,
        status_id: 0
      }

      try {
        await apiClient.patch(`/appeals/v1.0/appeals/${params.id}/`, params, {
          headers: { Authorization: `Token ${token}` },
        });
        // После успешного создания обновляем список заявок
        await dispatch('fetchAppeals', token);
      } catch (error) {
        console.error('Ошибка создания заявки:', error);
      }
    },
  },

  getters: {
    allAppeals(state) {
      return state.appeals;
    },
    errorMessage(state) {
      return state.errorMessage;
    },
  },
};

export default editeAppeal;
