<template>
        <div>
                <van-list
                    v-model="loading"
                    :finished="finished"
                    finished-text="没有更多了"
                    @load="onLoad"
                    >
                 <van-cell v-for="(aticle,index) in list" :key="index" :title="aticle.title" />
                </van-list>
        </div>
</template>

<script>
import { getCollectArticles } from '@/api/article.js'
export default {
  data () {
    return {
      list: [],
      loading: false,
      finished: false,
      page: 1,
      perPage: 10
    }
  },
  methods: {
    async onLoad () {
      const { data } = await getCollectArticles({
        page: this.page,
        per_page: this.per_page
      })
      console.log(data)
      const { results } = data.data
      this.list.push(...results)
      this.loading = false
      if (results.length) {
        this.page++
      } else {
        this.finished = true
      }
    }

  }
}
</script>

<style>

</style>
