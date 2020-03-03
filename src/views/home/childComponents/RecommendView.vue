<template>
  <div id="recommend-view">
    <div class="recommend-view-item" v-for="item in recommends" :key="item.sort">
      <a :href="item.link">
        <img :src="item.image" alt />
        <div>{{item.title}}</div>
      </a>
    </div>
  </div>
</template>

<script>
export default {
  name: "RecommendView",
  components: {},
  props: {
    recommends: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  data() {
    return {};
  }
};
</script>
<style  scoped>
#recommend-view{
  display: flex;
  margin-top: 10px;
  font-size: 14px;
  padding-bottom: 30px;
  border-bottom: 10px solid #eee;
}

.recommend-view-item {
  flex: 1;
  text-align: center;
}

#recommend-view img {
  width: 80px;
  height: 80px;
  margin-bottom: 10px;
}
</style>