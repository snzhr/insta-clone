<template>
  <div class="nav">
    <Navbar />
  </div>
  <div class="edit__profile">
    <div class="edit__options">
      <div class="options__menu">
        <div class="menu__item" v-for="(item, index) in menuItems" :key="index">
          {{ item }}
        </div>
      </div>
      <div class="change__options">
        <div class="options">
          <div class="user">
            <profile-img
              class="avatar"
              :userImg="getUser.profileImg"
            ></profile-img>
            <p>{{ getUser.username }}</p>
          </div>
          <form class="user__form" @submit.prevent="updateUser">
            <div>
              <label for="name">Name</label>
              <input
                v-model="currentUser.name"
                type="text"
                id="name"
                placeholder="Name"
              />
            </div>
            <div>
              <label for="username">Username</label>
              <input
                v-model="currentUser.username"
                type="text"
                id="username"
                placeholder="Username"
              />
            </div>
            <div>
              <label for="website">Website</label>
              <input
                v-model="currentUser.website"
                type="text"
                id="website"
                placeholder="Website"
              />
            </div>
            <div>
              <label for="bio">Bio</label>
              <textarea
                v-model="currentUser.bio"
                id="bio"
                cols="40"
                rows="4"
              ></textarea>
            </div>
            <div>
              <label for="email">Email</label>
              <input
                v-model="currentUser.email"
                type="text"
                id="email"
                placeholder="Email"
              />
            </div>
            <div>
              <label for="phone">Phone Number </label>
              <input
                v-model="currentUser.phone"
                type="text"
                id="phone"
                placeholder="Phone Number"
              />
            </div>
            <div>
              <label for="gender">Gender</label>
              <input
                v-model="currentUser.gender"
                type="text"
                id="gender"
                placeholder="Gender"
              />
            </div>
            <button :disabled="updated" type="submit">Submit</button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { mapGetters } from "vuex";
import Navbar from "../components/Navbar.vue";
import ProfileImg from "../components/ui/ProfileImg.vue";
export default {
  components: {
    Navbar,
    ProfileImg,
  },
  data() {
    return {
      currentUser: {
        name: "",
        username: "",
        website: "",
        bio: "",
        email: "",
        phone: "",
        gender: "",
      },
      menuItems: [
        "Edit Profile",
        "Change Password",
        "Apps and Websites",
        "Email and SMS",
        "Push Notifications",
        "Manage Contacts",
        "Privacy and Security",
        "Login Activity",
        "Emails from Instagram",
        "Help",
        "Switch to Professional Account",
      ],
      updated: false,
    };
  },
  computed: {
    ...mapGetters(["getUser"]),
  },
  created() {
    this.currentUser = this.getUser;
  },
  methods: {
    async updateUser() {
      try {
        const res = await axios.patch(`/users/${this.getUser.id}`, {
          name: this.currentUser.name,
          username: this.currentUser.username,
          website: this.currentUser.website,
          bio: this.currentUser.bio,
          email: this.currentUser.email,
          phone: this.currentUser.phone,
          gender: this.currentUser.gender,
        });
        this.updated = true;
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>

<style scoped>
form {
  width: 80%;
}
form div {
  margin: 1em;
  text-align: right;
}
form button {
  background-color: #3796f6;
  border: none;
  margin-left: 11em;
  padding: 0.4em;
  border-radius: 0.3em;
  color: white;
  font-weight: 600;
  font-size: 0.9em;
  cursor: pointer;
}
label {
  font-weight: 600;
  color: #2a2a2a;
  width: 20%;
  margin-right: 1em;
}
input,
textarea {
  border: 1px solid #dcdcdc;
  border-radius: 0.2em;
  font-size: 1em;
  padding: 0.5em 0.5em 0.5em 0.7em;
  width: 70%;
}
.user {
  display: flex;
  align-items: center;
  padding-left: 6em;
}
.user p {
  font-size: 1.3em;
  margin-left: 1em;
}
.avatar {
  width: 2.5em;
  height: 2.5em;
}
.edit__profile {
  padding: 5.5em 0;
  background-color: #fafafa;
}
.edit__options {
  background-color: white;
  display: flex;
  height: 100vh;
  width: 73%;
  margin: auto;
  border: 1px solid #dcdcdc;
  border-radius: 0.2em;
}
.options__menu {
  width: 25%;
  height: inherit;
  border-right: 1px solid #dcdcdc;
}
.menu__item {
  padding: 1em 0 1em 2em;
  cursor: pointer;
  border-left: 2px solid transparent;
}
.menu__item:first-child {
  color: #000;
  font-weight: 600;
  border-left: 2px solid #000;
}
.menu__item:first-child:hover {
  border-left: 2px solid #000;
}
.menu__item:last-child {
  border-left: 2px solid transparent;
  color: #3796f6;
  font-weight: 600;
}
.menu__item:hover {
  background-color: #fafafa;
  border-left: 2px solid #dcdcdc;
}
.change__options {
  width: 75%;
  height: inherit;
  padding: 2em;
}
button:disabled {
  opacity: 0.5;
}
</style>