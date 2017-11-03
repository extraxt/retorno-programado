<template>
  <v-container>
    <v-layout row wrap>
      <v-flex class="text-xs-center" xs12 mb-2>
          <h3>TODOS PACIENTES</h3>
          <v-btn to="/novopaciente">Adicionar Novo Paciente</v-btn>
      </v-flex>
      </v-layout>
      <v-layout>
      <v-flex xs12 md6 offset-md3>
        <v-card>
          <v-list>
            <v-list-tile avatar v-for="paciente in pacientes" :key="paciente.nome">
                <v-list-tile-content>
                    <v-list-tile-title v-text="paciente.nome"></v-list-tile-title>
                </v-list-tile-content>
            </v-list-tile>
        </v-list>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  export default {
    data () {
      return {
        pacientes: [
          {nome: 'Joaquim Teixeira'},
          {nome: 'Maria Joaquina'},
          {nome: 'Marcos Abreu'},
          {nome: 'Florentina Camargo'},
          {nome: 'Manuel Florenal'},
          {nome: 'Manuel Florenal'},
          {nome: 'Manuel Florenal'},
          {nome: 'Manuel Florenal'},
          {nome: 'Manuel Florenal'},
          {nome: 'Manuel Florenal'},
          {nome: 'Manuel Florenal'},
          {nome: 'Manuel Florenal'}
        ]
      }
    }
  }
</script>
