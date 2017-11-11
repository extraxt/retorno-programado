<template>
  <v-container>
    <v-card>
    <v-card-title>
      <div>
        <h3>novo<b>retorno</b></h3>
        <p>Crie um retorno para tirar os pontos, ou controle cirúrgico.</p>
      </div>
    </v-card-title>
    <v-card-text>
    <v-layout row>
      <v-flex xs12>
        <form @submit.prevent="onNovoRetorno">
          <v-layout row>
            <v-flex xs12 sm10 offset-sm1 md8 offset-md2>
              <v-text-field
              prepend-icon="comment"
              v-model="retornotit"
              label="Título do retorno"
              hint="Título do retorno"
            ></v-text-field>
            </v-flex>
          </v-layout>
          <v-layout row>
            <v-flex xs12 sm10 offset-sm1 md8 offset-md2>
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
            <v-flex xs12 sm4 offset-sm1 md4 offset-md1 lg4>
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
            <v-flex xs12 sm4 offset-sm1 md4 offset-md1 lg4>
              <p v-if="retornotempo">Previsão do Retorno: {{ retornovolta }}</p>
            </v-flex>
          </v-layout>
          <v-layout row justify-center>
            <v-flex xs12 sm4 offset-sm1 md4 offset-md1 lg4>
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
            <v-flex xs12 sm4 offset-sm1 md4 offset-md1 lg4>
              <v-select
                prepend-icon="bookmark"
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
            <v-flex xs12 sm4 offset-sm1 md4 offset-md1 lg4>
              <v-select
                prepend-icon="assignment_ind"
                v-bind:items="dentistas"
                v-model="retornodent"
                label="Dentista"
                single-line
                no-data-text="Nenhum dentista selecionado"
                clearable
                required
              ></v-select>
            </v-flex>
          </v-layout>
          <v-layout row>
            <v-flex xs12 sm10 offset-sm1 md8 offset-md2>
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
          <v-layout row>
            <v-flex class="text-xs-center" xs12 sm10 offset-sm1 md8 offset-md2>
              <v-btn
                class="primary"
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
      riscos: [],
      retornotit: '',
      retornopac: '',
      retornotempo: '',
      retornocat: '',
      retornorisco: '',
      retornodent: '',
      retornoobs: '',
      dialog: false
    }
  },
  computed: {
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
    formValido () {
      return this.retornotit !== '' &&
      this.retornopac !== '' &&
      this.retornotempo !== '' &&
      this.retornocat !== '' &&
      this.retornodent !== ''
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
        tempo: this.retornotempo,
        especialidade: this.retornocat,
        risco: this.retornorisco,
        dentista: this.retornodent,
        obs: this.retornoobs,
        criacao: this.retornocria
      }
      this.$store.dispatch('criarRetorno', dadosRetorno)
      this.$router.push('/novoretorno')
    }
  }
}
</script>

