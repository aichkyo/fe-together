<script>
  export default {
    name: 'HrTabNav',
    props: {
      defaultType: {
        type: Number,
        default () {
          return 10
        }
      }
    },
    data () {
      return {
        tabList: [
          {
            text: '待调度',
            count: 20,
            type: 10
          },
          {
            text: '已调度',
            count: 20,
            type: 20
          },
          {
            text: '调度中',
            count: 20,
            type: 30
          }
        ],
        currentType: 10
      }
    },
    watch: {
      defaultType: {
        immediate: true,
        handler (value) {
          this.currentType = value
        }
      }
    },
    methods: {
      switchTab (type) {
        this.currentType = type
      }
    },
    render () {
      // render tab
      const renderHeaderTab = (params = {}) => {
        const { text, type, count } = params
        const active = this.currentType === type

        return <div class={['nav-item', active && 'active']} onClick={this.switchTab.bind(this, type)}>
          {text} {count}
          {active && <i class="item-border"></i>}
        </div>
      }

      return <div class="hr-tab-nav">
        {
          this.tabList.map((item) => {
            return renderHeaderTab(item)
          })
        }
      </div>
    }
  }
</script>
<style scoped lang="less">
  .hr-tab-nav {
    display: flex;
    line-height: 34px;
    margin-bottom: 11px;
    .nav-item {
      font-size: 13px;
      font-weight: 600;
      color: #858793;
      position: relative;
      margin-right: 29px;
      .item-border {
        width: 15px;
        height: 3px;
        position: absolute;
        left: 50%;
        bottom: 0;
        transform: translateX(-50%);
        background: #a68cff;
        border-radius: 1.5px;
      }
    }
    .nav-item.active {
      font-size: 16px;
      color: #03050d;
    }
  }
</style>
