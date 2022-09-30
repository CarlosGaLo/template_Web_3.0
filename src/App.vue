<template>
  <div class="main">
    <Header></Header>
    <GreatBlockVue></GreatBlockVue>
    <router-view></router-view>
    <FooterBar></FooterBar>
    <ArticleWikiLocal></ArticleWikiLocal>
  </div>
</template>

<script>
import Header from "./components/Header.vue";
import GreatBlockVue from "./components/GreatBlock.vue";
import AsideBar from "./components/AsideBar.vue";
import FooterBar from "./components/FooterBar.vue";
import SearchBar from "./components/SearchBar.vue";
import ArticleWikiLocal from "./components/ArticleWikiLocal.vue";

export default {
  components: {
    Header: Header,
    GreatBlockVue: GreatBlockVue,
    AsideBar: AsideBar,
    FooterBar: FooterBar,
    ArticleWikiLocal: ArticleWikiLocal,
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

@import "./assets/css/styles.css";
</style>
