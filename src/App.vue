<template>
  <v-app class="grey lighten-4">
    <toolbar></toolbar>
    <side-bar></side-bar>
    <v-content class="mx-4 mb-4">
        <router-view></router-view>
    </v-content>
    <v-footer app></v-footer>
  </v-app>
</template>

<script>
import Toolbar from './components/Toolbar'
import SideBar from './components/Sidebar'

export default {
  name: 'App',
  components: { Toolbar, SideBar }
}
</script>

<style>
</style>
