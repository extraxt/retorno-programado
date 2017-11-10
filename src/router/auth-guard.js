import {store} from '../store'

export default (to, from, next) => {
  if (store.getters.user) {
    console.log('Aqui ta o usuario')
    console.log(store.getters.user)
    next()
  } else {
    console.log('Aqui ta o problema')
    console.log(store.getters.user)
    next('/')
  }
}
