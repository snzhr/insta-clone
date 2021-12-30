<template>
  <div class="stories">
    <div class="story">
      <profile-img />
      <span>account</span>
    </div>

    <div class="story">
      <profile-img />
      <span>account</span>
    </div>
  </div>
</template>

<script>
import ProfileImg from "../components/ui/ProfileImg.vue";
export default {
  components: {
    ProfileImg,
  },
};
</script>

<style scoped>
.stories {
  display: flex;
  justify-content: flex-start;
  background-color: white;
  border: 1px solid #dcdcdc;
  border-radius: 0.2em;
  padding: 0.5em;
  margin-bottom: 1.5em;
}
.story span {
  font-size: 0.8em;
}
.story {
  width: 4em;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0.5em;
  cursor: pointer;
}
.profile span {
  margin-left: 1em;
}
</style>