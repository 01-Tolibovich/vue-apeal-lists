<template>
  <ModalUI :visible="visible" @close="closeModal">
    <template #header>
      <span>Заявка № {{ form?.number }}</span>
      <span class="status">{{ form?.status.name }}</span>
    </template>
    <template #default>
      <div class="appeal-form">
        <section class="first-section">
          <div>
            <label for="building">Дом</label>
            <!-- <input type="text" id="building" v-model="localForm.premise.address" /> -->
            <v-select v-model="localForm.premise.address" :value="selectedPremise" :options="premises" label="name"
              @search="onSearchPremises" placeholder="Начните вводить название дома" @update:modelValue="setPremiseId">
            </v-select>
          </div>
          <div>
            <label for="apartment">Квартира</label>
            <input type="number" id="apartment" v-model="localForm.apartment.number" />
          </div>
          <div>
            <label for="due_date">Срок</label>
            <input type="datetime-local" id="due_date" v-model="localForm.due_date" />
          </div>
        </section>
        <section class="second-section">
          <div>
            <label for="last_name">Фамилия</label>
            <input type="text" id="last_name" v-model="localForm.applicant.last_name" />
          </div>
          <div>
            <label for="first_name">Имя</label>
            <input type="text" id="first_name" v-model="localForm.applicant.first_name" />
          </div>
          <div>
            <label for="patronymic_name">Отчество</label>
            <input type="text" id="patronymic_name" v-model="localForm.applicant.patronymic_name" />
          </div>
          <div>
            <label for="phone">Телефон</label>
            <input type="text" id="phone" v-model="localForm.applicant.username" />
          </div>
          <div class="text-area">
            <label for="description">Описание</label>
            <textarea id="description" v-model="localForm.description"></textarea>
          </div>
        </section>
      </div>
    </template>
    <template #footer>
      <button @click="saveChanges">Сохранить</button>
    </template>
  </ModalUI>
</template>

<script>
import ModalUI from './UI/ModalUI.vue';
import vSelect from 'vue-select';
import apiClient from '@/apiClient';

export default {
  components: {
    ModalUI,
    vSelect,
  },
  props: {
    visible: {
      type: Boolean,
      required: true,
    },
    form: {
      type: Object,
      required: false,
    },
  },
  data() {
    return {
      premises: [],
      localForm: {
        premise: {
          address: this.form?.premise?.address || '',
        },
        apartment: {
          number: this.form?.apartment?.number || '',
        },
        due_date: this.form?.due_date || '',
        applicant: {
          last_name: this.form?.applicant?.last_name || '',
          first_name: this.form?.applicant?.first_name || '',
          patronymic_name: this.form?.applicant?.patronymic_name || '',
          username: this.form?.applicant?.username || '',
        },
        description: this.form?.description,
        premise_id: '',
        status_id: 1,
        id: this.form?.id
      },
    };
  },
  watch: {
    // Следим за обновлением пропа form
    form: {
      handler(newForm) {
        this.localForm = {
          premise: {
            address: newForm?.premise?.address || '',
          },
          apartment: {
            number: newForm?.apartment?.number || '',
          },
          due_date: newForm?.due_date || '',
          applicant: {
            last_name: newForm?.applicant?.last_name || '',
            first_name: newForm?.applicant?.first_name || '',
            patronymic_name: newForm?.applicant?.patronymic_name || '',
            username: newForm?.applicant?.username || '',
          },
          description: newForm?.description,
          premise_id: '',
          status_id: 1,
          id: this.form?.id
        };
      },
      immediate: true, // Выполняется сразу при монтировании
      deep: true, // Следит за вложенными изменениями
    },
  },
  methods: {
    closeModal() {
      this.$emit("close");
    },
    saveChanges() {
      this.$emit("save", this?.localForm);
    },

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
            value: item.id, // UUID дома
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
          `/apartments/?premise_id=${this.formData.premise_id}`,
          {
            params: { search: apartNum },
            headers: {
              Authorization: `Token ${token}`,
            },
          }
        );
        this.premises = response.data.results.map(item => ({
          value: item.id, // UUID дома
          name: item.address, // Название дома
        }));
      } catch (error) {
        console.error("Ошибка при поиске домов:", error);
      }
    },

    // Метод для установки premise_id при выборе дома
    setPremiseId(selectedPremise) {
      this.localForm.premise_id = selectedPremise.value;
    },

    // Метод для создания заявки
    // async createNewApplay() {
    //   const token = localStorage.getItem('authToken');
    //   await this.createAppeal({ appealData: this.formData, token });
    //   this.closeModal();
    // },
  },
};
</script>

<style lang="scss" scoped>
.appeal-form {

  @mixin section-layouts($col) {
    display: grid;
    column-gap: 20px;
    grid-template-columns: repeat($col, 1fr);
  }

  .first-section {
    @include section-layouts(3);
  }

  .second-section {
    @include section-layouts(4);

    .text-area {
      grid-column: 1/5;
    }
  }

  .status {
    justify-self: end;
  }
}
</style>
