<script>
  import DateRangeSelect from './date-range-select.vue'
  import { hrDayJs } from './tools'
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
      isTab: {
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
    },
    data () {
      return {
        startDate: '',
        endDate: '',
        show: false,
        defaultDate: [],
        timeBtnList: [
          {
            name: '近一个月',
            value: '3'
          },
          {
            name: '近三天',
            value: '1'
          },
          {
            name: '近七天',
            value: '2'
          },
        ],
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
      handleChoose (val) {
        console.log(val, 'val')
        this.active = val
        switch (val) {
          case '1':
            // 近三天
            this.startDate = hrDayJs().subtract(3, 'date').format('YYYY/MM/DD')
            this.endDate = hrDayJs().format('YYYY/MM/DD')
            break
          case '2':
            // 近七天
            this.startDate = hrDayJs().subtract(7, 'date').format('YYYY/MM/DD')
            this.endDate = hrDayJs().format('YYYY/MM/DD')
            break
          case '3':
            // 近一个月
            this.startDate = hrDayJs().subtract(1, 'month').format('YYYY/MM/DD')
            this.endDate = hrDayJs().format('YYYY/MM/DD')
            break
        }
        this.defaultDate = [this.startDate + ' 00:00:00', this.endDate + ' 23:59:59']
        // this.comItem.value = this.defaultDate.map((time) => time.replace(/\//g, '-'))
        this.$emit('input', this.defaultDate)
      },
      initDate () {
        let startDate = hrDayJs(new Date()).subtract(this.defaultValue, this.defaultType).format('YYYY/MM');
        let endDate = hrDayJs(new Date()).format('YYYY/MM/DD');
        this.defaultDate = [startDate + '/01 00:00:00', endDate + ' 23:59:59']
        this.selectValue = {
          str: [startDate, endDate]
        }
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
      return <div class="apply-date-selector">
        <div class="value-box" onClick={this.showPop}>
          {
            this.type == 'daterange' && <div class="value">
              <span>{this.startDate}</span>
              <span class="mid-key"> - </span>
              <span>{this.endDate}</span>
            </div>
          }
          {
            this.type == 'date' && <div class="value">
              <span>{this.defaultDate}</span>
            </div>
          }
          <span class="icon"></span>
        </div>
        {
          this.isTab && <div class="time-btn-box">
            {
              this.timeBtnList.map((item, index) => {
                return <div class={["time-btn-item", item.value == this.active ? 'active' : '']}
                  onClick={this.handleChoose.bind(this, item.value)}
                  key={index}>{item.name}</div>
              })
            }
          </div>
        }
        <van-popup
          value={this.show}
          onInput={(value) => { this.show = value }}
          class="filter-data-pop"
          style="height: 100%"
          get-container="body"
          position="right">
          <div class="time-pop-box">
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
              <van-button type="primary" onClick="submit" class="btn">确定</van-button>
            </div>
          </div >
        </van-popup>
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
  .apply-date-selector {
    width: 100%;
    text-align: center;
    line-height: 38px;
    .value-box {
      background: #f3f4f6;
      border-radius: 8px;
      color: #232323;
      display: flex;
      justify-content: space-between;
      padding: 0 20px;
      align-items: center;
      line-height: 32px;
      .value {
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
      .icon {
        display: inline-block;
        width: 14px;
        height: 14px;
        background: url("./images/date-icon.png") no-repeat;
        background-size: 100%;
      }
    }
    .time-btn-box {
      display: flex;
      flex-wrap: wrap;
      // justify-content: space-between;
      justify-content: flex-start;

      margin-top: 12px;
      .time-btn-item {
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
      .time-btn-item:nth-child(3n) {
        margin-right: 0;
      }
    }
  }
  .time-pop-box {
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
