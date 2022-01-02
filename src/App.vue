<template>
  <router-view />
</template>
<script>
import axios from "axios";
import { mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters(["getUser"]),
  },
  async created() {
    if (!this.getUser) {
      console.log("User not logged in");
    } else {
      try {
        const res = await axios(
          `/users/${this.getUser.id}?_embed=followings&_embed=posts`
        );
        this.$store.dispatch("setUser", res.data);
      } catch (error) {
        console.log(error);
      }
    }
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
