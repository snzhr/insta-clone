<template>
  <div class="main__content">
    <stories-bar />
    <div class="lenta" v-if="posts.length >= 1">
      <single-post v-for="post in posts" :key="post.id" :post="post" />
    </div>
    <div class="empty__feed" v-else>
      <h2>You have to follow someone in order to see the feed</h2>
      <h4>See suggestions at the right</h4>
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
      posts: [],
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
          const res = await axios(`/posts?_sort=id&_order=desc&${query}`);
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
.empty__feed {
  height: 100vh;
  text-align: center;
}
.empty__feed > * {
  margin: 1em 0;
}
</style>