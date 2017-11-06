<template>
  <v-container mt-0>
    <v-layout row wrap>
      <v-flex class="text-xs-center" xs12 mb-2>
          <h3>TODOS PACIENTES</h3>
          <v-btn to="/novopaciente">Adicionar Novo Paciente</v-btn>
      </v-flex>
      </v-layout>
      <v-layout>
        <v-flex xs12>
          <v-expansion-panel popout>
            <v-expansion-panel-content v-for="paciente in todosPacientes" :key="paciente.id">
              <div slot="header">{{ paciente.nome }}</div>
              <v-card>
                <v-card-text class="grey lighten-3">...</v-card-text>
              </v-card>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-flex>
      </v-layout>
  </v-container>
</template>

<script>
  export default {
    computed: {
      todosPacientes () {
        return this.$store.getters.todosPacientes
      }
    }
  }
</script>
