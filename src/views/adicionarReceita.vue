<template>
  <div class="grey lighten-4">
    <v-container class="">
      <v-container class="mt-12" text-center>
        <v-row class="pa-0 elevation-3 mx-auto, rounded-xl">
          <v-col cols="">
            <h1 class="orange--text h1">Formulário para envio de receita</h1>
            <v-form>
              <v-text-field
                background-color="grey lighten-2"
                name="Novareceita"
                label="Nome da Receita"
                v-model="novaReceita"
                class="mt-4 mr-2"
                rounded
                solo
                dense
                placeholder="Nome da receita"
              >
              </v-text-field>
            </v-form>

            <template>
              <v-text-field
                background-color="grey lighten-2"
                solo
                prepend-inner-icon="mdi-camera"
                label="Adicionar link da imagem "
                color="red darken-1"
                v-model="imgChamada"
              ></v-text-field>
            </template>
            <v-divider></v-divider>
            <v-div>
              <h2 class="h2 mt-2 orange--text">
                <v-icon>mdi-noodles</v-icon>Ingredientes
              </h2>
            </v-div>
            <v-textarea
              background-color="grey lighten-2"
              name="ingredientes"
              solo
              color="black"
              auto-grow
              v-model="ingredientes"
              label="Escreva cada ingrediente por linha.Exemplo: 4x ovos "
            ></v-textarea>
          </v-col>

          <v-divider vertical></v-divider>

          <v-col class="mt-6">
            <v-div class="orange--text"
              ><h2 class="h2">Tempo de preparo</h2></v-div
            >
            <v-row class="pa-0">
              <v-text-field
                background-color="grey lighten-2"
                name="hora"
                v-model="hora"
                prepend-inner-icon="mdi-timer"
                rounded
                filled
                solo
                class="mt-4 mr-2 ml-2"
                label="Hora"
              ></v-text-field>

              <v-text-field
                background-color="grey lighten-2"
                name="minuto"
                v-model="minuto"
                prepend-inner-icon="mdi-timer"
                rounded
                solo
                filled
                class="mt-4 mr-2 ml-2"
                label="Minutos"
              ></v-text-field>
            </v-row>
            <v-divider></v-divider>

            <v-div>
              <h2 class="h2 orange--text">
                <v-icon class="gray">mdi-food-takeout-box</v-icon>
                Preço a se pagar:
              </h2>
              <v-textarea
                width="40px"
                height="50px"
                background-color="grey lighten-2"
                name="passos"
                v-model="preco"
                class="mt-3"
                solo
                color="black"
                auto-grow
                label="$$"
              ></v-textarea>
            </v-div>
            <v-div v-if="this.receita != undefined">
              <v-btn @click="atualizarReceita" rounded color="orange"
                >Atualizar receita</v-btn
              >
            </v-div>
            <v-div v-else>
              <v-btn @click="adicionar" block rounded color="orange"
                >Enviar receita</v-btn
              >
            </v-div>
          </v-col>
          <v-col>
            <v-img
              class="rounded-xl"
              src="@/assets/images/Frigideira.png"
            ></v-img>
          </v-col>
        </v-row>
      </v-container>
    </v-container>
  </div>
</template>

<script>
import * as fb from "@/plugins/firebase";
export default {
  props: ["receita"],
  data() {
    return {
      uid: "",
      novaReceita: "",
      imgChamada: "",
      igredientes: "",
      hora: "",
      minuto: "",
      passos: "",
      preco: "",
    };
  },
  created() {
    if (this.receita != undefined) {
      this.novaReceita = this.receita.novaReceita;
      (this.imgChamada = this.receita.imgChamada),
        (this.ingredientes = this.receita.ingredientes),
        (this.hora = this.receita.hora),
        (this.minuto = this.receita.minuto),
        (this.preco = this.receita.preco);
    }
  },
  methods: {
    async adicionar() {
      this.uid = fb.auth.currentUser.uid;
      await fb.tasksCollection.add({
        uid: this.uid,
        novaReceita: this.novaReceita,
        imgChamada: this.imgChamada,
        ingredientes: this.ingredientes,
        hora: this.hora,
        minuto: this.minuto,
        preco: this.preco,
        comentarios: [],
      });
    },
    async atualizarReceita() {
      await fb.tasksCollection.doc(this.receita.id).update({
        novaReceita: this.novaReceita,
        imgChamada: this.imgChamada,
        ingredientes: this.ingredientes,
        hora: this.hora,
        minuto: this.minuto,
        preco: this.preco,
      });
    },
  },
};
</script>

<style></style>
