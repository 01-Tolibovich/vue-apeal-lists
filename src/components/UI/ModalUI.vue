<template>
  <div v-if="visible" class="modal-overlay" @click="closeModal">
    <div class="modal" @click.stop>
      <header class="modal-header">
        <slot name="header">
        </slot>
        <!-- <button class="close-button" @click="closeModal">×</button> -->
      </header>
      <section class="modal-body">
        <slot></slot>
      </section>
      <footer @click.stop class="modal-footer" >
        <slot @click.stop name="footer" >
          <button>Сохранить</button>
        </slot>
      </footer>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    visible: {
      type: Boolean,
      required: true,
    },
  },
  methods: {
    closeModal() {
      this.$emit('close');
    },
  },
};
</script>

<style>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}
.modal {
  background: white;
  padding: 20px;
  border-radius: 8px;
  max-width: 738px;
  width: 100%;
  position: relative;
}
.modal-header {
  padding-bottom: 10px;
  display: flex;
  justify-content: space-between;
}
.modal-body {
  padding: 10px 0;
}
.modal-footer {
  padding-top: 10px;
  display: flex;
  justify-content: space-between;
}
.close-button {
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
}
</style>
