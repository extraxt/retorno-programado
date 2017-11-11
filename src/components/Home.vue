<template>
  <v-container>
    <v-layout row wrap v-if="!usuarioEstaAutenticado">
      <v-flex xs12>
        <v-card flat class="blue-grey darken-2 white--text">
          <v-card-title primary-title>
            <div class="headline">Seja Bem-vindo!</div>
          </v-card-title>
          <v-card-text>
            Se você já é nosso usuário, faça o 'Login'.<br>
            <br>
            Se você não possui registro, faça agora mesmo. Clique no botão abaixo.
          </v-card-text>
          <v-card-actions>
            <v-btn flat dark block to="/registrar" class="mb-0">Faça seu Registro Agora</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
    <v-layout v-else>
      <v-flex xs12>
        <v-card flat class="blue-grey darken-2 white--text">
        <v-card-title primary-title>
          <div class="headline">Adicione uma Clínica</div>
        </v-card-title>
        <v-card-text>
          <p>Para começar, você precisa criar sua primeira clínica:</p>
        </v-card-text>
        <v-card-actions class="grey">
          <v-btn flat dark block to="/novaclinica" class="mb-0">Criar primeira clínica</v-btn>
        </v-card-actions>
      </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  export default {
    computed: {
      usuarioEstaAutenticado () {
        return this.$store.getters.user !== null && this.$store.getters.user !== undefined
      },
      todosPacientes () {
        return this.$store.getters.todosPacientes
      }
    }
  }
</script>

