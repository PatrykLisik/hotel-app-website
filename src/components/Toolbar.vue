<template>
  <v-toolbar fixed>
    <v-toolbar-title>
      <v-btn flat to="/">Hotel App</v-btn>
    </v-toolbar-title>
    <v-spacer></v-spacer>

    <v-toolbar-items>
      <v-btn flat>Sign in</v-btn>
      <v-btn flat to="register">Sign up</v-btn>
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
