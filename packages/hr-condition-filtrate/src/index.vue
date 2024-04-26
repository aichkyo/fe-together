<script>
  export default {
    name: 'HrConditionFiltrate',
    props: {
      isShowFiltrate: {
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
          value={this.isShowFiltrate}
          onInput={(value) => { this.setisShowFiltrate(value) }}
          get-container="#app"
          position="right">
          {renderFiltrateContent()}
        </ks-popup>
      </div>
    }
  }
</script>