import * as firebase from 'firebase'

export default {
  state: {
    todasClinicas: []
  },
  mutations: {
    todasClinicas (state, payload) {
      state.todasClinicas = payload
    }
  },
  actions: {
    criarClinica ({commit, getters}, payload) {
      commit('setLoading', true)
      const usuarioId = getters.user.id
      const dadosClinica = {
        usuarioId: usuarioId,
        nome: payload.clinnome,
        telefone1: payload.clintelefone1,
        teletipo1: payload.clinteletipo1,
        telefone2: payload.clintelefone2,
        teletipo2: payload.clinteletipo2,
        email: payload.clinemail,
        endereco: payload.clinendereco,
        cidade: payload.clincidade,
        estado: payload.clinestado,
        obs: payload.clinobs
      }
      firebase.database().ref(usuarioId + '/clinicas').push(dadosClinica)
      .then(data => {
        console.log('Deu certo o registro!')
        console.log(data)
        commit('setLoading', false)
      }
      )
      .catch(error => {
        console.log(error)
        commit('setLoading', false)
      }
      )
    },
    todasClinicas ({commit, getters}) {
      commit('setLoading', true)
      const usuarioId = getters.user.id
      firebase.database().ref(usuarioId + '/clinicas').once('value')
      .then((data) => {
        const todasClinicas = []
        const obj = data.val()
        for (let key in obj) {
          todasClinicas.push({
            id: key,
            nome: obj[key].nome,
            telefone1: obj[key].telefone1,
            teletipo1: obj[key].teletipo1,
            telefone2: obj[key].telefone2,
            teletipo2: obj[key].teletipo2,
            email: obj[key].email,
            endereco: obj[key].endereco,
            cidade: obj[key].cidade,
            estado: obj[key].estado,
            obs: obj[key].obs
          })
        }
        commit('todasClinicas', todasClinicas)
        commit('setLoading', false)
      })
      .catch((error) => {
        console.log(error)
        commit('setLoading', false)
      })
    }
  },
  getters: {
    todasClinicas (state) {
      return state.todasClinicas.sort((clinicaA, clinicaB) => {
        return clinicaA.nome > clinicaB.nome
      })
    },
    filtradoClinicas (state) {
      const obj = state.todasClinicas.sort((clinicaA, clinicaB) => {
        return clinicaA.nome > clinicaB.nome
      })
      const array = []
      for (let key in obj) {
        array.push({
          text: obj[key].nome + ' ( ' + obj[key].cidade + ' )',
          value: obj[key].id
        })
      }
      return array
    }
  }
}
