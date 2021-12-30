<template>
  <div class="main__content">
    <stories-bar />
    <div class="lenta">
      <single-post />
    </div>
  </div>
</template>

<script>
import StoriesBar from "../components/Storiesbar.vue";
import SinglePost from "../components/SinglePost.vue";
export default {
  components: {
    StoriesBar,
    SinglePost,
  },
};
</script>

<style scoped>
.main__content {
  width: 65%;
}
</style>