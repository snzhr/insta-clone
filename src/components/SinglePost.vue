<template>
  <div class="post">
    <div class="post__header">
      <div class="post__profile__image">
        <profile-img
          class="profile__img"
          :userImg="post.user.profileImg"
        ></profile-img>
        <p @click="$router.push(`/user/${post.user.id}`)">
          {{ post.user.username }}
        </p>
      </div>
      <p class="dots">...</p>
    </div>
    <div class="post__body">
      <img :src="post.img" alt="" />
    </div>
    <post-caption :singlePost="post">
      <single-caption :singlePost="post"></single-caption>
    </post-caption>
  </div>
</template>

<script>
import axios from "axios";
import ProfileImg from "../components/ui/ProfileImg.vue";
import PostCaption from "../components/PostCaption.vue";
import SingleCaption from "../components/SingleCaption.vue";
import { mapGetters } from "vuex";
export default {
  props: {
    post: Object,
  },
  data() {
    return {
      postComment: "",
      postLikes: 0,
      isLiked: null,
    };
  },
  components: {
    ProfileImg,
    PostCaption,
    SingleCaption,
  },
  computed: {
    ...mapGetters(["getUser"]),
  },
};
</script>

<style scoped>
.post {
  background-color: white;
  border: 1px solid #dcdcdc;
  border-radius: 3px;
  margin-bottom: 1.5em;
}
.post img {
  width: 100%;
}
.post__header {
  padding: 1em;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid #dcdcdc;
}
.post__profile__image {
  display: flex;
  align-items: center;
}
.post__profile__image p {
  margin-left: 0.8em;
  cursor: pointer;
}
.profile__img {
  width: 3em;
  height: 3em;
}
.dots {
  font-size: 1.5em;
  cursor: pointer;
}
</style>