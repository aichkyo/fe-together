import { createHrBEM } from './bem.js'

export default {
  name: 'HrNoticeBar',
  extends: window.vant.NoticeBar,
  data () {
    return {
      firstRound: true
    }
  },
  props: {
    isOverflowShow: {
      type: Boolean,
      default () {
        return true
      }
    },
  },
  watch: {
    text: {
      handler () {
        this.$nextTick(function () {
          const ref = this.$refs
          const wrap = ref.wrap
          const content = ref.content
          if (!wrap || !content) { return }
          const wrapWidth = wrap.getBoundingClientRect().width
          const offsetWidth = content.getBoundingClientRect().width

          if (this.scrollable) { // _this.scrollable && offsetWidth > wrapWidth 【原逻辑】
            if (this.isOverflowShow && offsetWidth <= wrapWidth) return
            this.wrapWidth = wrapWidth
            this.offsetWidth = offsetWidth
            this.duration = offsetWidth / this.speed
            this.animationClass = createHrBEM('van-notice-bar')('play')
          }
        });
      },
      immediate: true
    }
  },
  mounted () {
    this.init()
  },
  methods: {
    init () {
      this.initState()
    },
    initState () {
    },
  },
} 