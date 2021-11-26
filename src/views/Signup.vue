<template>
  <div class="main__container">
    <div class="signup-card">
      <main class="signup-content">
        <span class="signup-header">Зарегистрироваться</span>

        <form class="signup-form" @submit.prevent="$emit('signup-the-app')">
          <input 
            type="email"
            autofocus 
            placeholder="Email" 
            name="email"
            class="signup-input" 
            required
            :value="emailValue"
            @input="emailChange"
          >
          <small v-if="error" class="signup-form-warning">{{ error }}</small>
          <input 
            type="password" 
            placeholder="Пароль" 
            name="password" 
            class="signup-input" 
            minlength="6" 
            required
            :value="passwordValue"
            @input="passworChange"
          >
          <input type="submit" name="submit" value="Зарегистрироваться" class="signup-btn">
        </form>
        <div class="login-link-wrapper">
          <span class="login-notice">Уже есть учетная запись?</span>
          <span class="login-link" @click="$emit('to-login')" :class="{'disabled-link': error}">Войти</span>
        </div>

      </main>
      
      <aside class="signup-aside">
        <div class="signup-aside-overlay"></div>
        <h1 class="signup-welcome-text">Присоединиться к нам!</h1>
        <hr class="signup-aside-hr">
      </aside>
    </div>
  </div>
</template>

<script>
  export default {
    emits: {
      'update:emailValue': null,
      'update:passwordValue': null,
      'signup-the-app': null,
      'to-login': null,
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
        type: String,
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

<style lang='scss' src="../style/signup.scss" scoped></style>