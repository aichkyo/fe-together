<template>
  <div id="app">
    <!-- <img alt="Vue logo" src="./assets/logo.png"> -->
    <HelloWorld msg="Welcome to Your Vue.js App" />
    <hr-button>123</hr-button>
    <ks-button type="default">默认按钮</ks-button>
    <ks-button type="primary">主要按钮</ks-button>
    <ks-button type="info">信息按钮</ks-button>
    <ks-button type="warning">警告按钮</ks-button>
    <ks-button type="danger">危险按钮</ks-button>
  </div>
</template>

<script>
  // import HrButton from 'packages/hr-button/src/hrButton.vue'
  import HelloWorld from './components/HelloWorld.vue'

  export default {
    name: 'App',
    components: {
      HelloWorld,
    }
  }
</script>

<style>
  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
  }
</style>
