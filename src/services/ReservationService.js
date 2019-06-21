import Api from './Api'

export default {
  getOne (data) {
    return Api().get('service', data)
  },
  getAll () {
    return Api().get('service/all')
  },
  create (data) {
    return Api().post('service', data)
  },
  update (data) {
    return Api().put('service', data)
  },
  delete (id) {
    return Api().delete('service', id)
  },
  getReservationsOfRoom (id) {
    return Api().get('service/room', id)
  }

}
