<template >
  <v-container fluid=""
               dark
               pa-0>
    <v-layout>

    </v-layout>
    <div class="renderer"
         ref="renderer"></div>
  </v-container>

</template>
<script src='./networkExample01.ts'></script>
<style lang='scss'>
@import './networkExample01.scss';
.renderer {
  width: 100%;
  min-height: 600px;
  height: calc(100vh - 64px);
  canvas {
    width: 100%;
    height: 100%;
  }
}
</style>
