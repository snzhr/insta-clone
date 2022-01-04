<template>
  <slot></slot>
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
<script>
import AppIcons from "./AppIcons.vue";
export default {
  components: {
    AppIcons,
  },
};
</script>
<style scoped>
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