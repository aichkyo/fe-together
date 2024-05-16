<script>
  export default {
    name: 'TextInput',
    props: {
      title: {
        type: String,
        default () {
          return '用户名'
        }
      },
    },
    data () {
      return {
        value: ''
      }
    },
    render () {
      return <div class="text-input">
        <div class="input-title">{this.title}</div>
        <div class="input-box">
          <van-field value={this.value}
            onInput={(value) => { this.value = value }}
            maxlength="10"
            clearable={true}
            placeholder={`请输入${this.title}`} />
        </div>
      </div>
    }
  }
</script>

<style scoped lang="less">
  .text-input {
    .input-title {
      line-height: 20px;
      margin-bottom: 12px;
      text-align: left;
      font-size: 14px;
      font-weight: 600;
      color: #03050d;
      .title-black {
        font-size: 14px;
        font-weight: normal;
        color: #6e6d72;
      }
    }
    .input-box {
      margin-bottom: 12px;
      .van-cell {
        height: 32px;
        padding: 0 12px;
        line-height: 32px;
        border-radius: 8px;
        background-color: #f7f8fa !important;
        font-size: 12px;
        color: #b0b3bf;
      }
    }
  }
</style>
