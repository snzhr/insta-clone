<template>
  <div class="post__preview">
    <div class="img__view">
      <img :src="post.img" :alt="post.id" />
    </div>
    <div class="img__details">
      <div class="details__header">
        <div
          class="details__username"
          style="display: flex; align-items: center"
        >
          <profile-img
            style="width: 2em; height: 2em"
            :userImg="postAuthor.profileImg"
          ></profile-img>
          <span
            style="margin-left: 0.5em; font-weight: 600; font-size: 0.9em"
            >{{ postAuthor.username }}</span
          >
        </div>
        <!-- <p style="font-size: 1.5em; cursor: pointer">...</p> -->
        <slot></slot>
      </div>
      <div class="details__body">
        <div class="caption">
          <div
            class="details__username"
            style="display: flex; align-items: center"
          >
            <profile-img
              style="width: 2em; height: 2em"
              :userImg="postAuthor.profileImg"
            ></profile-img>
            <span
              style="margin-left: 0.5em; font-weight: 600; font-size: 0.9em"
              >{{ postAuthor.username }}</span
            >
            <span class="caption__text">{{ post.caption }}</span>
          </div>

          <div class="comments">
            <div class="comment" v-for="comment in comments" :key="comment.id">
              <div
                class="details__username"
                style="display: flex; align-items: center"
                @click="$router.push(`/user/${comment.userId}`)"
              >
                <profile-img
                  style="width: 2em; height: 2em"
                  :userImg="comment.user.profileImg"
                ></profile-img>
                <span
                  style="margin-left: 0.5em; font-weight: 600; font-size: 0.9em"
                  >{{ comment.user.username }}</span
                >
                <span class="caption__text">{{ comment.text }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="comment__section">
        <post-caption :singlePost="post"></post-caption>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import ProfileImg from "../components/ui/ProfileImg.vue";
import PostCaption from "../components/PostCaption.vue";
import axios from "axios";
export default {
  data() {
    return {
      postAuthor: {},
    };
  },
  props: {
    post: Object,
    comments: Array,
  },
  components: {
    ProfileImg,
    PostCaption,
  },
  computed: {
    ...mapGetters(["getUser"]),
  },
  async created() {
    try {
      const res = await axios(`/users/${this.post.userId}`);
      this.postAuthor = res.data;
    } catch (error) {
      console.log(error);
    }
  },
};
</script>

<style scoped>
.post__preview {
  display: flex;
  width: 80vw;
  height: 90vh;
}
.img__details {
  width: 50%;
}
.img__view {
  width: 50%;
  display: flex;
  align-items: center;
  border-right: 1px solid #dcdcdc;
}
.details__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid #dcdcdc;
  padding: 1em;
}
.details__body {
  overflow-y: scroll;
  overflow-x: hidden;
  height: 60%;
  border-bottom: 1px solid #dcdcdc;
}
.img__view img {
  width: 100%;
}
.comment__user__img {
  width: 2em;
  height: 2em;
}
.caption {
  padding: 1em;
}
.caption__username {
  font-size: 0.9em;
  font-weight: 600;
  cursor: pointer;
}
.caption__text {
  font-size: 0.9em;
  margin-left: 0.2em;
}
.comments {
  margin-top: 0.3em;
}
.comment {
  margin: 1em 0;
}
</style>