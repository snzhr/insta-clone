<template>
  <div class="userimg" :style="{ backgroundImage: `url(${userImg})` }"></div>
</template>
<script>
export default {
  props: {
    userImg: String,
  },
};
</script>
<style scoped>
.userimg {
  border-radius: 1000px;
  background-size: cover;
  background-position: center;
  cursor: pointer;
  border: 1px solid #dcdcdc;
}
</style>