<template>
  <v-container>
    <v-card>
    <v-card-title>
      <div>
        <h3>Novo Retorno</h3>
        <p>Crie um retorno para tirar os pontos, ou controle cirúrgico.</p>
      </div>
    </v-card-title>
    <v-card-text>
    <v-layout row>
      <v-flex xs12>
        <form @submit.prevent>
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
                    <v-btn small @click.stop="dialog = true" class="green lighten-1 white--text">
                      <v-icon>add</v-icon> Adicione novo Paciente
                    </v-btn>
                  </v-layout>
                </template>
              </v-select>
              <v-dialog v-model="dialog" max-width="600px">
                <v-card>
                  <v-card-text>
                    <v-layout row justify-center>
                      <v-flex>
                        <novo-paciente></novo-paciente>
                      </v-flex>
                    </v-layout>
                  </v-card-text>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="green darken-1" flat="flat" @click.native="dialog = false">Disagree</v-btn>
                    <v-btn color="green darken-1" flat="flat" @click.native="dialog = false">Agree</v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
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
              ></v-select>
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
                v-model="pacobs"
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
import AwesomeMask from 'awesome-mask'

export default {
  data () {
    return {
      dentistas: [],
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
      retornopac: '',
      retornotempo: '',
      retornocat: '',
      retornorisco: '',
      retornodent: '',
      dialog: false,
      teletipos: ['WhatsApp', 'Celular', 'Casa', 'Trabalho'],
      estados: ['AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA', 'MT', 'MS', 'MG', 'PA', 'PB', 'PR', 'PE', 'PI', 'RJ', 'RN', 'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO'],
      telefone: '(99)999999999',
      datanasc: '99/99/9999',
      pacsexo: 'masculino',
      pacnome: '',
      paccodigo: '',
      pactelefone1: '',
      pacteletipo1: '',
      pactelefone2: '',
      pacteletipo2: '',
      pacemail: '',
      pacendereco: '',
      paccidade: '',
      pacestado: '',
      pacdatanasc: '',
      pacobs: ''
    }
  },
  computed: {
    todosPacientes () {
      return this.$store.getters.todosPacientes
    },
    filtradoPacientes () {
      return this.$store.getters.filtradoPacientes
    },
    formValido () {
      return this.pacnome !== '' &&
      this.paccodigo !== '' &&
      this.pactelefone1 !== '' &&
      this.pacteletipo1 !== '' &&
      this.paccidade !== '' &&
      this.pacestado !== '' &&
      this.pacdatanasc !== ''
    },
    loading () {
      return this.$store.getters.loading
    }
  },
  directives: {
    mask: AwesomeMask
  },
  methods: {
    onNovoPaciente () {
      if (!this.formValido) {
        return
      }
      const dadosPaciente = {
        pacsexo: this.pacsexo,
        pacnome: this.pacnome,
        paccodigo: this.paccodigo,
        pactelefone1: this.pactelefone1,
        pacteletipo1: this.pacteletipo1,
        pactelefone2: this.pactelefone2,
        pacteletipo2: this.pacteletipo2,
        pacemail: this.pacemail,
        pacendereco: this.pacendereco,
        paccidade: this.paccidade,
        pacestado: this.pacestado,
        pacdatanasc: this.pacdatanasc,
        pacobs: this.pacobs
      }
      console.log(dadosPaciente)
      this.$store.dispatch('criarPaciente', dadosPaciente)
      this.$router.push('/pacientes')
      this.$store.dispatch('todosPacientes')
    }
  }
}
</script>

