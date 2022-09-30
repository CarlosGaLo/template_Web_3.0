import { defineStore } from "pinia";
import { useSupabase } from "../SupabaseMain.js";

// You can name the return value of `defineStore()` anything you want, but it's best to use the name of the store and surround it with `use` and `Store` (e.g. `useUserStore`, `useCartStore`, `useProductStore`)
// the first argument is a unique id of the store across your application
export const globalFunctions = defineStore("allArticlesWiki", {
  //State es donde guardamos todos los datos que son GLOBALES, es decir, que se pueden acceder y modificar desde cualquier parte.
  state: () => {
    //Definimos un vector que contendrá los articles
    return { allArticlesWiki: null };
  },
  getters: {
    //Los getters son las funciones que nos permiten consultar un dato
    getAllArticlesWiki() {
      return this.allArticlesWiki;
    },
  },
  actions: {
    async getSearchedArticles(ids) {
      //Las actions son las cosas que podemos hacer con un dato. Lo más común es sustituir un dato por otro.
      return await useSupabase().fetchIds(ids);
    },
    UpdateMainArticles(articlesArray) {
      console.log(this.allArticlesWiki);
      this.allArticlesWiki = articlesArray;
      console.log(this.allArticlesWiki);
    },
    changeArticles(articlesArray) {
      this.allArticlesWiki = articlesArray;
    },
  },

  //Persist sirve para que la tienda sea permanente y exista siempre, pase lo que pase. De esta forma podemos acceder siempre a ella.
  persist: {
    enabled: true,
    strategies: [
      {
        key: "allArticlesWiki",
        storage: localStorage,
      },
    ],
  },
});
