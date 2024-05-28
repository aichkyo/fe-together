<template>
  <div class="hr-slide-pager"
       ref="swiper">
    <div class="shadow left"
         ref="left"
         :style="{ width: leftShadowWidth + 'px' }">
      <span v-show="leftShadowWidth > threshold"
            class="text">向右滑动可切换上一篇</span>
    </div>

    <div class="shadow right"
         ref="right"
         :style="{ width: rightShadowWidth + 'px' }">
      <span v-show="rightShadowWidth > threshold"
            class="text">向左滑动可切换下一篇</span>
    </div>

    <guide v-if="isShowGuide"
           @markRead="markRead" />
  </div>
</template>

<script>
  import { debounce, ksStorage } from '../../utils/index.js'
  import guide from '../guide/index.vue'

  // 新手指引标识
  const GuideVersion = 'SlidePagerGuideVersion_V2'

  export default {
    name: 'hr-slide-pager',
    components: {
      guide
    },
    props: {
      // 当前id
      currentId: {
        type: [String, Number],
        default: ''
      },
      // 需分页的id集合
      ids: {
        type: Array,
        default: () => []
      },
      // 切换上下周周报时是否冻结分页器，用于保留当前分页id
      isFreeze: {
        type: Boolean,
        default: false
      },
      // 是否可以切换分页的钩子,为true可切换，为false不可切换
      canTurnPageFn: {
        type: Function,
        default () {
          return () => true
        }
      },
      // 是否禁用翻页
      disabled: {
        type: Boolean,
        default: false
      },
      // 滑动翻页的阈值 (即滑动多远距离后触发翻页动作 单位：px)
      threshold: {
        type: Number,
        default: 60
      },
      // 监听触摸的容器
      container: {
        type: String,
        default: 'hr-slide-pager'
      }
    },
    data () {
      return {
        startX: 0,
        startY: 0,
        leftShadowWidth: 0, // 左边界阴影宽度
        rightShadowWidth: 0, // 右边界阴影宽度
        currentIndex: 0, // 当前分页器索引
        isSelectTextNow: false, // 当前是否正在选择文本 
        isShowGuide: false, // 是否展示新手指引
        pageTurning: false, // 当前是否翻页中
      }
    },
    created () {
      this.judgeIsShowGuide() // 2个迭代后移除，避免app清空标识导致状态丢失
      this.nextPage = debounce(this.nextPage, 100)
      this.prevPage = debounce(this.prevPage, 100)
    },
    mounted () {
      this.addEventForContainer()
    },
    computed: {
      // 下一页是否禁用
      nextDisabled () {
        return this.currentIndex >= this.ids.length - 1
      },
      // 上一页是否禁用
      prevDisabled () {
        return this.currentIndex <= 0
      },
      // 是否禁用翻页器
      disabledSlider () {
        // 禁用的场景  传入的disabled || 用户正在选择文本 || 翻页中 || ids数量小于2
        return this.disabled || this.isSelectTextNow || this.pageTurning || this.ids.length < 2
      }
    },
    watch: {
      currentId: {
        handler () {
          this.getCurrentIndex()
        },
        immediate: true
      },
      ids: {
        handler () {
          this.getCurrentIndex()
        },
        immediate: true
      },
    },
    methods: {
      /**
       * @description 给指定容器添加触摸监听事件
       */
      addEventForContainer () {
        this.$nextTick(() => {
          let containerDom = document.querySelector(`.${this.container}`)
          containerDom.addEventListener('touchstart', this.handleTouchStart)
          containerDom.addEventListener('touchmove', this.handleTouchMove)
          containerDom.addEventListener('touchend', this.handleTouchEnd)
          containerDom.addEventListener('touchcancel', this.handleTouchEnd)
        })
      },
      /**
       * @description 判断是否展示新手指引
       */
      async judgeIsShowGuide () {
        let res = await ksStorage.getItem(GuideVersion)
        this.isShowGuide = res !== '10'
      },
      /**
       * @description 新手指引标记已读
       */
      markRead () {
        this.isShowGuide = false
        ksStorage.setItem(GuideVersion, '10')
      },
      /**
       * @description 获取当前页面是否用户正在选择文本
       */
      judgeIsSelectText () {
        setTimeout(() => {
          this.isSelectTextNow = !!window.getSelection().toString()
        })
      },
      /**
       * @description 重置触摸状态
       */
      resetTouchStatus () {
        setTimeout(() => {
          cancelAnimationFrame(this.animationId)
          this.animationId = null
          this.leftShadowWidth = 0
          this.rightShadowWidth = 0
        }, 100)
      },
      /**
       * @description 获取当前id在ids的索引
       */
      getCurrentIndex () {
        // 切换上下周周报时，冻结分页器后不响应id变化处理
        if (this.ids && !this.isFreeze) {
          this.currentIndex = this.ids.findIndex(v => +v === +this.currentId)
        }
      },
      /**
       * @description 手指触摸开始（记录触发的xy轴坐标）
       * @param {*} event 
       */
      handleTouchStart (event) {
        if (this.disabledSlider) return

        console.log('handleTouchStart------🐸🐸🐸🐸')
        this.startX = event.touches[0].clientX
        this.startY = event.touches[0].clientY
      },
      /**
       * @description 手指触摸移动事件 (用于绘制翻页动画效果)
       * @param {*} event 
       */
      handleTouchMove (event) {
        if (this.disabledSlider) return

        const deltaX = event.touches[0].clientX - this.startX
        const deltaY = event.touches[0].clientY - this.startY

        if ((Math.abs(deltaX) > Math.abs(deltaY))) {
          if (deltaX > 0) {
            this.animationId = requestAnimationFrame(() => {
              this.rightShadowWidth = 0
              this.leftShadowWidth = Math.min(deltaX, 80)
            })
          } else if (deltaX < 0) {
            this.animationId = requestAnimationFrame(() => {
              this.leftShadowWidth = 0
              this.rightShadowWidth = Math.min(-deltaX, 80)
            })
          }
        }
      },
      /**
       * @description 手指触摸结束 (决定是否触发翻页事件)
       * @param {*} event 
       */
      handleTouchEnd (event) {
        this.judgeIsSelectText()

        if (this.disabledSlider) return

        console.log('handleTouchEnd-----💥💥💥💥💥💥')

        const deltaX = event.changedTouches[0].clientX - this.startX
        const deltaY = event.changedTouches[0].clientY - this.startY
        console.log('handleTouchEnd----', deltaX, deltaY)

        if (Math.abs(deltaX) > Math.abs(deltaY)) {
          if (deltaX > this.threshold) {
            if (!this.prevDisabled) {
              console.log('左滑-----🚀🚀🚀🚀')
              this.prevPage()
            } else {
              window.vant.Toast('已经到第一篇~')
            }

          } else if (deltaX < -this.threshold) {
            if (!this.nextDisabled) {
              console.log('右滑-----🐸🐸🐸🐸')
              this.nextPage()
            } else {
              window.vant.Toast('已经到最后一篇~')
            }
          }
        }

        this.resetTouchStatus()
      },
      /**
       * @description 维护是否翻页中状态
       */
      setPageTurningStatus () {
        if (this.timer) return
        this.pageTurning = true
        this.timer = setTimeout(() => {
          this.pageTurning = false
          if (this.timer) {
            clearTimeout(this.timer)
            this.timer = null
          }
        }, 500)
      },
      /**
       * @descrition 下一页
       */
      async nextPage () {
        this.setPageTurningStatus()
        // 校验切分页钩子，判断是否可切换分页
        let isLimitSwitch = await this.isLimitSwitchPage()

        if (isLimitSwitch || this.nextDisabled) {
          return
        }
        this.currentIndex++
        this.$emit('turnPage', this.ids[this.currentIndex])
      },
      /**
       * @descrition 上一页
       */
      async prevPage () {
        this.setPageTurningStatus()
        // 校验切分页钩子，判断是否可切换分页
        let isLimitSwitch = await this.isLimitSwitchPage()

        if (isLimitSwitch || this.prevDisabled) {
          return
        }
        this.currentIndex--
        this.$emit('turnPage', this.ids[this.currentIndex])
      },
      /**
       * @description 校验是否可切换分页钩子
       * @returns {Boolean} true-禁止切换 false-可切换
       */
      async isLimitSwitchPage () {
        // 钩子存在，并且不可切换分页
        if (this.canTurnPageFn && typeof this.canTurnPageFn === 'function') {
          let canSwitchPage = await this.canTurnPageFn()
          if (!canSwitchPage) {
            return true
          }
        }
      }
    }
  };
</script>

<style lang="less">
  .hr-slide-pager {
    transform: translate3d(0, 0, 1);
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 9;
    overflow: hidden;
    pointer-events: none;

    .shadow {
      position: absolute;
      top: 44px;
      height: 100%;
      pointer-events: none;
      z-index: 9;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all 0.1s;
      overflow: hidden;
      opacity: 0.9;
      &::before {
        content: "";
        width: 100%;
        height: 100%;
        position: absolute;
        z-index: -1;
        opacity: 0.9;
        background: #ffffff;
        filter: blur(10px);
      }
      .text {
        filter: blur(0);
        display: inline-block;
        width: 10px;
        color: #888ea6;
        font-size: 13px;
      }
    }

    .left {
      left: 0;
    }

    .right {
      right: 0;
    }
  }

  .ios {
    .hr-slide-pager .shadow {
      top: 64px;
    }
  }

  .ios.ipx {
    .hr-slide-pager .shadow {
      top: 88px !important;
    }
  }
</style>