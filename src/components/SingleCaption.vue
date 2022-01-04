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
      <span
        style="font-size: 0.9em; color: gray; cursor: pointer"
        v-if="singlePost.comments.length > 2"
        >View all {{ singlePost.comments.length }} comments</span
      >
      <p
        class="comment"
        v-for="comment in singlePost.comments.slice(0, 2)"
        :key="comment.id"
      >
        <span
          @click="$router.push(`/user/${comment.userId}`)"
          class="caption__username"
          >{{ comment.userName }}</span
        >
        <span class="caption__text">{{ comment.text }}</span>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    singlePost: Object,
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