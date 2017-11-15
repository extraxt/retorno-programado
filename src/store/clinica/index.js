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
        obs: payload.clinobs,
        ativo: true
      }
      firebase.database().ref(usuarioId + '/clinicas').push(dadosClinica)
      .then(data => {
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
            obs: obj[key].obs,
            ativo: obj[key].ativo
          })
        }
        commit('todasClinicas', todasClinicas)
        commit('setLoading', false)
      })
      .catch((error) => {
        console.log(error)
        commit('setLoading', false)
      })
    },
    editarClinica ({commit, getters}, payload) {
      commit('setLoading', true)
      const usuarioId = getters.user.id
      const updateObj = {}
      if (payload.nome !== undefined) {
        updateObj.nome = payload.nome
      }
      if (payload.telefone1 !== undefined) {
        updateObj.telefone1 = payload.telefone1
      }
      if (payload.teletipo1 !== undefined) {
        updateObj.teletipo1 = payload.teletipo1
      }
      if (payload.telefone2 !== undefined) {
        updateObj.telefone2 = payload.telefone2
      }
      if (payload.teletipo2 !== undefined) {
        updateObj.teletipo2 = payload.teletipo2
      }
      if (payload.email !== undefined) {
        updateObj.email = payload.email
      }
      if (payload.endereco !== undefined) {
        updateObj.endereco = payload.endereco
      }
      if (payload.cidade !== undefined) {
        updateObj.cidade = payload.cidade
      }
      if (payload.estado !== undefined) {
        updateObj.estado = payload.estado
      }
      if (payload.obs !== undefined) {
        updateObj.obs = payload.obs
      }
      firebase.database().ref(usuarioId + '/clinicas').child(payload.id).update(updateObj)
      .then(() => {
        commit('setLoading', false)
      })
      .catch(error => {
        console.log(error)
        commit('setLoading', false)
      })
    },
    desativarClinica ({ commit, getters }, payload) {
      commit('setLoading', true)
      const usuarioId = getters.user.id
      const updateObj = {}
      updateObj.ativo = false
      firebase.database().ref(usuarioId + '/clinicas').child(payload).update(updateObj)
      .then(() => {
        commit('setLoading', false)
      })
      .catch(error => {
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
    todasClinicasSemDesativados (state) {
      const todasClinicasTodas = state.todasClinicas.sort((clinicaA, clinicaB) => {
        return clinicaA.nome > clinicaB.nome
      })
      const array = []
      for (let key in todasClinicasTodas) {
        if (todasClinicasTodas[key].ativo) {
          array.push(todasClinicasTodas[key])
        }
      }
      return array
    },
    unicaClinica (state) {
      return (clinicaId) => {
        return state.todasClinicas.find((clinica) => {
          return clinica.id === clinicaId
        })
      }
    },
    filtradoClinicas (state) {
      const obj = state.todasClinicas.sort((clinicaA, clinicaB) => {
        return clinicaA.nome > clinicaB.nome
      })
      const array = []
      for (let key in obj) {
        let ativo = 'DESATIVADA'
        if (obj[key].ativo) {
          array.push({
            text: obj[key].nome + ' ( ' + obj[key].cidade + '/' + obj[key].estado + ' ) ',
            value: obj[key].id
          })
        } else {
          array.push({
            text: obj[key].nome + ' ( ' + obj[key].cidade + '/' + obj[key].estado + ' ) ' + ativo,
            value: obj[key].id
          })
        }
      }
      return array
    },
    filtradoClinicasSemDesativados (state) {
      const obj = state.todasClinicas.sort((clinicaA, clinicaB) => {
        return clinicaA.nome > clinicaB.nome
      })
      const array = []
      for (let key in obj) {
        if (obj[key].ativo) {
          array.push({
            text: obj[key].nome + ' ( ' + obj[key].cidade + '/' + obj[key].estado + ' ) ',
            value: obj[key].id
          })
        }
      }
      return array
    }
  }
}
