<template>
  <div class="nav">
    <Navbar />
  </div>
  <div class="profile__page">
    <div class="main">
      <div class="main__top">
        <profile-img
          :userImg="user.profileImg"
          class="profile__img"
        ></profile-img>
        <div class="account__info">
          <div class="account__info__username">
            <p class="account__username">{{ user.username }}</p>
            <button
              @click="follow(user)"
              class="follow"
              v-show="following === false"
            >
              Follow
            </button>
            <button
              @click="unfollow(user)"
              class="following"
              s
              v-show="following === true"
            >
              Unfollow
            </button>
            <div class="setting__btn"><span>...</span></div>
          </div>
          <div class="account__followers__info">
            <span
              ><b>{{ userPosts.length }}</b> posts</span
            >
            <span>
              <b>{{ userFollowers.length }}</b> follower</span
            >
            <span
              ><b>{{ userFollowings.length }}</b> following</span
            >
          </div>
        </div>
      </div>
      <div class="account__posts">
        <div class="user__posts">
          <div
            @click="select(post)"
            v-for="post in user.posts"
            :key="post.id"
            class="user__post"
            :style="{ backgroundImage: `url(${post.img})` }"
          >
            <div class="overlay"></div>
          </div>

          <modal v-if="showPostPreview" @closeModal="showPostPreview = false">
            <post-preview
              :post="currentPost"
              :comments="currentPostComments"
            ></post-preview>
          </modal>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Navbar from "../components/Navbar.vue";
import ProfileImg from "../components/ui/ProfileImg.vue";
import PostPreview from "../components/PostPreview.vue";
import Modal from "../components/ui/Modal.vue";
import { mapGetters } from "vuex";
export default {
  components: { Navbar, ProfileImg, PostPreview, Modal },
  data() {
    return {
      user: "",
      userPosts: [],
      userFollowings: [],
      userFollowers: [],
      following: false,
      showPostPreview: false,
      currentPost: {},
      currentPostComments: [],
    };
  },
  computed: {
    ...mapGetters(["getUser"]),
  },
  methods: {
    select(post) {
      this.currentPost = post;
      this.getComments();
      this.showPostPreview = true;
    },
    async getComments() {
      try {
        const commentsRes = await axios(
          `posts/${this.currentPost.id}/comments?_expand=user`
        );
        this.currentPostComments = commentsRes.data;
      } catch (error) {
        console.log(error);
      }
    },
    async follow(user) {
      try {
        const res = await axios.post(`/followings`, {
          userId: this.getUser.id,
          followedUser: user,
        });
        const resFollower = await axios.post(`/followers`, {
          userId: user.id,
          follower: this.getUser,
        });
        const getFollowersRes = await axios(
          `/users/${user.id}?_embed=followers`
        );
        this.userFollowers = getFollowersRes.data.followers;
        this.following = true;
      } catch (error) {
        console.log(error);
      }
    },
    async unfollow(user) {
      try {
        let followerID = null;
        for (const item of this.userFollowers) {
          if (item.follower.id === this.getUser.id) {
            followerID = item.id;
          }
        }
        const res = await axios.delete(`/followings/${followerID}`);
        const resFollower = await axios.delete(`/followers/${followerID}`);
        this.following = false;
      } catch (error) {
        console.log(error);
      }
    },
  },
  async created() {
    try {
      const res = await axios(
        `/users/${this.$route.params.id}?_embed=followings&_embed=posts&_embed=followers`
      );
      this.user = res.data;
      this.userPosts = res.data.posts;
      this.userFollowings = res.data.followings;
      this.userFollowers = res.data.followers;
    } catch (error) {
      console.log(error);
    }
    for (const item of this.userFollowers) {
      if (item.follower.id === this.getUser.id) {
        this.following = true;
      }
    }
  },
};
</script>

<style scoped>
.profile__page {
  padding-top: 5em;
  background-color: #fafafa;
}
.main {
  width: 73%;
  margin: auto;
}
.main__top {
  display: flex;
  width: fit-content;
  margin-bottom: 4em;
}
.profile__img {
  width: 9em;
  height: 9em;
  border-radius: 1000px;
  display: flex;
  justify-content: center;
  margin: 0 5em;
  background-position: center;
  background-size: cover;
  border: 1px solid #dcdcdc;
}
.account__username,
button {
  margin-right: 1em;
}
.account__username {
  font-size: 1.7em;
}
button {
  font-size: 0.9em;
  font-weight: 600;
  padding: 0.5em 2em;
  border-radius: 5px;
  cursor: pointer;
}
.following {
  border: 1px solid #dcdcdc;
  background: transparent;
}
.follow {
  background-color: #3796f6;
  border: none;
  color: white;
}
.account__info__username {
  display: flex;
  margin: 1em 0;
}
.account__followers__info span {
  margin-right: 1em;
}
.account__posts {
  border-top: 1px solid #dcdcdc;
  padding-top: 2em;
}
.user__posts {
  display: flex;
  flex-wrap: wrap;
}
.overlay {
  width: 100%;
  height: inherit;
}
.overlay:hover {
  background-color: rgba(0, 0, 0, 0.5);
}
.user__post {
  cursor: pointer;
  width: 29%;
  margin: 0 1em;
  height: 40vh;
  background-position: center;
  background-size: cover;
}
</style>