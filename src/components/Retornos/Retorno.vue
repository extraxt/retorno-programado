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
            <v-flex xs12 sm12 md6>
              <p class="mb-0">Título do Retorno:</p>
              <h5><b>{{ unicoRetorno.titulo }}</b></h5>
            </v-flex>
          </v-layout>
          <v-layout row justify-center>
            <v-flex xs12 sm12 md6>
              <p class="mb-0">Paciente:</p>
              <h5><b>{{ unicoPaciente.nome }}</b></h5>
            </v-flex>
          </v-layout>
          <v-layout row justify-center>
            <v-flex xs12 sm12 md6>
              <p class="mb-0">Data da Validade:</p>
              <h5><b>{{ unicoRetorno.datavalidade }}</b></h5>
            </v-flex>
          </v-layout>
          <v-layout row justify-center>
            <v-flex xs12 sm12 md6>
                <p class="mb-0">Data do Cadastro:</p>
                <h5><b>{{ unicoRetorno.datacadastro }}</b></h5>
            </v-flex>
          </v-layout>
          <v-layout row justify-center>
            <v-flex xs12 sm12 md6>
                <p class="mb-0">Período Selecionado:</p>
                <h5><b>{{ unicoRetorno.tempo }} dias</b></h5>
            </v-flex>
          </v-layout>
          <v-layout row justify-center>
            <v-flex xs12 sm12 md6>
              <p class="mb-0">Especialidade:</p>
              <h5><b>{{ unicoRetorno.especialidade }}</b></h5>
            </v-flex>
          </v-layout>
          <v-layout row v-if="unicoRetorno.risco" justify-center>
            <v-flex xs12 sm12 md6>
              <p class="mb-0">Risco:</p>
              <h5><b>{{ unicoRetorno.risco }}</b></h5>
            </v-flex>
          </v-layout>
          <v-layout row justify-center>
            <v-flex xs12 sm12 md6>
              <p class="mb-0">Clínica:</p>
              <h5><b>{{ unicaClinica.nome }} - {{ unicaClinica.cidade }}</b></h5>
            </v-flex>
          </v-layout>
          <v-layout row justify-center>
            <v-flex xs12 sm12 md6>
              <p class="mb-0">Dentista:</p>
              <h5><b>{{ unicoDentista.nome }}</b></h5>
            </v-flex>
          </v-layout>
          <v-layout row v-if="unicoRetorno.obs" justify-center>
            <v-flex xs12 sm12 md6>
              <p class="mb-0">Observações Gerais:</p>
              <h5><b>{{ unicoRetorno.obs }}</b></h5>
            </v-flex>
          </v-layout>
          <v-layout row justify-center>
            <v-flex xs12 sm12 md6 class="text-xs-center">
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
    <v-card-text v-else>
      <v-layout row>
        <v-flex class="text-xs-center" xs12 sm10 offset-sm1 md8 offset-md2>
          <v-btn
            class="error mb-4"
            type="submit"
            @click="editar=!editar"
            :loading="loading">CANCELAR EDIÇÃO
            <span slot="loader" class="custom-loader">
              <v-icon light>cached</v-icon>
            </span>
          </v-btn>
        </v-flex>
      </v-layout>
      <v-layout row justify-center>
        <v-flex xs12>
          <form @submit.prevent="atualizarRetorno">
            <v-layout row justify-center>
              <v-flex xs12 sm12 md6>
                <v-text-field
                prepend-icon="comment"
                v-model="retornotit"
                label="Título do retorno"
                hint="Título do retorno"
                :rules="[(v) => v.length <= 50 || 'Máximo de 50 caracteres para o título']"
                :counter="50"
                clearable
                required
              ></v-text-field>
              </v-flex>
            </v-layout>
            <v-layout row justify-center>
              <v-flex xs12 sm12 md6>
                <v-select
                  v-bind:items="filtradoPacientes"
                  v-model="retornopac"
                  label="Escolha o Paciente"
                  autocomplete
                  required
                  prepend-icon="person"
                  no-data-text="Este paciente não está registrado!"
                  clearable>
                  <template slot="no-data">
                    <v-layout row justify-center>
                      <v-btn small to="/novopaciente" class="green lighten-1 white--text">
                        <v-icon>add</v-icon> Adicione novo Paciente
                      </v-btn>
                    </v-layout>
                  </template>
                </v-select>
              </v-flex>
            </v-layout>
            <v-layout row justify-center>
              <v-flex xs12 sm12 md6>
                <v-select
                  prepend-icon="restore"
                  v-bind:items="opcoestempo"
                  item-text="titulo"
                  item-value="dias"
                  v-model="retornotempo"
                  label="Retorno"
                  single-line
                  no-data-text="Nenhum período selecionado"
                  clearable
                  required
                ></v-select>
              </v-flex>
            </v-layout>
            <v-layout row justify-center>
              <v-flex xs12 sm12 md6>
                <p v-if="retornotempo">Previsão do Retorno: {{ retornovolta }}</p>
              </v-flex>
            </v-layout>
            <v-layout row justify-center>
              <v-flex xs12 sm12 md6>
                <v-select
                  prepend-icon="bookmark"
                  v-bind:items="categorias"
                  v-model="retornocat"
                  label="Especialidade"
                  single-line
                  no-data-text="Nenhum período selecionado"
                  clearable
                  required
                ></v-select>
              </v-flex>
            </v-layout>
            <v-layout row justify-center>
              <v-flex xs12 sm12 md6>
                <v-select
                  prepend-icon="warning"
                  v-bind:items="riscos"
                  v-model="retornorisco"
                  label="Risco"
                  single-line
                  no-data-text="Nenhum risco selecionado"
                  clearable
                ></v-select>
              </v-flex>
            </v-layout>
            <v-layout row justify-center>
              <v-flex xs12 sm12 md6>
                <v-select
                  v-bind:items="filtradoClinicas"
                  v-model="retornocliid"
                  label="Clínica"
                  autocomplete
                  required
                  prepend-icon="home"
                  no-data-text="Esta clínica não está registrada!"
                  clearable>
                  <template slot="no-data">
                    <v-layout row justify-center>
                      <v-btn small to="/novaclinica" class="green lighten-1 white--text">
                        <v-icon>add</v-icon> Adicione nova Clínica
                      </v-btn>
                    </v-layout>
                  </template>
                </v-select>
              </v-flex>
            </v-layout>
            <v-layout row justify-center>
              <v-flex xs12 sm12 md6>
                <v-select
                  prepend-icon="assignment_ind"
                  v-bind:items="filtradoDentistas"
                  v-model="retornodentid"
                  label="Dentista"
                  autocomplete
                  no-data-text="Nenhum dentista selecionado"
                  clearable
                  required>
                  <template slot="no-data">
                    <v-layout row justify-center>
                      <v-btn small to="/novodentista" class="green lighten-1 white--text">
                        <v-icon>add</v-icon> Adicione novo Dentista
                      </v-btn>
                    </v-layout>
                  </template>
                  </v-select>
              </v-flex>
            </v-layout>
            <v-layout row justify-center>
              <v-flex xs12 sm12 md6>
                <v-text-field
                  prepend-icon="reorder"
                  name="observacoes"
                  label="Observações Gerais"
                  id="observacoes"
                  v-model="retornoobs"
                  placeholder="Alguma informação a mais?"
                  multi-line
                ></v-text-field>
              </v-flex>
            </v-layout>
            <v-layout row justify-center>
              <v-flex xs12 sm12 md6 class="text-xs-center">
                <v-btn
                  class="primary"
                  type="submit"
                  :loading="loading"
                  :disabled="!formValido">Atualizar Dados
                  <span slot="loader" class="custom-loader">
                    <v-icon light>cached</v-icon>
                  </span>
                </v-btn>
              </v-flex>
            </v-layout>
            <br><br><br>
          </form>
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
      opcoestempo: [
        {titulo: '7 Dias', dias: 7},
        {titulo: '14 Dias', dias: 14},
        {titulo: '21 Dias', dias: 21},
        {titulo: '1 Mês', dias: 30},
        {titulo: '3 Meses', dias: 90},
        {titulo: '6 Meses', dias: 180},
        {titulo: '1 Ano', dias: 365}
      ],
      categorias: [
        'Acupuntura',
        'Cirurgia',
        'Clínica Geral',
        'DTM',
        'Dentística',
        'Endodontia',
        'Implantodontia',
        'Laserterapia',
        'Odontopediatria',
        'Ortodontia',
        'Patologia',
        'Periodontia',
        'Prótese',
        'Radiologia'
      ],
      riscos: ['Alto', 'Médio', 'Baixo'],
      retornotit: '',
      retornopac: '',
      retornotempo: '',
      retornocat: '',
      retornorisco: '',
      retornodentid: '',
      retornocliid: '',
      retornoobs: ''
    }
  },
  computed: {
    retornodata () {
      const datahoje = new Date()
      const diahoje = datahoje.getDate()
      const meshoje = datahoje.getMonth() + 1
      const anohoje = datahoje.getFullYear()
      return diahoje + '/' + meshoje + '/' + anohoje
    },
    retornovolta () {
      const dataoriginal = new Date()
      dataoriginal.setDate(dataoriginal.getDate() + this.retornotempo)
      const dia = dataoriginal.getDate()
      const mes = dataoriginal.getMonth() + 1
      const ano = dataoriginal.getFullYear()
      return dia + '/' + mes + '/' + ano
    },
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
    filtradoPacientes () {
      return this.$store.getters.filtradoPacientes
    },
    filtradoClinicas () {
      return this.$store.getters.filtradoClinicas
    },
    filtradoDentistas () {
      return this.$store.getters.filtradoDentistas
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
      this.retornodentid = this.unicoRetorno.dentistaid
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
      this.editar = !this.editar
      this.$router.push('/retorno/' + this.id)
      this.$store.dispatch('todosRetornos')
    }
  }
}
</script>
