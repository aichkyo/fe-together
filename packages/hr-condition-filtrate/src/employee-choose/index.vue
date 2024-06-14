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
      multiple: {
        type: Boolean,
        default () {
          return true
        }
      }
    },
    data () {
      return {
        isShowKsEmployeePopup: false,
        employeeList: []
      }
    },
    methods: {
      confirmEmployee (list) {
        this.employeeList = list
        this.isShowKsEmployeePopup = false
      }
    },
    render () {
      const { employeeName } = this.employeeList[0] || {}
      return <div class="employee-choose">
        <div class="choose-title">{this.title}</div>
        <div class="choose-input" onClick={() => {
          this.isShowKsEmployeePopup = true
        }}>
          <span class={["input-text", employeeName && 'black']}>{employeeName || '请选择'}</span>
          <img class="input-image" src={require('../../image/arrow-right.png')} />
        </div>
        <div class="choose-popup">
          <ks-employee-popup
            style={{ height: '100%', width: '330px' }}
            placeholder="输入员工姓名/工号"
            value={this.isShowKsEmployeePopup}
            onInput={(value) => { this.isShowKsEmployeePopup = value }}
            multiple={this.multiple}
            menuId='151596034994370809'
            popAttr={{ position: 'right' }}
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
    .choose-input {
      height: 32px;
      border-radius: 8px;
      background: #f7f8fa;
      display: flex;
      padding: 0 17px 0 12px;
      line-height: 32px;
      .input-text {
        font-size: 14px;
        color: #b0b3bf;
      }
      .input-text.black {
        color: #03050d;
      }
      .input-image {
        margin: 12px 0 0 auto;
        width: 4px;
        height: 8px;
      }
    }
    .choose-popup {
    }
  }
  .van-popup {
    height: 100%;
    .popup-employee {
      width: 330px;
      height: 100%;
    }
  }
</style>
