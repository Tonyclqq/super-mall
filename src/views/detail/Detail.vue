<template>
  <div class="detail">
    <detail-nav-bar @titleClick="titleClick" />
    <scroll class="content" ref="scroll"  :probe-type="3" @scroll="contentScroll">
      <detail-swiper :top-images="topImages" />
      <detail-base-info :goods="goodsInfo" />
      <detail-shop-info :shop="shopInfo" />
      <detail-goods-info :detail-info="detailInfo" @detailImageLoad="detailImageLoad"/>
      <detail-param-info :param-info="paramInfo" ref="paramInfo" />
      <detail-comment-info :comment-info="commentInfo" ref="commentInfo" />
      <goods-list :goods="recommends" ref="recommends" />
    </scroll>
     <back-top @click.native="bakcClick" v-show="isShowBackTop" />
     <detail-bottom-bar @addToCart="addToCart"/>
     <div>{{$store.state.cartList.length}}</div>
  </div>
</template>

<script>
import DetailNavBar from "./childComponents/detailNavBar";
import DetailSwiper from "./childComponents/detailSwiper";
import DetailBaseInfo from "./childComponents/DetailBaseInfo";
import DetailShopInfo from "./childComponents/DetailShopInfo";
import DetailGoodsInfo from "./childComponents/DetailGoodsInfo";
import DetailParamInfo from "./childComponents/DetailParamInfo";
import DetailCommentInfo from "./childComponents/DetailCommentInfo";
import DetailBottomBar from './childComponents/DetailBottomBar' 

import Scroll from "components/common/scroll/Scroll";
import GoodsList from "components/content/goods/GoodsList";

import {itemListenerMixin,backTopMixin} from "common/mixin"
import {
  getDetail,
  getRecommend,
  Goods,
  Shop,
  GoodsParam
} from "network/detail";
export default {
  name: "Detail",
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailCommentInfo,
    DetailBottomBar,
    GoodsList,
    Scroll,
  },
  mixins: [itemListenerMixin,backTopMixin],
  props: {},
  data() {
    return {
      iid: null,
      topImages: [],
      goodsInfo: {},
      shopInfo: {},
      detailInfo: {},
      paramInfo: {},
      commentInfo: {},
      recommends: [],
      themeTopYs: [],
      getThemeTopY: null,
      isShowBackTop: false,
    };
  },
  created() {
    // 1. 获取iid
    this.iid = this.$route.query.iid;
    // 2.请求数据
    getDetail(this.iid).then(res => {
      // 2.1.获取结果
      const data = res.result;

      // 2.2.获取顶部信息
      this.topImages = data.itemInfo.topImages;

      // 2.3.获取商品信息
      this.goodsInfo = new Goods(
        data.itemInfo,
        data.columns,
        data.shopInfo.services
      );

      // 2.4.获取店铺信息
      this.shopInfo = new Shop(data.shopInfo);

      // 2.5.获取商品信息
      this.detailInfo = data.detailInfo;

      // 2.6.保存参数信息
      this.paramInfo = new GoodsParam(
        data.itemParams.info,
        data.itemParams.rule
      );

      // 2.7.保存评论信息
      if (data.rate.list) {
        this.commentInfo = data.rate.list[0];
      }
      this.$nextTick(() => {
        //根据最新的数据，对应的DOM是已经被渲染出来的
      });
    });
    getRecommend().then(res => {
      this.recommends = res.data.list;
    });
  },

  computed: {},

  beforeMount() {},
  updated() {
    this.themeTopYs = [];
    this.themeTopYs.push(0);
    this.themeTopYs.push(this.$refs.paramInfo.$el.offsetTop);
    this.themeTopYs.push(this.$refs.commentInfo.$el.offsetTop);
    this.themeTopYs.push(this.$refs.recommends.$el.offsetTop);
    // eslint-disable-next-line no-console
    console.log(this.themeTopYs);
  },
  methods: {
    detailImageLoad() {
      this.newRefresh();
    },
    titleClick(index) {
      // eslint-disable-next-line no-console
      console.log(index);
      this.$refs.scroll.scrollTo(0, -this.themeTopYs[index], 300);
    },
     bakcClick() {
      // eslint-disable-next-line no-console
      this.$refs.scroll.scrollTo(0, 0);
    },
    contentScroll(position){
      // eslint-disable-next-line no-console
      const positionY = -position.y
      for(let i in this.themeTopYs){
        if(positionY>this.themeTopYs[i] && positionY <this.themeTopYs[i+1]){
          // eslint-disable-next-line no-console
          console.log(i)
        }
      }

      
      this.isShowBackTop = -position.y > 1000;
    },
    addToCart(){
      // eslint-disable-next-line no-console
      console.log('11111111111')
      //1.获取购物车需要展示的商品信息
        const product = {}
        product.img = this.topImages[0]
        product.title = this.goodsInfo.title
        product.desc = this.goodsInfo.desc
        product.price = this.goodsInfo.newPrice
        product.iid = this.iid
        product.nowPrice  = this.goodsInfo.nowPrice
      //2.将商品添加到购物车
      this.$store.commit('addCart',product)
    }
  },

  watch: {}
};
</script>
<style  scoped>
.detail {
  height: 100vh;
  background-color: #fff;
  position: relative;
  z-index: 1;
  padding-top: 44px;
}
.content {
  background-color: #fff;
  height: calc(100% - 44px - 58px);
}
</style>