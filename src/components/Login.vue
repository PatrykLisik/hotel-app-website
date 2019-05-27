<template>
  <v-layout align-center justify-center>
    <v-flex xs12>
      <v-card>
        <v-toolbar dark color="primary">
          <v-toolbar-title>Login</v-toolbar-title>
        </v-toolbar>
        <v-card-text>
          <v-form>
            <v-text-field
              v-model="email"
              v-validate="'required|email'"
              :error-messages="errors.collect('email')"
              label="Email"
              data-vv-name="email"
              required
            ></v-text-field>
            <v-text-field
              v-model="password"
              v-validate="'required|max:128|min:8'"
              :counter="128"
              :error-messages="errors.collect('password')"
              label="Password"
              data-vv-name="password"
              :type="showPassword ? 'text' : 'password'"
              :append-icon="showPassword ? 'visibility' : 'visibility_off'"
              @click:append="showPassword = !showPassword"
              required
            ></v-text-field>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" :disabled="errors.any()" @click="login"
            >Login</v-btn
          >
          <v-btn @click="clear">clear</v-btn>
        </v-card-actions>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import authenticationService from '../services/AuthenticationService'

export default {
  name: 'Login',
  $_veeValidate: {
    validator: 'new'
  },

  data: () => ({
    showPassword: false,
    password: '',
    email: ''
  }),
  methods: {
    async login () {
      try {
        const response = await authenticationService.login({
          email: this.email,
          password: this.password
        })

        await this.$store.dispatch('setToken', response.data.token)
        await this.$store.dispatch('setFirstName', response.data.user.firstName)
        await this.$store.dispatch('setLastName', response.data.user.lastName)
        await this.$store.dispatch('setRole', response.data.role.name)
      } catch (err) {
        this.error = err.response.data.error
      }
    },
    clear () {
      this.email = ''
      this.password = ''
      this.$validator.reset()
    }
  }
}
</script>

<style scoped></style>
