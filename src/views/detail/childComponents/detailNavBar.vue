<template>
  <div>
      <nav-bar class="nav-bar">
          <div slot="left" @click="backClick">
              <img src="~assets/img/common/back.svg" alt="">
          </div>
          <div slot="center" class="title">
              <div 
              class="title-item" 
              v-for="(item,index) in titles" :key="item"
              :class="{active:currentIndex === index}"
              @click="titleClick(index)">{{item}}</div>
          </div>
      </nav-bar>
  </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar'
  export default {
   name: 'detailNavBar',
    components: {
        NavBar
    },
    props:{},
    data () {
      return {
          titles:["商品","参数","评论","推荐"],
          currentIndex:0
      };
    },

    created(){},
    computed: {},

    beforeMount() {},

    mounted() {},

    methods: {
        titleClick(index){
            this.currentIndex = index
            this.$emit('titleClick',index);
        },
        backClick(){
            this.$router.go(-1)
        }
    },

    watch: {}

  }

</script>
<style  scoped>
.nav-bar {
    position: relative;
    z-index: 9;
    background-color: #fff;
    position: fixed;
    top: 0;
    right: 0;
    left: 0;
}
.nav-bar img {
    margin-top: 10px;
}
.title {
    display: flex;
    padding: 0;
}
.title-item {
    flex:1;
    font-size: 13px;
    text-align: center;
}
.active {
    color: var(--color-tint);
}
</style>