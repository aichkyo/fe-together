<script>
  export default {
    name: 'MultitermChoose',
    props: {
      list: {
        type: Array,
        default () {
          return [
            {
              label: '新人培训1',
              value: 10
            },
            {
              label: '新人培训2',
              value: 20
            },
            {
              label: '新人培训3',
              value: 30
            },
            {
              label: '新人培训4',
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
      }
    },
    data () {
      return {
        listActive: []
      }
    },
    computed: {
      concatList () {
        return [{ label: '全部', value: 0 }].concat(this.list)
      }
    },
    watch: {
      concatList: {
        handler (list) {
          this.initListActive(list)
        },
        immediate: true
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
      initListActive (list) {
        if (!Array.isArray(list)) return
        this.listActive = new Array(list.length).fill(false)
        this.listActive[0] = true
      },
      select (index) {
        const active = this.listActive[index]
        if (index === 0) {
          if (active) return
          this.listActive = this.listActive.map(() => false)
          this.$set(this.listActive, index, true)
        } else {
          this.$set(this.listActive, index, !this.listActive[index])
          if (this.listActive.every((item) => !item)) {
            this.$set(this.listActive, 0, true)
          } else {
            this.$set(this.listActive, 0, false)
          }
        }
        const chooseList = this.concatList.filter((item, index) => this.listActive[index])
        this.$emit('select', chooseList)
      }
    },
    render () {
      console.log('render')
      return <div class="multiterm-choose">
        <div class="choose-title">{this.title}</div>
        <div class="choose-condition">
          {
            this.concatList.map((item, index) => <div
              onClick={this.select.bind(this, index)}
              class={['condition-item', this.listActive[index] && 'active']}>
              {item.label}
            </div>)
          }
        </div>
      </div>
    }
  }
</script>

<style scoped lang="less">
  .multiterm-choose {
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
        width: calc((100% - 16px) / 3);
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