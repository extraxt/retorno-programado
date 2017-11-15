<template>
  <v-container>
    <v-layout row wrap v-if="!usuarioEstaAutenticado" justify-center>
      <h4>Você não está Logado.</h4>
    </v-layout>
    <v-layout v-else justify-center>
      <h4>Você está Logado.</h4>
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
    },
    created () {
      window.scrollTo(0, 0)
    }
  }
</script>

