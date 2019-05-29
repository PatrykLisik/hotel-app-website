<template>
  <v-toolbar dense fixed clipped-left app>
    <v-toolbar-side-icon class="grey--text" @click="showSidebar()"></v-toolbar-side-icon>
    <v-toolbar-title class="text-uppercase grey--text">
      <span class="font-weight-bold">Hotel</span>
      <span>App</span>
    </v-toolbar-title>
    <v-spacer></v-spacer>

    <v-toolbar-items>
      <v-btn color ="grey" flat to="login" v-if="!$store.state.isUserLoggedIn"
        >Sign in
      </v-btn>
      <v-btn color="grey" flat to="register" v-if="!$store.state.isUserLoggedIn">
        <span> Sign up</span>
      </v-btn>
      <v-btn color="grey" flat to="/" v-if="$store.state.isUserLoggedIn">
        <span> Sign out</span>
      </v-btn>
    </v-toolbar-items>
  </v-toolbar>
</template>

<script>
export default {
  name: 'Toolbar',
  methods: {
    async showSidebar () {
      await this.$store.dispatch('toggleSidebar')
    }
  }
}
</script>

<style scoped>
a {
  text-decoration: none;
}
</style>
