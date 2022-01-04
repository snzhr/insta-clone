<template>
  <div class="post">
    <div class="post__header">
      <div class="post__profile__image">
        <profile-img
          class="profile__img"
          :userImg="post.user.profileImg"
        ></profile-img>
        <p @click="$router.push(`/user/${post.user.id}`)">
          {{ post.user.username }}
        </p>
      </div>
      <p class="dots">...</p>
    </div>
    <div class="post__body">
      <img :src="post.img" alt="" />
    </div>
    <div class="post__footer">
      <div class="footer__buttons">
        <div class="left__buttons">
          <span
            ><svg
              aria-label="Like"
              class="_8-yf5"
              color="#262626"
              fill="#262626"
              height="24"
              role="img"
              viewBox="0 0 24 24"
              width="24"
            >
              <path
                d="M16.792 3.904A4.989 4.989 0 0121.5 9.122c0 3.072-2.652 4.959-5.197 7.222-2.512 2.243-3.865 3.469-4.303 3.752-.477-.309-2.143-1.823-4.303-3.752C5.141 14.072 2.5 12.167 2.5 9.122a4.989 4.989 0 014.708-5.218 4.21 4.21 0 013.675 1.941c.84 1.175.98 1.763 1.12 1.763s.278-.588 1.11-1.766a4.17 4.17 0 013.679-1.938m0-2a6.04 6.04 0 00-4.797 2.127 6.052 6.052 0 00-4.787-2.127A6.985 6.985 0 00.5 9.122c0 3.61 2.55 5.827 5.015 7.97.283.246.569.494.853.747l1.027.918a44.998 44.998 0 003.518 3.018 2 2 0 002.174 0 45.263 45.263 0 003.626-3.115l.922-.824c.293-.26.59-.519.885-.774 2.334-2.025 4.98-4.32 4.98-7.94a6.985 6.985 0 00-6.708-7.218z"
              ></path></svg
          ></span>
          <span
            ><svg
              aria-label="Comment"
              class="_8-yf5"
              color="#262626"
              fill="#262626"
              height="24"
              role="img"
              viewBox="0 0 24 24"
              width="24"
            >
              <path
                d="M20.656 17.008a9.993 9.993 0 10-3.59 3.615L22 22z"
                fill="none"
                stroke="currentColor"
                stroke-linejoin="round"
                stroke-width="2"
              ></path></svg
          ></span>
          <span>
            <svg
              aria-label="Share Post"
              class="_8-yf5"
              color="#262626"
              fill="#262626"
              height="24"
              role="img"
              viewBox="0 0 24 24"
              width="24"
            >
              <line
                fill="none"
                stroke="currentColor"
                stroke-linejoin="round"
                stroke-width="2"
                x1="22"
                x2="9.218"
                y1="3"
                y2="10.083"
              ></line>
              <polygon
                fill="none"
                points="11.698 20.334 22 3.001 2 3.001 9.218 10.084 11.698 20.334"
                stroke="currentColor"
                stroke-linejoin="round"
                stroke-width="2"
              ></polygon>
            </svg>
          </span>
        </div>
        <div class="right__button">
          <svg
            aria-label="Save"
            class="_8-yf5"
            color="#262626"
            fill="#262626"
            height="24"
            role="img"
            viewBox="0 0 24 24"
            width="24"
          >
            <polygon
              fill="none"
              points="20 21 12 13.44 4 21 4 3 20 3 20 21"
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
            ></polygon>
          </svg>
        </div>
      </div>
      <p class="likes">856 likes</p>
      <div class="caption">
        <p>
          <span
            class="caption__username"
            @click="$router.push(`/user/${post.user.id}`)"
            >{{ post.user.username }}
          </span>
          <span class="caption__text"> {{ post.caption }} </span>
        </p>
        <div class="comments">
          <span
            style="font-size: 0.9em; color: gray; cursor: pointer"
            v-if="post.comments.length >= 2"
            >View all {{ post.comments.length }} comments</span
          >
          <p
            class="comment"
            v-for="comment in post.comments.slice(0, 2)"
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
        <p class="caption__time">{{ timeSince(post.createdAt) }}</p>
      </div>
      <div class="caption__add__comment">
        <div class="smiles">
          <svg
            aria-label="Emoji"
            class="_8-yf5"
            color="#262626"
            fill="#262626"
            height="24"
            role="img"
            viewBox="0 0 24 24"
            width="24"
          >
            <path
              d="M15.83 10.997a1.167 1.167 0 101.167 1.167 1.167 1.167 0 00-1.167-1.167zm-6.5 1.167a1.167 1.167 0 10-1.166 1.167 1.167 1.167 0 001.166-1.167zm5.163 3.24a3.406 3.406 0 01-4.982.007 1 1 0 10-1.557 1.256 5.397 5.397 0 008.09 0 1 1 0 00-1.55-1.263zM12 .503a11.5 11.5 0 1011.5 11.5A11.513 11.513 0 0012 .503zm0 21a9.5 9.5 0 119.5-9.5 9.51 9.51 0 01-9.5 9.5z"
            ></path>
          </svg>
        </div>
        <input
          v-model="postComment"
          type="text"
          placeholder="Add a comment..."
        />
        <button
          class="add__comment__btn"
          :disabled="postComment === ''"
          @click="addComment"
        >
          Post
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import ProfileImg from "../components/ui/ProfileImg.vue";
import { mapGetters } from "vuex";
export default {
  props: {
    post: Object,
  },
  data() {
    return {
      postComment: "",
    };
  },
  components: {
    ProfileImg,
  },
  computed: {
    ...mapGetters(["getUser"]),
  },
  methods: {
    async addComment() {
      try {
        if (this.postComment !== "") {
          await axios.post(`/comments`, {
            text: this.postComment,
            postId: this.post.id,
            userId: this.getUser.id,
            userName: this.getUser.username,
          });
          this.postComment = "";
          console.log("successfully created");
        } else {
          console.log("Comment field is empty");
        }
      } catch (error) {
        console.log(error);
      }
    },
    timeSince(date) {
      if (typeof date !== "object") {
        date = new Date(date);
      }

      let seconds = Math.floor((new Date() - date) / 1000);
      let intervalType;

      let interval = Math.floor(seconds / 31536000);
      if (interval >= 1) {
        intervalType = "year";
      } else {
        interval = Math.floor(seconds / 2592000);
        if (interval >= 1) {
          intervalType = "month";
        } else {
          interval = Math.floor(seconds / 86400);
          if (interval >= 1) {
            intervalType = "day";
          } else {
            interval = Math.floor(seconds / 3600);
            if (interval >= 1) {
              intervalType = "hour";
            } else {
              interval = Math.floor(seconds / 60);
              if (interval >= 1) {
                intervalType = "minute";
              } else {
                interval = seconds;
                intervalType = "second";
              }
            }
          }
        }
      }
      if (interval > 1 || interval === 0) {
        intervalType += "s ago";
      } else {
        intervalType += " ago";
      }
      return interval + " " + intervalType;
    },
  },
};
</script>

