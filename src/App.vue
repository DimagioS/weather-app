<template>
  <div>
    <app-side-menu 
      :is-auth="isAuth"
      :open-side-menu="openSideMenu"
      :dark-theme="darkTheme"
      @close-menu="closeMenu"
      @logout-application="logout"
    ></app-side-menu>
  
    <main class="root__container" :class="{'root__container-dark': darkTheme}">
      <app-main-header
        :is-auth="isAuth"
        :dark-theme="darkTheme"
        @open-menu="openMenu"
        @change-theme="changeTheme"
      ></app-main-header>
  
      <div class="main-container__bg">
        <router-view v-slot="{ Component }">
          <keep-alive>
            <component 
              :is="Component"
              @data-card="cardAdd"
              @search-city="searchCity"
              @to-details="toDetails"
              @enter-the-app="login"
              @signup-the-app="register"
              @remove-card="removeCard"
              @to-login='toLogin'
              @to-register='toRegister'
              v-model:value="city"
              v-model:email-value="email"
              v-model:password-value="password"
              :card-data="cardData"
              :main-card-data="mainCardData"
              :detail-info-card="detailInfoCard"
              :dark-theme="darkTheme"  
              :alerts="alerts"
              :error="error"
            ></component>
          </keep-alive>
        </router-view>
      </div>
    </main>
  </div>
</template>

