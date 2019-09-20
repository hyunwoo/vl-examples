<template>
  <v-app>

    <v-content>
      <transition :name="useTransition ? 'fade' : ''">
        <router-view></router-view>
      </transition>
    </v-content>
  </v-app>
</template>
<script src="./app.ts"></script>
<style lang="scss">
@import './app.scss';
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  transition: opacity 0.5s;
  opacity: 0;
}
.fade-leave {
  opacity: 1;
}
.fade-enter-to {
  opacity: 1;
}
</style>