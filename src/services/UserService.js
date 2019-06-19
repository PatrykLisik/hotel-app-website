import Api from './Api'

export default {
  getAll () {
    return Api().get('user/all')
  },
  getUser (id) {
    return Api().get('user', id)
  },
  update (data) {
    return Api().update('user', data)
  },
  getRoles () {
    return Api().get('user/roles')
  }
}
