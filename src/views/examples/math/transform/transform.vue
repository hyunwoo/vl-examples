<template >
  <example-container>
    <slot>
      <div class="renderer"
           ref="renderer"></div>
    </slot>
  </example-container>

</template>
<script src='./transform.ts'></script>
<style lang='scss'>
@import './transform.scss';
.renderer {
  width: 100%;
  min-height: 600px;
  height: 100vh;
  position: relative;
  canvas {
    width: 100%;
    height: 100%;
  }
}
</style>
