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
      userFollowings: [],
    };
  },
  computed: {
    ...mapGetters(["getUser"]),
  },
  async created() {
    const userRes = await axios(`/users/${this.getUser.id}?_embed=followings`);
    this.userFollowings = userRes.data.followings;
    this.getPosts();
  },
  methods: {
    async getPosts() {
      if (this.userFollowings.length === 0) {
        console.log("User doesn't have followings");
      } else {
        try {
          let query = "_expand=user&_embed=comments&";
          this.userFollowings.forEach((p) => {
            query += `userId=${p.followedUser.id}&`;
          });
          query = query.slice(0, -1);
          const res = await axios(`/posts?${query}`);
          console.log(res.data);
          this.posts = res.data;
        } catch (error) {
          console.log(error);
        }
      }
    },
  },
};
</script>

<style scoped>
.main__content {
  width: 65%;
}
</style>