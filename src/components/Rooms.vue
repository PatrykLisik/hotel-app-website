<template>
  <div>
    <page-title name="Rooms" />
    <v-dialog
      v-model="dialog"
      max-width="500px"
      v-if="$store.state.role === 'Admin' || $store.state.role === 'Manager'"
    >
      <template v-slot:activator="{ on }">
        <v-btn color="primary" dark class="mb-2" v-on="on">New Room</v-btn>
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
                  v-model="editedItem.number"
                  label="Number"
                  v-validate="'required|numeric|integer|min:1'"
                  :error-messages="errors.collect('Number')"
                  data-vv-name="Number"
                >
                </v-text-field>
              </v-flex>
              <v-flex xs12 sm6 md4>
                <v-text-field
                  v-model="editedItem.floor"
                  label="Floor"
                  v-validate="'required|numeric|integer|min:0'"
                  :error-messages="errors.collect('Floor')"
                  data-vv-name="Floor"
                >
                </v-text-field>
              </v-flex>
              <v-flex xs12 sm6 md4>
                <v-text-field
                  v-model="editedItem.peopleNumber"
                  label="People number"
                  v-validate="'required|numeric|integer|min:1'"
                  :error-messages="errors.collect('People number')"
                  data-vv-name="People number"
                ></v-text-field>
              </v-flex>
              <v-flex xs12 sm6 md4>
                <v-text-field
                  v-model="editedItem.type"
                  label="type"
                  v-validate="'required|min:2'"
                  :error-messages="errors.collect('type')"
                  data-vv-name="type"
                ></v-text-field>
              </v-flex>
              <v-flex xs12 sm6 md4>
                <v-text-field
                  v-model="editedItem.roomEquipment.bedNumber"
                  label="Bed number"
                  v-validate="'required|numeric|integer|min:1'"
                  :error-messages="errors.collect('Bed number')"
                  data-vv-name="Bed number"
                ></v-text-field>
              </v-flex>
              <v-flex xs12 sm8 md6>
                <v-checkbox
                  v-model="editedItem.roomEquipment.teapot"
                  label="teapot"
                ></v-checkbox>
              </v-flex>
              <v-flex xs12 sm8 md6>
                <v-checkbox v-model="editedItem.tv" label="tv"></v-checkbox>
              </v-flex>
              <v-flex xs12 sm8 md6>
                <v-checkbox
                  v-model="editedItem.roomEquipment.balcony"
                  label="balcony"
                ></v-checkbox>
              </v-flex>
              <v-flex xs12 sm8 md6>
                <v-checkbox
                  v-model="editedItem.roomEquipment.fridge"
                  label="fridge"
                ></v-checkbox>
              </v-flex>
              <v-flex xs12 sm8 md6>
                <v-checkbox
                  v-model="editedItem.roomEquipment.freeBeverages"
                  label="freeBeverages"
                ></v-checkbox>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="error" @click="close">Cancel</v-btn>
          <v-btn color="primary" :disabled="errors.any()" @click="save"
            >Save</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-container fluid grid-list-md>
      <v-data-iterator
        :items="items"
        :rows-per-page-items="rowsPerPageItems"
        :pagination.sync="pagination"
        content-tag="v-layout"
        row
        wrap
      >
        <template v-slot:item="props">
          <v-flex xs12 sm6 md4 lg2>
            <v-card>
              <v-card-title>
                <h4>{{ props.item.type }}</h4>
                <v-spacer></v-spacer>
                <v-icon
                  small
                  class="mr-2"
                  @click="editItem(props.item)"
                  v-if="
                    $store.state.role === 'Admin' ||
                      $store.state.role === 'Manager'
                  "
                >
                  edit
                </v-icon>
                <v-icon
                  small
                  @click="deleteItem(props.item)"
                  v-if="
                    $store.state.role === 'Admin' ||
                      $store.state.role === 'Manager'
                  "
                >
                  delete
                </v-icon>
              </v-card-title>
              <v-divider></v-divider>
              <v-list dense>
                <v-list-tile>
                  <v-list-tile-content>Number:</v-list-tile-content>
                  <v-list-tile-content class="align-end">{{
                    props.item.number
                  }}</v-list-tile-content>
                </v-list-tile>
                <v-list-tile>
                  <v-list-tile-content>Floor:</v-list-tile-content>
                  <v-list-tile-content class="align-end">{{
                    props.item.floor
                  }}</v-list-tile-content>
                </v-list-tile>
                <v-list-tile>
                  <v-list-tile-content>People number:</v-list-tile-content>
                  <v-list-tile-content class="align-end">{{
                    props.item.peopleNumber
                  }}</v-list-tile-content>
                </v-list-tile>
                <v-list-tile>
                  <v-list-tile-content>Bed number:</v-list-tile-content>
                  <v-list-tile-content class="align-end">{{
                    props.item.roomEquipment.bedNumber
                  }}</v-list-tile-content>
                </v-list-tile>
                <v-list-tile>
                  <v-list-tile-content>Teapot:</v-list-tile-content>
                  <v-list-tile-content class="align-end">
                    <span v-if="!props.item.roomEquipment.teapot">
                      <v-icon color="error">cancel</v-icon>
                    </span>
                    <span v-if="props.item.roomEquipment.teapot">
                      <v-icon color="primary">check</v-icon>
                    </span>
                  </v-list-tile-content>
                </v-list-tile>
                <v-list-tile>
                  <v-list-tile-content>TV:</v-list-tile-content>
                  <v-list-tile-content class="align-end">
                    <span v-if="!props.item.roomEquipment.tv">
                      <v-icon color="error">cancel</v-icon>
                    </span>
                    <span v-if="props.item.roomEquipment.tv">
                      <v-icon color="primary">check</v-icon>
                    </span>
                  </v-list-tile-content>
                </v-list-tile>
                <v-list-tile>
                  <v-list-tile-content>Balcony:</v-list-tile-content>
                  <v-list-tile-content class="align-end">
                    <span v-if="!props.item.roomEquipment.balcony">
                      <v-icon color="error">cancel</v-icon>
                    </span>
                    <span v-if="props.item.roomEquipment.balcony">
                      <v-icon color="primary">check</v-icon>
                    </span>
                  </v-list-tile-content>
                </v-list-tile>
                <v-list-tile>
                  <v-list-tile-content>Fridge:</v-list-tile-content>
                  <v-list-tile-content class="align-end">
                    <span v-if="!props.item.roomEquipment.fridge">
                      <v-icon color="error">cancel</v-icon>
                    </span>
                    <span v-if="props.item.roomEquipment.fridge">
                      <v-icon color="primary">check</v-icon>
                    </span>
                  </v-list-tile-content>
                </v-list-tile>
                <v-list-tile>
                  <v-list-tile-content>Free beverages:</v-list-tile-content>
                  <v-list-tile-content class="align-end">
                    <span v-if="!props.item.roomEquipment.freeBeverages">
                      <v-icon color="error">cancel</v-icon>
                    </span>
                    <span v-if="props.item.roomEquipment.freeBeverages">
                      <v-icon color="primary">check</v-icon>
                    </span>
                  </v-list-tile-content>
                </v-list-tile>
              </v-list>
              <div class="text-xs-center" v-if="$store.state.role === 'User'">
                <v-divider></v-divider>
                <v-btn color="primary">Reserve</v-btn>
              </div>
            </v-card>
          </v-flex>
        </template>
      </v-data-iterator>
    </v-container>
  </div>
