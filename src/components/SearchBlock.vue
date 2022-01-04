<template>
  <div class="search__block">
    <div v-show="found.length === 0" class="empty__search">
      <h4>Recent</h4>
      <p>No recent searches.</p>
    </div>
    <div v-show="found.length > 0" class="found__items">
      <div
        @click="$router.push(`/user/${item.id}`)"
        class="item"
        v-for="item in found"
        :key="item.id"
      >
        <profile-img
          class="profile__img"
          :userImg="item.profileImg"
        ></profile-img>
        <p>{{ item.username }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import ProfileImg from "./ui/ProfileImg.vue";
export default {
  components: {
    ProfileImg,
  },
  props: {
    found: Array,
  },
};
</script>

<style scoped>
.search__block {
  position: absolute;
  background: white;
  right: -3em;
  border: 1px solid #dcdcdc;
  border-radius: 0.4em;
  top: 2.8em;
  width: 30vw;
  height: 50vh;
}
.empty__search {
  padding: 1em;
}
.empty__search p {
  margin-top: 7em;
  text-align: center;
  color: gray;
  font-weight: 600;
  font-size: 0.9em;
}
.found__items {
  padding: 1em 0;
}
.item {
  display: flex;
  align-items: center;
  padding: 0.5em 0.8em;
  cursor: pointer;
}
.item:hover {
  background-color: #fafafa;
}
.profile__img {
  width: 2.8em;
  height: 2.8em;
}
.item p {
  font-weight: 600;
  font-size: 0.9em;
  margin-left: 0.8em;
}
</style>