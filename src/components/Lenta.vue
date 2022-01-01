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
import { mapGetters } from "vuex";
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
  computed: {
    ...mapGetters(["getUser"]),
  },
  async created() {
    try {
      let query = "";
      for (const person of this.getUser.followings) {
        query += `userId=${person.followedUser.id}&`;
      }
      query = query.slice(0, -1);
      const res = await axios(`/posts?${query}`);
      this.posts = res.data;
      // console.log(res.data);
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