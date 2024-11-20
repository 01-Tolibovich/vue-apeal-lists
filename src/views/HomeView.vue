<template>
  <div class="appeals-page">
    <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
    <div class="create-post">
      <CreateApeal />
    </div>
    <AppealsTabble :appeals="appeals" :openModal="openModal" />

    <!-- <p v-else>Нет доступных заявок</p> -->
    <Pagination :currentPage="currentPage" :totalPages="totalPages" :prevPage="prevPage" :nextPage="nextPage" />

    <ModalUI :visible="isModalVisible" @close="closeModal">
      <template #header>
        <h2>Редактирование заявки</h2>
      </template>
      <template #default>
        <p><strong>Адрес:</strong> {{ appeal.premise?.full_address }} {{ appeal.apartment?.number }}</p>
        <p><strong>Заявитель:</strong> {{ appeal.applicant?.first_name }} {{ appeal.applicant?.last_name }}</p>
        <textarea v-model="appeal.description" placeholder="Измените описание"></textarea>
      </template>
      <template #footer>
        <button @click="saveChanges">Сохранить</button>
        <button @click="closeModal">Закрыть</button>
      </template>
    </ModalUI>
  </div>
</template>

<script>
import AppealsTabble from '@/components/AppealsTabble.vue';
import Pagination from '@/components/Pagination.vue';
import ModalUI from '@/components/UI/ModalUI.vue';
import CreateApeal from '@/components/CreateApeal.vue';

export default {
  components: { AppealsTabble, Pagination, ModalUI, CreateApeal },
  data() {
    return {
      // appeals: [],
      // count: 0,
      // pageSize: 10,
      isModalVisible: false,
      appeal: {
        premise: '',
        apartment: '',
        applicant: '',
        description: '',
      },
    };
  },


  computed: {
    // Получение списка заявок из Vuex
    appeals() {
      return this.$store.getters.allAppeals;
    },
    // Сообщение об ошибке
    errorMessage() {
      return this.$store.getters.errorMessage;
    },
    // Текущая страница
    currentPage() {
      return this.$store.getters.currentPage;
    },
    // Общее количество страниц
    totalPages() {
      return this.$store.getters.totalPages;
    },
  },


  created() {
    const token = localStorage.getItem('authToken');
    if (!token) {
      this.$router.push('/login');
    } else {
      this.$store.dispatch('fetchAppeals', token);
    }
  },
  methods: {
    nextPage() {
      const token = localStorage.getItem('authToken');
      if (token) {
        this.$store.dispatch('nextPage', token);
      }
    },
    prevPage() {
      const token = localStorage.getItem('authToken');
      if (token) {
        this.$store.dispatch('prevPage', token);
      }
    },

    openModal(item) {
      this.appeal = item;
      this.isModalVisible = true;

    },

    closeModal() {
      this.isModalVisible = false;
    },

    saveChanges() {
      this.closeModal();
    },
  },
};
</script>

<style lang="scss" scoped>
.appeals-page {
  display: grid;

  .create-post {
    justify-self: end;
  }
}
</style>
