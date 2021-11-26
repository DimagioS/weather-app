<template>
  <header v-if="isAuth" class="main__header" :class="{'main__header-dark': darkTheme}">
    <div class="left__section">
      <svg  class="hamburger__icon" @click="$emit('open-menu')" id="Menu_Burger_Icon" data-name="Menu Burger Icon" viewBox="31.5 30 49.9 32">
        <rect id="Rectangle_9" width="49.9" height="4"
            class="hamburger__icon__fill" :class="{'hamburger__icon__fill-dark': darkTheme}" data-name="Rectangle 9" rx="2"
            transform="translate(31.5 58)"></rect>
        <rect id="Rectangle_10" width="49.9" height="4"
            class="hamburger__icon__fill" :class="{'hamburger__icon__fill-dark': darkTheme}" data-name="Rectangle 10" rx="2"
            transform="translate(31.5 44)"></rect>
        <rect id="Rectangle_11" width="49.9" height="4"
            class="hamburger__icon__fill" :class="{'hamburger__icon__fill-dark': darkTheme}" data-name="Rectangle 11" rx="2"
            transform="translate(31.5 30)"></rect>
      </svg>

      <img class="logo__icon" :src="logoImg" alt="logo">
      <span class="logo__text" :class="{'logo__text-dark': darkTheme}">Погода</span>
    </div>

    <h3 class="date__text">Сегодня</h3>

    <div class="mode-toggle__container">
      <span class="mode-toggle__text">Светлая</span>
      <img class="mode-toggle__theme-sun" src="../img/icons/sun.svg" alt="">

      <label class="toggle-button__container">
        <input type="checkbox" class="mode-toggle__input" @click="$emit('change-theme')"/>
        <span class="mode-toggle__bg" :class="{'mode-toggle__bg-checked': darkTheme}"></span>
        <span class="mode-toggle__circle" :class="{'mode-toggle__circle-checked': darkTheme}"></span>
      </label>

      <img class="mode-toggle__theme-moon" src="../img/icons/moon.svg" alt="">
      <span class="mode-toggle__text">Темная</span>
    </div>

  </header>
</template>

<script>
  export default {
    emits: {
      'open-menu': null,
      'change-theme': null,
    },

    props: {
      isAuth: {
        type: Boolean,
        required: true
      },
      darkTheme: {
        type: Boolean
      },
    },

    computed: {
      logoImg() {
        return this.darkTheme ? require('../img/icons/logo-dark.png') : require('../img/icons/logo.png')
      },
    }
  }
</script>

<style lang='scss' src="../style/main-header.scss" scoped>

</style>