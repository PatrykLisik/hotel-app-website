<template>
  <v-toolbar
    fixed>
    <v-spacer></v-spacer>
    <v-toolbar-title>
      <v-btn flat to="/">Hotel App</v-btn>
    </v-toolbar-title>
    <v-spacer></v-spacer>

    <v-toolbar-items>
      <v-btn
        flat
        to="login"
        v-if="!$store.state.isUserLoggedIn"
      >Sign in
      </v-btn>
      <v-btn
        flat
        to="register"
        v-if="!$store.state.isUserLoggedIn"
      >Sign up</v-btn>
    </v-toolbar-items>
  </v-toolbar>
</template>

<script>
export default {
  name: 'Toolbar'
}
</script>

<style scoped>
  a {
    text-decoration: none;
  }
</style>
