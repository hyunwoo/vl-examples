<template >
  <example-container>
    <slot>
      <div class="renderer"
           ref="renderer"></div>
    </slot>
  </example-container>
</template>
<script src='./lineWithPointMovement.ts'></script>
<style lang='scss'>
@import './lineWithPointMovement.scss';
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
