<template>
  <div class="user-profile">
    <van-nav-bar
      title="编辑资料"
      left-arrow
      @click-left="$router.back()"
    />

    <van-cell-group>
      <van-cell is-link title="头像" @click="onAvatarClick">
        <van-image
          class="avatar"
          round
          :src="user.photo"
        />
      </van-cell>
      <!--
        表单元素的 hidden 属性：隐藏表单元素
        change 事件：当用户所选的图片发生改变的时候才会触发
       -->
      <input ref="file" type="file" hidden @change="onFileChange">
      <van-cell is-link title="昵称" :value="user.name" @click="isEditNameShow = true" />
      <van-cell is-link title="介绍" value="内容" />
      <van-cell
        is-link
        title="性别"
        :value="user.gender === 0 ? '女' : '男'"
        @click="isEditGenderShow = true"
      />
      <van-cell
        is-link
        title="生日"
        :value="user.birthday"
        @click="isEditBirthdayShow = true"
      />
    </van-cell-group>

    <!-- 头像预览 -->
    <van-image-preview v-model="isPreviewShow" :images="images" @close="$refs.file.value = ''">
      <van-nav-bar
        slot="cover"
        left-text="取消"
        right-text="确定"
        @click-left="isPreviewShow = false"
        @click-right="onUpdateAvatar"
      />
    </van-image-preview>
    <!-- /头像预览 -->

    <!-- 修改用户昵称 -->
    <van-popup
      v-model="isEditNameShow"
      position="bottom"
    >
      <van-nav-bar
        title="编辑昵称"
        left-text="取消"
        right-text="确定"
        @click-left="isEditNameShow = false"
        @click-right="onUpdateName"
      />
      <div>
        <!--
          field 组件有一个 value 事件，该事件接收一个参数：输入框的值
          在模板中 $event 表示事件参数，Vue 本身提供的
          关于 $event 的参考链接：https://cn.vuejs.org/v2/guide/events.html#%E5%86%85%E8%81%94%E5%A4%84%E7%90%86%E5%99%A8%E4%B8%AD%E7%9A%84%E6%96%B9%E6%B3%95
         -->
        <van-field
          :value="user.name"
          @input="inputName = $event"
          rows="2"
          autosize
          type="textarea"
          maxlength="20"
          placeholder="请输入昵称"
          show-word-limit
        />
      </div>
    </van-popup>
    <!-- /修改用户昵称 -->

    <!-- 编辑用户性别 -->
    <van-action-sheet
      v-model="isEditGenderShow"
      :actions="actions"
      cancel-text="取消"
      @cancel="isEditGenderShow = false"
      @select="onGenderSelect"
    />
    <!-- /编辑用户性别 -->

    <!-- 编辑用户生日 -->
    <van-popup
      v-model="isEditBirthdayShow"
      position="bottom"
    >
      <!--
        v-model="currentDate" 默认显示时间和同步用户选择的时间
        :min-date="minDate" 最小可选日期
        max-date  最大可选日期
       -->
      <van-datetime-picker
        :value="currentDate"
        type="date"
        :min-date="minDate"
        :max-date="maxDate"
        @cancel="isEditBirthdayShow = false"
        @confirm="onUpdateBirthday"
      />
    </van-popup>
    <!-- /编辑用户生日 -->
  </div>
</template>

<script>
import {
  getUserProfile,
  updateUserPhoto,
  updateUserProfile
} from '@/api/user'
import moment from 'moment'
// import { ImagePreview } from 'vant'

