<template>
  <div class="profile__img has__story">
    <img
      src="https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png"
      alt=""
    />
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.profile__img {
  width: 4em;
  height: 4em;
  border-radius: 1000px;
  /* padding: 10px; */
  display: flex;
  justify-content: center;
}
.has__story {
  background: -webkit-linear-gradient(left top, #d7816a 0%, #bd4f6c 100%);
}
img {
  display: block;
  background: black;
  width: 3.6em;
  border-radius: 100px;
  margin: auto;
}
</style>