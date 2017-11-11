<template>
  <v-container>
    <v-card>
    <v-card-title>
      <div>
        <h3>Ficha do Paciente</h3>
      </div>
    </v-card-title>
    <v-divider></v-divider>
    <v-card-text v-if="!editar">
    <v-layout row>
      <v-flex xs12>
          <v-layout row>
            <v-flex xs12 sm10 offset-sm1 md8 offset-md2>
              <p>Nome:</p>
              <h5 class="grey lighten-4">{{ unicoPaciente.nome }}</h5>
            </v-flex>
          </v-layout>
          <v-layout row>
            <v-flex xs6 sm4 offset-sm1 md3 offset-md2 lg2 offset-lg2>
              <p>Código:</p>
              <h5 class="grey lighten-4">{{ unicoPaciente.codigo }}</h5>
            </v-flex>
          </v-layout>
          <v-layout row>
            <v-flex xs8 sm6 offset-sm1 md4 offset-md2 mr-2>
              <p>Telefone:</p>
              <h5 class="grey lighten-4">{{ unicoPaciente.telefone1 }}</h5>
            </v-flex>
            <v-flex xs4 sm4>
              <p>Tipo Tel.:</p>
              <h5 class="grey lighten-4">{{ unicoPaciente.teletipo1 }}</h5>
            </v-flex>
          </v-layout>
          <v-layout row>
            <v-flex v-if="unicoPaciente.telefone2" xs8 sm6 offset-sm1 md4 offset-md2 mr-2>
              <p>Telefone:</p>
              <h5 class="grey lighten-4">{{ unicoPaciente.telefone2 }}</h5>
            </v-flex>
            <v-flex v-if="unicoPaciente.telefone2" xs4 sm4>
              <p>Tipo Tel.:</p>
              <h5 class="grey lighten-4">{{ unicoPaciente.teletipo2 }}</h5>
            </v-flex>
          </v-layout>
          <v-layout row>
            <v-flex xs12 sm8 offset-sm1 md6 offset-md2 lg4 offset-lg2>
              <p>Email:</p>
              <h5 class="grey lighten-4">{{ unicoPaciente.email }}</h5>
            </v-flex>
          </v-layout>
          <v-layout row>
            <v-flex xs12 sm10 offset-sm1 md8 offset-md2>
              <p>Endereço:</p>
              <h5 class="grey lighten-4">{{ unicoPaciente.endereco }}</h5>
            </v-flex>
          </v-layout>
          <v-layout row>
            <v-flex xs8 sm6 offset-sm1 md4 offset-md2 mr-2>
              <p>Cidade:</p>
              <h5 class="grey lighten-4">{{ unicoPaciente.cidade }}</h5>
            </v-flex>
            <v-flex xs4 sm4>
              <p>Estado:</p>
              <h5 class="grey lighten-4">{{ unicoPaciente.estado }}</h5>
            </v-flex>
          </v-layout>
          <v-layout row>
            <v-flex xs12 sm10 offset-sm1 md8 offset-md2>
              <p>Sexo:</p>
              <h5 class="grey lighten-4">{{ unicoPaciente.sexo }}</h5>
            </v-flex>
          </v-layout>
          <v-layout row>
            <v-flex xs6 sm4 offset-sm1 md2 offset-md2>
              <p>Data Nascimento:</p>
              <h5 class="grey lighten-4">{{ unicoPaciente.datanasc }}</h5>
            </v-flex>
          </v-layout>
          <v-layout row>
            <v-flex xs12 sm10 offset-sm1 md8 offset-md2>
              <p>Observações Gerais:</p>
              <h5 class="grey lighten-4">{{ unicoPaciente.obs }}</h5>
            </v-flex>
          </v-layout>
          <v-layout row>
            <v-flex class="text-xs-center" xs12 sm10 offset-sm1 md8 offset-md2>
              <v-btn
                small
                class="primary"
                type="submit"
                @click="editarUnicoPaciente"
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
                class="error"
                type="submit"
                @click="editar=!editar"
                :loading="loading">CANCELAR EDIÇÃO
                <span slot="loader" class="custom-loader">
                  <v-icon light>cached</v-icon>
                </span>
              </v-btn>
            </v-flex>
          </v-layout>
    <v-layout row>
      <v-flex xs12>
        <form @submit.prevent="atualizarPaciente">
          <v-layout row>
            <v-flex xs12 sm10 offset-sm1 md8 offset-md2>
              <v-text-field
                name="nome"
                v-model="pacnome"
                label="Nome do Paciente"
                id="nome"
                required
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
import AwesomeMask from 'awesome-mask'

