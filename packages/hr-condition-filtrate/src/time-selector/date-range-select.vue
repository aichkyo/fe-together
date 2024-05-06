<script>
  import { formatToDate, formatToString } from './utils/tools'
  // import { hrDayJs } from './tools'

  export default {
    name: 'DateRangeSelect',
    props: {
      defaultValue: {
        type: Array,
        default: () => ([])
      },
      min: [String, Number, Date],
      max: [String, Number, Date],
    },
    data () {
      return {
        currentDate: [],
        currentMin: new Date(),
        currentMax: new Date()
      }
    },
    watch: {
      defaultValue () {
        this.init()
      }
    },
    created () {
      this.disposeVantBug()
      this.init()
      this.handleSelect(this.currentDate)
    },
    methods: {
      init () {
        if (this.defaultValue.length) {
          this.currentDate = [formatToDate(this.defaultValue[0]), formatToDate(this.defaultValue[1])]
        }
        if (!this.min) {
          let _date = new Date()
          let y = _date.getFullYear()
          let m = _date.getMonth() + 1
          this.currentMin = (m - 6) < 1 ? new Date(y - 1, 12 + m - 5, 1) : new Date(y, m - 5, 1)
        } else {
          this.currentMin = formatToDate(this.min)
        }
        if (!this.max) {
          let _date = new Date()
          let y = _date.getFullYear()
          let m = _date.getMonth() + 1
          this.currentMax = (m + 6) > 12 ? new Date(y + 1, m + 6 - 12, 0) : new Date(y, m + 6, 0)
        } else {
          this.currentMax = formatToDate(this.max)
        }
      },
      disposeVantBug () {
        this.$nextTick(() => {
          const select = document.querySelector('.van-calendar__body')
          console.log(select, 'select')
          select.scrollTop += 1
        })
      },
      handleSelect (e) {
        console.log(e, 'swq')
        this.$emit('select', { date: e, str: [formatToString(e[0]), formatToString(e[1])] })
      }
    },
    render () {
      return <van-calendar class="ks-daterange-select"
        default-date={this.currentDate}
        poppable={false}
        show-confirm={false}
        show-title={false}
        show-subtitle={false}
        min-date={this.currentMin}
        max-date={this.currentMax}
        lazy-render={false}
        allow-same-day={true}
        safe-area-inset-bottom={true}
        row-height="44"
        type="range"
        onSelect={this.handleSelect} />
    }
  }
</script>

<style lang="less">
  .ks-daterange-select {
    .van-calendar__day {
      margin: 3px 0;
    }
    .van-calendar__day--middle {
      color: #7972fe !important;
      &::after {
        top: 0 !important;
        bottom: 0 !important;
      }
    }
    .van-calendar__day--start,
    .van-calendar__day--end {
      margin-left: calc((14.285% - 44px) / 2);
      margin-right: calc((14.285% - 44px) / 2);
    }
    .van-calendar__day--start-end {
      margin-left: calc((14.285% - 54px) / 2);
      margin-right: calc((14.285% - 54px) / 2);
    }
  }
  .van-calendar__day {
    margin: 3px 0;
  }
  .van-calendar__day--start {
    position: relative;
    border-radius: 40px;
    width: 44px;
    margin-left: calc((14.285% - 44px) / 2);
    margin-right: calc((14.285% - 44px) / 2);
    &::after {
      position: absolute;
      left: 50%;
      top: 0;
      bottom: 0;
      width: 85%;
      content: " ";
      background-color: rgba(121, 114, 254, 0.1);
    }
  }
  .van-calendar__day--end {
    position: relative;
    border-radius: 40px;
    width: 44px;
    margin-left: calc((14.285% - 44px) / 2);
    margin-right: calc((14.285% - 44px) / 2);
    &::after {
      position: absolute;
      right: 50%;
      top: 0;
      bottom: 0;
      width: 85%;
      content: " ";
      background-color: rgba(121, 114, 254, 0.1);
    }
  }
  .filter-data-pop {
    .time-pop-box {
      height: 100%;
      width: 100%;
      display: flex;
      flex-direction: column;
      .date-content {
        flex: 1;
        overflow: hidden;
      }
    }
  }
</style>
