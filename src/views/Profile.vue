<template>
  <div class="nav">
    <Navbar />
  </div>
  <modal v-show="showModal" @closeModal="showModal = false">
    <div class="modal__content">
      <h3 style="padding: 2em">Change profile photo</h3>
      <input @change="uploadPhoto" type="file" id="file2" accept="image/*" />
      <label for="file2">Upload photo</label>
    </div>
  </modal>
  <div class="profile__page">
    <div class="main">
      <div class="main__top">
        <div
          class="profile__img"
          :style="{ backgroundImage: `url(${getUser.profileImg})` }"
          @click="changeImg"
        ></div>
        <div class="account__info">
          <div class="account__info__username">
            <p class="account__username">{{ getUser.username }}</p>
            <button>Edit profile</button>
            <div class="setting__btn">
              <svg
                aria-label="Options"
                class="_8-yf5"
                color="#262626"
                fill="#262626"
                height="24"
                role="img"
                viewBox="0 0 24 24"
                width="24"
              >
                <circle
                  cx="12"
                  cy="12"
                  fill="none"
                  r="8.635"
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                ></circle>
                <path
                  d="M14.232 3.656a1.269 1.269 0 01-.796-.66L12.93 2h-1.86l-.505.996a1.269 1.269 0 01-.796.66m-.001 16.688a1.269 1.269 0 01.796.66l.505.996h1.862l.505-.996a1.269 1.269 0 01.796-.66M3.656 9.768a1.269 1.269 0 01-.66.796L2 11.07v1.862l.996.505a1.269 1.269 0 01.66.796m16.688-.001a1.269 1.269 0 01.66-.796L22 12.93v-1.86l-.996-.505a1.269 1.269 0 01-.66-.796M7.678 4.522a1.269 1.269 0 01-1.03.096l-1.06-.348L4.27 5.587l.348 1.062a1.269 1.269 0 01-.096 1.03m11.8 11.799a1.269 1.269 0 011.03-.096l1.06.348 1.318-1.317-.348-1.062a1.269 1.269 0 01.096-1.03m-14.956.001a1.269 1.269 0 01.096 1.03l-.348 1.06 1.317 1.318 1.062-.348a1.269 1.269 0 011.03.096m11.799-11.8a1.269 1.269 0 01-.096-1.03l.348-1.06-1.317-1.318-1.062.348a1.269 1.269 0 01-1.03-.096"
                  fill="none"
                  stroke="currentColor"
                  stroke-linejoin="round"
                  stroke-width="2"
                ></path>
              </svg>
            </div>
          </div>
          <div class="account__followers__info">
            <span
              ><b>{{ getUser.posts.length }}</b> posts</span
            >
            <span>
              <b>{{ getUser.followers.length }}</b> follower</span
            >
            <span
              ><b>{{ getUser.followings.length }}</b> following</span
            >
          </div>
        </div>
      </div>
      <div class="account__posts">
        <div class="user__posts">
          <div
            v-for="post in getUser.posts"
            :key="post.id"
            class="user__post"
            :style="{ backgroundImage: `url(${post.img})` }"
          ></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import firebase from "firebase";
import { mapGetters } from "vuex";
import Navbar from "../components/Navbar.vue";
import Modal from "../components/ui/Modal.vue";
export default {
  components: { Navbar, Modal },
  data() {
    return {
      showModal: false,
    };
  },
  computed: {
    ...mapGetters(["getUser"]),
  },
  methods: {
    changeImg() {
      this.showModal = true;
    },
    async uploadPhoto(e) {
      try {
        const profileImg = e.target.files[0];
        const storage = firebase.storage();
        const storageRef = storage.ref("/profiles");
        const imageRef = storageRef.child(Date.now() + profileImg.name);
        await imageRef.put(profileImg);
        const imageUrl = await imageRef.getDownloadURL();
        const res = await axios.patch(`/users/${this.getUser.id}`, {
          profileImg: imageUrl,
        });
        console.log(res);
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>

<style scoped>
input[type="file"] {
  display: none;
}
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
  width: 10em;
  height: 10em;
  border-radius: 1000px;
  display: flex;
  justify-content: center;
  margin: 0 5em;
  background-position: center;
  background-size: cover;
}
/* .has__story {
  background: -webkit-linear-gradient(left top, #d7816a 0%, #bd4f6c 100%);
} */
/* .profile__img img {
  display: block;
  max-width: 9em;
  border-radius: 100px;
  margin: auto;
} */

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
  border: 1px solid #dcdcdc;
  padding: 0.5em;
  border-radius: 5px;
  background-color: transparent;
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
.user__post {
  width: 29%;
  margin: 0 1em;
  height: 40vh;
  background-position: center;
  background-size: cover;
}
.modal__content {
  width: 30vw;
  height: 30vh;
}
label {
  font-weight: 600;
  color: #3796f6;
  cursor: pointer;
}
</style>