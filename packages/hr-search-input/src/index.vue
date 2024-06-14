<script>
  export default {
    name: 'HrSearchInput',
    props: {
      menuConfig: {
        type: Object,
        default () {
          return {
            id: '151596034994370809',
            code: '41f7a32add1745c99c7fecd5ee83f41c'
          }
        }
      },
      placeholder: {
        type: String,
        default () {
          return '搜索'
        }
      }
    },
    data () {
      return {
        searchParam: '',
        isShowinputBox: false
      }
    },
    methods: {
      search (searchParam) {
        this.searchParam = searchParam
        this.isShowinputBox = false
        this.$emit('search', this.searchParam)
      }
    },
    render () {
      const { id, code } = this.menuConfig
      {/* render ipnput bar */ }
      const renderInputBar = () => {
        return <div class="input-bar">
          <van-search
            left-icon={require('../image/search-icon.png')}
            readonly
            value={this.searchParam}
            onClick={() => {
              this.isShowinputBox = true
            }}
            placeholder={this.placeholder} />
          {
            this.searchParam && <img
              class="bar-close"
              onClick={(event) => {
                event.stopPropagation()
                this.search('')
              }}
              src={require('../image/input-close-icon.png')} />
          }
        </div>
      }

      {/* render input box */ }
      const renderInputBox = () => {
        return <div class="input-box">
          <header class="box-header ksui-header">
            <div class="ksui-nav">
              <ks-nav-bar
                title="搜索"
                left-arrow={true}
                onClick-left={() => {
                  this.isShowinputBox = false
                }}>
              </ks-nav-bar>
            </div>
          </header>
          <div class="box-content ksui-body">
            <div class="content-bar">
              <ks-history-search
                placeholder={this.placeholder}
                onSearch={this.search}
                value={this.searchParam}
                onSelect={this.search}
                onCancel={this.search}
                left-icon={require('../image/search-icon.png')}
                menuId={id}
                code={code}>
              </ks-history-search>
            </div>
          </div>
        </div>
      }

      return <div class="hr-search-input">
        {renderInputBar()}
        {this.isShowinputBox && renderInputBox()}
      </div>
    }
  }
</script>

<style scoped lang="less">
  .hr-search-input {
    display: flex;
    padding-bottom: 10px;
    .input-bar {
      overflow: hidden;
      border-radius: 8px;
      flex: 1;
      position: relative;
      background: #ffffff;
      .van-search {
        padding: 0 !important;
        .van-search__content {
          background: #ffffff;
        }
      }
      .bar-close {
        width: 16px;
        height: 16px;
        position: absolute;
        right: 14px;
        top: 50%;
        transform: translate(0, -50%);
      }
    }
    .input-box {
      position: fixed;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      background: #fff;
      .box-content {
        .content-bar {
          /deep/.van-search {
            .van-search__content {
              background: #f7f8fa;
            }
          }
        }
      }
    }
  }
  .van-search .van-cell {
    padding: 6px 8px 6px 0;
  }
</style>
