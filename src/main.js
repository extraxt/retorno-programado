import Vue from 'vue'
import Vuetify from 'vuetify'
import App from './App'
import * as firebase from 'firebase'
import router from './router'
import { store } from './store'
import DateFilter from './filters/date'
import AlertCmp from './components/Shared/Alert'
import NovoPaciente from './components/Pacientes/NovoPaciente'

Vue.use(Vuetify)
Vue.config.productionTip = false

Vue.filter('date', DateFilter)
Vue.component('app-alert', AlertCmp)
Vue.component('novo-paciente', NovoPaciente)

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
      }
    })
  }
})
