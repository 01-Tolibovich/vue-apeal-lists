// src/store/index.js
import { createStore } from 'vuex';
import apiClient from '../apiClient';
import auth from './modules/auth';
import appeals from './modules/appeals'

const store = createStore({
  modules: {
    auth,
    appeals,
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
    async fetchAppeals({ commit, state }, token) {
      try {
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
      }
    },

    nextPage({ commit, dispatch, state }, token) {
      if (state.currentPage < state.totalPages) {
        commit('setCurrentPage', state.currentPage + 1);
        dispatch('fetchAppeals', token);
      }
    },

    prevPage({ commit, dispatch, state }, token) {
      if (state.currentPage > 1) {
        commit('setCurrentPage', state.currentPage - 1);
        dispatch('fetchAppeals', token);
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
    currentPage(state) {
      return state.currentPage;
    },
    totalPages(state) {
      return state.totalPages;
    },
  },
});

export default store;
