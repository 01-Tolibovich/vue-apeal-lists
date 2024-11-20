<template>
  <button @click="openModal">СОЗДАТЬ</button>
  <ModalUI :visible="isModalVisible" @close="closeModal">
    <template #header>
      <h2>Новая заявка</h2>
    </template>
    <template #default>
      <!-- Дом -->
      <label for="premise">Дом</label>
      <v-select v-model="selectedPremise" :options="premises" label="name" @search="onSearchPremises"
        placeholder="Начните вводить название дома" @input="setPremiseId"></v-select>
      <br>

      <!-- Квартира -->
      <label for="premise">Дом</label>
      <v-select v-model="selectedapartment" :options="apartments" label="name" @search="onSearchApartments"
        placeholder="Начните вводить название дома" @input="setPremiseId"></v-select>
      <br>

      <!-- Фамилия -->
      <label for="last-name">Фамилия</label>
      <input type="text" id="last-name" v-model="formData.applicant.last_name" />
      <br>

      <!-- Имя -->
      <label for="first-name">Имя</label>
      <input type="text" id="first-name" v-model="formData.applicant.first_name" />
      <br>

      <!-- Отчество -->
      <label for="patronymic-name">Отчество</label>
      <input type="text" id="patronymic-name" v-model="formData.applicant.patronymic_name" />
      <br>

      <!-- Телефон -->
      <label for="username">Телефон</label>
      <input type="text" id="username" v-model="formData.applicant.username" />
      <br>

      <!-- Описание -->
      <textarea placeholder="Добавьте описание" v-model="formData.description"></textarea>

      <!-- Срок -->
      <input type="datetime-local" v-model="formData.due_date" />
    </template>
    <template #footer>
      <button @click="createNewApplay">Создать заявку</button>
      <button @click="closeModal">Закрыть</button>
    </template>
  </ModalUI>
</template>

<script>
import ModalUI from './UI/ModalUI.vue';
import { mapActions } from 'vuex';
import vSelect from 'vue-select';  // Добавим компонент для автозаполнения
import apiClient from '@/apiClient';

export default {
  name: 'CreatePost',
  components: { ModalUI, vSelect },

  data() {
    return {
      isModalVisible: false,
      formData: {
        premise_id: '',
        apartment_id: '',
        applicant: {
          first_name: '',
          last_name: '',
          patronymic_name: '',
          username: '',
        },
        description: '',
        due_date: '',
        status_id: 1,
      },
      searchQuery: '',
      premises: [],
      apartments: [],
      selectedPremise: null, // Хранение выбранного дома
      selectedapartment: null
    };
  },

  methods: {
    ...mapActions('appeals', ['createAppeal']),

    openModal() {
      this.isModalVisible = true;
    },

    closeModal() {
      this.isModalVisible = false;
    },

    // Метод для поиска домов
    async onSearchPremises(query) {
      if (query.length >= 3) {
        try {
          const token = localStorage.getItem('authToken');
          const response = await apiClient.get(
            '/geo/v2.0/user-premises/',
            {
              params: { search: query },
              headers: {
                Authorization: `Token ${token}`,
              },
            }
          );
          this.premises = response.data.results.map(item => ({
            premise_id: item.id, // UUID дома
            name: item.address, // Название дома
          }));
        } catch (error) {
          console.error("Ошибка при поиске домов:", error);
        }
      }
    },


    async onSearchApartments(apartNum) {
      try {
          const token = localStorage.getItem('authToken');
          const response = await apiClient.get(
            `/?premise_id=${this.formData.premise_id}/`,
            {
              params: { search: apartNum },
              headers: {
                Authorization: `Token ${token}`,
              },
            }
          );
          this.premises = response.data.results.map(item => ({
            premise_id: item.id, // UUID дома
            name: item.address, // Название дома
          }));
        } catch (error) {
          console.error("Ошибка при поиске домов:", error);
        }
    },

    // Метод для установки premise_id при выборе дома
    setPremiseId(selectedPremise) {
      this.formData.premise_id = selectedPremise ? selectedPremise.premise_id : '';
    },

    // Метод для создания заявки
    async createNewApplay() {
      const token = localStorage.getItem('authToken');
      await this.createAppeal({ appealData: this.formData, token });
      this.closeModal();
    },
  },
};
</script>

<style scoped>
</style>
