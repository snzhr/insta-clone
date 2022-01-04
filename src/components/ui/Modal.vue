<template>
  <div class="modal__bg">
    <span class="close" @click="$emit('closeModal')">X</span>
    <div class="modal">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.modal__bg {
  background-color: rgba(0, 0, 0, 0.85);
  position: fixed;
  height: 100%;
  width: 100vw;
  z-index: 100;
  inset: 0;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
}
.close {
  color: white;
  position: absolute;
  top: 20px;
  right: 40px;
  font-size: 2em;
  cursor: pointer;
}
.modal::-webkit-scrollbar {
  display: none;
}
.modal {
  background-color: white;
  border-radius: 10px;
  position: relative;
  text-align: center;
  overflow: scroll;
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
}
</style>