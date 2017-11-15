<template>
  <v-container>
    <v-card class="elevation-1">
    <v-card-title>
      <div>
        <h3 class="blue--text">novo<b>retorno</b></h3>
        <p>Crie um retorno para tirar os pontos, ou controle cirúrgico.</p>
      </div>
    </v-card-title>
    <v-card-text>
    <v-layout row justify-center>
      <v-flex xs12>
        <form @submit.prevent="onNovoRetorno">
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
                clearable
              ></v-text-field>
            </v-flex>
          </v-layout>
          <v-layout row justify-center>
            <v-flex xs12 sm12 md6 class="text-xs-center">
              <v-btn
                class="primary elevation-1"
                type="submit"
                :loading="loading"
                :disabled="!formValido">Cadastrar Retorno
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
  data () {
    return {
      dentistas: ['Dr. Rafael'],
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
      retornoobs: '',
      dialog: false
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
      this.retornotit !== undefined &&
      this.retornotit !== null &&
      this.retornopac !== '' &&
      this.retornopac !== undefined &&
      this.retornopac !== null &&
      this.retornotempo !== '' &&
      this.retornotempo !== undefined &&
      this.retornotempo !== null &&
      this.retornocat !== '' &&
      this.retornocat !== undefined &&
      this.retornocat !== null &&
      this.retornodentid !== '' &&
      this.retornodentid !== undefined &&
      this.retornodentid !== null &&
      this.retornocliid !== '' &&
      this.retornocliid !== undefined &&
      this.retornocliid !== null
    },
    loading () {
      return this.$store.getters.loading
    }
  },
  methods: {
    onNovoRetorno () {
      if (!this.formValido) {
        return
      }
      const dadosRetorno = {
        tit: this.retornotit,
        pacid: this.retornopac,
        datacadastro: this.retornodata,
        datavalidade: this.retornovolta,
        tempo: this.retornotempo,
        especialidade: this.retornocat,
        risco: this.retornorisco,
        dentistaid: this.retornodentid,
        clinicaid: this.retornocliid,
        obs: this.retornoobs
      }
      this.$store.dispatch('criarRetorno', dadosRetorno)
      this.$store.dispatch('todosRetornos')
      this.$router.push('/retornos')
    }
  },
  created () {
    window.scrollTo(0, 0)
  }
}
</script>

