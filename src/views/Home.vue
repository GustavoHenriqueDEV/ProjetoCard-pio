<template>
  <div class="pt-3 grey lighten-4 fill-height">
    <carrousel />

    <div class="destaque fill-height pt-6">MAIS DELÍCIAS</div>

    <container>
      <v-row class="mt-10 destaqueRow pl-16" align="center" justify="center">
        <template v-for="(receita, i) in receitas">
          <!-- eslint-disable-next-line -->
          <v-col :key="i" cols="12" md="2">
            <!-- eslint-disable-next-line -->

            <v-hover v-slot="{ hover }">
              <v-card
                class=""
                @click="irDescReceita(receita)"
                :elevation="hover ? 20 : 2"
                :class="{ 'on-hover': hover }"
              >
                <v-img :src="receita.imgChamada" height="225px">
                  <v-card-title class="text-h6 white--text">
                    <v-row
                      class="fill-height flex-column"
                      justify="space-between"
                    >
                      <div class="align-self-center"></div>
                    </v-row>
                  </v-card-title>
                </v-img>
                <div class="">
                  <h3 class="h3">
                    <p
                      class="mt-4 subheading text-left black--text text-center"
                    >
                      {{ receita.novaReceita }}
                    </p>
                  </h3>
                  <div class="nLikes text-center">
                    <v-icon class="mb-1 mr-1" color="red">mdi-heart</v-icon
                    >12312
                  </div>
                </div>
              </v-card>
            </v-hover>
          </v-col>
        </template>
      </v-row>
    </container>
  </div>
</template>

<script>
import carrousel from "@/components/carrousel";
import * as fb from "@/plugins/firebase";
import router from "../router";

export default {
  components: { carrousel },
  data() {
    return {
      selected: [],
      receitas: [],
      nome: "",
      comentarioTexto: "",
      comentarios: [],
    };
  },

  mounted() {
    this.buscarReceitas();
  },
  methods: {
    async buscarReceitas() {
      const logtasks = await fb.tasksCollection.get();
      for (const doc of logtasks.docs) {
        this.receitas.push({
          id: doc.id,
          hora: doc.data().hora,
          minuto: doc.data().minuto,
          ingredientes: doc.data().ingredientes,
          novaReceita: doc.data().novaReceita,
          imgChamada: doc.data().imgChamada,
          modoPreparo: doc.data().modoPreparo,
          comentarios: doc.data().comentarista,
        });
      }
      console.log(this.receitas);
    },
    irDescReceita(receita) {
      router.push({ name: "descReceita", params: { receita } });
    },
    comentarReceita(receita) {
      router.push({ name: "comentario", params: { receita } });
    },
  },
};
</script>

<style>
.nLikes {
  color: #b8b8b8;
}

.send {
  font-size: 14px;
}
.h3 {
  font-weight: normal;
  color: #a00f0f;
  font-family: sans-serif;
  text-transform: uppercase;
  font-size: 16px;
}
.app2 {
  width: 100%;
  background-color: white;
  display: flex;
}
.destaque {
  text-transform: uppercase;
  font-family: "sans-serif";
  font-size: 20px;
  margin: 0px;
  padding: 0px;
  height: 80px;
  margin-top: 35px;
  text-align: center;
  justify-content: center;
  background-color: rgb(255, 153, 0);
}

.backgroud {
  background-color: orange;
}
.destaqueRow {
  padding-right: 80px;
}
</style>
