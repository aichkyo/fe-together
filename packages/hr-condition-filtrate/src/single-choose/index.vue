<script>
  export default {
    name: 'SingleChoose',
    props: {
      list: {
        type: Array,
        default () {
          return [
            {
              label: '课程类型',
              value: 10
            },
            {
              label: '课程类型2',
              value: 20
            },
            {
              label: '课程类型3',
              value: 30
            },
            {
              label: '课程类型4',
              value: 40
            }
          ]
        }
      },
      title: {
        type: String,
        default () {
          return '请选择'
        }
      },
      isShowAll: {
        type: Boolean,
        default () {
          return false
        }
      },
      divideeQually: {
        type: Number,
        default () {
          return 3
        }
      }
    },
    data () {
      return {
        active: 0
      }
    },
    created () {
      this.init()
    },
    methods: {
      init () {
        this.initState()
      },
      initState () {
      },
      select (index) {
        this.active = index
        this.$emit('select', this.list[index])
      }
    },
    render () {
      const list = this.isShowAll ? [{ label: '全部', value: 0 }].concat(this.list) : this.list
      return <div class="single-choose">
        <div class="choose-title">{this.title}</div>
        <div class="choose-condition">
          {
            list.map((item, index) => <div
              onClick={this.select.bind(this, index)}
              style={{ width: `calc((100% - 16px) / ${this.divideeQually})` }}
              class={['condition-item', this.active === index && 'active']}>
              {item.label}
            </div>)
          }
        </div>
      </div>
    }
  }
</script>

<style scoped lang="less">
  .single-choose {
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
    .choose-condition {
      display: flex;
      flex-wrap: wrap;
      justify-content: flex-start;
      .condition-item {
        // width: calc((100% - 16px) / 3);
        height: 28px;
        border-radius: 8px;
        box-sizing: border-box;
        background: #f7f8fa;
        text-align: center;
        line-height: 28px;
        margin-bottom: 12px;
        margin-right: 8px;
        color: #03050d;
        font-size: 12px;
        position: relative;
      }
      .condition-item.active {
        // border: 1px solid rgba(121, 114, 254, 0.8);
        background: rgba(121, 114, 254, 0.08);
        color: #7972fe;
        &::after {
          content: " ";
          position: absolute;
          left: 0;
          top: 0;
          width: 200%;
          height: 200%;
          border: 1px solid #7972fe;
          border-radius: 16px;
          box-sizing: border-box;
          -webkit-transform-origin: 0 0;
          transform-origin: 0 0;
          -webkit-transform: scale(0.5);
          transform: scale(0.5);
        }
      }

      .condition-item:nth-child(3n) {
        margin-right: 0;
      }
    }
  }
</style>