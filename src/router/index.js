import Vue from 'vue'
import Router from 'vue-router'
import Register from '@/components/Register'
import Login from '@/components/Login'
import Rooms from '@/components/Rooms'
import AllUsers from '@/components/AllUsers'
import UserSettings from '@/components/UserSettings'
import Reservation from '@/components/ReservationView'
import Invoices from '@/components/Invoices'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/register',
      name: 'Register',
      component: Register
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/',
      name: 'Rooms',
      component: Rooms
    },
    {
      path: '/settings',
      name: 'Settings',
      component: UserSettings
    },
    {
      path: '/allUsers',
      name: 'AllUsers',
      component: AllUsers
    },
    {
      path: '/reservations',
      name: 'Reservation',
      component: Reservation
    },
    {
      path: '/invoices',
      name: 'Invoices',
      component: Invoices
    }
  ]
})
