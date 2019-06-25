<template>
  <div>
    <PageTitle name="Invoices" />
    <v-data-table
      :headers="headers"
      :items="invoices"
      class="elevation-1"
    >
      <template v-slot:items="props">
        <td class="text-xs">{{ props.item.date }}</td>
        <td class="text-xs">{{ props.item.value }}</td>
        <td class="text-xs">{{ props.item.payment_method }}</td>
        <td class="text-xs">{{ props.item.state }}</td>
        <td class="justify-center layout px-0">
         <v-btn color="primary" flat @click="pay(props.item)" v-if="$store.state.role === 'User'">Pay</v-btn>
          <v-icon
            v-if="$store.state.role === 'Admin'"
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
import InvoiceService from '../services/InvoiceService'
import PageTitle from './PageTitle'

export default {
  name: 'Invoices',
  components: { PageTitle },
  data: () => ({
    dialog: false,
    headers: [
      { text: 'Date of creation', value: 'date' },
      { text: 'Value', value: 'fat' },
      { text: 'Payment method)', value: 'payment_method' },
      { text: 'State', value: 'state' }
    ],
    invoices: [],
    editedIndex: -1,
    editedItem: {
      id: -1,
      date: null,
      value: null,
      payment_method: null,
      state: 'not paid'
    },
    defaultItem: {
      id: -1,
      date: null,
      value: null,
      payment_method: null,
      state: 'not paid'
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
    this.initialize()
  },

  methods: {
    async pay (item) {
      InvoiceService.pay({
        id: item.id,
        paymentMethod: 'card'
      })
      this.initialize()
    },
    async initialize () {
      const Response = await InvoiceService.getInvoicesOfClient({
        clientId: this.$store.state.id
      })
      this.invoices = Response.data
    },

    editItem (item) {
      this.editedIndex = this.invoices.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialog = true
    },

    async deleteItem (item) {
      const index = this.invoices.indexOf(item)
      confirm('Are you sure you want to delete this item?') && this.invoices.splice(index, 1)
      await InvoiceService.delete({ id: item.id })
      this.initialize()
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
        Object.assign(this.invoices[this.editedIndex], this.editedItem)
      } else {
        this.invoices.push(this.editedItem)
      }
      this.close()
    }
  }
}
</script>

<style scoped>

</style>
