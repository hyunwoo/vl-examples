<template >
  <example-container>
    <slot>
      <div class="renderer"
           ref="renderer">
        <div class="ui elevation-3 pa-3 px-4">
          <div style="font-weight:500"
               class="pb-2 white--text title">Text Settings</div>
          <v-text-field label="Title"
                        dark
                        v-model="ui.title"
                        hide-details=""
                        dense
                        flat></v-text-field>
          <v-text-field label="Description"
                        class="pt-5"
                        dark
                        v-model="ui.description"
                        hide-details=""
                        dense
                        flat></v-text-field>
          <div class="d-flex justify-end pt-4">
            <v-btn class="elevation-3"
                   small=""
                   @click="playText"
                   color="primary"
                   large>
              PLAY
            </v-btn>
          </div>
        </div>
      </div>

    </slot>
  </example-container>

</template>
<script src='./smoke.ts'></script>
<style lang='scss'>
@import './smoke.scss';
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
.ui {
  background: #222;
  position: absolute;
  left: 12px;
  bottom: 12px;
  width: calc(100% - 24px);

  z-index: 5;
  // background : #eee;
  max-width: 360px;
}
</style>
