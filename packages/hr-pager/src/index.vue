<template>
  <div class="hr-pager"
       v-if="ids && ids.length">
    <img @click="prevPage"
         class="prev"
         v-if="!prevDisabled"
         src="../images/prev-page.png">
    <img @click="nextPage"
         class="next"
         v-if="!nextDisabled"
         src="../images/next-page.png">
  </div>
</template>

<script>
  export default {
    name: 'hr-pager', // 按钮分页组件
    props: {
      currentId: {
        type: [String, Number],
        default: ''
      },
      ids: {
        type: [Array],
        default: () => []
      },
      // 切换上下周周报时是否冻结分页器，用于保留当前分页id
      isFreeze: {
        default: false
      },
    },
    data () {
      return {
        currentIndex: 0,
      }
    },
    watch: {
      currentId: {
        handler () {
          // 切换上下周周报时，冻结分页器后不响应id变化处理
          if (this.ids.length && !this.isFreeze) {
            this.currentIndex = this.ids.findIndex(v => +v === +this.currentId)
          }
        },
        immediate: true
      }
    },
    computed: {
      prevDisabled () {
        return this.currentIndex <= 0
      },
      nextDisabled () {
        return this.currentIndex >= this.ids.length - 1
      }
    },
    methods: {
      nextPage () {
        if (this.nextDisabled) {
          return
        }
        this.currentIndex++
        this.$emit('turnPage', this.ids[this.currentIndex])
      },
      prevPage () {
        if (this.prevDisabled) {
          return
        }
        this.currentIndex--
        this.$emit('turnPage', this.ids[this.currentIndex])
      },
    }
  }
</script>

<style lang="less" scoped>
  .hr-pager {
    user-select: none;
    position: fixed;
    top: 45%;
    width: 100%;
    box-sizing: border-box;
    padding: 0 29px;
    > img {
      position: absolute;
      width: 97px;
      height: 97px;
    }
    .prev {
      left: 29px;
    }
    .next {
      right: 29px;
    }
  }
</style>
