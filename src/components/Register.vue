<template>
  <div class="register__page">
    <div class="register__page__form">
      <img src="../assets/instagram_logo.png" alt="" />
      <p>Sign up to see photos and videos from your friends.</p>
      <button>Log in with Facebook</button>
      <span class="or">OR</span>
      <form @submit.prevent="register">
        <input v-model="user.email" type="email" placeholder="Email" />
        <input v-model="user.fullname" type="text" placeholder="Fullname" />
        <input v-model="user.username" type="text" placeholder="Username" />
        <input v-model="user.password" type="password" placeholder="Password" />
        <span class="agree__link">
          Do not use your real Instagram user credentials. We didn't spend
          enough money for security :-)
        </span>
        <button :disabled="formFull" type="submit">Sign up</button>
      </form>
    </div>
    <div class="bottom__login__block">
      <span class="login__link"
        >Have an account? <router-link to="/signin">Log in</router-link>
      </span>
    </div>
    <auth-footer>
      <p style="text-align: center">Get the app.</p>
      <app-icons></app-icons>
    </auth-footer>
  </div>
</template>

<script>
import axios from "axios";
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
        fullname: "",
        username: "",
        password: "",
        profileImg:
          "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png",
        name: "",
        website: "",
        bio: "",
        phone: "",
        gender: "",
        verified: false
      },
    };
  },
  computed: {
    formFull() {
      if (
        this.user.email !== "" &&
        this.user.fullname !== "" &&
        this.user.username !== "" &&
        this.user.password !== ""
      ) {
        return false;
      } else {
        return true;
      }
    },
  },
  methods: {
    async register() {
      try {
        const res = await axios.post("/register", this.user);
        this.user = {
          email: "",
          fullname: "",
          username: "",
          password: "",
        };
        this.$router.push("/signin");
      } catch (error) {
        console.log(error);
      }
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
.agree__link {
  display: block;
  color: red;
  font-weight: 600;
  font-size: 0.8em;
  text-transform: uppercase;
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
</style>