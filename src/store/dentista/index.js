import * as firebase from 'firebase'

export default {
  state: {
    todosDentistas: []
  },
  mutations: {
    todosDentistas (state, payload) {
      payload.sort((DentistaA, DentistaB) => {
        return DentistaA.nome > DentistaB.nome
      })
      state.todosDentistas = payload
    }
  },
  actions: {
    criarDentista ({commit, getters}, payload) {
      commit('setLoading', true)
      const usuarioId = getters.user.id
      const dadosDentista = {
        usuarioId: usuarioId,
        nome: payload.dentnome,
        telefone1: payload.denttelefone1,
        teletipo1: payload.dentteletipo1,
        telefone2: payload.denttelefone2,
        teletipo2: payload.dentteletipo2,
        email: payload.dentemail,
        endereco: payload.dentendereco,
        cidade: payload.dentcidade,
        estado: payload.dentestado,
        obs: payload.dentobs,
        ativo: true
      }
      firebase.database().ref(usuarioId + '/dentistas').push(dadosDentista)
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
    todosDentistas ({commit, getters}) {
      commit('setLoading', true)
      const usuarioId = getters.user.id
      firebase.database().ref(usuarioId + '/dentistas').once('value')
      .then((data) => {
        const todosDentistas = []
        const obj = data.val()
        for (let key in obj) {
          todosDentistas.push({
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
        commit('todosDentistas', todosDentistas)
        commit('setLoading', false)
      })
      .catch((error) => {
        console.log(error)
        commit('setLoading', false)
      })
    },
    editarDentista ({commit, getters}, payload) {
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
      firebase.database().ref(usuarioId + '/dentistas').child(payload.id).update(updateObj)
      .then(() => {
        commit('setLoading', false)
      })
      .catch(error => {
        console.log(error)
        commit('setLoading', false)
      })
    },
    desativarDentista ({ commit, getters }, payload) {
      commit('setLoading', true)
      const usuarioId = getters.user.id
      const updateObj = {}
      updateObj.ativo = false
      firebase.database().ref(usuarioId + '/dentistas').child(payload).update(updateObj)
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
    todosDentistas (state) {
      return state.todosDentistas
    },
    todosDentistasSemDesativados (state) {
      const todosDentistasTodos = state.todosDentistas
      const semDesativados = []
      for (let key in todosDentistasTodos) {
        if (todosDentistasTodos[key].ativo) {
          semDesativados.push(todosDentistasTodos[key])
        }
      }
      return semDesativados
    },
    unicoDentista (state) {
      return (dentistaId) => {
        return state.todosDentistas.find((dentista) => {
          return dentista.id === dentistaId
        })
      }
    },
    filtradoDentistas (state) {
      const obj = state.todosDentistas
      const array = []
      for (let key in obj) {
        let ativo = 'DESATIVADO(A)'
        if (obj[key].ativo) {
          array.push({
            text: obj[key].nome,
            value: obj[key].id
          })
        } else {
          array.push({
            text: obj[key].nome + ' ' + ativo,
            value: obj[key].id
          })
        }
      }
      return array
    },
    filtradoDentistasSemDesativados (state) {
      const obj = state.todosDentistas
      const array = []
      for (let key in obj) {
        if (obj[key.ativo]) {
          array.push({
            text: obj[key].nome,
            value: obj[key].id
          })
        }
      }
      return array
    }
  }
}
