<template>
  <div class="apleas-wrapper">
    <div class="appeals-tabble">
      <template v-for="(appeal, index) in appeals" :key="appeal.id">
        <div class="row">
          <header v-if="index === 0">№</header>
          <button @click="openModal(appeal)" class="appeal-number">{{ appeal.number }}</button>
          {{ console.log(6666, openModal)
          }}
        </div>
        <div class="row">
          <header v-if="index === 0">Создана</header>
          <span>{{ $moment(appeal.created_at).format('DD.MM.YYYY') }}</span>
        </div>
        <div class="row">
          <header v-if="index === 0">Адрес</header>
          <span>{{ appeal.premise?.address }} {{ appeal.apartment?.label }}</span>
        </div>
        <div class="row">
          <header v-if="index === 0">Заявитель</header>
          <span>{{ appeal.applicant.last_name }}</span>
        </div>
        <div class="row description">
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

.apleas-wrapper {
  overflow-x: auto;

  .appeals-tabble {
    display: grid;
    grid-template-columns: min-content repeat(6, auto);
    // column-gap: 16px;
    min-width: 1060px;


    .row {
      padding: $row-margin 16px;
      border-bottom: 1px solid $borderline;
      display: flex;
      flex-direction: column;
      justify-content: center;

      header {
        margin-bottom: $row-margin;
        color: $primary-color;
      }
    }

    .appeal-number {
      font-size: 14px;
      padding: 6px 14px;
    }

    .description {

      span {
        text-overflow: ellipsis;
        max-width: 300px;
        text-wrap: nowrap;
        overflow: hidden;
      }
    }
  }
}
</style>
