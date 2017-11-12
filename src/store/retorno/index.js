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
      console.log('Pegou o id do Usuario')
      const dadosRetorno = {
        usuarioId: usuarioId,
        titulo: payload.tit,
        pacid: payload.pacid,
        datacadastro: payload.datacadastro,
        datavalidade: payload.datavalidade,
        tempo: payload.tempo,
        especialidade: payload.especialidade,
        risco: payload.risco,
        dentista: payload.dentista,
        clinicaid: payload.clinicaid,
        obs: payload.obs
      }
      firebase.database().ref(usuarioId + '/retornos').push(dadosRetorno)
      .then(data => {
        commit('setLoading', false)
        console.log('Criou Retorno!')
      })
      .catch(error => {
        console.log(error)
        console.log('fodeu')
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
            dentista: obj[key].dentista,
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
      const usuarioId = getters.user.id
      const updateObj = {}
      if (payload.tit) {
        updateObj.tit = payload.tit
      }
      if (payload.pacid) {
        updateObj.pacid = payload.pacid
      }
      if (payload.datacadastro) {
        updateObj.datacadastro = payload.datacadastro
      }
      if (payload.datavalidade) {
        updateObj.datavalidade = payload.datavalidade
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
      if (payload.clinicaid) {
        updateObj.clinicaid = payload.clinicaid
      }
      if (payload.obs) {
        updateObj.obs = payload.obs
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
