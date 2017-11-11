<template>
  <v-container>
    <v-card>
    <v-card-title>
      <div>
        <h3>Novo Retorno</h3>
        <p>Preencha o máximo de informações possível.</p>
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
              <v-dialog v-model="dialog" persistent>
                <v-card>
                  <v-card-title class="headline">Use Google's location service?</v-card-title>
                  <v-card-text>Let Google help apps determine location. This means sending anonymous location data to Google, even when no apps are running.</v-card-text>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="green darken-1" flat="flat" @click.native="dialog = false">Disagree</v-btn>
                    <v-btn color="green darken-1" flat="flat" @click.native="dialog = false">Agree</v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
              {{ retornopac }}
            </v-flex>
          </v-layout>
          <v-layout row>
            <v-flex xs6 sm4 offset-sm1 md3 offset-md2 lg2 offset-lg2>
              <v-text-field
                name="codigo"
                v-model="paccodigo"
                label="Cód. do Paciente"
                id="codigo"
                required
                ></v-text-field>
            </v-flex>
          </v-layout>
          <v-layout row>
            <v-flex xs8 sm6 offset-sm1 md4 offset-md2>
              <v-text-field
                name="telefone1"
                v-model="pactelefone1"
                label="Telefone 1"
                id="telefone1"
                prepend-icon="phone"
                v-mask="telefone"
                required></v-text-field>
            </v-flex>
            <v-flex xs4 sm4>
              <v-select v-bind:items="teletipos" v-model="pacteletipo1" label="Tipo:" required>
              </v-select>
            </v-flex>
          </v-layout>
          <v-layout row>
            <v-flex xs8 sm6 offset-sm1 md4 offset-md2>
              <v-text-field
                name="telefone2"
                v-model="pactelefone2"
                label="Telefone 2"
                id="telefone2"
                prepend-icon="phone"
                v-mask="telefone"
                ></v-text-field>
            </v-flex>
            <v-flex xs4 sm4>
              <v-select v-bind:items="teletipos" v-model="pacteletipo2" label="Tipo:">
              </v-select>
            </v-flex>
          </v-layout>
          <v-layout row>
            <v-flex xs12 sm8 offset-sm1 md6 offset-md2 lg4 offset-lg2>
              <v-text-field
                name="email"
                label="E-Mail do Paciente"
                id="email"
                type="email"
                v-model="pacemail"
                placeholder="meu-email@gmail.com"
                hint="Ex.: meu-email@gmail.com"
                ></v-text-field>
            </v-flex>
          </v-layout>
          <v-layout row>
            <v-flex xs12 sm10 offset-sm1 md8 offset-md2>
              <v-text-field
                name="endereco"
                label="Endereço do Paciente"
                id="endereco"
                v-model="pacendereco"
                hint="Ex.: Rua das Flores, 123 - Centro"
              ></v-text-field>
            </v-flex>
          </v-layout>
          <v-layout row>
            <v-flex xs8 sm6 offset-sm1 md4 offset-md2>
              <v-text-field
                name="cidade"
                label="Cidade"
                id="cidade"
                v-model="paccidade"
                hint="Ex.: Lapa"
                required
              ></v-text-field>
            </v-flex>
            <v-flex xs4 sm4>
              <v-select v-model="pacestado" v-bind:items="estados" label="Estado" required></v-select>
            </v-flex>
          </v-layout>
          <v-layout row>
            <v-flex xs12 sm10 offset-sm1 md8 offset-md2>
              <br>
              <p>Escolha o sexo:</p>
              <v-radio-group v-model="pacsexo" required>
                <v-radio label="Masculino" value="masculino"></v-radio>
                <br>
                <v-radio label="Feminino" value="feminino"></v-radio>
            </v-radio-group>
            <br>
            </v-flex>
          </v-layout>
          <v-layout row>
            <v-flex xs6 sm4 offset-sm1 md2 offset-md2>
              <v-text-field
                name="datanasc"
                label="Nascimento"
                placeholder="Ex: 30/12/1970"
                hint="Ex: 30/12/1970"
                v-mask= "datanasc"
                v-model="pacdatanasc"
                id="datanasc"
                required
              ></v-text-field>
            </v-flex>
          </v-layout>
          <v-layout row>
            <v-flex xs12 sm10 offset-sm1 md8 offset-md2>
              <v-text-field
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
                :disabled="!formValido">Cadastrar Paciente
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
      retornopac: '',
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

