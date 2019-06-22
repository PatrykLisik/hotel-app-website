import Api from './Api'

export default {
  getOne (data) {
    return Api().get('room', data)
  },
  getAll () {
    return Api().get('room/all')
  },
  create (data) {
    return Api().post('room', data)
  },
  update (data) {
    return Api().put('room', data)
  },
  delete (id) {
    return Api().delete('room', { data: id })
  }

}