</template>

<script>
import PageTitle from './PageTitle'
import RoomService from '../services/RoomService'

export default {
  name: 'Rooms',
  components: { PageTitle },
  async created () {
    await this.initialize()
  },
  data: () => {
    return {
      dialog: false,
      rowsPerPageItems: [6, 12, 18, {'text': '$vuetify.dataIterator.rowsPerPageAll', 'value': -1}],
      pagination: {
        rowsPerPage: 6
      },
      defaultItem: {
        id: -1,
        number: '',
        floor: '',
        peopleNumber: '',
        type: '',
        roomEquipment: { bedNumber: '',
          teapot: false,
          tv: false,
          balcony: false,
          fridge: false,
          freeBeverages: false}
      },
      editedIndex: -1,
      editedItem: {
        id: -1,
        number: '',
        floor: '',
        peopleNumber: '',
        type: '',
        roomEquipment: { bedNumber: '',
          teapot: false,
          tv: false,
          balcony: false,
          fridge: false,
          freeBeverages: false}
      },
      items: []
    }
  },
  methods: {
    editItem (item) {
      console.log(item)
      this.editedIndex = this.items.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialog = true
    },

    deleteItem (item) {
      const index = this.items.indexOf(item)
      confirm('Are you sure you want to delete this item?') &&
        this.items.splice(index, 1)
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
        Object.assign(this.items[this.editedIndex], this.editedItem)
      } else {
        this.items.push(this.editedItem)
      }
      this.close()
    },
    async initialize () {
      const response = await RoomService.getAll()
      this.items = response.data
    }
  },

  computed: {
    formTitle () {
      return this.editedIndex === -1 ? 'New Room' : 'Edit Room'
    }
  },

  watch: {
    dialog (val) {
      val || this.close()
    }
  }
}
</script>

<style scoped></style>
