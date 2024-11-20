<template>
  <div class="appeals-tabble">
    <template v-for="(appeal, index) in appeals" :key="appeal.id">
      <div class="row">
        <header v-if="index === 0">№</header>
        <button @click="openModal(appeal)" class="appeal-number">{{ appeal.number }}</button>
      </div>
      <div class="row">
        <header v-if="index === 0">Создана</header>
        <span>{{ $moment(appeal.created_at).format('DD.MM.YYYY') }}</span>
      </div>
      <div class="row">
        <header v-if="index === 0">Адрес</header>
        <span>{{ appeal.premise?.full_address }} {{ appeal.apartment?.label }}</span>
      </div>
      <div class="row">
        <header v-if="index === 0">Заявитель</header>
        <span>{{ appeal.applicant.last_name }}</span>
      </div>
      <div class="row">
        <header v-if="index === 0">Описание</header>
        <span>{{ appeal.description }}</span>
      </div>
      <div class="row">
        <header v-if="index === 0">Срок</header>
        <span>{{ appeal.due_date && $moment(appeal.due_date).format('DD.MM.YYYY HH:mm') }}</span>
      </div>
      <div class="row">
        <header v-if="index === 0">Статус</header>
        <span>{{ appeal.status.name }}</span>
      </div>
    </template>
  </div>
</template>

<script>
export default {
  props: {
    appeals: Array,
    openModal: Function,
  },
};
</script>

<style lang="scss" scoped>
$row-margin: 15px;

.appeals-tabble {
  display: grid;
  grid-template-columns: min-content repeat(6, auto);
  column-gap: 16px;

  .row {
    margin: $row-margin 0;

    header {
      margin-bottom: $row-margin;
    }
  }

  .appeal-number {
    font-size: 14px;
    padding: 6px 14px;
  }
}
</style>