<style scoped>
.post {
  background-color: white;
  border: 1px solid #dcdcdc;
  border-radius: 3px;
  margin-bottom: 1.5em;
}
.post img {
  width: 100%;
}
.post__header {
  padding: 1em;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid #dcdcdc;
}
.post__profile__image {
  display: flex;
  align-items: center;
}
.post__profile__image p {
  margin-left: 0.8em;
  cursor: pointer;
}
.profile__img {
  width: 3em;
  height: 3em;
}
.dots {
  font-size: 1.5em;
  cursor: pointer;
}
.post__footer {
  padding: 1em;
}
.footer__buttons {
  display: flex;
  justify-content: space-between;
  margin-bottom: 1em;
}
.left__buttons span:not(:last-child) {
  margin-right: 1em;
}
.likes {
  margin-bottom: 1em;
}
.caption__username {
  font-size: 0.9em;
  font-weight: 600;
  cursor: pointer;
}
.caption__time {
  margin: 0.8em 0;
  font-size: 0.7em;
  text-transform: uppercase;
  color: gray;
}
.caption__text {
  font-size: 0.9em;
  margin-left: 0.5em;
}
.comments {
  margin-top: 0.3em;
}
.caption__add__comment {
  display: flex;
  align-items: center;
}
.caption__add__comment input {
  width: 100%;
  margin: 0 0.5em 0 1em;
  font-size: 0.9em;
  outline: none;
  border: none;
}
.add__comment__btn {
  color: #3796f6;
  font-weight: 600;
  font-size: 0.9em;
  cursor: pointer;
  border: none;
  display: block;
  background-color: transparent;
}
button:disabled {
  opacity: 0.5;
}
</style>