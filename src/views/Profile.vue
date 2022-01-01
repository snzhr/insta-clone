<template>
  <div class="nav">
    <Navbar />
  </div>
  <div class="profile__page">
    <div class="main">
      <div class="main__top">
        <div class="profile__img">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png"
            alt=""
          />
        </div>
        <div class="account__info">
          <h2>Username</h2>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from "../components/Navbar.vue";
export default {
  components: { Navbar },
};
</script>

<style scoped>
.profile__page {
  padding-top: 6em;
}
.main {
  width: 73%;
  margin: auto;
  /* display: flex;
  justify-content: space-between;
  position: relative; */
}
.profile__img {
  width: 10em;
  height: 10em;
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
  width: 9em;
  border-radius: 100px;
  margin: auto;
}
</style>