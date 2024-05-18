<template>
  <div class="mobile-simulator">
    <div class="mobile-screen">
      <h1>{{ msg }}</h1>
      <hr-module-card title="hrModuleCardTitle"
                      edit>
        <template slot="title"> 模块卡片组件 </template>

        <div class="module-card-content">
          hrModuleCard内容
        </div>
      </hr-module-card>
      <hr-notice-bar class="notice-class"
                     mode="closeable"
                     :isOverflowShow="false"
                     @close="closeNotice"
                     text="已为你精选出重要留言请及时查看!"
                     left-icon="volume" />
      <div :style="{height: '350px'}">
        <HrEmotionalPicture />
      </div>
      <HrBottomButton :list="list"
                      @clickButton='clickButton' />
      <HrConditionFiltrate v-model="isShowFiltrate" />
      <HrSearchInput />
      <HrTabnav />
    </div>

  </div>
</template>

<script>

  import hrModuleCard from 'packages/hr-module-card/index.js';
  import hrNoticeBar from 'packages/hr-notice-bar/index'
  import HrEmotionalPicture from 'packages/hr-emotional-picture'
  import HrBottomButton from 'packages/hr-bottom-button'
  import HrConditionFiltrate from 'packages/hr-condition-filtrate'
  import HrSearchInput from 'packages/hr-search-input'
  import HrTabnav from 'packages/hr-tab-nav'

  export default {
    name: 'HelloWorld',
    components: {
      hrModuleCard,
      hrNoticeBar,
      HrEmotionalPicture,
      HrBottomButton,
      HrConditionFiltrate,
      HrSearchInput,
      HrTabnav
    },
    props: {
      msg: String
    },
    data () {
      return {
        list: [
          {
            text: '删除',
            icon: '',
          },
          {
            text: '取消',
            icon: '',
          },
          {
            text: '确定',
            icon: '',
          }
        ],
        isShowFiltrate: false
      }
    },
    methods: {
      closeNotice () {
        console.log('closeNotice')
      },
      clickButton (index) {
        console.log(index)
        if (index === 0) {
          this.isShowFiltrate = true
        }
        console.log(this.isShowFiltrate)
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  h3 {
    margin: 40px 0 0;
  }
  ul {
    list-style-type: none;
    padding: 0;
  }
  li {
    display: inline-block;
    margin: 0 10px;
  }
  a {
    color: #42b983;
  }

  .mobile-simulator {
    margin: 0 auto;
    width: 375px; /* iPhone X width */
    height: 812px; /* iPhone X height */
    border: 10px solid black;
    border-radius: 20px;
    padding: 20px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
  }

  .mobile-screen {
    width: 100%;
    height: 100%;
    overflow-y: scroll;
    border-radius: 10px;
  }
</style>
