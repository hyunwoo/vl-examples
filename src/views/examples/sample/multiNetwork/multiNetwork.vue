<template >
  <example-container>
    <slot>
      <div class="renderer"
           ref="renderer">
        <iframe src='http://hyunwoo.io/crime-visualization/'></iframe></div>
    </slot>
  </example-container>

</template>
<script src='./multiNetwork.ts'></script>
<style lang='scss'>
@import './multiNetwork.scss';
.renderer {
  width: 100%;
  min-height: 600px;
  height: 100vh;
  position: relative;
  iframe {
    background: #fff;
    overflow: hidden;
    width: 100%;
    height: 100%;
  }
}
</style>
