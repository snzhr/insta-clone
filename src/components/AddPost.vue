<template>
  <div class="modal__content">
    <div v-show="!uploaded" class="modal__header" style="text-align: center">
      <h4>Create new post</h4>
    </div>
    <div v-show="uploaded" class="modal__header__uploaded">
      <h4 @click="discard">Back</h4>
      <h4>Crop</h4>
      <h4 v-show="!imgReady" @click="expand">Next</h4>
      <h4 v-show="imgReady" @click="upload">Share</h4>
    </div>
    <div class="modal_inner">
      <div class="modal__img__view">
        <div v-show="!uploaded" class="modal__body">
          <svg
            aria-label="Icon to represent media such as images or videos"
            class="_8-yf5"
            color="#262626"
            fill="#262626"
            height="77"
            role="img"
            viewBox="0 0 97.6 77.3"
            width="96"
          >
            <path
              d="M16.3 24h.3c2.8-.2 4.9-2.6 4.8-5.4-.2-2.8-2.6-4.9-5.4-4.8s-4.9 2.6-4.8 5.4c.1 2.7 2.4 4.8 5.1 4.8zm-2.4-7.2c.5-.6 1.3-1 2.1-1h.2c1.7 0 3.1 1.4 3.1 3.1 0 1.7-1.4 3.1-3.1 3.1-1.7 0-3.1-1.4-3.1-3.1 0-.8.3-1.5.8-2.1z"
              fill="currentColor"
            ></path>
            <path
              d="M84.7 18.4L58 16.9l-.2-3c-.3-5.7-5.2-10.1-11-9.8L12.9 6c-5.7.3-10.1 5.3-9.8 11L5 51v.8c.7 5.2 5.1 9.1 10.3 9.1h.6l21.7-1.2v.6c-.3 5.7 4 10.7 9.8 11l34 2h.6c5.5 0 10.1-4.3 10.4-9.8l2-34c.4-5.8-4-10.7-9.7-11.1zM7.2 10.8C8.7 9.1 10.8 8.1 13 8l34-1.9c4.6-.3 8.6 3.3 8.9 7.9l.2 2.8-5.3-.3c-5.7-.3-10.7 4-11 9.8l-.6 9.5-9.5 10.7c-.2.3-.6.4-1 .5-.4 0-.7-.1-1-.4l-7.8-7c-1.4-1.3-3.5-1.1-4.8.3L7 49 5.2 17c-.2-2.3.6-4.5 2-6.2zm8.7 48c-4.3.2-8.1-2.8-8.8-7.1l9.4-10.5c.2-.3.6-.4 1-.5.4 0 .7.1 1 .4l7.8 7c.7.6 1.6.9 2.5.9.9 0 1.7-.5 2.3-1.1l7.8-8.8-1.1 18.6-21.9 1.1zm76.5-29.5l-2 34c-.3 4.6-4.3 8.2-8.9 7.9l-34-2c-4.6-.3-8.2-4.3-7.9-8.9l2-34c.3-4.4 3.9-7.9 8.4-7.9h.5l34 2c4.7.3 8.2 4.3 7.9 8.9z"
              fill="currentColor"
            ></path>
            <path
              d="M78.2 41.6L61.3 30.5c-2.1-1.4-4.9-.8-6.2 1.3-.4.7-.7 1.4-.7 2.2l-1.2 20.1c-.1 2.5 1.7 4.6 4.2 4.8h.3c.7 0 1.4-.2 2-.5l18-9c2.2-1.1 3.1-3.8 2-6-.4-.7-.9-1.3-1.5-1.8zm-1.4 6l-18 9c-.4.2-.8.3-1.3.3-.4 0-.9-.2-1.2-.4-.7-.5-1.2-1.3-1.1-2.2l1.2-20.1c.1-.9.6-1.7 1.4-2.1.8-.4 1.7-.3 2.5.1L77 43.3c1.2.8 1.5 2.3.7 3.4-.2.4-.5.7-.9.9z"
              fill="currentColor"
            ></path>
          </svg>
          <h2>Drag photos and videos here</h2>
          <input @change="readFile" type="file" id="file" accept="image/*" />
          <label for="file">Select from computer</label>
        </div>
        <div v-show="uploaded">
          <img :src="imgPreview" alt="" />
        </div>
      </div>
      <div v-show="imgReady" class="expand">
        <h4>{{ getUser.username }}</h4>
        <textarea
          v-model="post.caption"
          placeholder="Write a caption"
          cols="35"
          rows="10"
        ></textarea>
        <h4 v-show="uploadingPost">Uploading...</h4>
      </div>
    </div>
  </div>
</template>

      <script>
import firebase from "firebase";
import axios from "axios";
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      post: {
        img: null,
        caption: "",
        userId: "",
        likes: 0,
        createdAt: Date.now(),
        likedUsers: [],
      },
      localImgUrl: null,
      imgPreview: null,
      uploaded: false,
      imgReady: false,
      uploadingPost: false,
    };
  },
  computed: {
    ...mapGetters(["getUser"]),
  },
  methods: {
    readFile(e) {
      this.localImgUrl = e.target.files[0];
      this.imgPreview = URL.createObjectURL(this.localImgUrl);
      this.uploaded = true;
    },
    discard() {
      this.uploaded = false;
      this.imgReady = false;
      this.post = {
        img: null,
        caption: "",
        userId: "",
      };
    },
    expand() {
      this.imgReady = true;
    },
    async upload() {
      try {
        this.uploadingPost = true;
        const storage = firebase.storage();
        const storageRef = storage.ref();
        const imageRef = storageRef.child(Date.now() + this.localImgUrl.name);
        await imageRef.put(this.localImgUrl);
        const imageUrl = await imageRef.getDownloadURL();
        this.post.img = imageUrl;
        this.post.userId = this.getUser.id;
        this.share();
        this.uploadingPost = false;
        this.discard();
      } catch (error) {
        console.log(error);
      }
    },
    async share() {
      try {
        const res = await axios.post(`/posts`, this.post);
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>
<style scoped>
.modal__content {
  height: 60vh;
}
input[type="file"] {
  display: none;
}
.modal__header,
.modal__header__uploaded {
  padding: 1em;
  border-bottom: 1px solid #dcdcdc;
}
.modal__body {
  margin-top: 25%;
  height: 10em;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
}
.modal__body h2 {
  font-weight: 500;
  font-size: 1.4em;
}
label {
  background-color: #3796f6 !important;
  border: none;
  padding: 0.5em;
  color: white;
  border-radius: 4px;
  font-weight: 600;
  font-size: 0.9em;
  cursor: pointer;
}
.modal__header__uploaded {
  display: flex;
  justify-content: space-between;
  /* border-bottom: 1px solid #dcdcdc; */
  /* position: fixed; */
  /* background: white; */
  /* width: inherit; */
  /* border-top-right-radius: 10px; */
  /* border-top-left-radius: 10px; */
}
.modal__header__uploaded h4:first-child,
h4:last-child {
  cursor: pointer;
}
.modal__img__view {
  /* margin-top: 3em; */
  width: 30vw;
}
.modal__img__view img {
  max-width: 100%;
}
.modal_inner {
  display: flex;
}
.expand {
  width: 25vw;
  border-left: 1px solid #dcdcdc;
  padding: 1em;
  text-align: left;
}
.expand textarea {
  border: none;
  margin: 0.5em 0.5em 0.5em 0;
  /* padding: 0.5em; */
}
.expand textarea:focus {
  outline: none;
}
</style>