import * as firebase from 'firebase'

export default {
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
    }
  }
}
