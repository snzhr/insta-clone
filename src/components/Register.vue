<template>
  <div class="register__page">
    <div class="register__page__form">
      <img src="../assets/instagram_logo.png" alt="" />
      <p>Sign up to see photos and videos from your friends.</p>
      <button>Log in with Facebook</button>
      <span class="or">OR</span>
      <form @submit.prevent="asd">
        <input type="text" placeholder="Mobile Number or Email" />
        <input type="text" placeholder="Fullname" />
        <input type="text" placeholder="Username" />
        <input type="text" placeholder="Password" />
        <button disabled @click="func" type="submit">Sign up</button>
      </form>
      <span class="agree__link">
        By signing up, you agree to our Terms , Data Policy and Cookies Policy .
      </span>
    </div>
    <div class="bottom__login__block">
      <span class="login__link"
        >Have an account? <router-link to="/about">Log in</router-link>
      </span>
    </div>
    <auth-footer />
  </div>
</template>

<script>
import AuthFooter from "./ui/AuthFooter.vue";
export default {
  components: {
    AuthFooter,
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
.register__page__form p {
  color: gray;
  font-size: 1.05em;
  font-weight: 600;
  margin: 0 auto 1em auto;
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
.agree__link {
  display: block;
  color: gray;
  font-size: 0.8em;
}
.bottom__login__block {
  margin-bottom: 1em;
}
.login__link a {
  text-decoration: none;
  color: #3796f6;
}
button[type="submit"]:disabled {
  opacity: 0.5;
}
</style>