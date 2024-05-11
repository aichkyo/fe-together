<script>
  import icon from './icon.png'
  import { copyCode } from './util.js'
  export default {
    name: 'HrClipboard',
    props: {
      // 标题名字
      title: {
        type: String,
        default: '点击复制'
      },
      // 需要复制的内容
      txt: {
        type: String,
        default: ''
      },
      color: {
        type: String,
        default: '#7972fe'
      },
      size: {
        type: [String, Number],
        default: '14'
      },
      imgSize: {
        type: [String, Number],
        default: '14'
      },
      // 模块形式导入
      icon: {
        default: icon
      },
      marginLeft: {
        type: [String, Number],
        default: '4'
      }
    },
    methods: {
      copy () {
        copyCode(this.txt)
        this.$emit('click', this.txt)
      }
    },
    render () {
      return (<div onClick={this.copy.bind(this)} class="clipboard">
        <div style={{ width: `${this.imgSize}px`, height: `${this.imgSize}px` }} class="clipboard-img">
          <img width={this.imgSize}
            height={this.imgSize}
            src={this.icon} />
        </div>
        <div style={{ fontSize: `${this.size}px`, color: this.color, marginLeft: `${this.marginLeft}px` }}>{this.title}</div>
      </div>)
    }
  }
</script>
<style lang="less" scoped>
  .clipboard {
    display: flex;
    align-items: center;
    .clipboard-img {
      font-size: 0;
    }
  }
</style>
