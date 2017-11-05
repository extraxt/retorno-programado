import Vue from 'vue'
import Vuex from 'vuex'

import paciente from './paciente'
import user from './user'
import compartilhado from './compartilhado'
import meetup from './meetup'

Vue.use(Vuex)

export const store = new Vuex.Store({
  modules: {
    compartilhado,
    user: user,
    paciente: paciente,
    meetup: meetup
  }
})
