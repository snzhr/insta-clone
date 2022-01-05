<template>
  <div v-if="isSmallScreen" style="padding: 3em">
    <h2>
      You are using a phone or tablet. This app is for PC. Please open it in PC.
    </h2>
  </div>
  <router-view v-else />
</template>
<script>
import axios from "axios";
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      screenWidth: 0,
      isSmallScreen: false,
    };
  },
  computed: {
    ...mapGetters(["getUser"]),
  },
  watch: {
    screenWidth(newVal, oldVal) {
      if (newVal <= 1300) {
        this.isSmallScreen = true;
      } else {
        this.isSmallScreen = false;
      }
    },
  },
  async created() {
    if (!this.getUser) {
      console.log("User not logged in");
    } else {
      try {
        const res = await axios(
          `/users/${this.getUser.id}?_embed=followings&_embed=posts&_embed=followers`
        );
        this.$store.dispatch("setUser", res.data);
      } catch (error) {
        console.log(error);
      }
    }
    this.screenWidth = screen.width;
  },
};
</script>
<style>
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
