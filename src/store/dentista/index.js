import * as firebase from 'firebase'

export default {
  state: {
    todosDentistas: []
  },
  mutations: {
    todosDentistas (state, payload) {
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
        obs: payload.dentobs
      }
      firebase.database().ref(usuarioId + '/dentistas').push(dadosDentista)
      .then(data => {
        console.log('Deu certo o dentista!')
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
            obs: obj[key].obs
          })
        }
        commit('todosDentistas', todosDentistas)
        commit('setLoading', false)
      })
      .catch((error) => {
        console.log(error)
        commit('setLoading', false)
      })
    }
  },
  getters: {
    todosDentistas (state) {
      return state.todosDentistas.sort((DentistaA, DentistaB) => {
        return DentistaA.nome > DentistaB.nome
      })
    },
    unicoDentista (state) {
      return (DentistaId) => {
        return state.todosDentistas.find((Dentista) => {
          return Dentista.id === DentistaId
        })
      }
    }
  }
}
