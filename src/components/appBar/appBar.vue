// file created at 2019-9-18
// Auto-generated files appBar.vue

<template>
  <div class="app-bar">
    <div class="side-bar left">
      <v-btn icon
             large
             disabled=""
             float><i class="fab fa-npm"></i></v-btn>
      <v-btn icon
             large
             float
             href='https://github.com/hyunwoo/vire'><i class="fab fa-github"></i></v-btn>
    </div>
    <div class="top-bar">
      <div class="site-name"
           @click="$router.push('/')">VIRE</div>
      <div class="flex-fill"></div>

      <div v-for="item in navItems"
           :key="item"
           :active="item === $route.name"
           class="site-menu"
           @click="$router.push({name:item})">{{item}}</div>

    </div>
  </div>
</template>
<script src='./appBar.ts'>

</script>
<style lang='scss' scoped>
@import './appBar.scss';
</style>
