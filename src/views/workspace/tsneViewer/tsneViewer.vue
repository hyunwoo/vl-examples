// file created at 2019-9-19
// Auto-generated files tsneViewer.vue

<template>
  <v-container fill-height fluid pa-0 ma-0>
    <div class="renderer" ref="renderer"></div>
    <div class="controls">
      <v-btn class="command" block disabled icon>
        <v-icon>attachment</v-icon>
      </v-btn>
      <v-btn
        class="command"
        :selected="ui.tab.activate === 'case-filter'"
        @click="clickControlFieldCommand('case-filter')"
        block
        icon
      >
        <v-icon>filter_list</v-icon>
      </v-btn>
      <v-btn
        class="command"
        :selected="ui.tab.activate === 'tsne'"
        @click="clickControlFieldCommand('tsne')"
        block
        icon
      >
        <v-icon>bubble_chart</v-icon>
      </v-btn>
      <v-btn
        class="command"
        :selected="ui.tab.activate === 'line'"
        @click="clickControlFieldCommand('line')"
        block
        icon
      >
        <v-icon>timeline</v-icon>
      </v-btn>

      <div class="t-sen-controller control-field" :selected="ui.tab.activate ==='case-filter'">
        <div class="pa-3">
          <div class="px-2">
            <b>사건 필터</b>
          </div>
          <div class="px-2 mb-2 caption">사건을 필터링 하여 데이터 셋 선택</div>
          <div class="selector-header">Categorize</div>
          <div class="px-2">
            <v-select
              :items="['-','7대 중범죄','범죄','지역']"
              @change="changeCategorize"
              class="mt-0 pt-0"
              dense
              label
            ></v-select>
          </div>
          <div class="selector-header">Colorize</div>
          <div class="px-2">
            <v-select
              :items="['-','7대 중범죄','지역', '시간']"
              @change="changeColorByCategory"
              class="mt-0 pt-0"
              dense
              label
            ></v-select>
          </div>
        </div>
        <div class="px-3" style="font-size:12px; color:#666;">
          <div class="desc">
            State :
            <b>{{ui.tsne.status}}</b>
          </div>
          <div>Iteration : {{ui.tsne.currentIteration}}</div>
          <div>Error rate : {{ui.tsne.currentErrorRate}}</div>
          <div>Gradient vector norm : {{ui.tsne.currentGVN}}</div>
        </div>
        <v-progress-linear
          class="mt-2"
          :active="ui.tsne.status !== 'READY'"
          :value="ui.tsne.currentIteration / ui.tsne.iteration * 100"
        ></v-progress-linear>
        <v-divider></v-divider>

        <v-btn
          @click="startTSNE"
          :disabled="ui.tsne.running"
          :loading="ui.tsne.running"
          block
          tile
          large
          text
        >apply dataset</v-btn>
      </div>
      <div class="t-sen-controller control-field" :selected="ui.tab.activate ==='tsne'">
        <div class="pa-3">
          <div class="px-2">
            <b>사건 노드 설정</b>
          </div>
          <div class="px-2 mb-2 caption">사건 노드들의 위치 계산 (T-SNE)</div>
          <div class="selector-header">Perplexity</div>
          <v-slider
            v-model="ui.tsne.perplexity"
            class="align-center ma-0"
            :max="50"
            :min="5"
            hide-details
          >
            <template v-slot:append>
              <div class="number-guide">{{ui.tsne.perplexity}}</div>
            </template>
          </v-slider>

          <div class="selector-header">Early Exaggeration</div>
          <v-slider
            v-model="ui.tsne.earlyExaggeration"
            class="align-center"
            :max="100"
            :min="1"
            hide-details
          >
            <template v-slot:append>
              <div class="number-guide">{{ui.tsne.earlyExaggeration}}</div>
            </template>
          </v-slider>

          <div class="selector-header">Learning Rate</div>
          <v-slider
            v-model="ui.tsne.learningRate"
            class="align-center"
            :max="1000"
            :min="100"
            hide-details
          >
            <template v-slot:append>
              <div class="number-guide">{{ui.tsne.learningRate}}</div>
            </template>
          </v-slider>

          <div class="selector-header">Iterator</div>
          <v-slider
            v-model="ui.tsne.iteration"
            class="align-center"
            :max="500"
            step="10"
            :min="100"
            hide-details
          >
            <template v-slot:append>
              <div class="number-guide">{{ui.tsne.iteration}}</div>
            </template>
          </v-slider>
        </div>
        <div class="px-3" style="font-size:12px; color:#666;">
          <div class="desc">
            State :
            <b>{{ui.tsne.status}}</b>
          </div>
          <div>Iteration : {{ui.tsne.currentIteration}}</div>
          <div>Error rate : {{ui.tsne.currentErrorRate}}</div>
          <div>Gradient vector norm : {{ui.tsne.currentGVN}}</div>
        </div>
        <v-progress-linear
          class="mt-2"
          :active="ui.tsne.status !== 'READY'"
          :value="ui.tsne.currentIteration / ui.tsne.iteration * 100"
        ></v-progress-linear>
        <v-divider></v-divider>

        <v-btn
          @click="startTSNE"
          :disabled="ui.tsne.running"
          :loading="ui.tsne.running"
          block
          tile
          large
          text
        >generate</v-btn>
      </div>
      <div class="line-controller control-field" :selected="ui.tab.activate ==='line'">
        <div class="pa-3">
          <div class="px-2">
            <b>사람 노드 설정</b>
          </div>
          <div class="px-2 mb-2 caption">노드들의 연결성 및 필터 설정</div>
          <div class="selector-header">Weight</div>
          <v-range-slider
            class="align-center ma-0"
            v-model="ui.human.weight"
            :max="1.0"
            :min="0.0"
            step="0.01"
            hide-details
          >
            <template v-slot:prepend>
              <div class="number-guide">{{ui.human.weight[0]}}</div>
            </template>
            <template v-slot:append>
              <div class="number-guide">{{ui.human.weight[1]}}</div>
            </template>
          </v-range-slider>
        </div>
        <!-- <div class="px-3"
             style="font-size:12px; color:#666;">
          <div class="desc">State : <b>{{ui.tsne.status}}</b></div>
          <div>Iteration : {{ui.tsne.currentIteration}} </div>
          <div>Error rate : {{ui.tsne.currentErrorRate}}</div>
          <div>Gradient vector norm : {{ui.tsne.currentGVN}}</div>
        </div>-->
        <v-progress-linear class="mt-2"></v-progress-linear>
        <v-divider></v-divider>

        <v-btn
          @click="createHumanGroup"
          :disabled="ui.tsne.running"
          :loading="ui.tsne.running"
          block
          tile
          large
          text
        >calcurate</v-btn>
      </div>
    </div>
    <div class="legend" v-show="Object.keys(palette).length !== 0">
      <div v-for="(value, key) in palette" :key="key" class="legend-item">
        <div class="legend-color" v-bind:style="{backgroundColor: value}"></div>
        <div>{{key}}</div>
      </div>
    </div>
  </v-container>
</template>
<script src='./tsneViewer.ts'>
</script>
<style lang='scss' scoped>
@import './tsneViewer.scss';
</style>
