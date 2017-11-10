import * as firebase from 'firebase'

export default {
  state: {
    todosPacientes: []
  },
  mutations: {
    todosPacientes (state, payload) {
      state.todosPacientes = payload
      console.log(payload)
    }
  },
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
    },
    todosPacientes ({commit, getters}) {
      commit('setLoading', true)
      const usuarioId = getters.user.id
      firebase.database().ref(usuarioId + '/pacientes').once('value')
      .then((data) => {
        const todosPacientes = []
        const obj = data.val()
        for (let key in obj) {
          todosPacientes.push({
            id: key,
            nome: obj[key].nome,
            codigo: obj[key].codigo,
            telefone1: obj[key].telefone1,
            teletipo1: obj[key].teletipo1,
            telefone2: obj[key].telefone2,
            teletipo2: obj[key].teletipo2,
            email: obj[key].email,
            endereco: obj[key].endereco,
            cidade: obj[key].cidade,
            estado: obj[key].estado,
            sexo: obj[key].sexo,
            datanasc: obj[key].datanasc,
            obs: obj[key].obs
          })
        }
        commit('todosPacientes', todosPacientes)
        commit('setLoading', false)
      })
      .catch((error) => {
        console.log(error)
        commit('setLoading', false)
      })
    },
    editarPaciente ({commit, getters}, payload) {
      commit('setLoading', true)
      const usuarioId = getters.user.id
      const updateObj = {}
      if (payload.nome) {
        updateObj.nome = payload.nome
      }
      if (payload.codigo) {
        updateObj.codigo = payload.codigo
      }
      if (payload.telefone1) {
        updateObj.telefone1 = payload.telefone1
      }
      if (payload.teletipo1) {
        updateObj.teletipo1 = payload.teletipo1
      }
      if (payload.telefone2) {
        updateObj.telefone2 = payload.telefone2
      }
      if (payload.teletipo2) {
        updateObj.teletipo2 = payload.teletipo2
      }
      if (payload.email) {
        updateObj.email = payload.email
      }
      if (payload.endereco) {
        updateObj.endereco = payload.endereco
      }
      if (payload.cidade) {
        updateObj.cidade = payload.cidade
      }
      if (payload.estado) {
        updateObj.estado = payload.estado
      }
      if (payload.sexo) {
        updateObj.sexo = payload.sexo
      }
      if (payload.datanasc) {
        updateObj.datanasc = payload.datanasc
      }
      if (payload.obs) {
        updateObj.obs = payload.obs
      }
      firebase.database().ref(usuarioId + '/pacientes').child(payload.id).update(updateObj)
      .then(() => {
        commit('setLoading', false)
        console.log('Deu certo o update dos dados!')
      })
      .catch(error => {
        console.log(error)
        commit('setLoading', false)
      })
    }
  },
  getters: {
    todosPacientes (state) {
      return state.todosPacientes
    },
    unicoPaciente (state) {
      return (pacienteId) => {
        return state.todosPacientes.find((paciente) => {
          return paciente.id === pacienteId
        })
      }
    }
  }
}
