<template>
  <div>
    <PageTitle name="Reservations" />
    <v-toolbar flat color="white">
      <v-dialog v-model="dialog" max-width="500px">
        <template v-slot:activator="{ on }">
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
                    v-model="editedItem.name"
                    label="Dessert name"
                  ></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md4>
                  <v-text-field
                    v-model="editedItem.calories"
                    label="Calories"
                  ></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md4>
                  <v-text-field
                    v-model="editedItem.fat"
                    label="Fat (g)"
                  ></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md4>
                  <v-text-field
                    v-model="editedItem.carbs"
                    label="Carbs (g)"
                  ></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md4>
                  <v-text-field
                    v-model="editedItem.protein"
                    label="Protein (g)"
                  ></v-text-field>
                </v-flex>
              </v-layout>
            </v-container>
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" flat @click="close">Cancel</v-btn>
            <v-btn color="blue darken-1" flat @click="save">Save</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-toolbar>
    <v-data-table
      v-model="selected"
      :headers="headers"
      :items="reservations"
      item-key="id"
      class="elevation-1"
      select-all
    >
      <template v-slot:items="props">
        <td  v-if="props.item.invoiceId === null">
          <v-checkbox v-model="props.selected" primary></v-checkbox>
        </td>
        <td  v-if="props.item.invoiceId >0">
          <v-checkbox disabled primary ></v-checkbox>
        </td>
        <td class="text-xs">{{ props.item.startDate }}</td>
        <td class="text-xs">{{ props.item.endDate }}</td>
        <td class="text-xs">{{ props.item.roomId }}</td>
        <td class="text-xs">
          <span v-if="props.item.invoiceId === null">
            <v-icon color="error">cancel</v-icon>
          </span>
          <span v-if="!props.item.invoiceId === null">
            <v-icon color="primary">check</v-icon>
          </span>
        </td>
        <td class="justify-center layout px-0">
          <v-icon small @click="deleteItem(props.item)">
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
import ReservationService from '../services/ReservationService'
import PageTitle from './PageTitle'

export default {
  name: 'ReservationView',
  components: { PageTitle },
  data: () => ({
    dialog: false,
    selected: [],
    headers: [
      {
        text: 'Start Date',
        align: 'left',
        value: 'startDate'
      },
      { text: 'End Date', value: 'endDate' },
      { text: 'Room', value: 'roomId' },
      { text: 'Paid', value: 'invoiceId' }
    ],
    reservations: [],
    editedIndex: -1,
    editedItem: {
      id: -1,
      startDate: null,
      endDate: null,
      clientId: null,
      roomId: -1,
      invoiceId: null
    },
    defaultItem: {
      id: -1,
      startDate: null,
      endDate: null,
      clientId: null,
      roomId: -1,
      invoiceId: null
    }
  }),

  computed: {
    formTitle () {
      return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
    }
  },

  watch: {
    dialog (val) {
      val || this.close()
    }
  },

  async created () {
    await this.initialize()
  },

  methods: {
    async initialize () {
      const Response = await ReservationService.getReservationsOfClient({
        clientId: this.$store.state.id
      })
      this.reservations = Response.data
    },

    editItem (item) {
      this.editedIndex = this.reservations.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialog = true
    },

    async deleteItem (item) {
      const index = this.reservations.indexOf(item)
      confirm('Are you sure you want to delete this item?') &&
        this.reservations.splice(index, 1)
      await ReservationService.delete({id: item.id})
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
        Object.assign(this.reservations[this.editedIndex], this.editedItem)
      } else {
        this.reservations.push(this.editedItem)
      }
      this.close()
    }
  }
}
</script>

<style scoped></style>
