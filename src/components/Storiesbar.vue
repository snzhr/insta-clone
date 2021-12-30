<template>
  <div class="stories">
    <div class="story">
      <div class="has__story">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png"
          alt=""
        />
      </div>
      <span>account</span>
    </div>

    <div class="story">
      <img
        src="https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png"
        alt=""
      />
      <span>account</span>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.stories {
  display: flex;
  justify-content: flex-start;
  background-color: white;
  border: 1px solid #dcdcdc;
  border-radius: 0.2em;
  padding: 0.5em;
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
}
.has__story {
  background: -webkit-linear-gradient(left top, #d7816a 0%, #bd4f6c 100%);
  width: 4em;
  height: 4em;
  border-radius: 1000px;
  /* padding: 10px; */
  display: flex;
  justify-content: center;
}
img {
  display: block;
  background: black;
  width: 3.6em;
  border-radius: 1000px;
  margin: auto;
}
.profile span {
  margin-left: 1em;
}
</style>