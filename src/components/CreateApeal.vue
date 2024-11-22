<template>
  <button @click="openModal">СОЗДАТЬ</button>
  <!-- <ModalUI :visible="isModalVisible" @close="closeModal">
    <template #header>
      <span>Новая заявка</span>
      <span>Новая</span>
    </template>
    <template #default>
      <div class="apeale-form">
        <section class="first-section">
          <div>
            <label for="premise">Дом</label>
            <v-select v-model="selectedPremise" :value="selectedPremise" :options="premises" label="name"
              @search="onSearchPremises" placeholder="Начните вводить название дома" @update:modelValue="setPremiseId">
            </v-select>
          </div>
          <div>
            <label for="premise">Квартира</label>
            <input type="number">
          </div>
          <div>
            <label for="patronymic-name">Срок</label>
            <input type="datetime-local" v-model="formData.due_date" />
          </div>
        </section>
        <section class="second-section">
          <div>
            <label for="last-name">Фамилия</label>
            <input type="text" id="last-name" v-model="formData.applicant.last_name" />
          </div>
          <div>
            <label for="first-name">Имя</label>
            <input type="text" id="first-name" v-model="formData.applicant.first_name" />
          </div>
          <div>
            <label for="patronymic-name">Отчество</label>
            <input type="text" id="patronymic-name" v-model="formData.applicant.patronymic_name" />
          </div>
          <div>
            <label for="username">Телефон</label>
            <input type="text" id="username" v-model="formData.applicant.username" />
          </div>
          <div class="text-area">
            <label for="username">Описание</label>
            <textarea placeholder="Добавьте описание" v-model="formData.description"></textarea>
          </div>
        </section>
      </div>
    </template>
    <template #footer>
      <div></div>
      <button @click="createNewApplay">Создать заявку</button>
    </template>
  </ModalUI> -->
  <AppealsForm :visible="isModalVisible" @close="closeModal" @save="createNewApplay" />
</template>

<script>
// import ModalUI from './UI/ModalUI.vue';
import { mapActions } from 'vuex';
// import vSelect from 'vue-select';  // Добавим компонент для автозаполнения
// import apiClient from '@/apiClient';
import AppealsForm from './AppealsForm.vue';

export default {
  name: 'CreateApeal',
  components: { AppealsForm },

  data() {
    return {
      isModalVisible: false,
      // formData: {
      //   premise_id: '',
      //   apartment_id: '',
      //   applicant: {
      //     first_name: '',
      //     last_name: '',
      //     patronymic_name: '',
      //     username: '',
      //   },
      //   description: '',
      //   due_date: '',
      //   status_id: 1,
      // },
      // searchQuery: '',
      // premises: [],
      // apartments: [],
      // selectedPremise: null, // Хранение выбранного дома
      // selectedapartment: null
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

    handleSave(formData) {
      console.log(10101010, formData);

    },

    // Метод для поиска домов
    // async onSearchPremises(query) {
    //   if (query.length >= 3) {
    //     try {
    //       const token = localStorage.getItem('authToken');
    //       const response = await apiClient.get(
    //         '/geo/v2.0/user-premises/',
    //         {
    //           params: { search: query },
    //           headers: {
    //             Authorization: `Token ${token}`,
    //           },
    //         }
    //       );
    //       this.premises = response.data.results.map(item => ({
    //         value: item.id, // UUID дома
    //         name: item.address, // Название дома
    //       }));
    //     } catch (error) {
    //       console.error("Ошибка при поиске домов:", error);
    //     }
    //   }
    // },


    // async onSearchApartments(apartNum) {

    //   try {
    //     const token = localStorage.getItem('authToken');
    //     const response = await apiClient.get(
    //       `/apartments/?premise_id=${this.formData.premise_id}`,
    //       {
    //         params: { search: apartNum },
    //         headers: {
    //           Authorization: `Token ${token}`,
    //         },
    //       }
    //     );
    //     this.premises = response.data.results.map(item => ({
    //       premise_id: item.id, // UUID дома
    //       name: item.address, // Название дома
    //     }));
    //   } catch (error) {
    //     console.error("Ошибка при поиске домов:", error);
    //   }
    // },

    // // Метод для установки premise_id при выборе дома
    // setPremiseId(selectedPremise) {
    //   this.formData.premise_id = selectedPremise.value;
    // },

    // Метод для создания заявки
    async createNewApplay(formData) {
      const token = localStorage.getItem('authToken');
      await this.createAppeal({ appealData: formData, token });
      this.closeModal();
    },
  },
};
</script>

<style scoped></style>
