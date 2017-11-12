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
        usuarioId: usuarioId,
        titulo: payload.tit,
        pacid: payload.pacid,
        datacadastro: payload.datacadastro,
        datavalidade: payload.datavalidade,
        tempo: payload.tempo,
        especialidade: payload.especialidade,
        risco: payload.risco,
        dentistaid: payload.dentistaid,
        clinicaid: payload.clinicaid,
        obs: payload.obs
      }
      firebase.database().ref(usuarioId + '/retornos').push(dadosRetorno)
      .then(data => {
        commit('setLoading', false)
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
            usuarioId: obj[key].usuarioId,
            titulo: obj[key].titulo,
            pacid: obj[key].pacid,
            datacadastro: obj[key].datacadastro,
            datavalidade: obj[key].datavalidade,
            tempo: obj[key].tempo,
            especialidade: obj[key].especialidade,
            risco: obj[key].risco,
            dentistaid: obj[key].dentistaid,
            clinicaid: obj[key].clinicaid,
            obs: obj[key].obs
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
      console.log('Entrou na Store')
      const usuarioId = getters.user.id
      const updateObj = {}
      if (payload.tit !== undefined) {
        updateObj.tit = payload.tit
      }
      if (payload.pacid !== undefined) {
        updateObj.pacid = payload.pacid
      }
      if (payload.datacadastro !== undefined) {
        updateObj.datacadastro = payload.datacadastro
      }
      if (payload.datavalidade !== undefined) {
        updateObj.datavalidade = payload.datavalidade
      }
      if (payload.tempo !== undefined) {
        updateObj.tempo = payload.tempo
      }
      if (payload.especialidade !== undefined) {
        updateObj.especialidade = payload.especialidade
      }
      if (payload.risco !== undefined) {
        updateObj.risco = payload.risco
      }
      if (payload.dentistaid !== undefined) {
        updateObj.dentistaid = payload.dentistaid
      }
      if (payload.clinicaid !== undefined) {
        updateObj.clinicaid = payload.clinicaid
      }
      if (payload.obs !== undefined) {
        updateObj.obs = payload.obs
      }
      firebase.database().ref(usuarioId + '/retornos').child(payload.id).update(updateObj)
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
    todosRetornos (state) {
      return state.todosRetornos.sort((retornoA, retornoB) => {
        return retornoA.datavalidade > retornoB.datavalidade
      })
    },
    unicoRetorno (state) {
      return (retornoId) => {
        return state.todosRetornos.find((retorno) => {
          return retorno.id === retornoId
        })
      }
    },
    filtradoRetornos (state, getters) {
      const obj = state.todosRetornos.sort((retornoA, retornoB) => {
        return retornoA.datavalidade > retornoB.datavalidade
      })
      const array = []
      for (let key in obj) {
        const nomepaciente = getters.unicoPaciente(obj[key].pacid).nome
        array.push({
          id: obj[key].id,
          usuarioId: obj[key].usuarioId,
          titulo: obj[key].titulo,
          nomepac: nomepaciente,
          datacadastro: obj[key].datacadastro,
          datavalidade: obj[key].datavalidade,
          tempo: obj[key].tempo,
          especialidade: obj[key].especialidade,
          risco: obj[key].risco,
          dentista: obj[key].dentista,
          clinicaid: obj[key].clinicaid,
          obs: obj[key].obs
        })
      }
      return array
    }
  }
}
