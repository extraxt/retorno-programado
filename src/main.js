import Vue from 'vue'
import Vuetify from 'vuetify'
import App from './App'
import * as firebase from 'firebase'
import router from './router'
import { store } from './store'
import DateFilter from './filters/date'
import AlertCmp from './components/Shared/Alert'
import SignIn from './components/User/Signin'
import SignUp from './components/User/Signup'

Vue.use(Vuetify)
Vue.config.productionTip = false

Vue.filter('date', DateFilter)
Vue.component('app-alert', AlertCmp)
Vue.component('app-sigin', SignIn)
Vue.component('app-signup', SignUp)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App),
  created () {
    firebase.initializeApp({
      apiKey: 'AIzaSyBLHosB9SR82wsHmfgaJfKfg1q5nEbv8fk',
      authDomain: 'retorno-programado.firebaseapp.com',
      databaseURL: 'https://retorno-programado.firebaseio.com',
      projectId: 'retorno-programado',
      storageBucket: 'retorno-programado.appspot.com'
    })
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.$store.dispatch('autoSignIn', user)
        this.$store.dispatch('todosPacientes')
        this.$store.dispatch('todasClinicas')
      }
    })
  }
})
