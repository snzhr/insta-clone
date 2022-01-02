<template>
  <div class="sidebar">
    <div class="user_profile">
      <div class="profile">
        <img
          src="https://www.kindpng.com/picc/m/722-7221920_placeholder-profile-image-placeholder-png-transparent-png.png"
          alt=""
        />
        <span
          @click="$router.push(`/profile/${getUser.username}`)"
          class="username"
          >{{ getUser.username }}</span
        >
      </div>
      <p class="profile__btn">switch</p>
    </div>
    <div class="profile__suggestions">
      <div class="suggestions__header">
        <h4>Suggestions for you</h4>
        <p>See All</p>
      </div>
      <div class="suggestion__account">
        <div
          class="user_profile"
          v-for="user in suggestionAccounts"
          :key="user.id"
        >
          <div class="profile">
            <img
              src="https://www.kindpng.com/picc/m/722-7221920_placeholder-profile-image-placeholder-png-transparent-png.png"
              alt=""
            />
            <span
              @click="$router.push(`/profile/${user.username}`)"
              class="username"
              >{{ user.username }}</span
            >
          </div>
          <p class="profile__btn" @click="follow(user)">follow</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      suggestionAccounts: [],
    };
  },
  computed: {
    ...mapGetters(["getUser"]),
  },
  methods: {
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
      } catch (error) {
        console.log(error);
      }
    },
  },
  async created() {
    const currentUserId = this.getUser.id;
    try {
      const res = await axios(`/users?id_ne=${currentUserId}`);
      this.suggestionAccounts = res.data;
      // console.log(res);
    } catch (error) {
      console.log(error);
    }
  },
};
</script>

<style scoped>
.sidebar {
  height: auto;
  width: 22%;
  position: fixed;
  right: 14%;
}
img {
  width: 20%;
  border-radius: 50px;
}
.user_profile {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5em;
}
.profile {
  display: flex;
  align-items: center;
}
.profile span {
  margin-left: 1em;
}

.suggestions__header {
  margin-bottom: 1em;
  display: flex;
  justify-content: space-between;
}
.suggestions__header h4 {
  color: dimgray;
  font-size: 0.9em;
}
.suggestions__header p {
  font-size: 0.8em;
  font-weight: 600;
}
.username {
  font-weight: 800;
  font-size: 0.9em;
}
.profile__btn {
  font-weight: 600;
  font-size: 0.9em;
  color: #3796f6;
  cursor: pointer;
}
</style>