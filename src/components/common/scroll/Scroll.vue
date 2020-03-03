<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import BScroll from 'better-scroll';
  export default {
   name: 'Scroll',
    components: {

    },
    props:{
      probeType:{
        type:Number,
        default :0
      },
      pullUpLoad:{
        type:Boolean,
        default: false
      }
    },
    data () {
      return {
          scroll:null
      };
    },
    mounted(){
      //创建better-scroll对象
        this.scroll = new BScroll(this.$refs.wrapper,{
            click:true,
            probeType:this.probeType,
            pullUpLoad:this.pullUpLoad
        })
        //监听滚动的区域
       this.scroll.on('scroll',(position) => {
         this.$emit('scroll',position)
       })
       //3.监听scroll滚动到底部
       if(this.pullUpLoad) {
         this.scroll.on('pullingUp',()=>{
           this.$emit('pullingUp')
         })
       }

    },
    methods:{
      scrollTo(x=0,y=0,time=300){
       this.scroll && this.scroll.scrollTo(x,y,time)
      },
      finishPullUp(){
        this.scroll.finishPullUp()
      },
      refresh(){
        this.scroll &&  this.scroll.refresh()
      }
    }

  }

</script>
<style  scoped>
</style>