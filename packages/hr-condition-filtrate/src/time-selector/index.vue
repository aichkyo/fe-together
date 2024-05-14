<script>
  import DateRangeSelect from './date-range-select.vue'
  import { hrDayJs } from './utils/tools'
  import { DATE_SHORTCUT_PARAMS } from '../enum/index.js'


  export default {
    name: 'TimeSelector',
    components: {
      DateRangeSelect,
    },
    props: {
      comItem: {
        type: Object,
        default: () => ({})
      },
      type: {
        type: String,
        default: 'daterange'
      },
      min: {
        type: String,
        default: '2020/01/01'
      },
      isTab: { // 是否显示快捷按钮
        type: Boolean,
        default: true
      },
      defaultValue: {
        type: Number,
        default: 1
      },
      defaultType: {
        type: String,
        default: 'month'
      },
      title: {
        type: String,
        default () {
          return '请选择'
        }
      },
    },
    data () {
      return {
        startDate: '',
        endDate: '',
        show: false,
        defaultDate: [],
        active: '',
        maxDate: hrDayJs(new Date())
          .subtract(-1, 'month')
          .format('YYYY/MM/DD'),
        selectValue: [],
        dateKey: 1
      }
    },
    mounted () {
      this.initDate();
    },
    methods: {
      handleChoose (active) {
        const param = DATE_SHORTCUT_PARAMS[active]
        const { count, type } = param
        this.startDate = hrDayJs().subtract(count, type).format('YYYY/MM/DD')
        this.endDate = hrDayJs().format('YYYY/MM/DD')
        this.active = active
        this.defaultDate = [this.startDate + ' 00:00:00', this.endDate + ' 23:59:59']
        this.$emit('input', this.defaultDate)
      },
      initDate () {
        let startDate = hrDayJs(new Date()).subtract(this.defaultValue, this.defaultType).format('YYYY/MM')
        let endDate = hrDayJs(new Date()).format('YYYY/MM/DD')
        this.defaultDate = [startDate + '/01 00:00:00', endDate + ' 23:59:59']
        this.selectValue = { str: [startDate, endDate] }
        this.startDate = null
        this.endDate = null
        this.active = ''
        // this.comItem.value = []
      },
      closePop () {
        this.show = false
      },
      showPop () {
        this.show = true
      },
      // 校验时间差
      timeDifference (date1, date2) {
        date1 = new Date(date1)
        date2 = new Date(date2)
        var newYear = date1.getFullYear()
        var newMonth = date1.getMonth() + 2
        if (newMonth >= 11) {
          newYear += 1
          newMonth -= 11
          date1.setFullYear(newYear)
          date1.setMonth(newMonth - 1)
        } else {
          date1.setFullYear(newYear)
          date1.setMonth(newMonth)
        }
        if (date1.getTime() >= date2.getTime()) {
          return true
        } else {
          return false
        }
      },
      // 时间选择器确认事件
      onSelect (value) {
        this.selectValue = value
      },
      submit () {
        console.log('submit')
        let value = this.selectValue
        if (value.str && value.str.length && value.str[1]) {
          let res = this.timeDifference(value.str[0] + ' 00:00:00', value.str[1] + ' 00:00:00')
          if (res) {
            this.startDate = value.str[0]
            this.endDate = value.str[1]
            let val = [value.str[0] + ' 00:00:00', value.str[1] + ' 23:59:59']
            this.defaultDate = val
            this.$emit('input', val)
            this.active = ''
            this.show = false
            // this.comItem.value = val.map((time) => time.replace(/\//g, '-'))
          } else {
            this.$toast('选择时间不能超过2个月')
          }

        } else {
          this.$toast('请选择结束时间')
        }
      },
      reset () {
        this.initDate()
        this.dateKey++
      }
    },
    render () {
      {/* 渲染时间范围选择框 */ }
      const renderRangeInputBox = () => {
        return <div class="input-box">
          <span>{this.startDate}</span>
          <span class="mid-key"> - </span>
          <span>{this.endDate}</span>
        </div>
      }

      {/* 渲染单个时间选择框 */ }
      const renderInputBox = () => {
        return <div class="input-box">
          <span>{this.defaultDate}</span>
        </div>
      }

      {/* 快捷选项 */ }
      const renderSelectorShortcutBox = () => {
        return <div class="selector-shortcut">
          {
            Object.keys(DATE_SHORTCUT_PARAMS).map((key) => {
              return <div class={["shortcut-item", key == this.active ? 'active' : '']}
                onClick={this.handleChoose.bind(this, key)}
                key={key}>{DATE_SHORTCUT_PARAMS[key].text}</div>
            })
          }
        </div>
      }

      return <div class="time-selector">
        {/* 头部 */}
        <div class="selector-title">{this.title}</div>
        {/* 选择框 */}
        <div class="selector-input" onClick={this.showPop}>
          {this.type == 'daterange' && renderRangeInputBox()}
          {this.type == 'date' && renderInputBox()}
          <span class="input-icon"></span>
        </div>
        {/* 是否显示快捷按钮 */}
        {this.isTab && renderSelectorShortcutBox()}
        {/* 时间选择框 */}
        <div class="selector-popup">
          <van-popup
            value={this.show}
            onInput={(value) => { this.show = value }}
            style="height: 100%"
            get-container="body"
            position="right">
            <div class="popup-date">
              <header class="ksui-header">
                <div class="back-icon" onClick={() => { this.show = false }}>
                  <van-icon size={15} name="arrow-left" />
                  <span>选择时间段</span>
                </div>
              </header>
              <div class="date-content">
                <DateRangeSelect defaultValue={this.defaultDate}
                  v-show={this.show}
                  key={this.dateKey}
                  min={this.min}
                  max={this.maxDate}
                  ref="dateRangeSelect"
                  onSelect={this.onSelect} />
              </div>
              <div class="time-footer-btn">
                <van-button type="default" onClick={this.reset} class="btn left-btn">重置</van-button>
                <van-button type="primary" onClick={this.submit} class="btn">确定</van-button>
              </div>
            </div >
          </van-popup>
        </div>
      </div >
    }
  }
