<template >
  <url-list-container>
    <slot>
      <div class="renderer"
           ref="renderer"></div>
    </slot>
  </url-list-container>

</template>
<script src='./networkExample01.ts'></script>
<style lang='scss'>
@import './networkExample01.scss';
.renderer {
  width: 100%;
  min-height: 600px;
  height: calc(100vh - 64px);
  position: relative;
  canvas {
    width: 100%;
    height: 100%;
  }
}
</style>
