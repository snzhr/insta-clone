<template>
  <div class="sidebar">
    <div class="user_profile">
      <div class="profile">
        <img
          src="https://www.kindpng.com/picc/m/722-7221920_placeholder-profile-image-placeholder-png-transparent-png.png"
          alt=""
        />
        <span>@profile</span>
      </div>
      <p>switch</p>
    </div>
    <div class="profile__suggestions">
      <div class="suggestions__header">
        <h4>Suggestions for you</h4>
        <p>See All</p>
      </div>
      <div class="suggestion__account">
        <div class="user_profile">
          <div class="profile">
            <img
              src="https://www.kindpng.com/picc/m/722-7221920_placeholder-profile-image-placeholder-png-transparent-png.png"
              alt=""
            />
            <span>@profile</span>
          </div>
          <p>switch</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.sidebar {
  height: auto;
  width: 22%;
  position: fixed;
  right: 14%;
}
img {
  width: 20%;
  border-radius: 50px;
}
.user_profile {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5em;
}
.profile {
  display: flex;
  align-items: center;
}
.profile span {
  margin-left: 1em;
}

.suggestions__header {
  margin-bottom: 1em;
  display: flex;
  justify-content: space-between;
}
.suggestions__header h4 {
  color: dimgray;
  font-size: 0.9em;
}
.suggestions__header p {
  font-size: 0.8em;
  font-weight: 600;
}
</style>