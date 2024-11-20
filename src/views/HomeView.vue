<template>
  <div>
    <h1 class="container title">Список заявок</h1>
    <div class="appeals-page container">
      <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
      <div class="align-left">
        <CreateApeal />
      </div>
      <AppealsTabble :appeals="appeals" :openModal="openModal" />

      <!-- <p v-else>Нет доступных заявок</p> -->
      <div class="align-left paginations-desktop"><vue-awesome-paginate :total-items="totalPages" :items-per-page="10"
          :max-pages-shown="4" v-model="currentPage" @click="onClickHandler" /></div>
      <div class="align-left paginations-mobile"><vue-awesome-paginate :total-items="totalPages" :items-per-page="10"
          :max-pages-shown="1" v-model="currentPage" @click="onClickHandler" /></div>
      <ModalUI :visible="isModalVisible" @close="closeModal">
        <template #header>
          <h2>Заявка № {{ appeal.number }}</h2>
        </template>
        <template #default>
          <div>
            <label for="building">Дом</label>
            <input type="text" name="" id="building" v-model="appeal.premise.full_address">
            <label for="apartment">Квартира</label>
            <input type="text" name="" id="apartment" v-model="appeal.apartment.number">
            <label for="due_date">Срок</label>
            <input type="text" name="" id="due_date" v-model="appeal.due_date">
          </div>
        </template>
        <template #footer>
          <button @click="saveChanges">Сохранить</button>
          <button @click="closeModal">Закрыть</button>
        </template>
      </ModalUI>
    </div>
  </div>
</template>

<script>
import AppealsTabble from '@/components/AppealsTabble.vue';
import ModalUI from '@/components/UI/ModalUI.vue';
import CreateApeal from '@/components/CreateApeal.vue';

export default {
  components: { AppealsTabble, ModalUI, CreateApeal },
  data() {
    return {
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
    onClickHandler(pageNumber) {
      const token = localStorage.getItem('authToken');
      if (token) {
        const params = {
          token,
          pageNumber
        }
        this.$store.dispatch('paginatePages', params);
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
.title {
  background-color: transparent;
  font-size: 20px;
}

.appeals-page {
  display: grid;

  .align-left {
    justify-self: end;
  }

  @media screen and (max-width: $sm) {
    .paginations-desktop {
      display: none;
    }
    .paginations-mobile {
      justify-self: center;
    }
  }

  @media screen and (min-width: ($sm + 1px)) {
    .paginations-mobile {
      display: none;
    }
  }
}
</style>
