<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
  <div>
    <PageTitle name="All Users"/>
    <v-toolbar flat color="white">
      <v-toolbar-title>Users</v-toolbar-title>
      <v-divider
        class="mx-2"
        inset
        vertical
      ></v-divider>
      <v-spacer></v-spacer>
      <v-dialog v-model="dialog" max-width="500px">
        <template v-slot:activator="{ on }">
          <v-btn color="primary" dark class="mb-2" v-on="on">New User</v-btn>
        </template>
        <v-card>
          <v-card-title>
            <span class="headline">{{ formTitle }}</span>
          </v-card-title>

          <v-card-text>
            <v-container grid-list-md>
              <v-layout wrap>
                <v-flex xs12 sm6 md4>
                  <v-text-field
                    v-model="editedItem.id"
                    label="ID"
                    disabled/>
                </v-flex>
                <v-flex xs12 sm12 md12>
                  <v-text-field
                    v-model="editedItem.firstName"
                    v-validate="'required|alpha|max:32|min:3'"
                    :counter="32"
                    :error-messages="errors.collect('first name')"
                    label="First name"
                    data-vv-name="first name"
                    required
                  />
                </v-flex>
                <v-flex xs12 sm12 md12>
                  <v-text-field
                    v-model="editedItem.lastName"
                    v-validate="'required|alpha|max:32|min:3'"
                    :counter="32"
                    :error-messages="errors.collect('last name')"
                    label="Last name"
                    data-vv-name="last name"
                    required
                  />
                </v-flex>
                <v-flex xs12 sm12 md12>
                  <v-text-field
                    v-model="editedItem.email"
                    v-validate="'required|email'"
                    :error-messages="errors.collect('email')"
                    label="Email"
                    data-vv-name="email"
                    required
                  />
                </v-flex>
                <v-flex xs12 sm12 md12>
                  <v-select
                    :items="Object.keys(RoleNameToRoleId)"
                    label="Role"
                    :item-value="RoleIdToRoleName[editedItem.role]"
                    required
                  ></v-select>
                </v-flex>
                <v-flex xs12 sm12 md12>
                  <v-text-field
                    v-model="editedItem.password"
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
                  />
                </v-flex>
                <v-flex xs12 sm12 md12>
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
                </v-flex>
              </v-layout>
            </v-container>
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" flat @click="close">Cancel</v-btn>
            <v-btn color="blue darken-1"
                   :disabled="errors.any() && editedItem.lastName && editedItem.firstName && editedItem.email"
                   flat
                   @click="save">Save</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-toolbar>
    <v-data-table
      :headers="headers"
      :items="users"
      class="elevation-1"
    >
      <template v-slot:items="props">
        <td>{{ props.item.id }}</td>
        <td class="text-xs">{{ props.item.firstName }}</td>
        <td class="text-xs">{{ props.item.lastName }}</td>
        <td class="text-xs">{{ props.item.email }}</td>
        <td class="text-xs">{{ RoleIdToRoleName[props.item.roleId] }}</td>
        <td class="justify-center layout px-0">
          <v-icon
            small
            class="mr-2"
            @click="editItem(props.item)"
          >
            edit
          </v-icon>
          <v-icon
            small
            @click="deleteItem(props.item)"
          >
            delete
          </v-icon>
        </td>
      </template>
      <template v-slot:no-data>
        <v-btn color="primary" @click="initialize">Reset</v-btn>
      </template>
    </v-data-table>
  </div>
</template>

<script>
import PageTitle from './PageTitle'
import UserService from '../services/UserService'

export default {
  name: 'AllUsers',
  $_veeValidate: {
    validator: 'new'
  },
  components: {PageTitle},
  data: () => ({
    showPassword: false,
    showPassword2: false,
    dialog: false,
    headers: [
      { text: 'ID', value: 'id', align: 'left' },
      { text: 'First name', value: 'firstName' },
      { text: 'Last name', value: 'lastName' },
      { text: 'email', value: 'email' },
      { text: 'Role', value: 'role', sortable: false }
    ],
    users: [],
    RoleNameToRoleId: {},
    RoleIdToRoleName: {},
    editedIndex: -1,
    editedItem: {
      id: '',
      firstName: '',
      lastName: '',
      email: '',
      role: 'user',
      password: ''
    },
    defaultItem: {
      id: '',
      firstName: '',
      lastName: '',
      email: '',
      role: 'user'
    }
  }),

  computed: {
    formTitle () {
      return this.editedIndex === -1 ? 'New User' : 'Edit User'
    }
  },

  watch: {
    dialog (val) {
      val || this.close()
    }
  },

  mounted () {
    this.$validator.localize('en', this.dictionary)
  },

  async created () {
    await this.initialize()
    console.log('RoleNameToRoleId ' + this.RoleNameToRoleId)
  },

  methods: {
    async initialize () {
      const response = await UserService.getAll()
      this.users = response.data
      const rolesResponse = await UserService.getRoles()
      const roles = rolesResponse.data

      this.RoleNameToRoleId = {}
      this.RoleIdToRoleName = {}

      for (let i = 0; i < roles.length; i++) {
        const role = roles[i]

        this.RoleNameToRoleId[role.name] = role.id
        this.RoleIdToRoleName[role.id] = role.name
      }
    },

    editItem (item) {
      this.editedIndex = this.users.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.editedItem.password = ''
      this.dialog = true
    },

    deleteItem (item) {
      const index = this.users.indexOf(item)
      confirm('Are you sure you want to delete this item?') && this.users.splice(index, 1)
    },

    close () {
      this.dialog = false
      setTimeout(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      }, 300)
    },

    save () {
      if (this.editedIndex > -1) {
        Object.assign(this.users[this.editedIndex], this.editedItem)
        UserService.update({
          id: this.editedItem.id,
          update: {
            firstName: this.editedItem.firstName,
            lastName: this.editedItem.lastName,
            email: this.editedItem.email,
            password: this.editedItem.password
          }
        })
      } else {
        this.users.push(this.editedItem)
      }
      this.close()
    }
  }
}
</script>

<style scoped>

</style>
