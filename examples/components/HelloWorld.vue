<template>
  <div class="mobile-simulator">
    <div class="mobile-screen">
      <h1>{{ msg }}</h1>
      <hr-button>hrButton</hr-button>
      <hr-module-card title="hrModuleCardTitle"
                      edit>
        <template slot="title"> 模块卡片组件 </template>

        <div class="module-card-content">
          hrModuleCard内容
        </div>
      </hr-module-card>
    </div>

  </div>
</template>

<script>

  import hrButton from 'packages/hr-button/index.js';
  import hrModuleCard from 'packages/hr-module-card/index.js';
  export default {
    name: 'HelloWorld',
    components: {
      hrButton,
      hrModuleCard
    },
    props: {
      msg: String
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
    overflow: hidden;
    border-radius: 10px;
  }
</style>
