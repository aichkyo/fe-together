<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <hr-button>hrButton</hr-button>
    <hr-module-card title="hrModuleCardTitle"
                    edit>hrModuleCard</hr-module-card>
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
</style>
