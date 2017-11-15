<template>
  <v-container>
    <v-card class="elevation-1">
    <v-card-title>
      <div>
        <h3 class="blue--text">dados<b>clínica</b></h3>
      </div>
    </v-card-title>
    <v-card-text v-if="!editar">
        <v-layout row>
            <v-flex xs12>
                <v-layout row>
                    <v-flex xs12 sm10 offset-sm1 md8 offset-md2>
                        <p class="mb-0">Nome da Clínica:</p>
                        <h5><b>{{ unicaClinica.nome }}</b></h5>
                    </v-flex>
                </v-layout>
          <v-layout row>
            <v-flex xs8 sm6 offset-sm1 md4 offset-md2>
              <p class="mb-0">Telefone:</p>
              <h5><b>{{ unicaClinica.telefone1 }}</b></h5>
            </v-flex>
            <v-flex xs4 sm4>
              <p class="mb-0">Tipo Tel.:</p>
              <h5><b>{{ unicaClinica.teletipo1 }}</b></h5>
            </v-flex>
          </v-layout>
          <v-layout row v-if="unicaClinica.telefone2">
            <v-flex xs8 sm6 offset-sm1 md4 offset-md2>
              <p class="mb-0">Telefone:</p>
              <h5><b>{{ unicaClinica.telefone2 }}</b></h5>
            </v-flex>
            <v-flex xs4 sm4>
              <p class="mb-0">Tipo Tel.:</p>
              <h5><b>{{ unicaClinica.teletipo2 }}</b></h5>
            </v-flex>
          </v-layout>
          <v-layout row v-if="unicaClinica.email">
            <v-flex xs12 sm8 offset-sm1 md6 offset-md2 lg4 offset-lg2>
              <p class="mb-0">Email:</p>
              <h5><b>{{ unicaClinica.email }}</b></h5>
            </v-flex>
          </v-layout>
          <v-layout row v-if="unicaClinica.endereco">
            <v-flex xs12 sm10 offset-sm1 md8 offset-md2>
              <p class="mb-0">Endereço:</p>
              <h5><b>{{ unicaClinica.endereco }}</b></h5>
            </v-flex>
          </v-layout>
          <v-layout row>
            <v-flex xs8 sm6 offset-sm1 md4 offset-md2>
              <p class="mb-0">Cidade:</p>
              <h5><b>{{ unicaClinica.cidade }}</b></h5>
            </v-flex>
            <v-flex xs4 sm4>
              <p class="mb-0">Estado:</p>
              <h5><b>{{ unicaClinica.estado }}</b></h5>
            </v-flex>
          </v-layout>
          <v-layout row v-if="unicaClinica.obs">
            <v-flex xs12 sm10 offset-sm1 md8 offset-md2>
              <p class="mb-0">Observações Gerais:</p>
              <h5><b>{{ unicaClinica.obs }}</b></h5>
            </v-flex>
          </v-layout>
          <v-layout row>
            <v-flex class="text-xs-center" xs12 sm10 offset-sm1 md8 offset-md2>
              <v-btn
                class="primary elevation-1"
                :loading="loading"
                @click="editarUnicaClinica"
                >Editar Dados
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
          class="error mb-4 elevation-1"
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
          <form @submit.prevent="atualizarClinica">
            <v-layout row>
                <v-flex xs12 sm10 offset-sm1 md8 offset-md2>
                <v-text-field
                    name="nome"
                    v-model="clinnome"
                    label="Nome da Clínica"
                    id="nome"
                    placeholder="Ex.: Clínica Odonto"
                    hint="Ex.: Clínica Odonto"
                    clearable
                    required></v-text-field>
                </v-flex>
            </v-layout>
            <v-layout row>
                <v-flex xs8 sm6 offset-sm1 md4 offset-md2>
                <v-text-field
                    name="telefone1"
                    v-model="clintelefone1"
                    label="Telefone 1"
                    id="telefone1"
                    prepend-icon="phone"
                    v-mask="telefone"
                    clearable
                    required></v-text-field>
                </v-flex>
                <v-flex xs4 sm4>
                <v-select v-bind:items="teletipos" v-model="clinteletipo1" clearable label="Tipo:" required>
                </v-select>
                </v-flex>
            </v-layout>
            <v-layout row>
                <v-flex xs8 sm6 offset-sm1 md4 offset-md2>
                <v-text-field
                    name="telefone2"
                    v-model="clintelefone2"
                    label="Telefone 2"
                    id="telefone2"
                    prepend-icon="phone"
                    v-mask="telefone"
                    clearable
                    ></v-text-field>
                </v-flex>
                <v-flex xs4 sm4>
                <v-select v-bind:items="teletipos" v-model="clinteletipo2" label="Tipo:" clearable>
                </v-select>
                </v-flex>
            </v-layout>
            <v-layout row>
                <v-flex xs12 sm8 offset-sm1 md6 offset-md2 lg4 offset-lg2>
                <v-text-field
                    name="email"
                    label="E-Mail da Clínica"
                    id="email"
                    type="email"
                    v-model="clinemail"
                    placeholder="email-da-clinica@gmail.com"
                    hint="Ex.: email-da-clinica@gmail.com"
                    clearable
                    ></v-text-field>
                </v-flex>
            </v-layout>
            <v-layout row>
                <v-flex xs12 sm10 offset-sm1 md8 offset-md2>
                <v-text-field
                    name="endereco"
                    label="Endereço da Clínica"
                    id="endereco"
                    v-model="clinendereco"
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
                    v-model="clincidade"
                    hint="Ex.: Lapa"
                    required
                    clearable
                ></v-text-field>
                </v-flex>
                <v-flex xs4 sm4>
                <v-select v-model="clinestado" v-bind:items="estados" label="Estado" required></v-select>
                </v-flex>
            </v-layout>
            <v-layout row>
                <v-flex xs12 sm10 offset-sm1 md8 offset-md2>
                <v-text-field
                    name="observacoes"
                    label="Observações Gerais"
                    id="observacoes"
                    v-model="clinobs"
                    placeholder="Alguma informação a mais?"
                    multi-line
                    clearable
                ></v-text-field>
                </v-flex>
            </v-layout>
            <v-layout row>
                <v-flex class="text-xs-center" xs12 sm10 offset-sm1 md8 offset-md2>
                <v-btn
                    class="primary elevation-1"
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
      teletipos: ['Fixo', 'Celular'],
      estados: ['AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA', 'MT', 'MS', 'MG', 'PA', 'PB', 'PR', 'PE', 'PI', 'RJ', 'RN', 'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO'],
      telefone: '(99)999999999',
      clinnome: '',
      clintelefone1: '',
      clinteletipo1: '',
      clintelefone2: '',
      clinteletipo2: '',
      clinemail: '',
      clinendereco: '',
      clincidade: '',
      clinestado: '',
      clinobs: ''
    }
  },
  computed: {
    unicaClinica () {
      return this.$store.getters.unicaClinica(this.id)
    },
    formValido () {
      return this.clinnome !== '' &&
      this.clinnome !== undefined &&
      this.clinnome !== null &&
      this.clintelefone1 !== '' &&
      this.clintelefone1 !== undefined &&
      this.clintelefone1 !== null &&
      this.clinteletipo1 !== '' &&
      this.clinteletipo1 !== undefined &&
      this.clinteletipo1 !== null &&
      this.clincidade !== '' &&
      this.clincidade !== undefined &&
      this.clincidade !== null &&
      this.clinestado !== '' &&
      this.clinestado !== undefined &&
      this.clinestado !== null
    },
    loading () {
      return this.$store.getters.loading
    }
  },
  directives: {
    mask: AwesomeMask
  },
  methods: {
    editarUnicaClinica () {
      this.editar = !this.editar
      this.clinnome = this.unicaClinica.nome
      this.clintelefone1 = this.unicaClinica.telefone1
      this.clinteletipo1 = this.unicaClinica.teletipo1
      this.clintelefone2 = this.unicaClinica.telefone2
      this.clinteletipo2 = this.unicaClinica.teletipo2
      this.clinemail = this.unicaClinica.email
      this.clinendereco = this.unicaClinica.endereco
      this.clincidade = this.unicaClinica.cidade
      this.clinestado = this.unicaClinica.estado
      this.clinobs = this.unicaClinica.obs
    },
    atualizarClinica () {
      const payloadClinica = {}
      payloadClinica.id = this.id
      if (this.clinnome !== this.unicaClinica.nome) {
        payloadClinica.nome = this.clinnome
      }
      if (this.clintelefone1 !== this.unicaClinica.telefone1) {
        payloadClinica.telefone1 = this.clintelefone1
      }
      if (this.clinteletipo1 !== this.unicaClinica.teletipo1) {
        payloadClinica.teletipo1 = this.clinteletipo1
      }
      if (this.clintelefone2 !== this.unicaClinica.telefone2) {
        payloadClinica.telefone2 = this.clintelefone2
      }
      if (this.clinteletipo2 !== this.unicaClinica.teletipo2) {
        payloadClinica.teletipo2 = this.clinteletipo2
      }
      if (this.clinemail !== this.unicaClinica.email) {
        payloadClinica.email = this.clinemail
      }
      if (this.clinendereco !== this.unicaClinica.endereco) {
        payloadClinica.endereco = this.clinendereco
      }
      if (this.clincidade !== this.unicaClinica.cidade) {
        payloadClinica.cidade = this.clincidade
      }
      if (this.clinestado !== this.unicaClinica.estado) {
        payloadClinica.estado = this.clinestado
      }
      if (this.clinobs !== this.unicaClinica.obs) {
        payloadClinica.obs = this.clinobs
      }
      this.$store.dispatch('editarClinica', payloadClinica)
      this.editar = !this.editar
      this.$router.push('/clinica/' + this.id)
      this.$store.dispatch('todasClinicas')
      window.scrollTo(0, 0)
    }
  },
  created () {
    window.scrollTo(0, 0)
  }
}
</script>
