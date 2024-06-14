<script>
  const baseUrl = 'https://erphostjs.kye-erp.com/hr-oa-kts/ks-app/common/emotion/'
  export default {
    name: 'HrEmotionalPicture',
    props: {
      type: {
        type: String,
        default () {
          return 'evaluate'
        }
      },
      text: {
        type: String,
        default () {
          return '暂无数据'
        }
      }
    },
    data () {
      return {
      }
    },
    render () {
      const { text, type } = this

      return <div class="hr-emotional-picture">
        <div class="picture-content">
          <img class="content-icon" src={`${baseUrl}${type}.png`} />
          <div class="content-text">{text}</div>
        </div>
      </div>
    }
  }
</script>

<style scoped lang="less">
  .hr-emotional-picture {
    width: 100%;
    height: 100%;
    .picture-content {
      position: absolute;
      left: 50%;
      top: 50%;
      width: 100%;
      transform: translate(-50%, -50%);
      display: flex;
      flex-direction: column;
      .content-icon {
        width: 140px;
        height: 140px;
        text-align: center;
        margin-left: 50%;
        transform: translateX(-50%);
      }
      .content-text {
        font-size: 16px;
        font-weight: 700;
        line-height: 22px;
        text-align: center;
        color: #03050d;
        margin-top: 12px;
        display: block;
      }
    }
  }
</style>
