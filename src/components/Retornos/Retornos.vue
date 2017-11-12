<template>
  <v-container mt-0>
    <v-layout>
        <v-flex>
        <v-toolbar class="blue lighten-1 elevation-1">
          <v-toolbar-title class="white--text"><h4 class="mb-0">todos<b>retornos</b></h4></v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn small fab to="/novoretorno" class="green lighten-1 white--text elevation-1">
            <v-icon>add</v-icon>
          </v-btn>
        </v-toolbar>
      </v-flex>
    </v-layout>
    <v-layout>
      <v-flex>
          <v-layout row wrap mt-4>
            <v-flex class="mb-4 mr-1" v-for="retorno in filtradoRetornos" :key="retorno.id" xs12 sm12 md12 lg12>
                <v-card class="elevation-1 text-xs-center">
                    <v-card-text class="grey lighten-3">
                        <div>
                            <div><b>{{ retorno.nomepac }}</b></div>
                            <div class="grey--text">Código: AP</div>
                            <h2 class="headline mb-0">{{ retorno.titulo }}</h2>
                            <br>
                            <h4 class="headline mb-0">Retornar em:<b> {{retorno.datavalidade }}</b></h4>
                            <div class="grey--text">Cadastrado em: {{ retorno.datacadastro }}</div>
                            <div class="grey--text">Período escolhido: {{ retorno.tempo }} dias</div>
                        </div>
                        <v-btn
                            color="grey darken-2 elevation-1"
                            :to="'/retorno/' + retorno.id"
                            dark
                            small
                            absolute
                            bottom
                            right
                            fab>
                            <v-icon>edit</v-icon>
                        </v-btn>
                    </v-card-text>
                </v-card>
            </v-flex>
          </v-layout>
      </v-flex>
    </v-layout> 
    <br><br>
  </v-container>
</template>

<script>
export default {
  data () {
    return {
      show: false
    }
  },
  computed: {
    filtradoRetornos () {
      return this.$store.getters.filtradoRetornos
    }
  }
}
</script>
