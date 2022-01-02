<template>
  <div class="search__block">
    <div v-show="found.length === 0" class="empty__search">
      <h4>Recent</h4>
      <p>No recent searches.</p>
    </div>
    <div v-show="found.length > 0" class="found__items">
      <div class="item" v-for="item in found" :key="item.id">
        <h4 @click="$router.push(`/user/${item.id}`)">{{ item.username }}</h4>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    found: Array,
  },
};
</script>

<style scoped>
.search__block {
  padding: 1em;
  position: absolute;
  background: white;
  right: -2.5em;
  border: 1px solid #dcdcdc;
  border-radius: 0.4em;
  top: 3em;
  width: 30vw;
  height: 50vh;
}
.empty__search p {
  margin-top: 7em;
  text-align: center;
  color: gray;
  font-weight: 600;
}
</style>