export default {
  name: 'UserProfile',
  components: {},
  props: {},
  data () {
    return {
      user: {}, // 用户资料
      isPreviewShow: false,
      images: [], // 预览的图片列表
      isEditNameShow: false,
      inputName: '', // 输入框的数据
      isEditGenderShow: false,
      actions: [
        // name 会显示出来，value 是我们自己添加的
        { name: '男', value: 1 },
        { name: '女', value: 0 }
      ],
      isEditBirthdayShow: false,
      minDate: new Date(1970, 0, 1),
      maxDate: new Date()
      // currentDate: new Date()
    }
  },
  computed: {
    // 这里的目的主要是为了访问方便
    // 每次访问 ref 成员都需要：this.$refs['file']
    // 因为多次访问到了该成员，所以我可以使用计算属性封装简化对成员的访问
    file () {
      return this.$refs['file']
    },
    currentDate () {
      // 把字符串格式的日期转换为 JavaScript 日期对象，设置给 Vant 日期选择器
      return new Date(this.user.birthday)
    }
  },
  watch: {},
  created () {
    this.loadUserProfile()
  },
  mounted () {},
  methods: {
    onInput (c) {
      // console.log(c)
      this.inputName = c
    },
    async loadUserProfile () {
      try {
        const { data } = await getUserProfile()
        this.user = data.data
      } catch (err) {
        console.log(err)
        this.$toast.fail('获取数据失败')
      }
    },

    onAvatarClick () {
      // 手动触发 input 的点击事件
      this.file.click()
    },

    onFileChange () {
      // 1. 拿到 file 类型 input 选择的文件对象
      const fileObj = this.file.files[0]

      // 2. 使用 window.URL.createObjectURL(file) 得到文件数据
      const fileData = window.URL.createObjectURL(fileObj)

      // 3. 将 img.src = 第2步的结果
      this.images = [fileData] // 这里直接重置数组，防止出现多个预览图片
      this.isPreviewShow = true
      // 如果需要定义里面的模板内容，则通过模板的方式来使用这个组件
      // ImagePreview({
      //   images: [
      //     fileData
      //   ]
      // })
    },

    async onUpdateAvatar () {
      this.$toast.loading({
        duration: 0, // 持续展示 toast
        message: '保存中...',
        forbidClick: true // 是否禁止背景点击
      })

      // 2. 请求提交
      try {
        // 1. 构造包含文件数据的表单对象 FormData
        // 注意：含有文件的数据务必要放到 FormData 中
        // FormData: 用代码构造一个表单对象，主要目的是用于异步发送文件上传
        // MDN-FormData 对象的使用：https://developer.mozilla.org/zh-CN/docs/Web/API/FormData/Using_FormData_Objects
        const fd = new FormData()
        // 参数1：后端要求的数据字段名称
        // 参数2：数据值
        fd.append('photo', this.file.files[0])

        const { data } = await updateUserPhoto(fd)

        // 更新页面
        this.user.photo = data.data.photo

        // 关闭图片预览
        this.isPreviewShow = false

        this.$toast.success('更新成功')
      } catch (err) {
        console.log(err)
        this.$toast.fail('更新失败')
      }

      // 3. 根据响应结果执行后续处理
    },

    // field: 要修改的数据字段
    // value：数据值
    async updateUserProfile (field, value) {
      this.$toast.loading({
        duration: 0, // 持续展示 toast
        message: '更新中...',
        forbidClick: true // 是否禁止背景点击
      })

      try {
        await updateUserProfile({
          [field]: value // 注意属性名使用中括号包裹，否则会当做字符串来使用而不是变量
        })
        this.$toast.success('更新成功')
      } catch (err) {
        console.log(err)
        this.$toast.fail('更新失败')
      }
    },

    async onUpdateName () {
      // 请求提交表单
      await this.updateUserProfile('name', this.inputName)

      // 更新视图
      this.user.name = this.inputName

      // 关闭弹层
      this.isEditNameShow = false
    },

    async onGenderSelect (data) {
      // 请求提交
      await this.updateUserProfile('gender', data.value)
      // 更新视图展示
      this.user.gender = data.value
      // 关闭上拉菜单
      this.isEditGenderShow = false
    },

    async onUpdateBirthday (value) {
      // 使用 moment 把日期对象格式化为指定格式的字符串
      const date = moment(value).format('YYYY-MM-DD')

      // 请求提交
      await this.updateUserProfile('birthday', date)

      // 更新视图
      this.user.birthday = date

      // 关闭弹层
      this.isEditBirthdayShow = false
    }
  }
}
</script>

<style scoped lang="less">
.user-profile {
  .avatar {
    width: 30px;
    height: 30px;
  }

  /deep/ .van-image-preview__cover {
    top: unset;
    left: 0;
    right: 0;
    bottom: 0;
    .van-nav-bar {
      background: #000;
    }
  }

  .van-popup {
    /deep/ .van-nav-bar {
      background: #fff;
      .van-nav-bar__title {
        color: #323233;
      }
    }
  }
}
</style>
