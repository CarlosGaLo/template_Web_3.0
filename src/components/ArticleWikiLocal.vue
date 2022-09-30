<template>
  <div>
    <p>Carga estática. Estos archivos son accedidos desde un json local.</p>
    <p>
      Si quieres que no se vea esta parte, comenta ArticleWikiLocal en App.vue
    </p>
    <h3 class="subheader">Wikis y Noticias</h3>
    <div id="article">
      <article
        v-for="article in AllArticlesWiki"
        :key="article.id"
        class="article-item article-template"
      >
        <div class="image-wrap">
          <!-- Para que nos lea la imagen debemos bindearla con los dos puntos. Lo mismo para el alt de la imagen -->
          <img :src="article.img" :alt="article.imgAlt" />
        </div>
        <h4>{{ article.tittle }}</h4>
        <span class="date"> Hace {{ article.date }} días </span>
        <a href="">Saber más</a>
        <div class="aside-text">{{ article.resume }}</div>
      </article>
    </div>
  </div>
</template>

<script>
//Este componente importa los datos locales desde el json y los imprime por pantalla. Este archivo busca mantener el ejemplo de fetch a database local.
import ArticlesWiki from "../dataBase/Articles.json";

export default {
  data() {
    return {
      AllArticlesWiki: ArticlesWiki,
    };
  },
};
</script>
