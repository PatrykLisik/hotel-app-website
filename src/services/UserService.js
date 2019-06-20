import Api from './Api'

export default {
  getAll () {
    return Api().get('user/all')
  },
  getUser (id) {
    return Api().get('user', id)
  },
  update (data) {
    return Api().put('user', data)
  },
  getRoles () {
    return Api().get('user/roles')
  },
  create (data) {
    return Api().post('user', data)
  },
  delete (data) {
    return Api().delete('user', { data: data })
  }
}
