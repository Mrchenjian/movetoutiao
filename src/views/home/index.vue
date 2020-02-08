<template>
  <div class="home-container">
    <!-- 导航栏 -->
    <div class="nav-bar">
      <div class="logo"></div>
      <van-button
        class="search-btn"
        round
        type="info"
        size="small"
        icon="search"
        @click="$router.push('/search')"
      >搜索</van-button>
    </div>
    <!-- /导航栏 -->

    <!-- 频道列表 -->
    <!--
      v-model="active" 控制激活的标签
      title 标签标题
     -->
    <van-tabs v-model="active">
      <!-- 通过插槽把面包按钮放进去 -->
      <van-icon
        class="wap-nav"
        slot="nav-right"
        name="wap-nav"
        @click="isChannelEditShow = true"
      />
      <van-tab
        :title="channel.name"
        v-for="channel in userChannels"
        :key="channel.id"
      >
        <!-- 文章列表 -->
        <article-list :channel="channel" />
        <!-- /文章列表 -->
      </van-tab>
    </van-tabs>
    <!-- /频道列表 -->

    <!-- 编辑频道 -->
    <van-popup
      v-model="isChannelEditShow"
      position="bottom"
      :style="{ height: '100%' }"
      round
      closeable
      close-icon-position="top-left"
    >
      <channel-edit
        :user-channels="userChannels"
        :active="active"
        @switch="onChannelSwitch"
      />
    </van-popup>
    <!-- /编辑频道 -->
  </div>
</template>

<script>
import { getUserChannels } from '@/api/channel'
import ArticleList from './components/article-list'
import ChannelEdit from './components/channel-edit'
import { getItem } from '@/utils/storage'

export default {
  name: 'HomePage',
  components: {
    ArticleList,
    ChannelEdit
  },
  props: {},
  data () {
    return {
      active: 0, // 控制激活的标签页
      userChannels: [], // 用户频道列表
      isChannelEditShow: false
    }
  },
  computed: {},
  watch: {},
  created () {
    this.loadUserChannels()
  },
  mounted () {},
  methods: {
    async loadUserChannels () {
      try {
        // 1. 声明变量存储频道数据
        let channels = []

        // 2. 获取本地存储的频道列表
        const localUserChannels = getItem('user-channels')

        // 3. 如果有本地存储的则使用本地存储逇
        if (localUserChannels) {
          channels = localUserChannels
        } else {
          // 4. 如果没有本地存储的，则使用接口的
          const { data } = await getUserChannels()
          channels = data.data.channels
        }

        // 5. 将数据赋值给当前组件数据
        this.userChannels = channels
      } catch (err) {
        console.log(err)
        this.$toast('获取频道数据失败')
      }
    },

    onChannelSwitch (index) {
      this.active = index // 切换激活频道
      this.isChannelEditShow = false // 关闭弹层
    }
  }
}
</script>

<style scoped lang="less">
.home-container {
  padding-top: 90px;
  padding-bottom: 50px;
  .nav-bar {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 15px;
    height: 46px;
    background-color: #3196fa;
    z-index: 1;
    .logo {
      background: url("./logo-light.png") no-repeat;
      background-size: cover;
      width: 100px;
      height: 30px;
    }
    .search-btn {
      background-color: #5babfb;
      width: 50%;
    }
  }

  .wap-nav {
    position: fixed;
    right: 0;
    line-height: 44px;
    background: #fff;
    opacity: .8;
  }

  /deep/ .van-tabs__wrap {
    position: fixed;
    top: 46px;
    left: 0;
    right: 0;
    z-index: 1;
  }
}
</style>
