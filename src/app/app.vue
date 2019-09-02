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
      <v-list dense>
        <v-list-item>
          <v-list-item-action>
            <v-icon>close</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title class="grey--text">
              asdf
            </v-list-item-title>
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