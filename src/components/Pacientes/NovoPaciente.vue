<template>
  <v-container>
    <v-card class="elevation-1">
    <v-card-title>
      <div>
        <h3 class="blue--text">novo<b>paciente</b></h3>
        <p>Preencha o máximo de informações possível.</p>
      </div>
    </v-card-title>
    <v-card-text>
    <v-layout row>
      <v-flex xs12>
        <form @submit.prevent="onNovoPaciente">
          <v-layout row>
            <v-flex xs12 sm10 offset-sm1 md8 offset-md2>
              <v-text-field
                name="nome"
                v-model="pacnome"
                label="Nome do Paciente"
                id="nome"
                required
                clearable
                ></v-text-field>
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
                clearable
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
                clearable
                required></v-text-field>
            </v-flex>
            <v-flex xs4 sm4>
              <v-select v-bind:items="teletipos" v-model="pacteletipo1" label="Tipo:" clearable required>
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
                clearable
                ></v-text-field>
            </v-flex>
            <v-flex xs4 sm4>
              <v-select v-bind:items="teletipos" v-model="pacteletipo2" clearable label="Tipo:">
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
                clearable
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
                clearable
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
                clearable
                required
              ></v-text-field>
            </v-flex>
            <v-flex xs4 sm4>
              <v-select v-model="pacestado" v-bind:items="estados" label="Estado" clearable required></v-select>
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
                clearable
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
                clearable
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
    formValido () {
      return this.pacnome !== '' &&
      this.pacnome !== undefined &&
      this.pacnome !== null &&
      this.paccodigo !== '' &&
      this.paccodigo !== undefined &&
      this.paccodigo !== null &&
      this.pactelefone1 !== '' &&
      this.pactelefone1 !== undefined &&
      this.pactelefone1 !== null &&
      this.pacteletipo1 !== '' &&
      this.pacteletipo1 !== undefined &&
      this.pacteletipo1 !== null &&
      this.paccidade !== '' &&
      this.paccidade !== undefined &&
      this.paccidade !== null &&
      this.pacestado !== '' &&
      this.pacestado !== undefined &&
      this.pacestado !== null &&
      this.pacdatanasc !== '' &&
      this.pacdatanasc !== undefined &&
      this.pacdatanasc !== null
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
      this.$store.dispatch('criarPaciente', dadosPaciente)
      this.$store.dispatch('todosPacientes')
      this.$router.push('/pacientes')
    }
  },
  created () {
    window.scrollTo(0, 0)
  }
}
</script>

