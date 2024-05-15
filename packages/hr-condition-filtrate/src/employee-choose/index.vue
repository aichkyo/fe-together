<script>
  export default {
    name: 'EmployeeChoose',
    props: {
      title: {
        type: String,
        default () {
          return '请选择'
        }
      },
    },
    data () {
      return {
        isShowKsEmployeePopup: false
      }
    },
    methods: {
      confirmEmployee () {

      }
    },
    render () {
      return <div class="employee-choose">
        <div class="choose-title">{this.title}</div>
        <div class="choose-input">
          <span class="input-text">请选择</span>
          <img src={reuqire('../../image/arrow-right.png')} />
        </div>
        <div class="choose-popup">
          <ks-employee-popup
            value={this.isShowKsEmployeePopup}
            onInput={(value) => {
              this.isShowKsEmployeePopup = value
            }}
            onConfirm={this.confirmEmployee}></ks-employee-popup>
        </div>
      </div>
    }
  }
</script>

<style scoped lang="less">
  .employee-choose {
    .choose-title {
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
  }
</style>
