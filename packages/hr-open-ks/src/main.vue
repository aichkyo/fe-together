<script>
  import icon from './icon.png'
  import {
    openSession,
    openProfile
  } from './util.js'
  export default {
    name: 'HrOpenKS',
    props: {
      name: {
        type: String,
        default: '-'
      },
      num: {
        type: [String, Number],
        default: ''
      },
      color: {
        type: String,
        default: 'inherit'
      },
      size: {
        type: [String, Number],
        default: '12'
      },
      imgSize: {
        type: [String, Number],
        default: '14'
      },
      // 模块形式导入
      icon: {
        default: icon
      },
      // chat聊天窗 / profile信息卡
      type: {
        type: String,
        default: 'chat'
      },
      marginLeft: {
        type: [String, Number],
        default: '4'
      }
    },
    methods: {
      open () {
        if (!this.num) return window.vant.Toast('无效的工号')

        const map = {
          'chat': openSession,
          'profile': openProfile
        }

        const fn = map[this.type]

        if (fn === void 0) return window.vant.Toast('请传入正确的打开方式 chat/profile')

        fn(this.num)

        this.$emit('click', {
          name: this.name,
          num: this.num,
        })
      }
    },
    render () {
      return (<div onClick={this.open.bind(this)} class="openks">
        <div style={{ fontSize: `${this.size}px`, color: this.color }}>{this.name}</div>
        <div style={{ width: `${this.imgSize}px`, height: `${this.imgSize}px`, marginLeft: `${this.marginLeft}px` }} class="openks-img">
          <img width={this.imgSize}
            height={this.imgSize}
            src={this.icon} />
        </div>
      </div>)
    }
  }
</script>
<style lang="less" scoped>
  .openks {
    display: flex;
    align-items: center;
    .openks-img {
      font-size: 0;
    }
  }
</style>
