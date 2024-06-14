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
      <hr-stack-image :list="imageList"
                      size="30px"
                      @click="handImageClick">
      </hr-stack-image>
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

  import hrModuleCard from 'packages/hr-module-card/index.js'
  import hrStackImage from 'packages/hr-stack-image'

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
      HrTabnav,
      hrButton,
      hrStackImage
    },
    props: {
      msg: String
    },
    data () {
      return {
        imageList: [
          "https://nos.netease.com/nim/MTAzMTgzOA==/bmltd18wXzE0NjI2MTE2Mjk5OTNfMzBlMjZmM2EtYzViMS00MzgzLTk4MmItMmEzNDMxOTZkZWIz",
          "https://kuasheng-res-uat.kyslb.com/app/avatar/uat/person/faa05fa33d576326ace9f8625583271f_112536_14369514354721956405.jpg",
          "https://kuasheng-res-uat.kyslb.com/app/avatar/uat/person/e032d75541a7b82c5f9a16573681e872_494230_6191304898900678859.jpg",
          "https://kuasheng-res-uat.kyslb.com/app/avatar/uat/person/49cd018c0380a81de9515e7aebc211cf_2447325_18069676875039978711.jpg"
        ],
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
      handImageClick (index) {
        console.log(index)
      },
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
