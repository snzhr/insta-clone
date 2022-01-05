<template>
  <div class="stories">
    <div class="story" v-for="account in userFollowings" :key="account.id">
      <profile-img
        class="profile__img"
        :userImg="account.followedUser.profileImg"
      ></profile-img>
      <span>{{ account.followedUser.username }}</span>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import ProfileImg from "../components/ui/ProfileImg.vue";
export default {
  components: {
    ProfileImg,
  },
  data() {
    return {
      userFollowings: [],
    };
  },
  async created() {
    try {
      const userId = this.$store.getters.getUser.id;
      const res = await axios(`/users/${userId}?_embed=followings`);
      this.userFollowings = res.data.followings;
    } catch (error) {
      console.log(error);
    }
  },
};
</script>

<style scoped>
.profile__img {
  width: 4em;
  height: 4em;
}
.stories {
  display: flex;
  justify-content: flex-start;
  background-color: white;
  border: 1px solid #dcdcdc;
  border-radius: 0.2em;
  padding: 0.5em;
  margin-bottom: 1.5em;
  overflow-x: scroll;
}
::-webkit-scrollbar {
  width: 10px;
  height: 8px;
  cursor: pointer;
}
::-webkit-scrollbar-track-piece {
  background-color: #fafafa;
}
::-webkit-scrollbar-thumb {
  background-color: #dcdcdc;
  width: 5px;
}

.story span {
  font-size: 0.8em;
  margin-top: 0.5em;
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