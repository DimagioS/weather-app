<template>
  <div class="add-wrapper">

    <section class="main-card">

      <div class="city-search-wrapper">

        <div class="city-search-header">
          <h3 class="city-search-title">ПОИСК</h3>
          <div class="search-city-input-wrapper">
            <input 
              class="search-city-input" 
              placeholder="найти город" 
              :value="value"
              @input="change"
              @keydown.enter="citySrch"
              :disabled="disabledAlert"
              ref="searchInput"
            >
            <button 
              class="search-city-btn"
              @click="citySrch"
            >
              <svg class="search-icon" viewBox="0 0 451 451">
                <path fill="#FFF"
                  d="M447 428L337.6 318.4A192.5 192.5 0 0 0 192.4 0C86.3 0 0 86.3 0 192.3s86.3 192.3 192.3 192.3c48.2 0 92.3-17.8 126-47.2L428.2 447a13.2 13.2 0 0 0 19 0 13.5 13.5 0 0 0 0-19zM27 192.3C27 101.1 101 27 192.3 27c91.1 0 165.3 74.2 165.3 165.3s-74.2 165.4-165.4 165.4A165.6 165.6 0 0 1 27 192.3z">
                </path>
              </svg>
            </button>
          </div>
        </div>

        <div class="city-search-body">
          <app-add-weather-card
            :card-data="cardData"
            @add-card="$emit('data-card', inputValue)"
            :input-value="inputValue"
          ></app-add-weather-card>

          <app-alert
            :show-alert="showAlert"
            class="alert-img"
          >
            <template #text>
              {{ alertData.text }}
            </template>
            
            <template #img>
              <img :src="getImgUrl(alertData.img)" alt="check">
            </template>
          </app-alert>
          
        </div>
      </div>
      <router-link to="/home">
        <div class="back__button">
          <div class="back__button-img">
            <svg x="0px" y="0px"
              width="40" height="40"
              viewBox="0 0 172 172"
              style=" fill:#000000;"><g fill="none" fill-rule="nonzero" stroke="none" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="10" stroke-dasharray="" stroke-dashoffset="0" font-family="none" font-weight="none" font-size="none" text-anchor="none" style="mix-blend-mode: normal"><path d="M0,172v-172h172v172z" fill="none"></path><g fill="#ffffff"><path d="M45.00219,44.65281c-2.02906,-0.06719 -3.9775,0.76594 -5.33469,2.27094l-36.14687,39.07625l36.14687,39.07625c1.65281,1.84094 4.17906,2.66063 6.61125,2.12313c2.41875,-0.5375 4.36719,-2.33813 5.09281,-4.71656c0.72562,-2.37844 0.12094,-4.95844 -1.59906,-6.75906l-21.13719,-22.84375h133.04469c2.48594,0.04031 4.78375,-1.26312 6.03344,-3.41312c1.26313,-2.13656 1.26313,-4.79719 0,-6.93375c-1.24969,-2.15 -3.5475,-3.45344 -6.03344,-3.41313h-133.04469l21.13719,-22.84375c1.86781,-1.97531 2.40531,-4.85094 1.37063,-7.36375c-1.02125,-2.49937 -3.42656,-4.17906 -6.14094,-4.25969z"></path></g></g>
            </svg>
          </div>
          <div class="back__button-text">Назад</div>
        </div>
      </router-link>
    </section>
  </div>

</template>

<script>
  import AppAddWeatherCard from '../components/AppAddWeatherCard'
  import AppAlert from '../components/AppAlert.vue'

  export default {
    emits: {
      'update:value': null,
      'data-card': inputValue => {
        if (inputValue) return true
        else {
          console.warn('Некорректные данные для генерации события "data-card"!');
          return false
        } 
      },
      'search-city': inputValue => {
        if (inputValue) return true
        else {
          console.warn('Некорректные данные для генерации события "search-city"!');
          return false
        } 
      },
    },
    
    props: {
      cardData: {
        type: Array,
        required: true
      },
      value: {
        type: String,
        required: true
      },
      alerts: {
        type: Object,
        required: true
      },
    },
    
    data() {
      return {
        inputValue: '',
        alertData: {
          text: null,
          img: null
        },
      }
    },

    methods: {
      getImgUrl(img) {
        return require('../img/icons/' + img);
      },

      assignmentAlertData() {
        if (this.alerts.cityAdded) this.cityAddedAlertData()
        else if (this.alerts.cityWasAdded) this.cityWasAddedAlertData()
        else if (this.alerts.locationNotFound) this.locationNotFoundAlertData()
      },

      cityAddedAlertData() {
        this.alertData.text = 'Город был успеешно добавлен!',
        this.alertData.img = 'check.svg'
      },

      cityWasAddedAlertData() {
        this.alertData.text = 'Этот город уже добавлен, добавьте другой!',
        this.alertData.img = 'remove.svg'
      },

      locationNotFoundAlertData() {
        this.alertData.text = 'Данного города не существует, введите другое название!',
        this.alertData.img = 'remove.svg'
      },

      citySrch() {
        this.inputValue = this.value
        this.$emit('search-city', this.inputValue)
      },

      change(event) {
        this.$emit('update:value', event.target.value)
      },
    },

    computed: {
      disabledAlert() {
        for (const key in this.alerts) if (this.alerts[key]) return true
      },

      showAlert() {
        for (const key in this.alerts) {
          if (this.alerts[key]) {
            this.assignmentAlertData()
            return true
          } 
        }
      },
    },

    watch: {
      disabledAlert() {
        if (this.disabledAlert === undefined ) setTimeout(() => this.$refs.searchInput.focus() , 0)
      },
    },
    
    components: { AppAddWeatherCard, AppAlert }
  }
</script>

<style lang="scss" src="../style/home.scss" scoped></style>