<template>
  <div>
    <PageTitle name="User Setting" />
    <v-container>
      <v-layout align-center justify-center>
        <v-flex xs12>
          <Alert
            :msg="this.message"
            :type="this.messageType"
            :alert="showAlert"
          />
          <v-card>
            <v-toolbar dark color="primary">
              <v-toolbar-title>Edit Credentials</v-toolbar-title>
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
                  ref="password"
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
                <v-text-field
                  v-validate="'required|confirmed:password'"
                  :counter="128"
                  name="password "
                  :error-messages="errors.collect('confirm password')"
                  label="Confirm password"
                  data-vv-name="confirm password"
                  :type="showPassword2 ? 'text' : 'password'"
                  :append-icon="showPassword2 ? 'visibility' : 'visibility_off'"
                  @click:append="showPassword2 = !showPassword2"
                  required
                ></v-text-field>
              </v-form>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="primary" :disabled="errors.any()">Edit</v-btn>
            </v-card-actions>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
export default {
  name: 'UserSettings',

  $_veeValidate: {
    validator: 'new'
  },
  mounted () {
    this.$validator.localize('en', this.dictionary)
  },

  data: () => ({
    showPassword: false,
    showPassword2: false,
    firstName: '',
    lastName: '',
    email: '',
    message: '',
    messageType: '',
    showAlert: false,
    password: ''
  }),
  created () {
    this.firstName = this.$store.state.firstName
    this.lastName = this.$store.state.lastName
    this.email = this.$store.state.email
  }
}
</script>

<style scoped></style>
