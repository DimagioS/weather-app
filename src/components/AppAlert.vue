<template>
  <div v-if="showAlert" class="city-search-alert">
    <h5 class="add-success-text">
      <slot name="text"></slot>
    </h5>
    <slot name="img"></slot>
  </div>
</template>

<script>
  export default {
    props: {
      showAlert: {
        required: true
      }
    }
  }
</script>

<style lang="scss" scoped>
  .city-search-alert {
    margin-top: 80px;
    padding: 0 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
    color: #382e64;
  }

  .add-success-text {
    font-size: 17px;
    margin-bottom: 10px;
    text-align: center;
    @media (max-width: 970px) {
      font-size: 14px;
    }
    @media (max-width: 590px) {
      font-size: 12px;
    }
  }
</style>