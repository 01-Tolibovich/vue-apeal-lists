<template>
  <button @click="openModal">СОЗДАТЬ</button>
  <AppealsForm :visible="isModalVisible" @close="closeModal" @save="createNewApplay" />
</template>

<script>
// import ModalUI from './UI/ModalUI.vue';
import { mapActions } from 'vuex';
import AppealsForm from './AppealsForm.vue';

export default {
  name: 'CreateApeal',
  components: { AppealsForm },

  data() {
    return {
      isModalVisible: false,
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

    // Метод для создания заявки
    async createNewApplay(formData) {
      const token = localStorage.getItem('authToken');
      await this.createAppeal({ appealData: formData, token });
      this.closeModal();

      await this.$store.dispatch('fetchAppeals', token);
    },
  },
};
</script>

<style scoped></style>
