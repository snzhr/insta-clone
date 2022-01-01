<template>
  <div class="stories">
    <div class="story" v-for="account in getUser.followings" :key="account.id">
      <profile-img />
      <span>{{ account.followedUser.username }}</span>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import ProfileImg from "../components/ui/ProfileImg.vue";
export default {
  components: {
    ProfileImg,
  },
  computed: {
    ...mapGetters(["getUser"]),
  },
};
</script>

<style scoped>
.stories {
  display: flex;
  justify-content: flex-start;
  background-color: white;
  border: 1px solid #dcdcdc;
  border-radius: 0.2em;
  padding: 0.5em;
  margin-bottom: 1.5em;
}
.story span {
  font-size: 0.8em;
}
.story {
  width: 4em;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0.5em;
  cursor: pointer;
}
.profile span {
  margin-left: 1em;
}
</style>