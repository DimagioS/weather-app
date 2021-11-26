<template>
  <div class="main__container">
    <div class="login-card">
      <main class="login-content">
        <span class="login-header">Войти</span>

        <form class="login-form" @submit.prevent="$emit('enter-the-app')">
          <input 
            type="email"
            autofocus
            placeholder="Email" 
            name="email"
            class="login-input" 
            required
            :value="emailValue"
            @input="emailChange"
          >
          <small v-if="error" class="login-form-warning">{{ error }}</small>
          <input 
            type="password" 
            placeholder="Пароль" 
            name="password" 
            class="login-input" 
            minlength="6" 
            required
            :value="passwordValue"
            @input="passworChange"
          >
          <input type="submit" name="submit" value="Войти" class="login-btn">
        </form>
        <div class="signup-link-wrapper">
          <span class="signup-notice">У вас нет учетной записи?</span>
          <span class="signup-link" @click="$emit('to-register')" :class="{'disabled-link': error}">Создать</span>
        </div>

      </main>

      <aside class="login-aside">
        <div class="login-aside-overlay"></div>
        <h1 class="login-welcome-text">Добро пожаловать!</h1>
        <hr class="login-aside-hr">
      </aside>
    </div>
  </div>
</template>

<script>
  export default {
    emits: {
      'update:emailValue': null,
      'update:passwordValue': null,
      'enter-the-app': null,
      'to-register': null,
    },
    
    props: {
      emailValue: {
        type: String,
        required: true
      },
      passwordValue: {
        type: String,
        required: true
      },
      error: {
        type: String
      },
    },

    methods: {
      emailChange(event) {
        this.$emit('update:emailValue', event.target.value)
      },

      passworChange(event) {
        this.$emit('update:passwordValue', event.target.value)
      },
    }
  }
</script>

<style lang='scss' src="../style/login.scss" scoped></style>