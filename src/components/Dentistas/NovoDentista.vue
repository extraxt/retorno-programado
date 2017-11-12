<template>
  <v-container>
    <v-card>
    <v-card-title>
      <div>
        <h3 class="blue--text">novo<b>dentista</b></h3>
        <p>Preencha o máximo de informações possível.</p>
      </div>
    </v-card-title>
    <v-card-text>
    <v-layout row>
      <v-flex xs12>
        <form @submit.prevent="onNovoDentista">
          <v-layout row>
            <v-flex xs12 sm10 offset-sm1 md8 offset-md2>
              <v-text-field
                name="nome"
                v-model="dentnome"
                label="Nome do Dentista"
                id="nome"
                placeholder="Ex.: Rafael de Oliveira"
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
                required></v-text-field>
            </v-flex>
            <v-flex xs4 sm4>
              <v-select v-bind:items="teletipos" v-model="dentteletipo1" label="Tipo:" required>
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
                ></v-text-field>
            </v-flex>
            <v-flex xs4 sm4>
              <v-select v-bind:items="teletipos" v-model="dentteletipo2" label="Tipo:">
              </v-select>
            </v-flex>
          </v-layout>
          <v-layout row>
            <v-flex xs12 sm8 offset-sm1 md6 offset-md2 lg4 offset-lg2>
              <v-text-field
                name="email"
                label="E-Mail do Dentista"
                id="email"
                type="email"
                v-model="dentemail"
                placeholder="email-do-dentista@gmail.com"
                hint="Ex.: email-do-dentista@gmail.com"
                ></v-text-field>
            </v-flex>
          </v-layout>
          <v-layout row>
            <v-flex xs12 sm10 offset-sm1 md8 offset-md2>
              <v-text-field
                name="endereco"
                label="Endereço do Dentista"
                id="endereco"
                v-model="dentendereco"
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
                v-model="dentcidade"
                hint="Ex.: Lapa"
                required
              ></v-text-field>
            </v-flex>
            <v-flex xs4 sm4>
              <v-select v-model="dentestado" v-bind:items="estados" label="Estado" required></v-select>
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
              ></v-text-field>
            </v-flex>
          </v-layout>
          <v-layout row>
            <v-flex class="text-xs-center" xs12 sm10 offset-sm1 md8 offset-md2>
              <v-btn
                class="primary"
                type="submit"
                :loading="loading"
                :disabled="!formValido">Cadastrar Dentista
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
    formValido () {
      return this.dentnome !== '' &&
      this.denttelefone1 !== '' &&
      this.dentteletipo1 !== '' &&
      this.dentcidade !== '' &&
      this.dentestado !== ''
    },
    loading () {
      return this.$store.getters.loading
    }
  },
  directives: {
    mask: AwesomeMask
  },
  methods: {
    onNovoDentista () {
      if (!this.formValido) {
        return
      }
      const dadosDentista = {
        dentnome: this.dentnome,
        denttelefone1: this.denttelefone1,
        dentteletipo1: this.dentteletipo1,
        denttelefone2: this.denttelefone2,
        dentteletipo2: this.dentteletipo2,
        dentemail: this.dentemail,
        dentendereco: this.dentendereco,
        dentcidade: this.dentcidade,
        dentestado: this.dentestado,
        dentobs: this.dentobs
      }
      console.log(dadosDentista)
      this.$store.dispatch('criarDentista', dadosDentista)
      this.$store.dispatch('todosDentistas')
      this.$router.push('/dentistas')
    }
  }
}
</script>
