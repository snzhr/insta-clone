<template>
  <div class="caption">
    <p>
      <span
        class="caption__username"
        @click="$router.push(`/user/${singlePost.user.id}`)"
        >{{ singlePost.user.username }}
      </span>
      <span class="caption__text"> {{ singlePost.caption }} </span>
    </p>
    <div class="comments">
      <modal v-if="showPostPreview" @closeModal="showPostPreview = false">
        <post-preview :post="singlePost" :comments="allComments"></post-preview>
      </modal>
      <span
        style="font-size: 0.9em; color: gray; cursor: pointer"
        @click="showPostPreview = true"
        v-if="singlePost.comments.length > 2"
        >View all {{ singlePost.comments.length }} comments</span
      >
      <p
        class="comment"
        v-for="comment in singlePost.comments.slice(0, 2)"
        :key="comment.id"
      >
        <span @click="redirectToUser(comment)" class="caption__username">{{
          comment.userName
        }}</span>
        <span class="caption__text">{{ comment.text }}</span>
      </p>
    </div>
  </div>
</template>

<script>
import Modal from "./ui/Modal.vue";
import PostPreview from "./PostPreview.vue";
import axios from "axios";
export default {
  data() {
    return {
      showPostPreview: false,
      allComments: [],
    };
  },
  props: {
    singlePost: Object,
  },
  components: {
    PostPreview,
    Modal,
  },
  methods: {
    redirectToUser(comment) {
      if (comment.userId === this.$store.getters.getUser.id) {
        this.$router.replace(`/profile/${comment.username}`);
      } else {
        this.$router.replace(`/user/${comment.userId}`);
      }
    },
  },
  async created() {
    try {
      const commentsRes = await axios(
        `posts/${this.singlePost.id}/comments?_expand=user`
      );
      this.allComments = commentsRes.data;
    } catch (error) {
      console.log(error);
    }
  },
};
</script>

<style scoped>
.caption__username {
  font-size: 0.9em;
  font-weight: 600;
  cursor: pointer;
}
.caption__text {
  font-size: 0.9em;
  margin-left: 0.5em;
}
.comments {
  margin-top: 0.3em;
}
</style>