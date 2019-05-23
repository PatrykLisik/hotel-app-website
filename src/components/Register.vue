<template>
  <v-layout column>
    <v-flex xs6 offset-xs3>
        <form>
          <v-text-field
            v-model="name"
            v-validate="'required|max:10'"
            :counter="10"
            :error-messages="errors.collect('name')"
            label="Name"
            data-vv-name="name"
            required
          ></v-text-field>
          <v-text-field
            v-model="email"
            v-validate="'required|email'"
            :error-messages="errors.collect('email')"
            label="E-mail"
            data-vv-name="email"
            required
          ></v-text-field>

          <v-btn @click="submit">submit</v-btn>
          <v-btn @click="clear">clear</v-btn>
        </form>
    </v-flex>
  </v-layout>

</template>

<script>
import Vue from 'vue'
import VeeValidate from 'vee-validate'

Vue.use(VeeValidate)

export default {
  name: 'Register',
  $_veeValidate: {
    validator: 'new'
  },

  data: () => ({
    name: '',
    email: '',
    select: null,
    dictionary: {
      attributes: {
        email: 'E-mail Address'
        // custom attributes
      },
      custom: {
        name: {
          required: () => 'Name can not be empty',
          max: 'The name field may not be greater than 10 characters'
          // custom messages
        }
      }
    }
  }),

  mounted () {
    this.$validator.localize('en', this.dictionary)
  },

  methods: {
    submit () {
      this.$validator.validateAll()
    },
    clear () {
      this.name = ''
      this.email = ''
      this.$validator.reset()
    }
  }
}
</script>

<style scoped>

</style>
