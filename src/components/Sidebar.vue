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
        v-for="link in this.list['User']"
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
          { icon: 'dashboard', text: 'Dashboard', route: '/' },
          { icon: 'chat', text: 'Send feedback', route: '/feedback' },
          { icon: 'attach_money', text: 'Invoices', route: '/invoices' },
          { icon: 'settings', text: 'Manage Account', route: '/settings' }
        ],
        Admin: [],
        Manager: []
      }
    }
  },
  props: {
    source: String
  }
}
</script>

<style scoped></style>
