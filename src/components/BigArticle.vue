<template>
  <div class="center">
    <section id="content">
      <!-- Aquí va el article Wiki -->
      <div class="big-article">
        Prueba
        {{nowArticle.article_text}}
      </div>
    </section>
    <aside id="sidebar">
      <SearchBar/>
          <button class="btn btn-success" id="to-home">
            Redirigir a home PLACE-HOLDER
          </button>
    </aside>

    <div class="clearfix"></div>
  </div>
</template>

<script setup>
import { useSupabase } from "../SupabaseMain.js";
import { useRoute } from "vue-router";
import {ref} from "vue";
import searchBar from "./SearchBar.vue"
import SearchBar from "./SearchBar.vue";

let id_desde_url = useRoute().path;
let nowArticle = ref([]);

//Vamos a crear una función a la que, si le pasamos una ruta del tipo /big/{id} nos devuelva el id. Usaremos este aproach para recordar cómo se partían cadenas de texto
//Usaremos slice, porque sabemos que la ruta siempre será /big/{id} por lo que tenemos que hacer un slice a partir de 5. De esta forma si la id tiene varios dígitos nos los cogerá todos
function returnID(routeLong){
    return routeLong.slice(5);
}

async function getArticle() {
  const result = await useSupabase().fetchOne(returnID(id_desde_url));
  nowArticle.value = result[0];
}

getArticle();
//  HAY QUE CONSEGUIR SACAR DE FORMA ASINCRONA LOS DATOS Y CONSEGUIR QUE SE SAQUEN LOS DATOS DESDE LA RUTA EN LA QUE ESTAMOS!

</script>

<style>
.big-article {
  text-align: justify;
  font-size: 18px;
  margin: 10px;
}

#to-home{
  margin: 15px;
}
</style>
