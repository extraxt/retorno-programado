import * as firebase from 'firebase'

export default {
  actions: {
    criarPaciente ({commit, getters}, payload) {
      commit('setLoading', true)
      const usuarioId = getters.user.id
      const dadosPaciente = {
        sexo: payload.pacsexo,
        nome: payload.pacnome,
        codigo: payload.paccodigo,
        telefone1: payload.pactelefone1,
        teletipo1: payload.pacteletipo1,
        telefone2: payload.pactelefone2,
        teletipo2: payload.pacteletipo2,
        email: payload.pacemail,
        endereco: payload.pacendereco,
        cidade: payload.paccidade,
        estado: payload.pacestado,
        datanasc: payload.pacdatanasc,
        obs: payload.pacobs
      }
      firebase.database().ref(usuarioId + '/pacientes').push(dadosPaciente)
      .then(data => {
        console.log('Deu certo o registro!')
        console.log(data)
        commit('setLoading', false)
      })
      .catch(error => {
        console.log(error)
        commit('setLoading', false)
      })
    }
  }
}
