<template>
  <div class="home">
    <register />
  </div>
</template>

<script>
import firebase from "firebase";
import Register from "../components/Register.vue";
export default {
  name: "Home",
  components: {
    Register,
  },
};
</script>
