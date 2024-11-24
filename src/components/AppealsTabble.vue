<template>
  <div className="apleas-wrapper">
    <div className="appeals-tabble">
      <template v-for="(appeal, index) in appeals" :key="appeal.id">
        <div className="row">
          <header v-if="index === 0">№</header>
          <button @click="openModal(appeal)" className="appeal-number">{{ appeal.number }}</button>
        </div>
        <div className="row">
          <header v-if="index === 0">Создана</header>
          <span>{{ $moment(appeal.created_at).format('DD.MM.YYYY') }}</span>
        </div>
        <div className="row">
          <header v-if="index === 0">Адрес</header>
          <span>{{ appeal.premise?.address }} {{ appeal.apartment?.label }}</span>
        </div>
        <div className="row">
          <header v-if="index === 0">Заявитель</header>
          <span>{{ appeal.applicant.last_name }} {{ appeal.applicant.first_name.charAt(0).toUpperCase() }}. {{
            appeal.applicant.patronymic_name.charAt(0).toUpperCase() }}.</span>
        </div>
        <div className="row description">
          <header v-if="index === 0">Описание</header>
          <span>{{ appeal.description }}</span>
        </div>
        <div className="row">
          <header v-if="index === 0">Срок</header>
          <span>{{ appeal.due_date && $moment(appeal.due_date).format('DD.MM.YYYY HH:mm') }}</span>
        </div>
        <div className="row">
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
        max-width: 240px;
        text-wrap: nowrap;
        overflow: hidden;
      }
    }
  }
}
</style>
