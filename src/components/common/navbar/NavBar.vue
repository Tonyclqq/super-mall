<template>
  <div id="nav-bar">
    <div class="nav-left">
      <slot name="left"></slot>
    </div>
    <div class="nav-center">
      <slot name="center"></slot>
    </div>
    <div class="nav-right">
      <slot name="right"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "NavBar",
  components: {},
  props: {},
  data() {
    return {};
  }
};
</script>
<style  scoped>
#nav-bar {
  
  display: flex;
  height: 44px;
  line-height: 44px;
}
.nav-left,
.nav-right {
  width: 60px;
  text-align: center;
}
.nav-center {
  flex: 1;
}
</style>