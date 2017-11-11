import Vue from 'vue'
import Vuex from 'vuex'

import paciente from './paciente'
import user from './user'
import clinica from './clinica'
import retorno from './retorno'
import compartilhado from './compartilhado'
import meetup from './meetup'

Vue.use(Vuex)

export const store = new Vuex.Store({
  modules: {
    compartilhado,
    user: user,
    clinica: clinica,
    paciente: paciente,
    retorno: retorno,
    meetup: meetup
  }
})
