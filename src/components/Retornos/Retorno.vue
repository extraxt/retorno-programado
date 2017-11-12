<template>
  <v-container>
    <v-card class="elevation-1">
    <v-card-title>
      <div>
        <h3 class="blue--text">dados<b>retorno</b></h3>
      </div>
    </v-card-title>
    <v-card-text  v-if="!editar">
    <v-layout row justify-center>
      <v-flex xs12>
          <v-layout row justify-center>
            <v-flex xs12 sm12 md6 offset-md1 lg4>
              <p class="mb-0">Título do Retorno:</p>
              <h5><b>{{ unicoRetorno.titulo }}</b></h5>
            </v-flex>
          </v-layout>
          <v-layout row justify-center>
            <v-flex xs12 sm12 md6 offset-md1 lg4>
              <p class="mb-0">Paciente:</p>
              <h5><b>{{ unicoPaciente.nome }}</b></h5>
            </v-flex>
          </v-layout>
          <v-layout row justify-center>
            <v-flex xs12 sm12 md6 offset-md1 lg4>
              <p class="mb-0">Data da Validade:</p>
              <h5><b>{{ unicoRetorno.datavalidade }}</b></h5>
            </v-flex>
          </v-layout>
          <v-layout row justify-center>
            <v-flex xs12 sm12 md6 offset-md1 lg4>
                <p class="mb-0">Data do Cadastro:</p>
                <h5><b>{{ unicoRetorno.datacadastro }}</b></h5>
            </v-flex>
          </v-layout>
          <v-layout row justify-center>
            <v-flex xs12 sm12 md6 offset-md1 lg4>
                <p class="mb-0">Período Selecionado:</p>
                <h5><b>{{ unicoRetorno.tempo }} dias</b></h5>
            </v-flex>
          </v-layout>
          <v-layout row justify-center>
            <v-flex xs12 sm12 md6 offset-md1 lg4>
              <p class="mb-0">Especialidade:</p>
              <h5><b>{{ unicoRetorno.especialidade }}</b></h5>
            </v-flex>
          </v-layout>
          <v-layout row v-if="unicoRetorno.risco" justify-center>
            <v-flex xs12 sm12 md6 offset-md1 lg4>
              <p class="mb-0">Risco:</p>
              <h5><b>{{ unicoRetorno.risco }}</b></h5>
            </v-flex>
          </v-layout>
          <v-layout row justify-center>
            <v-flex xs12 sm12 md6 offset-md1 lg4>
              <p class="mb-0">Clínica:</p>
              <h5><b>{{ unicaClinica.nome }} - {{ unicaClinica.cidade }}</b></h5>
            </v-flex>
          </v-layout>
          <v-layout row justify-center>
            <v-flex xs12 sm12 md6 offset-md1 lg4>
              <p class="mb-0">Dentista:</p>
              <h5><b>{{ unicoDentista.nome }}</b></h5>
            </v-flex>
          </v-layout>
          <v-layout row v-if="unicoRetorno.obs" justify-center>
            <v-flex xs12 sm12 md6 offset-md1 lg4>
              <p class="mb-0">Observações Gerais:</p>
              <h5><b>{{ unicoRetorno.obs }}</b></h5>
            </v-flex>
          </v-layout>
          <v-layout row justify-center>
            <v-flex xs12 sm12 md6 offset-md1 lg4 class="text-xs-center">
              <v-btn
                small
                class="primary"
                @click="editarUnicoRetorno"
                :loading="loading">Editar Dados
                <span slot="loader" class="custom-loader">
                  <v-icon light>cached</v-icon>
                </span>
              </v-btn>
            </v-flex>
          </v-layout>
          <br><br><br>
      </v-flex>
    </v-layout>
    </v-card-text>
    </v-card>
    <br><br>
  </v-container>
</template>

<script>
export default {
  props: ['id'],
  data () {
    return {
      editar: false,
      retornotit: '',
      retornopac: '',
      retornodata: '',
      retornovolta: '',
      retornotempo: '',
      retornocat: '',
      retornorisco: '',
      retornodent: '',
      retornocliid: '',
      retornoobs: ''
    }
  },
  computed: {
    unicoRetorno () {
      return this.$store.getters.unicoRetorno(this.id)
    },
    unicoPaciente () {
      const codigopaciente = this.unicoRetorno.pacid
      return this.$store.getters.unicoPaciente(codigopaciente)
    },
    unicaClinica () {
      const codigoclinica = this.unicoRetorno.clinicaid
      return this.$store.getters.unicaClinica(codigoclinica)
    },
    unicoDentista () {
      const codigodentista = this.unicoRetorno.dentistaid
      return this.$store.getters.unicoDentista(codigodentista)
    },
    filtradoClinicas () {
      return this.$store.getters.filtradoClinicas
    },
    formValido () {
      return this.retornotit !== '' &&
      this.retornopac !== '' &&
      this.retornotempo !== '' &&
      this.retornocat !== '' &&
      this.retornodent !== '' &&
      this.retornocliid !== ''
    },
    loading () {
      return this.$store.getters.loading
    }
  },
  methods: {
    editarUnicoRetorno () {
      this.editar = !this.editar

      this.retornotit = this.unicoRetorno.titulo
      this.retornopac = this.unicoRetorno.pacid
      this.retornotempo = this.unicoRetorno.tempo
      this.retornocat = this.unicoRetorno.especialidade
      this.retornorisco = this.unicoRetorno.risco
      this.retornodent = this.unicoRetorno.dentista
      this.retornocliid = this.unicoRetorno.clinicaid
      this.retornoobs = this.unicoRetorno.obs
    },
    atualizarRetorno () {
      const payloadRetorno = {}
      payloadRetorno.id = this.id
      if (this.retornotit !== this.unicoRetorno.titulo) {
        payloadRetorno.titulo = this.retornotit
      }
      if (this.retornopac !== this.unicoRetorno.pacid) {
        payloadRetorno.pacid = this.retornopac
      }
      if (this.retornodata !== this.unicoRetorno.datacadastro) {
        payloadRetorno.datacadastro = this.retornodata
      }
      if (this.retornovolta !== this.unicoRetorno.datavalidade) {
        payloadRetorno.datavalidade = this.retornovolta
      }
      if (this.retornotempo !== this.unicoRetorno.tempo) {
        payloadRetorno.tempo = this.retornotempo
      }
      if (this.retornocat !== this.unicoRetorno.especialidade) {
        payloadRetorno.especialidade = this.retornocat
      }
      if (this.retornorisco !== this.unicoRetorno.risco) {
        payloadRetorno.risco = this.retornorisco
      }
      if (this.retornodent !== this.unicoRetorno.dentista) {
        payloadRetorno.dentista = this.retornodent
      }
      if (this.retornocliid !== this.unicoRetorno.clinica) {
        payloadRetorno.clinicaid = this.retornocliid
      }
      if (this.retornoobs !== this.unicoRetorno.obs) {
        payloadRetorno.obs = this.retornoobs
      }
      this.$store.dispatch('editarRetorno', payloadRetorno)
      this.$router.push('/retornos')
      this.$store.dispatch('filtradoRetornos')
    }
  }
}
</script>
