<template>
  <div class="register__page">
    <div class="register__page__form">
      <img src="../assets/instagram_logo.png" alt="" />
      <form @submit.prevent="login">
        <input v-model="user.email" type="email" placeholder="Email" />
        <input v-model="user.password" type="password" placeholder="Password" />
        <button :disabled="formFull" type="submit">Log In</button>
        <span class="or">OR</span>
      </form>
      <p class="login__facebook__btn">Log in with Facebook</p>

      <span class="forgot__password__link"> Forgot password?</span>
    </div>
    <div class="bottom__login__block">
      <span class="login__link"
        >Don't have an account? <router-link to="/signup">Sign up</router-link>
      </span>
    </div>
    <auth-footer>
      <p style="text-align: center">Get the app.</p>
      <app-icons></app-icons>
    </auth-footer>
  </div>
</template>

<script>
import AuthFooter from "./ui/AuthFooter.vue";
import AppIcons from "./ui/AppIcons.vue";
export default {
  components: {
    AuthFooter,
    AppIcons,
  },
  data() {
    return {
      user: {
        email: "",
        password: "",
      },
    };
  },
  computed: {
    formFull() {
      if (this.user.email !== "" && this.user.password !== "") {
        return false;
      } else {
        return true;
      }
    },
  },
  methods: {
    login() {
      this.$store.dispatch("login", this.user);
    },
  },
};
</script>

<style scoped>
.register__page {
  background-color: #fafafa;
  padding: 2.1em;
}
.register__page__form {
  width: 350px;
  border: 1px solid #dcdcdc;
  background-color: white;
  margin: 0 auto 1em auto;
  padding: 1.8em 2.5em;
  text-align: center;
}
.bottom__login__block {
  width: 350px;
  border: 1px solid #dcdcdc;
  background-color: white;
  margin: 0 auto;
  padding: 2em;
  text-align: center;
}
.register__page__form img {
  display: block;
  margin: 0 auto 1em auto;
  width: 11em;
}
.register__page__form button {
  padding: 0.7em;
  display: block;
  width: 100%;
  background-color: #3796f6;
  border: none;
  color: white;
  border-radius: 5px;
  font-weight: 600;
  font-size: 0.9em;
  margin: 0.7em auto 1em auto;
  cursor: pointer;
}
.register__page__form input {
  width: 100%;
  padding: 0.8em;
  margin-bottom: 0.5em;
  border: 1px solid #dcdcdc;
  border-radius: 5px;
  background-color: #fafafa;
}
.or {
  font-size: 0.8em;
  font-weight: 600;
  color: gray;
  margin-bottom: 1em;
  display: block;
}
.forgot__password__link {
  display: block;
  color: #3b5998;
  font-size: 0.8em;
}
.bottom__login__block {
  margin-bottom: 1em;
}
.login__link {
  font-size: 0.9em;
}
.login__link a {
  text-decoration: none;
  color: #3796f6;
  font-weight: 600;
}
button[type="submit"]:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
.login__facebook__btn {
  color: #3b5998;
  font-size: 0.9em;
  font-weight: 600;
  margin: 0 auto 1em auto;
}
</style>