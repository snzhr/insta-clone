<template>
  <div class="home"></div>
</template>

<script>
import firebase from "firebase";
export default {
  name: "Home",
  created() {
    console.log(firebase);
  },
};
</script>
