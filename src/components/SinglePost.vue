<template>
  <div class="post">
    <div class="post__header"></div>
    <div class="post__body">
      <img
        src="https://res.cloudinary.com/practicaldev/image/fetch/s--ON6smotD--/c_imagga_scale,f_auto,fl_progressive,h_900,q_auto,w_1600/https://dev-to-uploads.s3.amazonaws.com/i/xa7en7o59vtxdhgte92u.jpeg"
        alt=""
      />
    </div>
    <div class="post__footer">Footer</div>
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
.post {
  background-color: white;
  border: 1px solid #dcdcdc;
}
.post img {
  width: 100%;
}
</style>