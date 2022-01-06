<template>
  <div class="mention" v-show="showMention">
    <div
      class="mention__user"
      v-for="user in usersForMention"
      :key="user.id"
      @click="replaceMention(user)"
    >
      {{ user.username }}
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  props: {
    comment: String,
  },
  data() {
    return {
      showMention: false,
      usersForMention: [],
      mentionedUser: "",
    };
  },
  watch: {
    comment(n, o) {
      if (n.includes("@")) {
        this.showMention = true;
        this.showComment();
      } else {
        this.showMention = false;
      }
    },
  },
  methods: {
    async showComment() {
      let m = this.comment.split(" ");
      let mentionWord = m.filter((text) => text.includes("@"));
      this.mentionedUser = mentionWord.join("").slice(1);
      if (this.mentionedUser) {
        const res = await axios(`/users?q=${this.mentionedUser}`);
        this.usersForMention = res.data;
      }
    },
    replaceMention(user) {
      this.showMention = false;
      let arr = this.comment.split(" ");
      let newArr = arr.map((item) => {
        if (item.includes("@")) {
          item = "@" + user.username;
        }
        return item;
      });
    },
  },
};
</script>

<style scoped>
.mention {
  background-color: white;
  border: 1px solid #dcdcdc;
  padding: 1em;
  width: 20em;
  height: 10em;
  position: absolute;
  bottom: 2em;
  left: 2.5em;
}
</style>