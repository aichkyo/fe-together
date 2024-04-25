<script>
  export default {
    name: 'HrBottomButton',
    props: {
      list: {
        type: Array,
        default () {
          return [
            {
              text: '取消',
              icon: '',
            },
            {
              text: '确定',
              icon: '',
            }
          ]
        }
      },
      isRadius: {
        type: Boolean,
        default () {
          return false
        }
      }
    },
    data () {
      return {}
    },
    methods: {
      clickButton (index) {
        this.$emit('clickButton', index)
      }
    },
    render () {
      return <div class="hr-bottom-button">
        <div class="button-list">
          {
            this.list.map((item, index) => {
              const { text } = item
              return <div class="list-item" onClick={this.clickButton.bind(this, index)}>
                <span class="item-text">{text}</span>
              </div>
            })
          }
        </div>
      </div>
    }
  }
</script>

<style scoped lang="less">
  .hr-bottom-button {
    background: #fff;
    z-index: 111;
    .button-list {
      padding: 8px 16px;
      display: flex;
      justify-content: space-around;
      gap: 13px;
      .list-item {
        flex: 1;
        font-size: 16px;
        color: #7972fe;
        display: flex;
        line-height: 40px;
        border-radius: 8px;
        border: 0.5px solid #7972fe;
        background: #fff;
        .item-text {
          text-align: center;
          flex: 1;
        }
      }
      .list-item:last-child {
        color: #ffffff;
        background: #7972fe;
      }
    }
  }
  .ios .hr-bottom-button,
  .ipx .hr-bottom-button {
    padding-bottom: 28px;
  }
</style>