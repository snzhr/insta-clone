<template>
  <p style="text-align: center">Get the app.</p>
  <div class="mobile__app__links">
    <img
      src="https://www.instagram.com/static/images/appstore-install-badges/badge_ios_english-en.png/180ae7a0bcf7.png"
      alt=""
    />
    <img
      src="https://www.instagram.com/static/images/appstore-install-badges/badge_android_english-en.png/e9cd846dc748.png"
      alt=""
    />
  </div>
  <div class="footer__links">
    <span>Meta</span>
    <span>About</span>
    <span>Blog</span>
    <span>Jobs</span>
    <span>Help</span>
    <span>API</span>
    <span>Privacy</span>
    <span>Top Accounts</span>
    <span>Hashtags</span>
    <span>Locations</span>
    <span>Instagram Lite</span>
  </div>
  <div class="sub__footer">
    <span>English</span>
    <span>© 2021 Instagram from Meta</span>
  </div>
</template>
<style scoped>
.mobile__app__links {
  display: flex;
  width: 17em;
  justify-content: space-between;
  margin: 1em auto;
}
.mobile__app__links img {
  display: block;
  max-width: 8em;
  margin-bottom: 2em;
}
.footer__links,
.sub__footer {
  width: 41.7em;
  margin: 1em auto;
  text-align: center;
}
.footer__links > span,
.sub__footer > span {
  color: gray;
  font-size: 0.8em;
  margin-right: 1em;
}
</style>