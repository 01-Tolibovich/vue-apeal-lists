<template>
  <div v-if="visible" class="modal-overlay">
    <div class="modal">
      <header class="modal-header">
        <slot name="header">
          <h2>Заголовок модального окна</h2>
        </slot>
        <button class="close-button" @click.self="closeModal">×</button>
      </header>
      <section class="modal-body">
        <slot></slot>
      </section>
      <footer class="modal-footer">
        <slot name="footer">
          <button @click="closeModal">Закрыть</button>
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
  width: 400px;
  position: relative;
}
.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #ccc;
  padding-bottom: 10px;
}
.modal-body {
  padding: 10px 0;
}
.modal-footer {
  border-top: 1px solid #ccc;
  padding-top: 10px;
}
.close-button {
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
}
</style>
