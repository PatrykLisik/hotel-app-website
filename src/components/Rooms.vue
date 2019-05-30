<template>
  <div>
    <h1 class="heading grey--text">Rooms</h1>
    <v-dialog v-model="dialog" max-width="500px">
      <template v-slot:activator="{ on }">
        <v-btn color="primary" dark class="mb-2" v-on="on">New Item</v-btn>
      </template>
      <v-card>
        <v-card-title>
          <span class="headline">{{ formTitle }}</span>
        </v-card-title>

        <v-card-text>
          <v-container grid-list-md>
            <v-layout wrap>
              <v-flex xs12 sm6 md4>
                <v-text-field v-model="editedItem.number" label="Number"></v-text-field>
              </v-flex>
              <v-flex xs12 sm6 md4>
                <v-text-field v-model="editedItem.floor" label="Floor"></v-text-field>
              </v-flex>
              <v-flex xs12 sm6 md4>
                <v-text-field v-model="editedItem.peopleNumber" label="People number"></v-text-field>
              </v-flex>
              <v-flex xs12 sm6 md4>
                <v-text-field v-model="editedItem.type" label="type"></v-text-field>
              </v-flex>
              <v-flex xs12 sm6 md4>
                <v-text-field v-model="editedItem.bedNumber" label="Bed number"></v-text-field>
              </v-flex>
              <v-flex xs12 sm8 md6>
                <v-checkbox v-model="editedItem.teapot" label="teapot"></v-checkbox>
              </v-flex>
              <v-flex xs12 sm8 md6>
                <v-checkbox v-model="editedItem.tv" label="tv"></v-checkbox>
              </v-flex>
              <v-flex xs12 sm8 md6>
                <v-checkbox v-model="editedItem.balcony" label="balcony"></v-checkbox>
              </v-flex>
              <v-flex xs12 sm8 md6>
                <v-checkbox v-model="editedItem.fridge" label="fridge"></v-checkbox>
              </v-flex>
              <v-flex xs12 sm8 md6>
                <v-checkbox v-model="editedItem.freeBeverages" label="freeBeverages"></v-checkbox>
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
                >
                  edit
                </v-icon>
                <v-icon
                  small
                  @click="deleteItem(props.item)"
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
                    props.item.bedNumber
                  }}</v-list-tile-content>
                </v-list-tile>
                <v-list-tile>
                  <v-list-tile-content>Teapot:</v-list-tile-content>
                  <v-list-tile-content class="align-end">
                    <span v-if="!props.item.teapot">
                      <v-icon color="error">cancel</v-icon>
                    </span>
                    <span v-if="props.item.teapot">
                      <v-icon color="primary">check</v-icon>
                    </span>
                  </v-list-tile-content>
                </v-list-tile>
                <v-list-tile>
                  <v-list-tile-content>TV:</v-list-tile-content>
                  <v-list-tile-content class="align-end">
                    <span v-if="!props.item.tv">
                      <v-icon color="error">cancel</v-icon>
                    </span>
                    <span v-if="props.item.tv">
                      <v-icon color="primary">check</v-icon>
                    </span>
                  </v-list-tile-content>
                </v-list-tile>
                <v-list-tile>
                  <v-list-tile-content>Balcony:</v-list-tile-content>
                  <v-list-tile-content class="align-end">
                    <span v-if="!props.item.balcony">
                      <v-icon color="error">cancel</v-icon>
                    </span>
                    <span v-if="props.item.balcony">
                      <v-icon color="primary">check</v-icon>
                    </span>
                  </v-list-tile-content>
                </v-list-tile>
                <v-list-tile>
                  <v-list-tile-content>Fridge:</v-list-tile-content>
                  <v-list-tile-content class="align-end">
                    <span v-if="!props.item.fridge">
                      <v-icon color="error">cancel</v-icon>
                    </span>
                    <span v-if="props.item.fridge">
                      <v-icon color="primary">check</v-icon>
                    </span>
                  </v-list-tile-content>
                </v-list-tile>
                <v-list-tile>
                  <v-list-tile-content>Free beverages:</v-list-tile-content>
                  <v-list-tile-content class="align-end">
                    <span v-if="!props.item.freeBeverages">
                      <v-icon color="error">cancel</v-icon>
                    </span>
                    <span v-if="props.item.freeBeverages">
                      <v-icon color="primary">check</v-icon>
                    </span>
                  </v-list-tile-content>
                </v-list-tile>
              </v-list>
            </v-card>
          </v-flex>
        </template>
      </v-data-iterator>
    </v-container>
  </div>
</template>

<script>
export default {
  name: 'Rooms',
  methods: {
    editItem (item) {
      console.log(item)
      this.editedIndex = this.items.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialog = true
    },

    deleteItem (item) {
      const index = this.items.indexOf(item)
      confirm('Are you sure you want to delete this item?') && this.items.splice(index, 1)
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
        Object.assign(this.data[this.editedIndex], this.editedItem)
      } else {
        this.data.push(this.editedItem)
      }
      this.close()
    }
  },
  data: () => {
    return {
      dialog: false,
      rowsPerPageItems: [4, 8, 12],
      pagination: {
        rowsPerPage: 4
      },
      defaultItem: {
        id: 1,
        number: 1,
        floor: 2,
        peopleNumber: 2,
        type: 'Standard room',
        bedNumber: 1,
        teapot: true,
        tv: true,
        balcony: true,
        fridge: false,
        freeBeverages: false
      },
      editedIndex: -1,
      editedItem: {
        id: 1,
        number: 1,
        floor: 2,
        peopleNumber: 2,
        type: 'Standard room',
        bedNumber: 1,
        teapot: true,
        tv: true,
        balcony: true,
        fridge: false,
        freeBeverages: false
      },
      items: [
        {
          id: 1,
          number: 1,
          floor: 2,
          peopleNumber: 2,
          type: 'Standard room',
          bedNumber: 1,
          teapot: true,
          tv: true,
          balcony: true,
          fridge: false,
          freeBeverages: false
        }
      ]
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
