import * as firebase from 'firebase'

export default {
  state: {
    todosPacientes: []
  },
  mutations: {
    todosPacientes (state, payload) {
      payload.sort((pacienteA, pacienteB) => {
        return pacienteA.nome > pacienteB.nome
      })
      state.todosPacientes = payload
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
        obs: payload.pacobs,
        ativo: true
      }
      firebase.database().ref(usuarioId + '/pacientes').push(dadosPaciente)
      .then(data => {
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
            obs: obj[key].obs,
            ativo: obj[key].ativo
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
      if (payload.nome !== undefined) {
        updateObj.nome = payload.nome
      }
      if (payload.codigo !== undefined) {
        updateObj.codigo = payload.codigo
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
      if (payload.sexo !== undefined) {
        updateObj.sexo = payload.sexo
      }
      if (payload.datanasc !== undefined) {
        updateObj.datanasc = payload.datanasc
      }
      if (payload.obs !== undefined) {
        updateObj.obs = payload.obs
      }
      firebase.database().ref(usuarioId + '/pacientes').child(payload.id).update(updateObj)
      .then(() => {
        commit('setLoading', false)
      })
      .catch(error => {
        console.log(error)
        commit('setLoading', false)
      })
    },
    desativarPaciente ({ commit, getters }, payload) {
      commit('setLoading', true)
      const usuarioId = getters.user.id
      const updateObj = {}
      updateObj.ativo = false
      firebase.database().ref(usuarioId + '/pacientes').child(payload).update(updateObj)
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
    todosPacientes (state) {
      return state.todosPacientes
    },
    todosPacientesSemDesativados (state) {
      const todosPacientesTodos = state.todosPacientes
      const semDesativados = []
      for (let key in todosPacientesTodos) {
        if (todosPacientesTodos[key].ativo) {
          semDesativados.push(todosPacientesTodos[key])
        }
      }
      return semDesativados
    },
    unicoPaciente (state) {
      return (pacienteId) => {
        return state.todosPacientes.find((paciente) => {
          return paciente.id === pacienteId
        })
      }
    },
    filtradoPacientes (state) {
      const obj = state.todosPacientes
      const array = []
      for (let key in obj) {
        let ativo = 'DESATIVADO(A)'
        if (obj[key].ativo) {
          array.push({
            text: obj[key].nome + ' ( ' + obj[key].codigo + ' )',
            value: obj[key].id
          })
        } else {
          array.push({
            text: obj[key].nome + ' ( ' + obj[key].codigo + ' )' + ativo,
            value: obj[key].id
          })
        }
      }
      return array
    },
    filtradoPacientesSemDesativados (state) {
      const obj = state.todosPacientes
      const array = []
      for (let key in obj) {
        if (obj[key].ativo) {
          array.push({
            text: obj[key].nome + ' ( ' + obj[key].codigo + ' )',
            value: obj[key].id
          })
        }
      }
      return array
    }
  }
}
