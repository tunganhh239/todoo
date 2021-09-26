<template>
  <div id="app">
      <router-view></router-view>
  </div>
</template>

<script>
// import SignIn from './views/SignIn.vue';

export default {
  name: 'App',
  // components: {
  //   SignIn,
  // },
};
</script>

<style lang="scss">
*{
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  border: none;
}

#app {
  font-family: Roboto, sans-serif;
  text-align: center;
  color: #2c3e50;
  margin: 0;
  padding: 0;
  border: none;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: #DFE7ED;
}

a{
  text-decoration: none;
}

button{
  font-family: Roboto, sans-serif;
}

button:hover{
    color: #1AAE9F !important;
}
</style>
