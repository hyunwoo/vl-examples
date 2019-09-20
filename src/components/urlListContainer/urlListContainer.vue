// file created at 2019-9-18
// Auto-generated files urlListContainer.vue

<template>
  <v-container fluid=""
               pa-0
               fill-height>
    <v-layout light>
      <v-flex class="examples-list-container">
        <v-btn text
               tile
               block
               to="/"
               x-large>
          <div class="title text-left">VIRE</div>
        </v-btn>
        <v-divider></v-divider>
        <div class="px-3 pt-3">
          <v-text-field label="Search.."
                        v-model="ui.searchModel"
                        solo
                        hide-details
                        small>
            <v-icon slot="append">search</v-icon>
          </v-text-field>
        </div>
        <v-list shaped>
          <v-list-item-group>
            <transition-group name="fade">
              <template v-for="(item, i) in displayItems">
                <template v-if="i === 0 || displayItems[i - 1].category !== item.category">
                  <div :key="item.name + '-cat'"
                       class="category-guide">
                    - {{item.category}}
                  </div>
                </template>
                <v-list-item class="my-1"
                             :disabled="item.disabled"
                             :to="item.url"
                             :key="item.url">
                  <v-list-item-content>
                    <v-list-item-title v-text="item.name"></v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
              </template>
            </transition-group>
          </v-list-item-group>
        </v-list>
      </v-flex>
      <v-flex>
        <slot></slot>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script src='./urlListContainer.ts'>

</script>
<style lang='scss' scoped>
@import './urlListContainer.scss';
</style>
