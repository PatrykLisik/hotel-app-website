<template>
  <v-navigation-drawer
    fixed
    clipped
    app
    v-if="$store.state.showSidebar"
    class="primary"
  >
    <v-list class="pt-0" dense>
      <v-list-tile>
        <v-list-tile-content>
          <v-list-tile-title class="white--text">
            <span class="font-weight-bold">{{$store.state.firstName}}</span>
            <span class="font-weight-bold">{{$store.state.lastName}}</span>
          </v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>

      <v-divider></v-divider>
      <v-list-tile
        v-for="link in this.list[$store.state.role]"
        :key="link.text"
        router
        :to="link.route"
      >
        <v-list-tile-action>
          <v-icon class="white--text">{{ link.icon }}</v-icon>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-content class="white--text">{{
            link.text
          }}</v-list-tile-content>
        </v-list-tile-content>
      </v-list-tile>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
export default {
  name: 'SideBar',
  data: () => {
    return {
      list: {
        User: [
          { icon: 'dashboard', text: 'Rooms', route: '/' },
          { icon: 'attach_money', text: 'Invoices', route: '/invoices' },
          { icon: 'date_range', text: 'Reservations', route: '/reservations' },
          { icon: 'settings', text: 'Manage Account', route: '/settings' }
        ],
        Admin: [
          { icon: 'dashboard', text: 'Rooms', route: '/' },
          { icon: 'attach_money', text: 'Invoices', route: '/invoices' },
          { icon: 'supervisor_account', text: 'Users', route: '/allUsers' },
          { icon: 'date_range', text: 'Reservations', route: '/allReservations' },
          { icon: 'settings', text: 'Manage Account', route: '/settings' }
        ],
        Manager: [
          { icon: 'dashboard', text: 'Rooms', route: '/' },
          { icon: 'attach_money', text: 'Invoices', route: '/allInvoices' },
          { icon: 'date_range', text: 'Reservations', route: '/allReservations' },
          { icon: 'settings', text: 'Manage Account', route: '/settings' }
        ]
      }
    }
  },
  props: {
    source: String
  }
}
</script>

<style scoped></style>
