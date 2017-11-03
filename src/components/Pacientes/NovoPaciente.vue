<template>
  <v-container>
    <v-layout row wrap>
      <v-flex class="text-xs-center" xs12 mb-2>
          <h3>NOVO PACIENTE</h3>
      </v-flex>
    </v-layout>
    <v-layout row>
      <v-flex xs12>
        <form @submit.prevent="">
          <v-layout row>
            <v-flex xs12 sm10 offset-sm1 md8 offset-md2>
              <v-text-field
                name="nome"
                label="Nome do Paciente"
                id="nome"
                required></v-text-field>
            </v-flex>
          </v-layout>
          <v-layout row>
            <v-flex xs6 sm4 offset-sm1 md3 offset-md2 lg2 offset-lg2>
              <v-text-field
                name="codigo"
                label="Cód. do Paciente"
                id="codigo"
                ></v-text-field>
            </v-flex>
          </v-layout>
          <v-layout row>
            <v-flex xs8 sm6 offset-sm1 md4 offset-md2>
              <v-text-field
                name="telefone1"
                label="Telefone 1"
                id="telefone1"
                prepend-icon="phone"
                required></v-text-field>
            </v-flex>
            <v-flex xs4 sm4>
              <v-select v-bind:items="[{ text: 'WhatsApp' }, { text: 'Celular' }, { text: 'Casa' }, { text: 'Trabalho' }]" label="Tipo" required></v-select>
            </v-flex>
          </v-layout>
          <v-layout row>
            <v-flex xs8 sm6 offset-sm1 md4 offset-md2>
              <v-text-field
                name="telefone2"
                label="Telefone 2"
                id="telefone2"
                prepend-icon="phone"
                ></v-text-field>
            </v-flex>
            <v-flex xs4 sm4>
              <v-select v-bind:items="[{ text: 'WhatsApp' }, { text: 'Celular' }, { text: 'Casa' }, { text: 'Trabalho' }]" label="Tipo"></v-select>
            </v-flex>
          </v-layout>
          <v-layout row>
            <v-flex xs12 sm8 offset-sm1 md6 offset-md2 lg4 offset-lg2>
              <v-text-field
                name="email"
                label="E-Mail do Paciente"
                id="email"
                type="email"
                placeholder="meu-email@gmail.com"
                hint="Ex.: meu-email@gmail.com"
                ></v-text-field>
            </v-flex>
          </v-layout>
          <v-layout row>
            <v-flex xs12 sm10 offset-sm1 md8 offset-md2>
              <v-text-field
                name="endereco"
                label="Endereço do Paciente"
                id="endereco"
                hint="Ex.: Rua das Flores, 123 - Centro - Lapa/PR"
              ></v-text-field>
            </v-flex>
          </v-layout>
          <v-layout row>
            <v-flex xs12 sm10 offset-sm1 md8 offset-md2>
              <br>
              <p>Escolha o sexo:</p>
              <v-radio-group v-model="sexo" required>
                <v-radio label="Masculino" value="masculino" v-model="sexo"></v-radio>
                <br>
                <v-radio label="Feminino" value="feminino" v-model="sexo"></v-radio>
            </v-radio-group>
            <br>
            </v-flex>
          </v-layout>
          <v-layout row>
            <v-flex xs6 sm4 offset-sm1 md2 offset-md2>
              <v-text-field
                name="datanasc"
                label="Nascimento"
                placeholder="Ex: 30/12/1970"
                id="datanasc"
              ></v-text-field>
            </v-flex>
          </v-layout>
          <v-layout row>
            <v-flex xs12 sm10 offset-sm1 md8 offset-md2>
              <v-text-field
                name="observacoes"
                label="Observações Gerais"
                id="observacoes"
                placeholder="Alguma informação a mais?"
                multi-line
              ></v-text-field>
            </v-flex>
          </v-layout>
          <v-layout row>
            <v-flex class="text-xs-center" xs12 sm10 offset-sm1 md8 offset-md2>
              <v-btn
                class="primary"
                type="submit">Cadastrar Paciente</v-btn>
            </v-flex>
          </v-layout>
          <br><br><br>
        </form>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  data () {
    return {
      sexo: 'null'
    }
  }
}
</script>

