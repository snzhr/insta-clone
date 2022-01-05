<template>
  <div class="sidebar">
    <div class="user_profile">
      <div
        @click="$router.push(`/profile/${getUser.username}`)"
        class="profile"
      >
        <profile-img
          class="profile__img"
          :userImg="getUser.profileImg"
        ></profile-img>
        <span class="username">{{ getUser.username }}</span>
      </div>
      <p class="profile__btn">Switch</p>
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
          <div @click="$router.push(`/user/${user.id}`)" class="profile">
            <profile-img
              class="profile__img"
              :userImg="user.profileImg"
            ></profile-img>
            <span class="username">{{ user.username }}</span>
          </div>
          <p
            v-show="followed === false"
            class="profile__btn"
            @click="follow(user)"
          >
            Follow
          </p>
          <p
            v-show="followed === true"
            class="profile__btn"
            @click="unfollow(user)"
          >
            Unfollow
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { mapGetters } from "vuex";
import ProfileImg from "./ui/ProfileImg.vue";
export default {
  components: {
    ProfileImg,
  },
  data() {
    return {
      suggestionAccounts: [],
      suggestionFollowers: [],
      followed: false,
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
        const userFollowersres = await axios(
          `/users/${user.id}?_embed=followers`
        );
        this.suggestionFollowers = userFollowersres.data.followers;
        this.followed = true;
      } catch (error) {
        console.log(error);
      }
    },
    async unfollow(user) {
      try {
        let followerID = null;
        for (const item of this.suggestionFollowers) {
          if (item.follower.id === this.getUser.id) {
            followerID = item.id;
          }
        }
        const res = await axios.delete(`/followings/${followerID}`);
        const resFollower = await axios.delete(`/followers/${followerID}`);
        this.followed = false;
      } catch (error) {
        console.log(error);
      }
    },
  },
  async created() {
    const f = await axios(`/followings?userId=${this.getUser.id}`);
    const usersForExclude = f.data;
    let query = "";
    for (const item of usersForExclude) {
      query += `&id_ne=${item.followedUser.id}`;
    }
    const currentUserId = this.getUser.id;
    try {
      const res = await axios(`/users?id_ne=${currentUserId}${query}`);
      this.suggestionAccounts = res.data;
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
.profile__img {
  width: 3.5em;
  height: 3.5em;
}
.user_profile {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5em;
  margin-top: 1.2em;
}
.profile {
  display: flex;
  align-items: center;
  cursor: pointer;
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
  font-size: 0.8em;
  color: #3796f6;
  cursor: pointer;
}
</style>