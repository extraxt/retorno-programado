<template>
  <v-container>
    <v-card>
    <v-card-title>
      <div>
        <h3 class="blue--text">nova<b>clínica</b></h3>
        <p>Preencha o máximo de informações possível.</p>
      </div>
    </v-card-title>
    <v-card-text>
    <v-layout row>
      <v-flex xs12>
        <form @submit.prevent="onNovaClinica">
          <v-layout row>
            <v-flex xs12 sm10 offset-sm1 md8 offset-md2>
              <v-text-field
                name="nome"
                v-model="clinnome"
                label="Nome da Clínica"
                id="nome"
                placeholder="Ex.: Clínica Odonto"
                hint="Ex.: Clínica Odonto"
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
                required></v-text-field>
            </v-flex>
            <v-flex xs4 sm4>
              <v-select v-bind:items="teletipos" v-model="clinteletipo1" label="Tipo:" required>
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
                ></v-text-field>
            </v-flex>
            <v-flex xs4 sm4>
              <v-select v-bind:items="teletipos" v-model="clinteletipo2" label="Tipo:">
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
              ></v-text-field>
            </v-flex>
          </v-layout>
          <v-layout row>
            <v-flex class="text-xs-center" xs12 sm10 offset-sm1 md8 offset-md2>
              <v-btn
                class="primary"
                type="submit"
                :loading="loading"
                :disabled="!formValido">Cadastrar Clínica
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
    formValido () {
      return this.clinnome !== '' &&
      this.clintelefone1 !== '' &&
      this.clinteletipo1 !== '' &&
      this.clincidade !== '' &&
      this.clinestado !== ''
    },
    loading () {
      return this.$store.getters.loading
    }
  },
  directives: {
    mask: AwesomeMask
  },
  methods: {
    onNovaClinica () {
      if (!this.formValido) {
        return
      }
      const dadosClinica = {
        clinnome: this.clinnome,
        clintelefone1: this.clintelefone1,
        clinteletipo1: this.clinteletipo1,
        clintelefone2: this.clintelefone2,
        clinteletipo2: this.clinteletipo2,
        clinemail: this.clinemail,
        clinendereco: this.clinendereco,
        clincidade: this.clincidade,
        clinestado: this.clinestado,
        clinobs: this.clinobs
      }
      console.log(dadosClinica)
      this.$store.dispatch('criarClinica', dadosClinica)
      this.$router.push('/')
    }
  }
}
</script>

