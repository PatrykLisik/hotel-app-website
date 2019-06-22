import Api from './Api'

export default {
  getOne (data) {
    return Api().get('invoice', data)
  },
  getAll () {
    return Api().get('invoice/all')
  },
  create (data) {
    return Api().post('invoice', data)
  },
  update (data) {
    return Api().put('invoice', data)
  },
  delete (id) {
    return Api().delete('invoice', { data: id })
  },
  pay (data) {
    return Api().post('invoice/pay', data)
  },
  getInvoicesOfClient (id) {
    return Api().get('invoice/client', {params: id})
  }

}
