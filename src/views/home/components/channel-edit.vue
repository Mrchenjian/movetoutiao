<template>
  <div class="channel-edit">
    <van-cell class="channel-header" title="我的频道" :border="false">
      <van-button
        size="mini"
        round
        type="danger"
        plain
        @click="isEditShow = !isEditShow"
      >{{ isEditShow ? '完成' : '编辑'}}</van-button>
    </van-cell>
    <van-grid :gutter="10" clickable>
      <van-grid-item
        v-for="(channel, index) in userChannels"
        :key="channel.id"
        @click="onUserChannelClick(index)"
      >
        <!--
          :class="{
            active: index === active
          }"
          样式绑定。
          属性名：CSS 类名
          属性值：一个布尔值
         -->
        <span
          slot="text"
          class="text"
          :class="{
            active: index === active
          }"
        >{{ channel.name }}</span>
        <van-icon v-show="isEditShow && index !== 0" slot="icon" name="close" />
      </van-grid-item>
    </van-grid>
    <van-cell class="channel-header" title="推荐频道" :border="false" />
    <van-grid :gutter="10" clickable>
      <van-grid-item
        v-for="channel in remainingChannels"
        :key="channel.id"
        :text="channel.name"
        @click="onAdd(channel)"
      />
    </van-grid>
  </div>
</template>

<script>
import { getAllChannels } from '@/api/channel'
import { setItem } from '@/utils/storage'

export default {
  name: 'ChannelEdit',
  components: {},
  // 简单写法
  // props: ['userChannels'],

  // 建议写法，Props 验证
  // 参考文档：https://cn.vuejs.org/v2/guide/components-props.html#Prop-%E9%AA%8C%E8%AF%81
  props: {
    userChannels: {
      type: Array,
      required: true
    },
    active: {
      type: Number,
      required: true
    }
  },
  data () {
    return {
      allChannels: [], // 所有频道
      isEditShow: false
    }
  },
  computed: {
    remainingChannels () {
      const channels = []
      this.allChannels.forEach(item => {
        // 当前的遍历项是否属于我的频道，如果不是，那就收集到 channels
        // userChannels 是否包含 item
        // find 会遍历数组，它会对每个元素执行 c.id === item.id 条件判定
        // 如果 true，则返回该元素，如果直到遍历结束都没有符合条件的元素，则返回 undefined
        if (!this.userChannels.find(c => c.id === item.id)) {
          channels.push(item)
        }
      })
      return channels
    }
  },
  watch: {
    // 当 userChannels 发生变化，会调用该函数
    userChannels (newVal) {
      // 同步到本地存储
      setItem('user-channels', newVal)
    }
  },
  created () {
    this.loadAllChannels()
  },
  mounted () {},
  methods: {
    async loadAllChannels () {
      const { data } = await getAllChannels()
      this.allChannels = data.data.channels
    },

    onAdd (channel) {
      this.userChannels.push(channel)
    },

    onUserChannelClick (index) {
      // 如果是编辑状态，则执行删除操作
      if (this.isEditShow && index !== 0) {
        this.userChannels.splice(index, 1) // 从索引处开始(包括索引本身)，删除指定的个数
      } else {
        // 如果是非编辑状态，则执行切换频道操作
        this.$emit('switch', index)
      }
    }
  }
}
</script>

<style scoped lang="less">
.channel-edit {
  padding-top: 40px;
  .channel-header {
    font-size: 16px;
    color: #333;
  }
  /deep/ .van-grid-item {
    width: 80px;
    height: 43px;
    position: relative;
    .van-grid-item__icon-wrapper {
      position: absolute;
      top: -14px;
      right: -5px;
      .van-icon-close {
        font-size: 14px;
      }
    }
    .van-grid-item__content {
      background: #f4f5f6;
    }
    .van-grid-item__text, .text {
      font-size: 14px;
      color: #222;
    }
    .active {
      color: red;
    }
  }
}
</style>
