<template>
  <div class="nav">
    <Navbar />
  </div>
  <div class="home">
    <div class="main">
      <Lenta />
      <Sidebar />
    </div>
  </div>
</template>

<script>
import Navbar from "../components/Navbar.vue";
import Sidebar from "../components/Sidebar.vue";
import Lenta from "../components/Lenta.vue";
import { mapGetters } from "vuex";
export default {
  name: "Home",
  components: {
    Navbar,
    Sidebar,
    Lenta,
  },
  computed: {
    ...mapGetters(["getUser"]),
  },
  created() {
    this.$store.dispatch("getFollowings", this.getUser.id);
  },
};
</script>

<style scoped>
.home {
  padding-top: 5.5em;
  background-color: #fafafa;
}
.main {
  width: 73%;
  margin: auto;
  display: flex;
  justify-content: space-between;
  position: relative;
}
</style>