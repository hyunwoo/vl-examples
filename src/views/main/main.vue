<template >

  <div>
    <div class="front-cover"></div>
    <div>
      <div class="main-page">
        <div class="renderer"
             ref="renderer"></div>
        <div class="main-page-contents">
          <div class="app-introduce">
            <b>VIRE</b> <br>
            <div style="padding-left : 4px; line-height: 1.4;">
              A fast and easy to use <br>visualization library based on WebGL
            </div>
            <div style="padding: 32px 0;"></div>

            <v-btn large
                   disabled>Quick Start</v-btn>

          </div>
          <div class="version-copyright">version 0.0.2</div>

        </div>

      </div>
      <div class="main-page">

      </div>
    </div>
    <app-bar></app-bar>
  </div>

</template>
<script src='./main.ts'></script>
<style lang='scss' scoped>
@import './main.scss';
</style>
