<script setup lang="ts">
import LoginForm from '@/components/LoginForm.vue';
</script>

<template>
  <main class="login-page">
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
}
</style>