export default {
  props: ['id'],
  data () {
    return {
      editar: false,
      teletipos: ['WhatsApp', 'Celular', 'Casa', 'Trabalho'],
      estados: ['AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA', 'MT', 'MS', 'MG', 'PA', 'PB', 'PR', 'PE', 'PI', 'RJ', 'RN', 'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO'],
      telefone: '(99)999999999',
      datanasc: '99/99/9999',
      pacsexo: '',
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
    unicoPaciente () {
      return this.$store.getters.unicoPaciente(this.id)
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
    editarUnicoPaciente () {
      this.editar = !this.editar

      this.pacnome = this.unicoPaciente.nome
      this.paccodigo = this.unicoPaciente.codigo
      this.pactelefone1 = this.unicoPaciente.telefone1
      this.pacteletipo1 = this.unicoPaciente.teletipo1
      this.pactelefone2 = this.unicoPaciente.telefone2
      this.pacteletipo2 = this.unicoPaciente.teletipo2
      this.pacemail = this.unicoPaciente.email
      this.pacendereco = this.unicoPaciente.endereco
      this.paccidade = this.unicoPaciente.cidade
      this.pacestado = this.unicoPaciente.estado
      this.pacsexo = this.unicoPaciente.sexo
      this.pacdatanasc = this.unicoPaciente.datanasc
      this.pacobs = this.unicoPaciente.obs
    },
    atualizarPaciente () {
      const payloadPaciente = {}
      payloadPaciente.id = this.id
      if (this.pacnome !== this.unicoPaciente.nome) {
        payloadPaciente.nome = this.pacnome
      }
      if (this.paccodigo !== this.unicoPaciente.codigo) {
        payloadPaciente.codigo = this.paccodigo
      }
      if (this.pactelefone1 !== this.unicoPaciente.telefone1) {
        payloadPaciente.telefone1 = this.pactelefone1
      }
      if (this.pacteletipo1 !== this.unicoPaciente.teletipo1) {
        payloadPaciente.teletipo1 = this.pacteletipo1
      }
      if (this.pactelefone2 !== this.unicoPaciente.telefone2) {
        payloadPaciente.telefone2 = this.pactelefone2
      }
      if (this.pacteletipo2 !== this.unicoPaciente.teletipo2) {
        payloadPaciente.teletipo2 = this.pacteletipo2
      }
      if (this.pacemail !== this.unicoPaciente.email) {
        payloadPaciente.email = this.pacemail
      }
      if (this.pacendereco !== this.unicoPaciente.endereco) {
        payloadPaciente.endereco = this.pacendereco
      }
      if (this.paccidade !== this.unicoPaciente.cidade) {
        payloadPaciente.cidade = this.paccidade
      }
      if (this.pacestado !== this.unicoPaciente.estado) {
        payloadPaciente.estado = this.pacestado
      }
      if (this.pacsexo !== this.unicoPaciente.sexo) {
        payloadPaciente.sexo = this.pacsexo
      }
      if (this.datanasc !== this.unicoPaciente.datanasc) {
        payloadPaciente.datanasc = this.pacdatanasc
      }
      if (this.pacobs !== this.unicoPaciente.obs) {
        payloadPaciente.obs = this.pacobs
      }
      this.$store.dispatch('editarPaciente', payloadPaciente)
      this.$router.push('/pacientes')
      this.$store.dispatch('todosPacientes')
    }
  }
}
</script>
