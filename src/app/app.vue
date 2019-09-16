<template>
  <v-app dark>
    <v-app-bar app
               floating=""
               dark>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title class="headline text-uppercase">
        <span>VL</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn text
             target="_blank">
        <span class="mr-2">h.hyunwoo</span>
      </v-btn>
    </v-app-bar>

    <v-navigation-drawer v-model="drawer"
                         app
                         dark>
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="title">
            VL
          </v-list-item-title>
          <!-- <v-list-item-subtitle>
            subtext
          </v-list-item-subtitle> -->
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>

      <v-list dense
              nav>
        <v-list-item link
                     to="/examples/line01">
          <v-list-item-icon>
            <v-icon>sort</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>LineExample01</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link
                     to="/examples/line02">
          <v-list-item-icon>
            <v-icon>sort</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>LineExample02</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-content>

      <router-view></router-view>
    </v-content>
  </v-app>
</template>
<script src="./app.ts"></script>