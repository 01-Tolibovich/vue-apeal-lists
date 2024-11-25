<script setup lang="ts">
import LoginForm from '@/components/LoginForm.vue';
</script>

<template>
  <main class="login-page">
    <div class="overlay"></div>
    <LoginForm />
  </main>
</template>


<style scoped lang="scss">

.login-page {
  background-image: url('../assets/background/login-bg.jpeg');
  background-size: cover;
  background-position: center;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;

  .overlay {
    background-color: rgba(0, 0, 0, 0.4);
    position: absolute;
    width: 100%;
    height: 100%;
  }
}
</style>
