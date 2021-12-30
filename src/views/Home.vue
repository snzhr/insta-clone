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
export default {
  name: "Home",
  components: {
    Navbar,
    Sidebar,
    Lenta,
  },
};
</script>

<style>
.home {
  padding-top: 6em;
  background-color: #fafafa;
}
.main {
  width: 73%;
  margin: auto;
  display: flex;
  justify-content: space-between;
  position: relative;
}
.main__content {
  background-color: red;
  width: 65%;
}
</style>