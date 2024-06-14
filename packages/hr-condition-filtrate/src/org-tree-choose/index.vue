<script>
  export default {
    name: 'OrgTreeChoose',
    props: {
      title: {
        type: String,
        default () {
          return '请选择'
        }
      }
    },
    data () {
      return {
        defaultCheckedKey: '171',
        isShowOrgTreePop: false,
        organization: {}
      }
    },
    methods: {
      handleChange (organization) {
        this.isShowOrgTreePop = false
        this.organization = organization || {}
        console.log(organization, 'organization')
      }
    },
    render () {
      const { name } = this.organization
      return <div class="org-tree-choose">
        <div class="choose-title">{this.title}</div>
        <div class="choose-input" onClick={() => {
          this.isShowOrgTreePop = true
        }}>
          <span class={["input-text", name && 'black']}>{name || '请选择'}</span>
          <img class="input-image" src={require('../../image/arrow-right.png')} />
        </div>
        <div class="choose-popup">
          <ks-org-tree-pop
            style={{ height: '100%', width: '330px' }}
            value={this.isShowOrgTreePop}
            overlay={true}
            closeOnClickOverlay={true}
            onClose={() => {
              this.isShowOrgTreePop = false
            }}
            onInput={(value) => {
              this.isShowOrgTreePop = value
            }}
            ref="popTree"
            defaultCheckedKeys={this.defaultCheckedKey}
            onHandleChange={this.handleChange}
          />
        </div>
      </div>
    }
  }
</script>

<style scoped lang="less">
  .org-tree-choose {
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
    .choose-input {
      height: 32px;
      border-radius: 8px;
      background: #f7f8fa;
      display: flex;
      padding: 0 17px 0 12px;
      line-height: 32px;
      .input-text {
        font-size: 14px;
        color: #b0b3bf;
      }
      .input-text.black {
        color: #03050d;
      }
      .input-image {
        margin: 12px 0 0 auto;
        width: 4px;
        height: 8px;
      }
    }
    .choose-popup {
    }
  }
  .van-popup {
    height: 100%;
  }
  /deep/.ks-org-tree-header-title-label {
    font-size: 16px;
  }
</style> 