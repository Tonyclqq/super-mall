
import {debounce} from 'common/utils'

import BackTop from "components/content/backTop/back-top";
export const itemListenerMixin = {
    mounted(){
        let newRefresh = debounce(this.$refs.scroll.refresh,100)
        this.itemImgListener = () =>{
            newRefresh()
        }
        this.$bus.$on('itemImgLoad',this.itemImgListener)
    }
}

export const backTopMixin = {
    data() {
        return {
            isShowBackTop:false
        }
    },
    components:{
        BackTop
    },
    methods:{
        backTop(){
            this.$refs.scroll.scrollTo(0,0)
        }
    }
}