<script>
  import AppError from './components/AppError'
  import AppMainHeader from './components/AppMainHeader.vue'
  import AppSideMenu from './components/AppSideMenu'

  import firebase from 'firebase/compat/app'

  import requestInfoCard from './api/loadingDataAPI'
  import requestCityInformation from './api/gettingDataAPI'
  import translationError from './error'

  export default {
    data() {
      return {
        city: '',
        cardData: [],
        mainCardData: [],
        cardInfo: {},
        detailInfoCard: {},
        isAuth: false,
        openSideMenu : false,
        darkTheme: false,
        email: '', 
        password: '',
        error: null,
        alerts: {
          cityWasAdded: false,
          locationNotFound: false,
          cityAdded: false,
        },
        warningTime: 1600,
      }
    },

    async mounted() {
      this.getUid() ? this.isAuth = true : false

      const themeData = await requestInfoCard(this.getUid(), 'theme')
      if (themeData) {
        this.darkTheme = true
      }
    },
    
    methods: {
      async searchCity(inputValue) {
        if (this.cardData) {
          this.cardData = []
        }
        
        if (this.isSimilarCity(inputValue)) {
          this.cityAddedAlert()
          return
        }

        const cityData = await requestCityInformation(inputValue)

        if (cityData.error) {
          this.alerts.locationNotFound = true
          setTimeout(() => this.alerts.locationNotFound = false , this.warningTime);
          
        } else {
          this.addData(cityData, this.cardData)
        }
       
        this.city = ''
      },

      cityAddedAlert() {
        this.alerts.cityWasAdded = true
        setTimeout(() => this.alerts.cityWasAdded = false, this.warningTime);
        this.cardData.pop()
        this.city = ''
      },
      
      isSimilarCity(inputValue) {
        return this.mainCardData.find(el => el.name.toLowerCase() === inputValue.toLowerCase())
      },

      async loadingCards() {
        const cardData = await requestInfoCard(this.getUid(), 'cards')
        
        if (cardData) {
          const arrCard = Object.keys(cardData).map(async (el) => {
            const cityData = await requestCityInformation(cardData[el])
            return this.allDataObj(cityData)
          });

          const resultData = arrCard.map(el => {
            return el.then(result => this.mainCardData.push(result))
          })
        }
      },

      addData(data, arrName) {
        this.cardInfo = this.allDataObj(data)
        arrName.push(this.cardInfo)
      },

      allDataObj(data) {
        let timeNow = new Date().getHours();
        if (timeNow == 23) timeNow = 0

        return {
          name: data.location.name,
          country: data.location.country,
          temp: Math.round(data.forecast.forecastday[0].hour[timeNow].temp_c),
          maxTemp: Math.round(data.forecast.forecastday[0].day.maxtemp_c),
          minTemp: Math.round(data.forecast.forecastday[0].day.mintemp_c),
          state: data.forecast.forecastday[0].hour[timeNow].condition.text,
          today: {
            temp: Math.round(data.forecast.forecastday[1].hour[timeNow].temp_c),
            humidity: data.forecast.forecastday[1].hour[timeNow].humidity,
            wind: data.forecast.forecastday[1].hour[timeNow].wind_kph,
            state: data.forecast.forecastday[1].hour[timeNow].condition.text, 
          },
          tomorrow: {
            temp: Math.round(data.forecast.forecastday[2].hour[timeNow].temp_c) ,
            humidity: data.forecast.forecastday[2].hour[timeNow].humidity,
            wind: data.forecast.forecastday[2].hour[timeNow].wind_kph,
            state: data.forecast.forecastday[2].hour[timeNow].condition.text, 
          },
          dayAfterTomorrow: {
            temp: Math.round(data.forecast.forecastday[0].hour[timeNow].temp_c) ,
            humidity: data.forecast.forecastday[0].hour[timeNow].humidity,
            wind: data.forecast.forecastday[0].hour[timeNow].wind_kph,
            state: data.forecast.forecastday[0].hour[timeNow].condition.text, 
          }
        }
      },

      async cardAdd(inputValue) {
        const cityData = await requestCityInformation(inputValue)
        if (this.isSimilarCity(cityData.location.name)) {
          this.cityAddedAlert()
          return
        }

        await firebase.database().ref(`/users/${this.getUid()}/cards`).push(cityData.location.name)
        
        this.addData(cityData, this.mainCardData)
        this.alerts.cityAdded = true
        setTimeout(() => this.alerts.cityAdded = false, this.warningTime);
        this.cardData.pop()
      },

      toDetails(event) {
        const cardName = this.cardName(event);
        this.detailInfoCard = this.mainCardData.find(el => el.name === cardName)
        this.$router.push('/details')
      },

      async removeCard(event) {
        const cardName = this.cardName(event);
        const cardData = await requestInfoCard(this.getUid(), 'cards');

        this.mainCardData = this.mainCardData.filter(el => el.name !== cardName);


        const arrCard = Object.keys(cardData).find(el => {
          if (cardName == cardData[el]) return el
        });
        await firebase.database().ref(`/users/${this.getUid()}/cards/${arrCard}`).remove();
      },

      cardName(event) {
        return event.target.closest('.weather__card').querySelector('.city-name__text').textContent
      },

      openMenu() {
        this.openSideMenu = true
        document.querySelector('#app').classList.add('scroll')
      },

      closeMenu() {
        this.openSideMenu = false
        document.querySelector('#app').classList.remove('scroll')
      },

      async login() {
        const formData = {
          email: this.email,
          password: this.password
        }

        try {
          await this.$store.dispatch('login', formData)
          this.isAuth = true
          this.$router.push('/home')
          this.resetRegistrationData()
        } catch (e) {
          this.errorMessage(e.message)
          setTimeout(() => this.error = null, this.warningTime);
          this.resetRegistrationData()
        }
      },

      async logout() {
        const themeData = await requestInfoCard(this.getUid(), 'theme')
        if (themeData) {
          this.darkTheme = false
          await firebase.database().ref(`/users/${this.getUid()}/theme`).remove();
        }

        await this.$store.dispatch('logout')

        this.openSideMenu = false
        this.isAuth = false
        document.querySelector('#app').classList.remove('scroll')
        this.mainCardData = []
        this.$router.push('/login')
      },

      async register() {
        const formData = {
          email: this.email,
          password: this.password
        }

        try {
          await this.$store.dispatch('register', formData)
          this.isAuth = true
          this.$router.push('/home')
          this.resetRegistrationData()
        } catch (e) {
          this.errorMessage(e.message)  
          setTimeout(() => this.error = null, this.warningTime);
          this.resetRegistrationData()
        }
      },

      toLogin() {
        this.resetRegistrationData()
        this.$router.push('/login')
      },

      toRegister() {
        this.resetRegistrationData()
        this.$router.push('/signup')
      },

      resetRegistrationData() {
        this.email = ''
        this.password = ''
      },

      getUid() {
        const user = firebase.auth().currentUser
        return user ? user.uid : null
      },

      async changeTheme() {
        this.darkTheme = !this.darkTheme

        if (this.darkTheme) {
          await firebase.database().ref(`/users/${this.getUid()}/theme`).push('darkTheme')
        } else if (!this.darkTheme) {
          await firebase.database().ref(`/users/${this.getUid()}/theme`).remove();
        }
      },

      errorMessage(err) {
        this.error = translationError(err, this.error)
      },
    },

    watch: {
      isAuth() {
        if (this.isAuth) {
          this.loadingCards()
          if (this.$route.path == '/') {
            this.$router.push('/home')
          }
        }
      },
    },

    components: { AppError, AppSideMenu, AppMainHeader }
  }
</script>

<style lang='scss' src="./style/app.scss"></style>