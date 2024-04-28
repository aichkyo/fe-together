<script>
  export default {
    name: 'HrConditionFiltrate',
    props: {
      value: {
        type: Boolean,
        default () {
          return false
        }
      }
    },
    data () { },
    methods: {
      operationCondition () {

      },
      setisShowFiltrate (flag) {
        this.$emit('input', flag)
      }
    },
    render () {
      const renderFiltrateContent = () => {
        return <div class="filtrate-content">
          <header class="ksui-header">
            <div class="ksui-nav">
              <ks-nav-bar title="筛选"
                left-arrow={true}
                onClick-left={() => { this.setisShowFiltrate(false) }}>
              </ks-nav-bar>
            </div>
          </header>
          <div class="content-main ksui-body">
            <div class="main-item">
              <div class="item-title">申请时间</div>
            </div>
            <div class="main-item">
              <div class="item-title">培训类型<span class="title-black">（多选）</span></div>
            </div>
            <div class="main-item">
              <div class="item-title">排序</div>
            </div>
          </div>
          <div class="content-footer">
            <span class="footer-button reset" onClick={this.operationCondition.bind(this, 0)}>重置</span>
            <span class="footer-button" onClick={this.operationCondition.bind(this, 1)}>确定</span>
          </div>
        </div>
      }

      return <div class="hr-condition-filtrate">
        <ks-popup
          value={this.value}
          onInput={(value) => { this.setisShowFiltrate(value) }}
          get-container="#app"
          position="right">
          {renderFiltrateContent()}
        </ks-popup>
      </div>
    }
  }
</script>

<style scoped lang="less">
  .filtrate-content {
    width: 330px;
    height: 100%;
    border-radius: 12px 0px 0px 12px;
    box-sizing: border-box;
    .ksui-header {
      background: #fff !important;
    }
    .content-main {
      padding: 16px;
      overflow-y: scroll !important;
      padding-bottom: 90px;
      .main-item {
        margin-bottom: 8px;
        .item-title {
          line-height: 20px;
          margin-bottom: 12px;
          font-size: 14px;
          font-weight: 600;
          color: #03050d;
          .title-black {
            font-size: 14px;
            font-weight: normal;
            color: #6e6d72;
          }
        }
        .item-condition {
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
            line-height: 26px;
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
    }
    .content-footer {
      position: absolute;
      bottom: 0;
      left: 0;
      padding: 8px 36px;
      display: flex;
      width: 100%;
      box-sizing: border-box;
      background: #fff;
      .footer-button {
        flex: 1;
        border-radius: 8px;
        background: #7972fe;
        font-size: 16px;
        line-height: 22px;
        color: #ffffff;
        text-align: center;
        line-height: 40px;
      }
      .footer-button.reset {
        color: #7972fe;
        // border: solid #7972fe 1px;
        background: #fff;
        margin-right: 18px;
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
  }
  .van-popup {
    height: 100%;
  }
</style>