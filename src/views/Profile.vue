<template>
  <div class="nav">
    <Navbar />
  </div>
  <modal v-show="showModal" @closeModal="showModal = false">
    <div class="modal__content">
      <h3 style="padding: 1.5em">Change profile photo</h3>
      <div class="img__input">
        <input @change="uploadPhoto" type="file" id="file2" accept="image/*" />
        <label for="file2">Upload photo</label>
      </div>
      <p @click="removePhoto">Remove current photo</p>
    </div>
  </modal>
  <div class="profile__page">
    <div class="main">
      <div class="main__top">
        <profile-img
          @click="changeImg"
          class="profile__img"
          :userImg="getUser.profileImg"
        ></profile-img>
        <div class="account__info">
          <div class="account__info__username">
            <p class="account__username">{{ getUser.username }}
              <img v-if="getUser.verified" class="verified" src="../assets/verified.png" />
            </p>
            <button @click="$router.push('/profile/edit')">Edit profile</button>
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
          <div class="account_more__info">
            <h4>{{ getUser.name }}</h4>
            <p class="user__bio">{{ getUser.bio }}</p>
            <p>
              <a :href="getUser.website" target="_blank">{{
                getUser.website
              }}</a>
            </p>
          </div>
        </div>
      </div>

      <div class="account__posts">
        <div v-if="getUser.posts.length === 0" class="empty__posts">
          <img
            src="https://www.instagram.com/static/images/mediaUpsell.jpg/6efc710a1d5a.jpg"
            alt=""
          />
          <div class="empty__text">
            <h3>Start capturing and sharing your moments.</h3>
            <p>Get the app to share your first photo or video.</p>
            <app-icons></app-icons>
          </div>
        </div>

        <div v-else class="user__posts">
          <div
            @click="select(post)"
            v-for="post in getUser.posts.reverse()"
            :key="post.id"
            class="user__post"
            :style="{
              backgroundImage: `url(${post.img})`,
            }"
          >
            <div class="overlay"></div>
          </div>
          <modal v-if="showPostPreview" @closeModal="showPostPreview = false">
            <post-preview :post="currentPost" :comments="currentPostComments">
              <div class="post__settings">
                <p
                  @click="showPostSettings = true"
                  style="font-size: 1.5em; cursor: pointer"
                >
                  ...
                </p>
                <modal
                  v-if="showPostSettings"
                  @closeModal="showPostSettings = false"
                >
                  <div class="post__options">
                    <div class="modal__content">
                      <p @click="deletePost">Delete</p>
                    </div>
                  </div>
                </modal>
              </div>
            </post-preview>
          </modal>
        </div>
      </div>
      <auth-footer></auth-footer>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import firebase from "firebase";
import { mapGetters } from "vuex";
import Navbar from "../components/Navbar.vue";
import Modal from "../components/ui/Modal.vue";
import ProfileImg from "../components/ui/ProfileImg.vue";
import PostPreview from "../components/PostPreview.vue";
import AuthFooter from "../components/ui/AuthFooter.vue";
import AppIcons from "../components/ui/AppIcons.vue";
export default {
  components: { Navbar, Modal, ProfileImg, AuthFooter, AppIcons, PostPreview },
  data() {
    return {
      showModal: false,
      showPostPreview: false,
      currentPost: {},
      currentPostComments: [],
      showPostSettings: false,
    };
  },
  computed: {
    ...mapGetters(["getUser"]),
  },
  methods: {
    select(post) {
      this.currentPost = post;
      this.getComments();
      this.showPostPreview = true;
    },
    async deletePost() {
      try {
        axios.delete(`/posts/${this.currentPost.id}`);
        this.showPostSettings = false;
        this.showPostPreview = false;
      } catch (error) {
        console.log(error);
      }
    },
    async getComments() {
      try {
        const commentsRes = await axios(
          `posts/${this.currentPost.id}/comments?_expand=user`
        );
        this.currentPostComments = commentsRes.data;
      } catch (error) {
        console.log(error);
      }
    },
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
        this.showModal = false;
      } catch (error) {
        console.log(error);
      }
    },
    async removePhoto() {
      try {
        const res = await axios.patch(`/users/${this.getUser.id}`, {
          profileImg:
            "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png",
        });
        this.showModal = false;
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>

<style scoped>
.empty__posts {
  display: flex;
  background-color: white;
  border-radius: 3px;
}
.empty__posts img {
  width: 30vw;
  display: block;
  border-top-left-radius: 3px;
  border-bottom-left-radius: 3px;
}
.empty__text {
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  margin: auto;
}
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
  margin-bottom: 4em;
}
.profile__img {
  width: 9em;
  height: 9em;
  display: flex;
  justify-content: center;
  margin: 0 5em;
}
.account__username,
button {
  margin-right: .5em;
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
  cursor: pointer;
}
.account__info {
  width: 60%;
}
.account__info__username {
  display: flex;
  margin: 1em 0;
  align-items: center;
}
.account__followers__info span {
  margin-right: 1em;
}
.account__posts {
  border-top: 1px solid #dcdcdc;
  padding-top: 2em;
}
.overlay {
  width: 100%;
  height: inherit;
}
.overlay:hover {
  background-color: rgba(0, 0, 0, 0.5);
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
  cursor: pointer;
}
.modal__content {
  width: 30vw;
  text-align: center;
}
.modal__content > * {
  border-bottom: 1px solid #dcdcdc;
}
label {
  font-weight: 600;
  color: #3796f6;
  cursor: pointer;
  font-size: 0.9em;
}
.img__input {
  padding: 1em;
}
.modal__content p {
  color: firebrick;
  font-weight: 600;
  font-size: 0.9em;
  padding: 1em;
  cursor: pointer;
}
.account_more__info {
  margin-top: 1em;
}
.account_more__info > * {
  margin-bottom: 0.5em;
}
.account_more__info p a {
  text-decoration: none;
  font-weight: 600;
  color: #12377c;
}

.verified{
  max-width: 20px;
}
</style>