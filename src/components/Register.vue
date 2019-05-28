<template>
  <v-layout align-center justify-center>
    <v-flex xs12>
      <Alert
        :msg="this.message"
        :type="this.messageType"
        :alert="showAlert"
      />
      <v-card>
        <v-toolbar dark color="primary">
          <v-toolbar-title>Register</v-toolbar-title>
        </v-toolbar>
        <v-card-text>
          <v-form>
            <v-text-field
              v-model="firstName"
              v-validate="'required|alpha|max:32|min:3'"
              :counter="32"
              :error-messages="errors.collect('first name')"
              label="First name"
              data-vv-name="first name"
              required
            ></v-text-field>
            <v-text-field
              v-model="lastName"
              v-validate="'required|alpha|max:32|min:3'"
              :counter="32"
              :error-messages="errors.collect('last name')"
              label="Last name"
              data-vv-name="last name"
              required
            ></v-text-field>
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
          <v-btn color="primary" :disabled="errors.any()" @click="submit"
            >Submit</v-btn
          >
          <v-btn @click="clear">clear</v-btn>
        </v-card-actions>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import authenticationService from '../services/AuthenticationService'
import Alert from './Alert'

export default {
  name: 'Register',
  components: {Alert},
  $_veeValidate: {
    validator: 'new'
  },

  data: () => ({
    showPassword: false,
    firstName: '',
    lastName: '',
    password: '',
    email: '',
    message: '',
    messageType: '',
    showAlert: false
  }),

  mounted () {
    this.$validator.localize('en', this.dictionary)
  },

  methods: {
    async submit () {
      try {
        await authenticationService.register({
          firstName: this.firstName,
          lastName: this.lastName,
          email: this.email,
          password: this.password
        })
      } catch (err) {
        this.message = err.response.data.error
        this.messageType = 'error'
      } finally {
        this.showAlert = false
        this.showAlert = true
      }
    },
    clear () {
      this.firstName = ''
      this.lastName = ''
      this.email = ''
      this.password = ''
      this.$validator.reset()
      this.showAlert = false
    }
  }
}
</script>

<style scoped></style>
