<template>
  <div class="main__content">
    <stories-bar />
    <div class="lenta">
      <single-post v-for="post in posts" :key="post.id" :post="post" />
    </div>
  </div>
</template>

<script>
import StoriesBar from "../components/Storiesbar.vue";
import SinglePost from "../components/SinglePost.vue";
import axios from "axios";
export default {
  components: {
    StoriesBar,
    SinglePost,
  },
  data() {
    return {
      posts: null,
    };
  },
  async created() {
    try {
      const res = await axios("http://localhost:3000/posts");
      this.posts = res.data;
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  },
};
</script>

<style scoped>
.main__content {
  width: 65%;
}
</style>