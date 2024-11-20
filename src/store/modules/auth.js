import apiClient from '../../apiClient';

const auth = {
  namespaced: true,

  state: {
    loading: false,
    errorMessage: '',
  },

  mutations: {
    setLoading(state, status) {
      state.loading = status;
    },
    setErrorMessage(state, message) {
      state.errorMessage = message;
    },
  },

  actions: {
    async login({ commit }, { username, password }) {
      commit('setLoading', true);
      commit('setErrorMessage', '');

      try {
        const response = await apiClient.post('/auth/login/', {
          username,
          password,
        });

        // Если запрос успешен, сохраняем токен
        localStorage.setItem('authToken', response.data.key);
      } catch (error) {
        // Обработка ошибок
        if (error.response && error.response.status === 401) {
          commit('setErrorMessage', 'Неправильные данные');
        } else {
          console.error('Ошибка при отправке запроса:', error);
          commit('setErrorMessage', 'Произошла ошибка. Попробуйте снова.');
        }
      } finally {
        commit('setLoading', false);
      }
    },
  },
};

export default auth;
