<template >
  <div id="home">
    <nav-bar class="home-nav">
      <div slot="center">购物车</div>
    </nav-bar>
      <tab-control 
          ref="tabControl1" 
          :titles="['流行','新款','精选']" 
          @itemClick="tabClick" 
          class="tab-control"
          v-show="isTabFixed"/>
    <scroll
      class="content"
      ref="scroll"
      :probe-type="3"
      :pull-up-load="true"
      @scroll="contentScroll"
      @pullingUp="loadMore"
    >
      <home-swiper :banners="banners" @swiperImageLoad="swiperImageLoad"/>
      <recommend-view :recommends="recommends" />
      <feature />
      <tab-control 
          ref="tabControl2" 
          :titles="['流行','新款','精选']" 
          @itemClick="tabClick" />
      <goods-list :goods="goods[currentType].list" />
    </scroll>
    <back-top @click.native="bakcClick" v-show="isShowBackTop" />
  </div>
</template>

<script>
//导入组件
import NavBar from "components/common/navbar/NavBar";
import Scroll from "components/common/scroll/Scroll";

import TabControl from "components/content/tabcontrol/TabControl";
import GoodsList from "components/content/goods/GoodsList";

import HomeSwiper from "./childComponents/HomeSwiper";
import RecommendView from "./childComponents/RecommendView";
import Feature from "./childComponents/FeatureView";
import {backTopMixin} from 'common/mixin'
//导入网络模块
import { getMultidata, getHomeGoods } from "network/home";

export default {
  name: "home",
  components: {
    NavBar,
    Scroll,
    TabControl,
    GoodsList,
    HomeSwiper,
    RecommendView,
    Feature
  },
  mixins:[backTopMixin],
  data() {
    return {
      banners: [],
      recommends: [],
      goods: {
        pop: { page: 0, list: [] },
        new: { page: 0, list: [] },
        sell: { page: 0, list: [] }
      },
      currentType: "pop",
      isShowBackTop: false,
      tabOffsetTop:0,
      isTabFixed :false,
      saveY:0
    };
  },
  destroyed(){

  },
  created() {
    //1.请求多个数据
    this._getMultidata();
    //2.请求商品数据
    this._getHomeGoods("pop");
    this._getHomeGoods("new");
    this._getHomeGoods("sell");
  },
  mounted() {

    //1.监听item中图片加载完成
    const refresh = this.debounce(this.$refs.scroll.refresh, 200);
    this.$bus.$on("itemImageLoad", () => {
      refresh();
    });
    
   
  },
  methods: {
    /**防抖函数 */
    debounce(func, delay) {
      let timer = null;
      return function(...args) {
        if (timer) clearTimeout(timer);
        timer = setTimeout(() => {
          func.apply(this, args);
        }, delay);
      };
    },
    /*事件监听 */
    tabClick(index) {
      switch (index) {
        case 0:
          this.currentType = "pop";
          break;
        case 1:
          this.currentType = "new";
          break;
        case 2:
          this.currentType = "sell";
          break;
      }
      this.$refs.tabControl1.currentIndex = index;
      this.$refs.tabControl2.currentIndex = index;
    },
    bakcClick() {
      // eslint-disable-next-line no-console
      this.$refs.scroll.scrollTo(0, 0);
    },
    contentScroll(position) {
      // eslint-disable-next-line no-console
      this.isShowBackTop = -position.y > 1000;
      //2.决定tabcontrol是否吸顶
      this.isTabFixed = (-position.y)>this.tabOffsetTop
    },
    loadMore(){
      this._getHomeGoods(this.currentType)
    },
    swiperImageLoad(){
    //1.获取tabControl的offsetTop
    this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop
    // eslint-disable-next-line no-console
        // console.log(this.$refs.tabControl.$el.offsetTop)
    },
    /*网络请求 */
    _getMultidata() {
      getMultidata().then(res => {
        this.banners = res.data.banner.list;
        this.recommends = res.data.recommend.list;
      });
    },
    async _getHomeGoods(type) {
      let pages = this.goods[type].page + 1;
      const res = await getHomeGoods(type, pages);
      let dataList = res.data.list;
      this.goods[type].list.push(...dataList);
      this.goods[type].page += 1;
      //完成上拉加载更多
      this.$refs.scroll.finishPullUp()
    }
  }
};
</script>

<style scoped>
#home {
  padding-top: 44px;
  height: 100vh;
}
.home-nav {
  background-color: var(--color-tint);
  font-size: 16px;
  text-align: center;
  color: #fff;
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  z-index: 9;
}
.tab-control{
  position: relative;
  z-index: 9;
}

.content {
  height: calc(100% - 93px);
}
</style>