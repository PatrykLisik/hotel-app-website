<template>
  <div>
    <h1 class="heading grey--text">Rooms</h1>
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
          <v-flex xs12 sm6 md4 lg3>
            <v-card>
              <v-card-title
                ><h4>{{ props.item.type }}</h4></v-card-title
              >
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
    bool2Icon (bool) {
      if (bool) {
        return 'check'
      }
      return 'canacel'
    }
  },
  data: () => {
    return {
      rowsPerPageItems: [4, 8, 12],
      pagination: {
        rowsPerPage: 4
      },
      items: [
        {
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
  }
}
</script>

<style scoped></style>
