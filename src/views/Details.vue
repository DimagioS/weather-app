<template>
  <div class="details-page__wrapper" :class="{'details-page__wrapper-dark': darkTheme}">
    <div class="background-gradient__circle" :class="{'background-gradient__circle-dark': darkTheme}"></div>
    <app-main-weather-card
      :dark-theme="darkTheme"
      :detail-info-card="detailInfoCard"
    ></app-main-weather-card>
  </div>

</template>

<script>
  import AppMainWeatherCard from '../components/AppMainWeatherCard.vue'
  
  export default {
    props: {
      detailInfoCard: {
        type: Object,
        required: true
      },
      darkTheme: {
        type: Boolean,
      },
    },  
    
    components: { AppMainWeatherCard },
  }
</script>

<style lang="scss" src="../style/details.scss" scoped></style>