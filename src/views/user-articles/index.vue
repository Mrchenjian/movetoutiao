<template>
<div  class="user-articles">
         <van-nav-bar  title="我的收藏/历史/作品" left-arrow @click-left="$router.back()" fixed />
         <van-tabs v-model="active">
                <van-tab title="我的收藏"><collect/></van-tab>
                <van-tab title="我的历史"><history/></van-tab>
                <van-tab title="我的作品"><articles /></van-tab>
        </van-tabs>
</div>
</template>

<script>
import articles from '../user-articles/components/articles'
import collect from '../user-articles/components/collect'
import history from '../user-articles/components/history'

export default {
  data () {
    let active = ['collect', 'history'].indexOf(this.type)
    if (active === -1) {
      active = 2
    }
    return {
      active
    }
  },
  props: {
    type: {
      type: String
    }

  },
  methods: {
  },
  components: {
    history,
    articles,
    collect
  }

}
</script>

<style scoped lang="less">
  .user-articles{
      padding-top: 90px;
      padding-bottom: 50px;
     /deep/ .van-tabs__wrap {
       position: fixed;
       top: 46px;
       left: 0;
       right: 0;
       z-index: 1;
}
  }
</style>
