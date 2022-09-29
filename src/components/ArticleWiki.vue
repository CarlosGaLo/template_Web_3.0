<template>
  <div>
    <h3 class="subheader">Wikis y Noticias</h3>
    <div id="article">
      <article
        v-for="article in globaFunction.getAllArticlesWiki"
        :key="article.id"
        class="article-item article-template"
      >
        <div class="image-wrap">
          <!-- Para que nos lea la imagen debemos bindearla con los dos puntos. Lo mismo para el alt de la imagen -->
          <img :src="article.header_image" :alt="article.imgAlt" />
        </div>
        <h4 class="article-title">{{ article.title }}</h4>
        <span class="date"> Hace {{ article.last_modified }} días </span>
        <router-link :to="{ path: '/big/' + article.id }"
          >Saber más</router-link
        >
        <div class="aside-text">{{ article.description }}</div>
      </article>
    </div>
  </div>
</template>

<script setup>
//Eliminamos la importación que hacíamos del json en las versiones anteriores para sustituirla por la importación desde la base de datos.
//Dejamos la línea comentada para que sirva a modo de recordatorio
// import ArticlesWiki from "../dataBase/Articles.json";
//Importo el componente SupabaseMain que es el que me va a permitir gestionar todas las peticiones a la base de datos.
import { useSupabase } from "../SupabaseMain.js";
// Vamos a usar ref para poder gestionar datos en tiempo real. Ref es una estructura de datos de vue que nos permite aprovechar al máximo las capacidades reactivas del framework. Si no usasemos ref, la lista de artículos se actualizaría después de ser impresa por pantalla, lo que daría problemas.
// Al usar ref, cada vez que la lista cambie, cambiará lo que se muestra en pantalla
// Una vez estamos mostrando por pantalla lo que queremos mostrar, pasamos a corregir los problemas de css que hayan aparecido.
import { ref } from "vue";
import { globalFunctions } from "../store/globalFunctions";

const globaFunction = globalFunctions();

// Creamos la función que nos trae los artículos de la base de datos y luego la invocamos. Vamos a crear una función que nos los traiga todo y otra que nos traiga solo el número de artículos que le pidamos.
// ¡Cuidado! Ambas funciones están modificando la misma variable, AllArticlesWiki
// Cuando hemos acabado la búsqueda, usamos el array AllArticlesWiki para calcular la cantidad de días que han pasado.
// Modificamos el valor de created_at en nuestra copia local NO EN LA BASE DE DATOS.
// async function getArticles() {
//   AllArticlesWiki.value = await useSupabase().fetchAll();
// }

// Aquí la función que selecciona un número limitado de artículos al ser extraidos de la base de datos.
// Recuerda que la función debe calcular cuántos días han pasado
async function getArticlesNum(numArticles) {
  let newArticles = await useSupabase().fetchNum(numArticles);
  globaFunction.changeArticles(newArticles);
  console.log(globaFunction.AllArticlesWiki);
}
// Vamos a mostrar, por defecto, 5 artículos en portada.
getArticlesNum(5);
</script>
