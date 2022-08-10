<template>
  <container class="grey lighten-4">
    <v-container text-center class="pa-10 mb-16">
      <v-row class="pa-0 elevation-3 mx-auto, white">
        <v-col class="rounded-xl">
          <div class="">
            <h1 class="receitaName h1 orange--text">
              {{ receita.novaReceita }}
            </h1>
          </div>
          <div>
            <h2 class="h2 mb-2 orange--text">
              <v-icon>mdi-noodles</v-icon>Ingredientes:
            </h2>
          </div>

          <v-textarea
            background-color="grey lighten-2"
            :value="receita.ingredientes"
            class="mt-3"
            solo
            color="black"
            auto-grow
            name="igfirebaselack"
          ></v-textarea>
          <v-divider></v-divider>
          <div class="orange--text"><h2 class="h2">Tempo de preparo:</h2></div>
          <v-row class="pa-0 rounded-xl">
            <v-col class="rounded-xl">
              <v-text-field
                background-color="grey lighten-2"
                name="minuto"
                :value="receita.hora"
                prepend-inner-icon="mdi-timer"
                rounded
                solo
                filled
                class="mt-4 mr-2 ml-2"
                label="Hora"
              ></v-text-field>
            </v-col>
            <h1 class="h1 mt-8">:</h1>
            <v-col class="rounded-xl">
              <v-text-field
                background-color="grey lighten-2"
                name="minuto"
                :value="receita.minuto"
                prepend-inner-icon="mdi-timer"
                rounded
                solo
                filled
                class="mt-4 mr-2 ml-2"
                label="Minuto"
              ></v-text-field>
            </v-col>
          </v-row>

          <v-divider></v-divider>

          <div class="rounded-xl">
            <h2 class="h2 orange--text">
              <v-icon class="gray">mdi-food-takeout-box</v-icon>
              Modo de preparo:
            </h2>

            <v-textarea
              background-color="grey lighten-2"
              name="igfirebaselack"
              :value="receita.modoPreparo"
              class="mt-3"
              solo
              color="black"
              auto-grow
            ></v-textarea>
          </div>
        </v-col>
        <v-col class="rounded-xl">
          <v-img
            class="image rounded-xl"
            height="500"
            max-width="700"
            :src="receita.imgChamada"
          ></v-img>
        </v-col>
        <v-card width="10000"
          ><v-card-title class="justify-center"
            ><h2>Comentarios</h2>
            <v-icon class="ml-3" color="orange"
              >mdi-comment</v-icon
            ></v-card-title
          >
          <v-textarea
            solo
            background-color="grey lighten-2"
            auto-grow
            class="rounded-xl ml-5 mr-5 white"
            label="O que achou desta receita?"
            v-model="comentarioTexto"
          >
          </v-textarea>
          <div @click="enviarComentario" class="ml-1 buttonSend">
            <v-btn class="orange white--text"
              ><v-icon class="mr-1">mdi-comment-check-outline</v-icon>Enviar
              comentario</v-btn
            >
          </div>

          <v-card-text>
            <v-row class="pa-0">
              <v-container class="pa-0 grey lighten-5">
                <v-row
                  class="pa-0"
                  v-for="(comentario, index) in comentarios"
                  :key="index"
                  no-gutters
                >
                  <v-col class="orange--text mt-1" cols="12" sm="6" md="1"
                    ><v-icon class="mr-1 mb-2">mdi-account</v-icon
                    >{{ comentario.comentarista }}
                    <div class="data">10/04/20022</div>
                  </v-col>
                  <v-divider vertical></v-divider>
                  <v-col class="justify-start" cols="6" md="8">
                    <div class="comentario">
                      <h4 class="pa-2">
                        {{ comentario.texto }}
                      </h4>
                    </div>
                    <v-divider></v-divider>
                  </v-col>
                </v-row>
              </v-container>
            </v-row>
          </v-card-text>
        </v-card>
      </v-row>
    </v-container>
  </container>
</template>

<script>
import * as fb from "@/plugins/firebase";
export default {
  props: ["receita"],
  data() {
    return {
      tasks: [],
      uid: "",
      nome: "",
      comentarioTexto: "",
      comentarios: [],
    };
  },
  mounted() {
    this.buscarReceitas();
    this.getComentario();
    this.getNome();
  },
  methods: {
    async buscarReceitas() {
      const logtasks = await fb.tasksCollection.get();
      for (const doc of logtasks.docs) {
        this.tasks.push({
          id: doc.id,
          hora: doc.data().hora,
          minuto: doc.data().minuto,
          ingredientes: doc.data().ingredientes,
          novaReceita: doc.data().novaReceita,
          modoPreparo: doc.data().modoPreparo,
          imgChamada: doc.data().imgChamada,
        });
      }
      console.log(this.tasks);
    },
    async getComentario() {
      await fb.db
        .collection("tasks")
        .doc(this.receita.id)
        .get()
        .then((receita) => {
          console.log(receita.data());
          this.comentarios = receita.data().comentarios;
        });
    },
    async getNome() {
      this.uid = fb.auth.currentUser.uid;
      const userProfile = await fb.profileCollection
        .where("uid", "==", this.uid)
        .get();
      this.nome = userProfile.docs[0].data().nome;

      console.log(userProfile.docs[0].data().nome);
      console.log(this.nome);
    },

    async enviarComentario() {
      this.comentarios.push({
        texto: this.comentarioTexto,
        comentarista: this.nome,
      });
      console.log(this.comentarios);
      await fb.tasksCollection.doc(this.receita.id).update({
        comentarios: this.comentarios,
      });
      console.log(this.comentarios);
      this.getComentario();
    },
    metodoTeste() {
      console.log(this.comentarioTexto);
    },
  },
};
</script>

<style>
.comentario {
  text-align: start;
}

.buttonSend {
  margin-bottom: 10px;
  margin-right: 10px;
}
.data {
  font-size: 12px;
}
.receitaName {
  display: flex;

  justify-content: center;
}
.image {
  margin-top: 85px;
}
</style>
