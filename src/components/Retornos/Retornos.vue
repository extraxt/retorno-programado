<template>
  <v-container mt-0>
    <v-layout>
        <v-flex>
        <v-toolbar class="white elevation-1">
          <v-toolbar-title><h4 class="mb-0">todos<b>retornos</b></h4></v-toolbar-title>
          <v-spacer></v-spacer>
        </v-toolbar>
      </v-flex>
    </v-layout>
    <v-layout>
      <v-flex xs12>
          <v-layout row wrap mt-4>
            <v-flex class="mb-4 mr-1">
                <v-card class="elevation-1 text-xs-center">
                    <v-toolbar flat class="red darken-1">
                        <div><b class="white--text text-xs-center">Remover os pontos e falar sobre Implante um abraço</b></div>
                    </v-toolbar>
                    <v-divider></v-divider>
                    <v-card-text class="grey lighten-3">
                        <div>
                            <h2 class="headline mb-0">Rafael de Oliveira</h2>
                            <div class="grey--text">30 anos - Código: AP</div>
                            <br>
                            <h4 class="headline mb-0"><b>6 meses</b></h4>
                            <div class="grey--text">01/01/2017 - 01/12/2017</div>
                        </div>
                        <v-btn
                            color="grey darken-2 elevation-1"
                            to="/retorno/-Kyl3mE0dgYRh8wF_Zrk"
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
    todosRetornos () {
      return this.$store.getters.todosRetornos
    }
  }
}
</script>