</script>

<style lang="less" scoped>
  /deep/.van-calendar__body {
    .van-calendar__day--disabled {
      color: #ccc;
    }
  }
  /deep/.ksui-header {
    .back-icon {
      font-weight: 600 !important;
      font-size: 16px !important;
      .van-icon {
        font-weight: 600 !important;
      }
    }
  }
  .time-selector {
    width: 100%;
    text-align: center;
    line-height: 38px;
    .selector-title {
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
    .selector-input {
      background: #f3f4f6;
      border-radius: 8px;
      color: #232323;
      display: flex;
      justify-content: space-between;
      padding: 0 20px;
      align-items: center;
      line-height: 32px;
      .input-box {
        font-size: 14px;
        color: #333333;
        display: flex;
        justify-content: space-between;
        width: 100%;
        span {
          flex: 3;
        }
        .mid-key {
          flex: 1;
        }
      }
      .input-icon {
        display: inline-block;
        width: 14px;
        height: 14px;
        background: url("./images/date-icon.png") no-repeat;
        background-size: 100%;
      }
    }
    .selector-shortcut {
      display: flex;
      flex-wrap: wrap;
      // justify-content: space-between;
      justify-content: flex-start;

      margin-top: 12px;
      .shortcut-item {
        width: calc((100% - 16px) / 3);
        text-align: center;
        background: #f3f4f6;
        border-radius: 8px;
        margin-bottom: 11px;
        margin-right: 8px;
        line-height: 28px;
        font-size: 12px;
        color: #03050d;

        &.active {
          // border: 1px solid #7972fe;
          background: rgba(121, 114, 254, 0.08);
          color: #7972fe;
          position: relative;
          &::after {
            content: " ";
            position: absolute;
            left: 0;
            top: 0;
            width: 200%;
            height: 200%;
            border: 1px solid #7972fe;
            border-radius: 16px;
            -webkit-transform-origin: 0 0;
            transform-origin: 0 0;
            -webkit-transform: scale(0.5);
            transform: scale(0.5);
          }
        }
      }
      .shortcut-item:nth-child(3n) {
        margin-right: 0;
      }
    }
  }
  .popup-date {
    .back-icon {
      font-size: 14px;
      color: #03050d;
      font-weight: 500;
      display: inline-block;
      padding: 12px;
      i {
        position: relative;
        top: -1px;
      }
      span {
        margin-left: 2px;
        position: relative;
        top: -3px;
      }
    }
    /deep/ .van-calendar__bottom-info {
      bottom: 1px !important;
    }
  }
  .time-footer-btn {
    width: 100%;
    padding: 14px 20px;
    // height: 64px;
    flex-shrink: 0;
    display: flex;
    justify-content: space-around;
    align-items: center;
    overflow: hidden;
    box-sizing: border-box;
    .btn {
      height: 36px;
      width: 44%;
      border-radius: 25px;
    }
    .left-btn {
      color: #8b83fc;
      // border-color: #8b83fc;
      position: relative;
      border: none;
      &::after {
        content: " ";
        position: absolute;
        left: 0;
        top: 0;
        width: 200%;
        height: 200%;
        border: 1px solid #7972fe;
        border-radius: 16px;
        -webkit-transform-origin: 0 0;
        transform-origin: 0 0;
        -webkit-transform: scale(0.5);
        transform: scale(0.5);
      }
    }
  }
</style>
