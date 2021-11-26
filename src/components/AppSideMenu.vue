<template>
  <aside v-if="isAuth" class="side-menu__container" :class="{ 'side-menu__container-active': openSideMenu }">
    <div v-show="openSideMenu" class="side-menu-overlay" @click="$emit('close-menu')"></div>
    <nav class="slide-menu" :class="{ 'slide-menu-active': openSideMenu, 'slide-menu-active-dark': darkTheme }" >
      <section class="menu-header" :class="{'menu-header-dark': darkTheme}">
        <div class="menu-header-title">
          <img class="menu-header-icon" @click="$emit('close-menu')" :src="logoImg" alt="">
          <span class="greeting__text">Добро пожаловать</span>
        </div>
        <div class="menu-user-information">
          <div class="profile-image__container">
            <img 
              src="../img/icons/user.jpg" 
              alt="profile-image"
              class="profile__image"
            >
          </div>
          <div class="account-details">
            <span class="name__text">{{ getEmail }}</span>
          </div>
        </div>
      </section>
      <div class="menu-container">
        <section class="menu-body">
          <ul class="menu-links" >
            <!-- <template v-for="link in links" :key="link.id">
              <li class="menu-link">
                <router-link 
                  :to="link.to" 
                  :class="{'menu-links-dark': darkTheme}" 
                  @click="link.emit"
                >
                  {{ link.text }}
                </router-link>
              </li>
            </template> -->
            <li class="menu-link" >
              <router-link :class="{'menu-link-dark': darkTheme}" to="/home" @click="$emit('close-menu')">Домой</router-link>
            </li>
            <li class="menu-link">
              <router-link :class="{'menu-link-dark': darkTheme}" to="/search" @click="$emit('close-menu')">Добавить город</router-link>
            </li>
            <li class="menu-link" @click="$emit('logout-application')">
              <router-link :class="{'menu-link-dark': darkTheme}" to="/login">Выйти</router-link>
            </li>
          </ul>
        </section>
        <section class="menu-footer">
          <small class="copyright__text" :class="{'copyright__text-dark': darkTheme}">Дмитрий Сушков © 2021 Погода</small>
        </section>
      </div>
    </nav>
  </aside>
</template>

<script>
  import firebase from 'firebase/compat/app';

  export default {
    emits: {
      'close-menu': null,
      'logout-application': null,
    },
    
    props: {
      isAuth: {
        type: Boolean,
        required: true
      },
      openSideMenu: {
        type: Boolean,
        required: true
      },
      darkTheme: {
        type: Boolean
      },
    },

    computed: {
      logoImg() {
        return this.darkTheme == true ? require('../img/icons/cancel-dark.svg') : require('../img/icons/cancel.svg')
      },

      getEmail() {
        const user = firebase.auth().currentUser
        return user ? user.email : null
      }
    }
  }
</script>

<style lang="scss" src="../style/slide-menu.scss" scoped>

</style>