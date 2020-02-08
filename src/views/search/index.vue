<template>
  <div class="search-container">
    <!-- 搜索栏 -->
    <form class="search-form" action="/">
      <van-search
        v-model="searchContent"
        placeholder="请输入搜索关键词"
        show-action
        background="#3296fa"
        @search="onSearch(searchContent)"
        @cancel="$router.back()"
        @focus="isSearchResultShow = false"
        @input="onSearchInput"
      />
    </form>
    <!-- /搜索栏 -->

    <!-- 搜索结果 -->
    <search-result
      v-if="isSearchResultShow"
      :q="searchContent"
    />
    <!-- /搜索结果 -->

    <!-- 联想建议 -->
    <van-cell-group v-else-if="searchContent">
      <van-cell
        icon="search"
        v-for="(item, index) in suggestions"
        :key="index"
        @click="onSearch(item)"
      >
        <div slot="title" v-html="highlight(item)"></div>
      </van-cell>
    </van-cell-group>
    <!-- /联想建议 -->

    <!-- 历史记录 -->
    <van-cell-group v-else>
      <van-cell title="历史记录">
        <template v-if="isDeleteShow">
          <span @click="searchHistories = []">全部删除</span>
          &nbsp;&nbsp;
          <span @click="isDeleteShow = false">完成</span>
        </template>
        <van-icon v-else name="delete" @click="isDeleteShow = true" />
      </van-cell>
      <van-cell
        :title="item"
        v-for="(item, index) in searchHistories"
        :key="index"
        @click="onHistoryClick(item, index)"
      >
        <van-icon v-show="isDeleteShow" name="close"></van-icon>
      </van-cell>
    </van-cell-group>
    <!-- /历史记录 -->
  </div>
</template>

<script>
import SearchResult from './components/search-result'
import { getSuggestions } from '@/api/search'
import { debounce } from 'lodash'
import { getItem, setItem } from '@/utils/storage'

export default {
  name: 'SearchPage',
  components: {
    SearchResult
  },
  props: {},
  data () {
    return {
      searchContent: '', // 搜索内容
      isSearchResultShow: false, // 是否展示搜索结果
      suggestions: [], // 联想建议
      searchHistories: getItem('serach-histories') || [], // 搜索历史记录
      isDeleteShow: false // 删除历史记录的显示状态
    }
  },
  computed: {},
  watch: {
    searchHistories (val) {
      setItem('serach-histories', val)
    }
  },
  created () {},
  mounted () {},
  methods: {
    onSearch (q) {
      // 1. 更新搜索文本框的数据
      this.searchContent = q

      // 2. 记录搜索历史记录
      const searchHistories = this.searchHistories
      const index = searchHistories.indexOf(q)
      if (index !== -1) {
        searchHistories.splice(index)
      }
      searchHistories.unshift(q)

      // 3. 展示搜索结果
      this.isSearchResultShow = true
    },

    // debounce 函数
    // 参数1：函数
    // 参数2：防抖时间
    // 返回值：防抖之后的函数，和参数1功能是一样的
    onSearchInput: debounce(async function () {
      const searchContent = this.searchContent
      if (!searchContent) {
        return
      }

      // 1. 请求获取数据
      const { data } = await getSuggestions(searchContent)

      // 2. 将数据添加到组件实例中
      this.suggestions = data.data.options

      // 3. 模板绑定
    }, 200),

    // async onSearchInput () {
    //   const searchContent = this.searchContent
    //   if (!searchContent) {
    //     return
    //   }

    //   // 1. 请求获取数据
    //   const { data } = await getSuggestions(searchContent)

    //   // 2. 将数据添加到组件实例中
    //   this.suggestions = data.data.options

    //   // 3. 模板绑定
    // },

    highlight (str) {
      const searchContent = this.searchContent
      // /searchContent/ 正则表达式中的一切内容都会当做字符串使用
      // 这里可以 new RegExp 方式根据字符串创建一个正则表达式
      // RegExp 是原生 JavaScript 的内置构造函数
      // 参数1：字符串，注意，这里不要加 //
      // 参数2：匹配模式，g 全局，i 忽略大小写
      const reg = new RegExp(searchContent, 'gi')
      return str.replace(reg, `<span style="color: #3296fa">${searchContent}</span>`)
    },

    onHistoryClick (item, index) {
      // 如果是删除状态，则执行删除操作
      if (this.isDeleteShow) {
        this.searchHistories.splice(index, 1)
      } else {
        // 否则执行搜索操作
        this.onSearch(item)
      }
    }
  }
}
</script>

<style scoped lang="less">
.search-container {
  padding-top: 54px;
  // 让搜索栏固定在顶部
  .search-form {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 1;
  }
  .van-search__action {
    color: #fff;
  }
}
</style>
