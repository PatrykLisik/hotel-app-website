<template>
  <v-dialog
    v-model="reserveDialog"
    max-width="500px"
    v-if="$store.state.role === 'User'"
  >
    <template v-slot:activator="{ on }">
      <v-btn color="primary" dark class="mb-2" flat v-on="on">Reserve Room</v-btn>
    </template>
    <v-card>
      <v-card-title>
        <span class="headline">Reserve Room</span>
      </v-card-title>
      <v-card-text>
        <v-container grid-list-md>
          <v-layout row wrap>
            <v-flex xs12 lg6>
            <v-menu
              ref="menu1"
              v-model="menu1"
              :close-on-content-click="false"
              :nudge-right="40"
              lazy
              transition="scale-transition"
              offset-y
              full-width
              max-width="290px"
              min-width="290px"
            >
              <template v-slot:activator="{ on }">
                <v-text-field
                  v-model="dateFormatted"
                  label="Start Date"
                  hint="DD/MM/YYYY format"
                  persistent-hint
                  prepend-icon="event"
                  @blur="startDate = parseDate(dateFormatted)"
                  v-on="on"
                ></v-text-field>
              </template>
              <v-date-picker v-model="startDate" no-title @input="menu1 = false"></v-date-picker>
            </v-menu>
            </v-flex>
            <v-flex xs12 lg6>
            <v-menu
              ref="menu2"
              v-model="menu2"
              :close-on-content-click="false"
              :nudge-right="40"
              lazy
              transition="scale-transition"
              offset-y
              full-width
              max-width="290px"
              min-width="290px"
            >
              <template v-slot:activator="{ on }">
                <v-text-field
                  v-model=" endDateFormatted"
                  label="End Date"
                  hint="DD/MM/YYYY format"
                  persistent-hint
                  prepend-icon="event"
                  @blur=" endDate = parseDate(endDateFormatted)"
                  v-on="on"
                ></v-text-field>
              </template>
              <v-date-picker
                v-model="endDate"
                no-title
                @input="menu2 = false"
                :min = "startDate"
              />
            </v-menu>
            </v-flex>
          </v-layout>
        </v-container>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: 'ReserveRoomDialog',
  data: vm => ({
    startDate: new Date().toISOString().substr(0, 10),
    dateFormatted: vm.formatDate(new Date().toISOString().substr(0, 10)),
    endDate: new Date().toISOString().substr(0, 10),
    endDateFormatted: vm.formatDate(new Date().toISOString().substr(0, 10)),
    menu1: false,
    menu2: false
  }),

  computed: {
    computedDateFormatted () {
      return this.formatDate(this.startDate)
    },
    computedEndDateFormatted () {
      return this.formatDate(this.endDate)
    }
  },

  watch: {
    startDate (val) {
      this.dateFormatted = this.formatDate(this.startDate)
    },
    endDate (val) {
      this.endDateFormatted = this.formatDate(this.endDate)
    }
  },

  methods: {
    formatDate (date) {
      if (!date) return null

      const [year, month, day] = date.split('-')
      return `${day}/${month}/${year}`
    },
    parseDate (date) {
      if (!date) return null

      const [month, day, year] = date.split('/')
      return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`
    }
  }
}
</script>

<style scoped>

</style>