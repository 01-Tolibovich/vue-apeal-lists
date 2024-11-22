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
      <AppealsForm :visible="isModalVisible" :form="appeal" @close="closeModal" @save="editeAppeal" />
      <!-- <ModalUI :visible="isModalVisible" @close="closeModal">
        <template #header>
            <span>Заявка № {{ appeal.number }}</span>
            <span class="status">{{ appeal.status.name }}</span>
        </template>
<template #default>
          <div class="apeale-form">
            <section class="first-section">
              <div>
                <label for="building">Дом</label>`
                <input type="text" name="" id="building" v-model="apealAdress">
              </div>
              <div>
                <label for="apartment">Квартира</label>
                <input type="number" name="" id="apartment" v-model="apartmentNumber">
              </div>
              <div>
                <label for="due_date">Срок</label>
                <input type="datetime-local" name="" id="due_date" v-model="appeal.due_date">
              </div>
            </section>
            <section class="second-section">
              <div>
                <label for="last_name">Фамилия</label>
                <input type="text" id="last_name" v-model="appeal.applicant.last_name">
              </div>
              <div>
                <label for="first_name">Имя</label>
                <input type="text" id="first_name" v-model="appeal.applicant.first_name">
              </div>
              <div>
                <label for="patronymic_name">Отчество</label>
                <input type="text" id="patronymic_name" v-model="appeal.applicant.patronymic_name">
              </div>
              <div>
                <label for="phone">Телефон</label>
                <input type="number" id="phone">
              </div>
              <div class="text-area">
                <label for="description">Описание</label>
                <textarea name="" id="description" v-model="appeal.description"></textarea>
              </div>
            </section>
          </div>
        </template>
<template #footer>
          <div></div>
          <button class="align-left" @click="saveChanges">Сохранить</button>
        </template>
</ModalUI> -->
    </div>
  </div>
</template>

<script>
import AppealsTabble from '@/components/AppealsTabble.vue';
// import ModalUI from '@/components/UI/ModalUI.vue';
import CreateApeal from '@/components/CreateApeal.vue';
import AppealsForm from '@/components/AppealsForm.vue';
import { mapActions } from 'vuex';

export default {
  components: { AppealsTabble, CreateApeal, AppealsForm },
  data() {
    return {
      isModalVisible: false,
      appeal: '',
      applicant: '',
      description: '',
      apartment: '',
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
    apartmentNumber: {
      get() {
        return this.appeal.apartment?.number || '';
      },
      set(value) {
        if (this.appeal.apartment) {
          this.appeal.apartment.number = value;
        }
      },
    },
    apealAdress: {
      get() {
        return this.appeal.apartment?.address || '';
      },
      set(value) {
        if (this.appeal.apartment) {
          this.appeal.apartment.number = value;
        }
      },
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
    ...mapActions('editeAppeal', ['editeSelectedAppeal']),

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
      this.appeal = item || {
        number: "",
        status: { name: "" },
        due_date: "",
        applicant: {
          last_name: "",
          first_name: "",
          patronymic_name: "",
        },
        description: "",
      };
      this.isModalVisible = true;
    },

    closeModal() {
      this.isModalVisible = false;
    },

    saveChanges() {
      this.closeModal();
    },

    async editeAppeal(formData) {
      const token = localStorage.getItem('authToken');

      await this.editeSelectedAppeal({ appealData: formData, token });
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
