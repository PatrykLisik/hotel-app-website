import Api from './Api'

export default {
  getOne (data) {
    return Api().get('reservation', data)
  },
  getAll () {
    return Api().get('reservation/all')
  },
  create (data) {
    return Api().post('reservation', data)
  },
  update (data) {
    return Api().put('reservation', data)
  },
  delete (id) {
    return Api().delete('reservation', id)
  },
  getReservationsOfRoom (id) {
    return Api().get('reservation/room', {params: id})
  }

}
