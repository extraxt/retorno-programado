import * as firebase from 'firebase'

export default {
  state: {
    todosRetornos: []
  },
  mutations: {
    todosRetornos (state, payload) {
      state.todosRetornos = payload
    }
  },
  actions: {
    criarRetorno ({commit, getters}, payload) {
      commit('setLoading', true)
      const usuarioId = getters.user.id
      const dadosRetorno = {
        pacid: payload.pacid,
        tempo: payload.tempo,
        especialidade: payload.especialidade,
        risco: payload.risco,
        dentista: payload.dentista,
        obs: payload.obs,
        criacao: payload.criacao
      }
      firebase.database().ref(usuarioId + '/retornos').push(dadosRetorno)
      .then(data => {
        commit('setLoading', false)
        console.log('Criou Retorno!')
      })
      .catch(error => {
        console.log(error)
        commit('setLoading', false)
      })
    },
    todosRetornos ({commit, getters}) {
      commit('setLoading', true)
      const usuarioId = getters.user.id
      firebase.database().ref(usuarioId + '/retornos').once('value')
      .then((data) => {
        const todosRetornos = []
        const obj = data.val()
        for (let key in obj) {
          todosRetornos.push({
            id: key,
            tit: obj[key].tit,
            pacid: obj[key].pacid,
            tempo: obj[key].tempo,
            especialidade: obj[key].especialidade,
            risco: obj[key].risco,
            dentista: obj[key].dentista,
            obs: obj[key].obs,
            criacao: obj[key].criacao
          })
        }
        commit('todosRetornos', todosRetornos)
        commit('setLoading', false)
      })
      .catch((error) => {
        console.log(error)
        commit('setLoading', false)
      })
    },
    editarRetorno ({commit, getters}, payload) {
      commit('setLoading', true)
      const usuarioId = getters.user.id
      const updateObj = {}
      if (payload.tit) {
        updateObj.tit = payload.tit
      }
      if (payload.pacid) {
        updateObj.pacid = payload.pacid
      }
      if (payload.tempo) {
        updateObj.tempo = payload.tempo
      }
      if (payload.especialidade) {
        updateObj.especialidade = payload.especialidade
      }
      if (payload.risco) {
        updateObj.risco = payload.risco
      }
      if (payload.dentista) {
        updateObj.dentista = payload.dentista
      }
      if (payload.obs) {
        updateObj.obs = payload.obs
      }
      if (payload.criacao) {
        updateObj.criacao = payload.criacao
      }
      firebase.database().ref(usuarioId + '/retornos').child(payload.id).update(updateObj)
      .then(() => {
        commit('setLoading', false)
        console.log('Editou o Retorno!')
      })
      .catch(error => {
        console.log(error)
        commit('setLoading', false)
      })
    }
  },
  getters: {
    todosRetornos (state) {
      return state.todosRetornos.sort((retornoA, retornoB) => {
        return retornoA.nome > retornoB.nome
      })
    },
    unicoRetorno (state) {
      return (retornoId) => {
        return state.todosRetornos.find((retorno) => {
          return retorno.id === retornoId
        })
      }
    },
    filtradoRetornos (state) {
      const obj = state.todosRetornos.sort((retornoA, retornoB) => {
        return retornoA.nome > retornoB.nome
      })
      const array = []
      for (let key in obj) {
        array.push({
          text: obj[key].nome + ' ( ' + obj[key].especialidade + ' )',
          value: obj[key].id
        })
      }
      return array
    }
  }
}
