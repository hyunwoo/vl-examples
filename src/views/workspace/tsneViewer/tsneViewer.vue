// file created at 2019-9-19
// Auto-generated files tsneViewer.vue

<template>
  <v-container fill-height
               fluid
               pa-0
               ma-0>
    <div class="renderer"
         ref="renderer"></div>
    <div class="t-sen-controller">
      <div class="pa-3">
        <div class="px-2 mb-2">
          <b>T-SNE 설정</b>
        </div>
        <div class="selector-header">Perplexity</div>
        <v-slider v-model="ui.tsne.perplexity"
                  class="align-center ma-0"
                  :max="50"
                  :min="5"
                  hide-details>
          <template v-slot:append>
            <div class="number-guide">{{ui.tsne.perplexity}}</div>
          </template>
        </v-slider>

        <div class="selector-header">Early Exaggeration</div>
        <v-slider v-model="ui.tsne.earlyExaggeration"
                  class="align-center"
                  :max="100"
                  :min="1"
                  hide-details>
          <template v-slot:append>
            <div class="number-guide">{{ui.tsne.earlyExaggeration}}</div>
          </template>
        </v-slider>

        <div class="selector-header">Learning Rate</div>
        <v-slider v-model="ui.tsne.learningRate"
                  class="align-center"
                  :max="1000"
                  :min="100"
                  hide-details>
          <template v-slot:append>
            <div class="number-guide">{{ui.tsne.learningRate}}</div>
          </template>
        </v-slider>

        <div class="selector-header">Iterator</div>
        <v-slider v-model="ui.tsne.iteration"
                  class="align-center"
                  :max="500"
                  step="10"
                  :min="100"
                  hide-details>
          <template v-slot:append>
            <div class="number-guide">{{ui.tsne.iteration}}</div>
          </template>
        </v-slider>
      </div>
      <div class="px-3"
           style="font-size:12px; color:#666;">
        <div class="desc">State : <b>{{ui.tsne.status}}</b></div>
        <div>Iteration : {{ui.tsne.currentIteration}} </div>
        <div>Error rate : {{ui.tsne.currentErrorRate}}</div>
        <div>Gradient vector norm : {{ui.tsne.currentGVN}}</div>
      </div>
      <v-progress-linear class="mt-2"
                         :active="ui.tsne.status !== 'READY'"
                         :value="ui.tsne.currentIteration / ui.tsne.iteration * 100"></v-progress-linear>
      <v-divider></v-divider>

      <v-btn @click="startTSNE"
             :disabled="ui.tsne.running"
             :loading="ui.tsne.running"
             block
             tile
             large=""
             text>generate</v-btn>
    </div>
  </v-container>
</template>
<script src='./tsneViewer.ts'>

</script>
<style lang='scss' scoped>
@import './tsneViewer.scss';
</style>
