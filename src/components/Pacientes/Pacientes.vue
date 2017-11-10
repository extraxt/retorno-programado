<template>
  <v-container mt-0>
    <v-layout column wrap>
      <v-flex>
        <v-card>
          <v-toolbar class="grey darken-3">
            <v-toolbar-title class="white--text letra-diferente">pacientes</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn small fab to="/novopaciente" class="green lighten-1 white--text">
              <v-icon>add</v-icon>
            </v-btn>
          </v-toolbar>
        </v-card>
      </v-flex>
      <v-flex>
        <v-card>
          <v-toolbar dense flat>
            <v-spacer></v-spacer>
            <v-toolbar-title>
            <v-text-field
              append-icon="search"
              label="Procurar..."
              single-line
              hide-details
              v-model="search"
            ></v-text-field></v-toolbar-title>
          </v-toolbar>
          <v-data-table
              hide-headers
              hide-actions
              v-bind:items="todosPacientes"
              v-bind:search="search"
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
        return this.$store.getters.todosPacientes
      }
    }
  }
</script>
