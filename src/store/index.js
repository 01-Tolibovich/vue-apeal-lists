import { createStore } from 'vuex';
import apiClient from '../apiClient';
import auth from './modules/auth';
import appeals from './modules/appeals';
import editeAppeal from './modules/editeAppeal';
import loading from './modules/loading';

const store = createStore({
  modules: {
    auth,
    appeals,
    editeAppeal,
    loading,
  },
  state() {
    return {
      appeals: [],         // Список заявок
      currentPage: 1,      // Текущая страница
      totalPages: 1,       // Всего страниц
      count: 0,            // Общее количество заявок
      errorMessage: '',    // Сообщение об ошибке
      pageSize: 10,        // Колличество рядов
    };
  },
  mutations: {
    setPageSize(state, pageSize) {
      state.pageSize = pageSize;
    },
    setAppeals(state, data) {
      state.appeals = data.results;
      state.totalPages = data.pages;
      state.count = data.count;
    },
    setErrorMessage(state, message) {
      state.errorMessage = message;
    },
    setCurrentPage(state, page) {
      state.currentPage = page;
    },
  },
  actions: {
    updatePageSize({ commit, dispatch }, params) {
      const { pageSize, token } = params;

      commit('setPageSize', pageSize); // Устанавливаем новый размер страницы
      commit('setCurrentPage', 1);    // Сбрасываем текущую страницу на первую
      dispatch('fetchAppeals', token); // Перезапрашиваем данные с новыми параметрами
    },

    async fetchAppeals({ commit, dispatch, state }, token) {

      try {
        dispatch('loading/startLoading', null, { root: true });
        const response = await apiClient.get('/appeals/v1.0/appeals/', {
          headers: {
            Authorization: `Token ${token}`,
          },
          params: {
            page: state.currentPage,
            page_size: state.pageSize,
          },
        });

        commit('setAppeals', response.data);
      } catch (error) {
        if (error.response && error.response.status === 401) {
          localStorage.removeItem('authToken');
          commit('setErrorMessage', 'Не удалось загрузить данные. Пожалуйста, войдите заново.');
          // Можно использовать роутер для редиректа
        } else {
          console.error('Ошибка при загрузке заявок:', error);
          commit('setErrorMessage', 'Не удалось загрузить список заявок. Попробуйте позже.');
        }
      } finally {
        dispatch('loading/stopLoading', null, { root: true });
      }
    },

    paginatePages({ commit, dispatch, state }, params) {
      const { token, pageNumber } = params

      commit('setCurrentPage', state.currentPage = pageNumber);
      dispatch('fetchAppeals', token);
    },
  },
  getters: {
    allAppeals(state) {
      return state.appeals;
    },
    errorMessage(state) {
      return state.errorMessage;
    },
    currentPage(state) {
      return state.currentPage;
    },
    totalPages(state) {
      return state.totalPages;
    },
    count(state) {
      return state.count;
    }
  },
});

export default store;
