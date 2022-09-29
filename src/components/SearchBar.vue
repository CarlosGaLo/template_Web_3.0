<template>
  <div>
    <div id="search" class="sidebar-item">
      <h3>Buscador</h3>
      <p>¿Qué andas buscando?</p>
      <form action="">
        <input v-model="inputSearch" type="text" name="search" />
        <input
          type="button"
          name="submit"
          value="Buscar"
          class="btn"
          @click="completeSearch"
        />
      </form>
    </div>
  </div>
</template>

<script setup>
//Vamos a implementar un sistema de búsqueda interno. Normalmente este tipo de cosas nos vendrán dadas por nuestros amigos de back o por una API a la que nos conectemos. ¡Pero hemos venido a jugar!
//Nuestro sistema de búsqueda va a tener un diseño que, una vez tengamos un input, siga los siguientes pasos
//1 - Crea un array donde estarán todos los resultados posibles. Lo inicializamos como vacío
//2 - Comparamos el input con el id, si hay coincidencias exactas (sin casesensitive) las añadimos al array
//3 - Comparamos el input con el title, si hay coincidencias exactas (sin casesenstive) las añadimos al array
//4 - Comparamos el input con la descripción breve, si hay coincidencias exactas (sin casesensitive) las añadimos al array
//5 - Comparamos el input con el texto del artículo, si hay coincidencias exactas (sin casesentivive) las añadimos al array
//6 - Mostramos el array por pantalla usando el componente ArticlesArray, que es una versión moderna de ArticleWiki.
//¿Y en qué orden lo mostraremos todo por pantalla? Por lo pronto, en el orden en el que hayamos encontrado coincidencias. Luego veremos cómo cambiar esto internamente.

import { ref } from "vue";
import { useSupabase } from "../SupabaseMain.js";
//Importamos el ArticleWiki, que deberemos usar más adelante.
import { globalFunctions } from "../store/globalFunctions";
//Recuerda que para que el v-model funcione debidamente es conveniente vincularlo a un ref, de esta forma garantizas que es reactivo al momento
const inputSearch = ref("");
//Creamos una función asíncrona que se encargará de hacer todo lo que necesitamos con la base de datos.
async function completeSearch() {
  let arrayId = await useSupabase().manualSearch("id", inputSearch.value);
  let arrayTitle = await useSupabase().manualSearch("title", inputSearch.value);
  let descriptionTitle = await useSupabase().manualSearch(
    "description",
    inputSearch.value
  );
  let completeArray = [];

  // Comprobamos por consola que estamos recibiendo los datos que queremos y los ponemos en un array
  // console.log(arrayId)
  // console.log(arrayTitle)
  // console.log(descriptionTitle)

  completeArray = descriptionTitle.concat(arrayTitle, arrayId);

  // Eliminamos las ids duplicadas.
  // console.log(completeArray)
  let filteredArray = [];

  for (let i = 0; i < completeArray.length; i++) {
    if (Boolean(completeArray[i])) {
      filteredArray.push(completeArray[i].id);
    }
  }

  filteredArray = [...new Set(filteredArray)];

  // console.log(filteredArray);
  // Podemos usar esta línea para comprobar que todo está funcionando debidamente.
  // Comprobamos así que hasta aquí todo va bien

  /* Lo siguiente que debemos hacer es mandar esta lista de ids a ArticleWiki, para que actualice su lista y la muestre por pantalla. 
  Ahora mismo estamos asumiendo que el usuario está en esa ruta, luego nos ocuparemos de la ruta del usuario.*/

  const finalArray = await globalFunctions().getSearchedArticles(filteredArray);
  // console.log(finalArray); //Comprobamos que el array que nos pasan es el que queremos.
  globalFunctions().UpdateMainArticles(finalArray); //Esta función se encargará de dos cosas. Comprobar que estamos en la dirección correcta para poder actualizar la lista de artículos y, además, actualizar dichos artículos.
}
</script>

<!-- <script>
Dejamos aquí una muestra, conceptual, de cómo funciona una búsqueda. Recuerda que Supabase tiene su propio terminal para poder comprobar si estamos haciendo bien el query o no. 

import { createClient } from "@supabase/supabase-js";

// Una consulta simple para comprobar que la base de datos funciona
// Puedes usar .select("id, title") para que solo devuelva campos específicos y no toda la tabla
const supabase = createClient(
  "Aquí tu url",
  "Aquí tu clave"
);

const articles = [];

supabase
  .from("articles")
  .select("*") 
  //.eq("id", 1)
  .then((response) => {
    generateArticleList(response);    
  });
  



// Este es un ejemplo de función para extraer datos de una tabla
function generateArticleList(articlesRaw){
    articles.push(articlesRaw.data[0]); // Todos los datos se introducen en articles[0] porque estamos usando Push()
    console.log(articles[0].title);

    console.log(articlesRaw);    

}
</script> -->
