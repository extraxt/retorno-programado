<template>
  <v-container mt-0>
    <v-layout column wrap>
      <v-flex>
        <v-toolbar class="blue lighten-1 elevation-1">
          <v-toolbar-title class="white--text"><h4 class="mb-0">todos<b>pacientes</b></h4></v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn small fab to="/novopaciente" class="green lighten-1 white--text elevation-1">
            <v-icon>add</v-icon>
          </v-btn>
        </v-toolbar>
      </v-flex>
      <v-flex>
        <v-card class="elevation-1">
          <v-toolbar dense flat>
            <v-text-field class="text-xs-center"
              append-icon="search"
              label="Procurar..."
              single-line
              hide-details
              v-model="search"
            ></v-text-field>
          </v-toolbar>
          <v-data-table
              hide-headers
              hide-actions
              v-bind:items="todosPacientes"
              v-bind:search="search"
              no-data-text="Nenhum paciente cadastrado até o momento."
            >
            <template slot="items" slot-scope="props">
              <td>
                <router-link :to="'/paciente/'+props.item.id" tag="span" style="cursor: pointer">{{ props.item.nome }}</router-link>
              </td>
            </template>
            <template slot="pageText" slot-scope="{ pageStart, pageStop }">
              From {{ pageStart }} to {{ pageStop }}
            </template>
          </v-data-table>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  export default {
    data () {
      return {
        search: ''
      }
    },
    computed: {
      todosPacientes () {
        return this.$store.getters.todosPacientesSemDesativados
      }
    },
    created () {
      window.scrollTo(0, 0)
    }
  }
</script>
