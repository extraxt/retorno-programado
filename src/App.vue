<template>
  <v-app class="application--toolbar application--footer application--footer-fixed">
    <v-navigation-drawer temporary app dark v-model="sideNav" width="200">
      <v-list>
        <v-list-tile
          v-for="item in menuItems"
          :key="item.titulo"
          :to="item.link">
          <v-list-tile-action>
            <v-icon>{{ item.icone }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>{{ item.titulo }}</v-list-tile-content>
        </v-list-tile>
        <v-list-tile
          v-if="usuarioEstaAutenticado"
          @click="onLogout">
          <v-list-tile-action>
            <v-icon>exit_to_app</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>Sair</v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar flat dense dark class="primary">
      <span class="hidden-md-and-up">
        <v-toolbar-side-icon class="white blue--text"
        @click.stop="sideNav = !sideNav"></v-toolbar-side-icon>  
      </span>
      <v-toolbar-title>
        <router-link to="/" tag="span" style="cursor: pointer">dental<b>back</b></router-link>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-sm-and-down">
        <v-btn
          flat
          v-for="item in menuItems"
          :key="item.titulo"
          :to="item.link">
          <v-icon left dark>{{ item.icone }}</v-icon>
          {{ item.titulo }}
        </v-btn>
        <v-btn
          v-if="usuarioEstaAutenticado"
          flat
          @click="onLogout">
          <v-icon left dark>exit_to_app</v-icon>
          Sair
        </v-btn>
      </v-toolbar-items>
    </v-toolbar>
    <main>
      <router-view></router-view>
    </main>
    <!-- <v-bottom-sheet v-model="sheet" v-if="usuarioEstaAutenticado" inset>
      <v-btn style="bottom: 60px"
        absolute
        dark
        fab
        bottom
        right
        fixed
        color="grey"
        slot="activator">
        <v-icon>grade</v-icon>
      </v-btn>
      <v-list>
        <v-subheader>Ações Rápidas</v-subheader>
        <v-list-tile
          v-for="tile in tiles"
          :key="tile.title"
          @click="sheet = false"
        >
          <v-list-tile-avatar>
            <v-avatar size="32px" tile>
              <v-icon :color="tile.cor">{{ tile.icon }}</v-icon>
            </v-avatar>
          </v-list-tile-avatar>
          <v-list-tile-title>{{ tile.title }}</v-list-tile-title>
        </v-list-tile>
      </v-list>
    </v-bottom-sheet> -->
  </v-app>
</template>

<script>
  export default {
    data () {
      return {
        sheet: false,
        tiles: [
          {icon: 'note_add', title: 'Adicionar Retorno', cor: 'green'},
          {icon: 'add', title: 'Adicionar Paciente', cor: 'green'}
        ],
        sideNav: false
      }
    },
    computed: {
      menuItems () {
        let menuItems = [
          {icone: 'face', titulo: 'Cadastre-se', link: '/registrar'},
          {icone: 'lock_open', titulo: 'Entrar', link: '/entrar'}
        ]
        if (this.usuarioEstaAutenticado) {
          menuItems = [
            {icone: 'line_weight', titulo: 'Todos os Retornos', link: '/retornos'},
            {icone: 'note_add', titulo: 'Novo Retorno', link: '/novoretorno'},
            {icone: 'account_box', titulo: 'Pacientes', link: '/pacientes'},
            {icone: 'home', titulo: 'Clínicas', link: '/clinicas'}
          ]
        }
        return menuItems
      },
      usuarioEstaAutenticado () {
        return this.$store.getters.user !== null && this.$store.getters.user !== undefined
      }
    },
    methods: {
      onLogout () {
        this.$store.dispatch('logout')
      }
    }
  }
</script>

<style lang="stylus">
  @import './stylus/main'
</style>
