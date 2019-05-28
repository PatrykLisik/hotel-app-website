<template>
    <v-alert
      v-model="alert"
      dismissible
      :type="type"
      transition="scale-transition"
    >
      {{msg}}
    </v-alert>
</template>

<script>
export default {
  name: 'Alert',
  props: ['type', 'msg', 'alert']
}
</script>

<style scoped>

</style>
