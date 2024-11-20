<template>
  <div>
    <button :disabled="currentPage === 1" @click="prevPage">Предыдущая</button>
    <button :disabled="currentPage === totalPages" @click="nextPage">Следующая</button>
  </div>
</template>

<script>
export default {
  props: {
    currentPage: Number,
    totalPages: Number,
    prevPage: Function,
    nextPage: Function,
  },
};
</script>
