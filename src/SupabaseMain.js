// IMPORTANTÍSIMO! Si no colocas este archivo exáctamente donde tiene que estar en el proyecto, dentro de la ruta src, no te leerá los import.meta que estamos haciendo. Así que cuidadín con eso :)
//Este código servira para, una vez importado, poder utilizar supabase en esa parte del componente, de tal forma que aquel componente que necesite buscar algo en la base de datos debe acceder aquí que es donde se gestiona y centraliza todo.
//Llamamos a este código SupabaseMain para saber que estamos referenciando a nuestra cuenta de supabase. Este código se encargará de gestionar no solo el acceso, también los métodos y querys a los que el resto de componentes quieran tener acceso
//Importamos la capacidad de crear un cliente de Supabase
import { createClient } from "@supabase/supabase-js";
//Para poder definir la Store nos descargamos pinia, para ello usamos npm install pinia
import { defineStore } from "pinia";
import { createElementBlock } from "vue";

//Importamos las credenciales desde .env -> Acuérdate de que estos archivos contienen mucha información, si subes tu proyecto a github no debes subir estos archivos ya que quien los tenga podrá hacerse pasar por owner de tu proyecto de supabase.
const supabaseUrl = process.env.VUE_APP_SUPABASE_URL;
const supabaseAnonKey = process.env.VUE_APP_SUPABASE_ANON_KEY;

// Cremoa el cliente. Para ello usamos las variables que acabamos de crear justo arriba. Así mantenemos las credenciales del .env opacas a la gente.
// Como ves, a nivel interno, nuestro cliente de Supabase se llama supabase, así mantenemos una programación lo más semántica posible.
const supabase = createClient(supabaseUrl, supabaseAnonKey);

// A continuación creamos un export que contenga todos los métodos de búsqueda que queremos. Empezaremos con el método de búsqueda que necesitamos para el ArticleWiki que nos deberá devolver un array con los 5 últimos elementos modificados en nuestra base de datos en la sección articles.
// Podríamos llamar al export general supabaseQuerys, ya que el acceso a una base de datos para pedir de vuelta una información es un "query". Sin embargo nosotros vamos a darle otro enfoque,
// como nuestra web es pequeña vamos a hacer que el export contenga todas las funciones a la vez y que, cada función, tenga un nombre distinto.

export const useSupabase = defineStore(
  "supabase",
  {
    state: () => ({
      supabase: null,
    }),
    actions: {
      async fetchAll() {
        const { data: article } = await supabase
          .from("articles")
          .select("*")
          .order("id", { ascending: false });
        this.article = article;
        return article;
      },
      async fetchNum(numArticles) {
        const { data: article } = await supabase
          .from("articles")
          .select("*")
          .order("id", { ascending: false })
          .limit(numArticles);
        this.article = article;
        //Como el campo last_modified no está expresado en el formato que queremos, a continuación le cambiamos el formato para que nos diga cuántos días han pasado.
        // article.forEach((element) => {
        //   //Hay muchas formas de integrar este elemento de código, lo más correcto sería una función a parte, pero... ¡Fíjate que podemos hacerlo también en el cuerpo de la función principal!
        //   let date = new Date().getTime(); // Aquí ponemos el número de milisegundos que han pasado desde la fecha de referencia
        //   let date2 = new Date(element.last_modified); //Aquí ponemos el número de milisegundos que han pasado desde la fecha de referencia hasta la fecha de modificación del artículo
        //   let date3 = date - date2; // Hacemos la diferencia del más grande menos el más pequeños
        //   date3 = Math.round(date3 / 86400000); // Redondeamos para que nos salgan los días que han pasado
        //   element.last_modified = date3;
        // });
        return article;
      },
      async userExist(email) {
        const { data: profile } = await supabase
          .from("profiles")
          .select("email")
          .match(email);
        this.profile = profile;
        return Boolean(profile);
      },
      async insertEmailProfile(email) {
        const { data: profile } = await supabase
          .from("profiles")
          .select("email")
          .match(email);
        this.profile = profile;
        return Boolean(profile);
      },
      async fetchOne(ids) {
        const { data: profile } = await supabase
          .from("articles")
          .select("*")
          .match({ id: ids });
        return profile;
      },
      async fetchIds(ids) {
        let allArticles = [];
        //Primero comprobamos que nos han pasado un array
        if (typeof ids != typeof []) {
          ids = [ids];
        }
        //Luego añadimos cada elemento del array a nuestro AllArticles para poder hacer el return de este nuevo array de elementos
        allArticles = await supabase.from("articles").select("*").in("id", ids);
        return allArticles.data;
      },
      async manualSearch(column, keyWord) {
        //Como keyWord puede ser un número (se puedes buscar por id) o un texto, vamos a filtrar la búsqueda manualmente
        //Si keyword es un número, buscámos por matchId, en caso contrario, buscamos con textSearch.
        //Este tipo de funciones no son óptimas computacionalmente hablando, pero nos valen para desarrollo rápido.
        if (!isNaN(keyWord)) {
          const { data: profile } = await supabase
            .from("articles")
            .select("id")
            .match({ id: keyWord });
          return profile;
        } else {
          const { data: profile } = await supabase
            .from("articles")
            .select("id")
            .like(column, "%" + keyWord + "%");
          return profile;
        }
      },
    },
  }

  //Damos un nombre a nuestra función
  // name: "searcher",
  //Declaramos nuestra función. Debe ser asíncrona ya que debe esperar la respuesta del servidor sin bloquear el resto del código.
);

// Acuérdate que las siguientes funciones las hemos sacado directamente de la web de supabase. Dentro de la API en User Management:
/*
USER SIGNUP
let { user, error } = await supabase.auth.signUp({
  email: 'someone@email.com',
  password: 'bGndAusxLRUMwyhXwLZB'
})

USER LOGIN
let { user, error } = await supabase.auth.signInWithPassword({
  email: 'someone@email.com',
  password: 'bGndAusxLRUMwyhXwLZB'
})

USER LOGIN MAGIC LINK
let { user, error } = await supabase.auth.signInWithOtp({
  email: 'someone@email.com'
})

PHONE SIGNUP
let { user, error } = await supabase.auth.signUp({
  phone: '+13334445555',
  password: 'some-password'
})

PHONE LOGIN
let { user, error } = await supabase.auth.signInWithOtp({
  phone: '+13334445555'
})

VERIFY PIN
let { session, error } = await supabase.auth.verifyOTP({
  phone: '+13334445555',
  token: '123456'
})

GET USER
const user = supabase.auth.user()

PASSWORD RECOVERY
let { data, error } = await supabase.auth.api.resetPasswordForEmail(email)

UPDATE USER
const { user, error } = await supabase.auth.update({
  email: "new@email.com",
  password: "new-password",
  data: { hello: 'world' }
})

USER LOGOUT
let { error } = await supabase.auth.signOut()

INVITE USER
let { data, error } = await supabase.auth.api.inviteUserByEmail('someone@email.com')

Las APIS siempre van a tener más funciones de las que necesitemos. Está bien echarle un vistazo a todas para ver si se te ocurre alguna funcionalidad adicional para tu web en la que no habías caído. */
