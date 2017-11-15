<template>
  <v-container>
    <v-card class="elevation-1">
    <v-card-title>
      <div>
        <h3 class="blue--text">dados<b>dentista</b></h3>
      </div>
    </v-card-title>
    <v-card-text v-if="!editar">
        <v-layout row>
            <v-flex xs12>
                <v-layout row>
                    <v-flex xs12 sm10 offset-sm1 md8 offset-md2>
                        <p class="mb-0">Nome do Dentista:</p>
                        <h5><b>{{ unicoDentista.nome }}</b></h5>
                    </v-flex>
                </v-layout>
          <v-layout row>
            <v-flex xs8 sm6 offset-sm1 md4 offset-md2>
              <p class="mb-0">Telefone:</p>
              <h5><b>{{ unicoDentista.telefone1 }}</b></h5>
            </v-flex>
            <v-flex xs4 sm4>
              <p class="mb-0">Tipo Tel.:</p>
              <h5><b>{{ unicoDentista.teletipo1 }}</b></h5>
            </v-flex>
          </v-layout>
          <v-layout row v-if="unicoDentista.telefone2">
            <v-flex xs8 sm6 offset-sm1 md4 offset-md2>
              <p class="mb-0">Telefone:</p>
              <h5><b>{{ unicoDentista.telefone2 }}</b></h5>
            </v-flex>
            <v-flex xs4 sm4>
              <p class="mb-0">Tipo Tel.:</p>
              <h5><b>{{ unicoDentista.teletipo2 }}</b></h5>
            </v-flex>
          </v-layout>
          <v-layout row v-if="unicoDentista.email">
            <v-flex xs12 sm8 offset-sm1 md6 offset-md2 lg4 offset-lg2>
              <p class="mb-0">Email:</p>
              <h5><b>{{ unicoDentista.email }}</b></h5>
            </v-flex>
          </v-layout>
          <v-layout row v-if="unicoDentista.endereco">
            <v-flex xs12 sm10 offset-sm1 md8 offset-md2>
              <p class="mb-0">Endereço:</p>
              <h5><b>{{ unicoDentista.endereco }}</b></h5>
            </v-flex>
          </v-layout>
          <v-layout row>
            <v-flex xs8 sm6 offset-sm1 md4 offset-md2>
              <p class="mb-0">Cidade:</p>
              <h5><b>{{ unicoDentista.cidade }}</b></h5>
            </v-flex>
            <v-flex xs4 sm4>
              <p class="mb-0">Estado:</p>
              <h5><b>{{ unicoDentista.estado }}</b></h5>
            </v-flex>
          </v-layout>
          <v-layout row v-if="unicoDentista.obs">
            <v-flex xs12 sm10 offset-sm1 md8 offset-md2>
              <p class="mb-0">Observações Gerais:</p>
              <h5><b>{{ unicoDentista.obs }}</b></h5>
            </v-flex>
          </v-layout>
          <v-layout row>
            <v-flex class="text-xs-center" xs12 sm10 offset-sm1 md8 offset-md2>
              <v-btn
                class="primary elevation-1"
                :loading="loading"
                @click="editarUnicoDentista"
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
          class="warning mb-4 elevation-1"
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
          <form @submit.prevent="atualizarDentista">
            <v-layout row>
                <v-flex xs12 sm10 offset-sm1 md8 offset-md2>
                <v-text-field
                    name="nome"
                    v-model="dentnome"
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
                    v-model="denttelefone1"
                    label="Telefone 1"
                    id="telefone1"
                    prepend-icon="phone"
                    v-mask="telefone"
                    clearable
                    required></v-text-field>
                </v-flex>
                <v-flex xs4 sm4>
                <v-select v-bind:items="teletipos" v-model="dentteletipo1" clearable label="Tipo:" required>
                </v-select>
                </v-flex>
            </v-layout>
            <v-layout row>
                <v-flex xs8 sm6 offset-sm1 md4 offset-md2>
                <v-text-field
                    name="telefone2"
                    v-model="denttelefone2"
                    label="Telefone 2"
                    id="telefone2"
                    prepend-icon="phone"
                    v-mask="telefone"
                    clearable
                    ></v-text-field>
                </v-flex>
                <v-flex xs4 sm4>
                <v-select v-bind:items="teletipos" v-model="dentteletipo2" clearable label="Tipo:">
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
                    v-model="dentemail"
                    placeholder="email-do-dentista@gmail.com"
                    hint="Ex.: email-do-dentista@gmail.com"
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
                    v-model="dentendereco"
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
                    v-model="dentcidade"
                    hint="Ex.: Lapa"
                    required
                    clearable
                ></v-text-field>
                </v-flex>
                <v-flex xs4 sm4>
                <v-select v-model="dentestado" v-bind:items="estados" label="Estado" required clearable></v-select>
                </v-flex>
            </v-layout>
            <v-layout row>
                <v-flex xs12 sm10 offset-sm1 md8 offset-md2>
                <v-text-field
                    name="observacoes"
                    label="Observações Gerais"
                    id="observacoes"
                    v-model="dentobs"
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
      deletar: false,
      teletipos: ['Fixo', 'Celular'],
      estados: ['AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA', 'MT', 'MS', 'MG', 'PA', 'PB', 'PR', 'PE', 'PI', 'RJ', 'RN', 'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO'],
      telefone: '(99)999999999',
      dentnome: '',
      denttelefone1: '',
      dentteletipo1: '',
      denttelefone2: '',
      dentteletipo2: '',
      dentemail: '',
      dentendereco: '',
      dentcidade: '',
      dentestado: '',
      dentobs: ''
    }
  },
  computed: {
    unicoDentista () {
      return this.$store.getters.unicoDentista(this.id)
    },
    formValido () {
      return this.dentnome !== '' &&
      this.dentnome !== undefined &&
      this.dentnome !== null &&
      this.denttelefone1 !== '' &&
      this.denttelefone1 !== undefined &&
      this.denttelefone1 !== null &&
      this.dentteletipo1 !== '' &&
      this.dentteletipo1 !== undefined &&
      this.dentteletipo1 !== null &&
      this.dentcidade !== '' &&
      this.dentcidade !== undefined &&
      this.dentcidade !== null &&
      this.dentestado !== '' &&
      this.dentestado !== undefined &&
      this.dentestado !== null
    },
    loading () {
      return this.$store.getters.loading
    }
  },
  directives: {
    mask: AwesomeMask
  },
  methods: {
    editarUnicoDentista () {
      this.editar = !this.editar
      this.dentnome = this.unicoDentista.nome
      this.denttelefone1 = this.unicoDentista.telefone1
      this.dentteletipo1 = this.unicoDentista.teletipo1
      this.denttelefone2 = this.unicoDentista.telefone2
      this.dentteletipo2 = this.unicoDentista.teletipo2
      this.dentemail = this.unicoDentista.email
      this.dentendereco = this.unicoDentista.endereco
      this.dentcidade = this.unicoDentista.cidade
      this.dentestado = this.unicoDentista.estado
      this.dentobs = this.unicoDentista.obs
    },
    atualizarDentista () {
      const payloadDentista = {}
      payloadDentista.id = this.id
      if (this.dentnome !== this.unicoDentista.nome) {
        payloadDentista.nome = this.dentnome
      }
      if (this.denttelefone1 !== this.unicoDentista.telefone1) {
        payloadDentista.telefone1 = this.denttelefone1
      }
      if (this.dentteletipo1 !== this.unicoDentista.teletipo1) {
        payloadDentista.teletipo1 = this.dentteletipo1
      }
      if (this.denttelefone2 !== this.unicoDentista.telefone2) {
        payloadDentista.telefone2 = this.denttelefone2
      }
      if (this.dentteletipo2 !== this.unicoDentista.teletipo2) {
        payloadDentista.teletipo2 = this.dentteletipo2
      }
      if (this.dentemail !== this.unicoDentista.email) {
        payloadDentista.email = this.dentemail
      }
      if (this.dentendereco !== this.unicoDentista.endereco) {
        payloadDentista.endereco = this.dentendereco
      }
      if (this.dentcidade !== this.unicoDentista.cidade) {
        payloadDentista.cidade = this.dentcidade
      }
      if (this.dentestado !== this.unicoDentista.estado) {
        payloadDentista.estado = this.dentestado
      }
      if (this.dentobs !== this.unicoDentista.obs) {
        payloadDentista.obs = this.dentobs
      }
      this.$store.dispatch('editarDentista', payloadDentista)
      this.editar = !this.editar
      this.$router.push('/dentista/' + this.id)
      this.$store.dispatch('todosDentistas')
      window.scrollTo(0, 0)
    }
  },
  created () {
    window.scrollTo(0, 0)
  }
}
</script>
