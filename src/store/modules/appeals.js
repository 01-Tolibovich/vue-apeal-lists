import apiClient from '@/apiClient';
import loading from './loading';


const appeals = {
  namespaced: true,

  modules: {
    loading,
  },

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

    async createAppeal({ dispatch }, { appealData, token }) {
      dispatch('loading/startLoading', null, { root: true });
      try {
        await apiClient.post('/appeals/v1.0/appeals/', appealData, {
          headers: { Authorization: `Token ${token}` },
        });
        // После успешного создания обновляем список заявок
        await dispatch('fetchAppeals', token);
      } catch (error) {
        console.error('Ошибка создания заявки:', error);
      } finally {
        dispatch('loading/stopLoading', null, { root: true });
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

export default appeals;
