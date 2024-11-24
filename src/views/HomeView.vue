<template>
  <div>
    <LoaderAnimation/>
    <h1 class="container title">Список заявок</h1>
    <div class="appeals-page container">
      <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
      <div class="align-left">
        <CreateApeal />
      </div>
      <AppealsTabble :appeals="appeals" :openModal="openModal" />
      <div class="bottom-block">
        <div class="appeals-quantity">
          <div>{{ currentPage }} - {{ Math.ceil(count / parseInt(pageSize)) }} из {{ count + 1 }} записей</div>
          <select id="page-size" @change="changePageSize($event.target.value)">
            <option value="5">5</option>
            <option value="10" selected>10</option>
            <option value="20">20</option>
            <option value="50">50</option>
          </select>
          {{ console.log(9999 )
            }}
        </div>
        <div class="align-left paginations-desktop">
          <vue-awesome-paginate :total-items="count" :items-per-page="parseInt(pageSize)" :max-pages-shown="4"
            v-model="currentPage" @click="onClickHandler" />
        </div>
        <div class="align-left paginations-mobile">
          <vue-awesome-paginate :total-items="totalPages" :items-per-page="parseInt(pageSize)" :max-pages-shown="1"
            v-model="currentPage" @click="onClickHandler" />
        </div>
      </div>
      <AppealsForm :visible="isModalVisible" :form="appeal" @close="closeModal" @save="editeAppeal" />
    </div>
  </div>
</template>

<script>
import AppealsTabble from '@/components/AppealsTabble.vue';
import CreateApeal from '@/components/CreateApeal.vue';
import AppealsForm from '@/components/AppealsForm.vue';
import LoaderAnimation from '@/components/UI/LoaderAnimation.vue';
import { mapActions, mapGetters } from 'vuex';

export default {
  components: { AppealsTabble, CreateApeal, AppealsForm, LoaderAnimation },
  data() {
    return {
      isDataLoading: false,
      isModalVisible: false,
      appeal: '',
      applicant: '',
      description: '',
      apartment: '',
      itemsPerPage: 0,
      pageSize: 10,
    };
  },


  computed: {
    ...mapGetters("loading", ["isDataLoading"]), // Получение isDataLoading
    ...mapGetters(['currentPage', 'totalPages', 'count']),
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
    count() {
      return this.$store.getters.count
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


  async created() {
    const token = localStorage.getItem('authToken');
    if (!token) {
      await this.$router.push('/login');
    } else {
      await this.$store.dispatch('fetchAppeals', token);
    }
  },
  methods: {
    ...mapActions('editeAppeal', ['editeSelectedAppeal']),
    ...mapActions(['updatePageSize', 'updateCurrentPage']),

    async changePageSize(newPageSize) {
      this.isDataLoading = true;
      this.pageSize = newPageSize

      try {
        const token = localStorage.getItem('authToken');
      await this.updatePageSize({ pageSize: parseInt(newPageSize), token });
      } catch (error) {
        console.log(error);

      } finally {
        this.isDataLoading = false;
      }
    },

    changePage(newPageNumber) {
      const token = localStorage.getItem('authToken');
      this.updateCurrentPage({ pageNumber: newPageNumber, token });
    },

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

      await this.$store.dispatch('fetchAppeals', token);
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

  .bottom-block {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 32px;

    select {
      width: 84px;
      margin-left: 16px;
    }
  }

  .appeals-quantity {
    display: flex;
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
