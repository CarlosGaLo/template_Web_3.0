//Importamos las funciones más fundamentales para poder crear un ruter. El Create Ruter nos permite crear el objeto y el create web history nos permite cargar las formas de carga del historial.
import { createRouter, createWebHistory } from "vue-router";

//Definimos la variable routes que es un array donde están las rutas.
const routes = [
  {
    //El path es la dirección que aparecerá en la url
    path: "/",
    //El name es el nombre que tiene dicha ruta a efectos de programación. ¡Cuidado si varias rutas se llaman igual, eso podría llegar a dar conflicto en algunos casos! Muchas veces el name ni se pone, porque no siempre se utiliza.
    name: "init",
    //Aquí usamos una arrow function para cargar el componente que necesitemos.
    component: () => import("../components/AsideBar.vue"),
  },
  {
    //Los bigArticles serán los artículos de nuestra wiki. ¡Habrá muchos y seremos millonarios! Por eso, para acceder a ellos necesitaremos una id. Para saber identificar cuál es el artículo que quiere leer el usuario.
    //Para poder pasar un parámetro desde la barra de direcciones a código debemos ponerlo con :, tal y como se hace en el ejemplo a continuación.
    //Ten en cuenta que cuando haces esto la página nuestraweb.com/big deja de existir, porque necesitará siempre un parámetro. Por lo que nuestraweb.com/big no existe pero nuestraweb.com/big/Pon-aqui-lo-que-quieras sí que existe.
    //Si queremos que el parámetro sea opcional (que no es el caso) debemos acabar la línea con una interrogación, de esta forma no perderemos nuestraweb.com/big. Por eso hemos escrito -> path: "/big/:id?",
    //En este caso además sí debemos poner un name, porque vamos a referenciar el path continuamente.
    path: "/big/:id?",
    //Si quieres ver cómo se está recogiendo este parámetro en código, ve al componente BigArticle :)
    name: "bigArticle",
    component: () => import("../components/BigArticle.vue"),
  },
  {
    path: "/home",
    name: "home",
    component: () => import("../components/AsideBar.vue"),
  },
  //Añadimos la nueva ruta de login, pero ¡ojo! añádela poniéndole un export default, aunque esté vacío, si no, te dará problemas a la hora de cargar la ruta :)
  {
    path: "/login",
    name: "login",
    component: () => import("../components/Login.vue"),
  },
  {
    path: "/contacto",
    name: "contacto",
    component: () => import("../components/Formulario.vue"),
  },
  {
    path: "/:catchAll(.*)",
    name: "404",
    component: () => import("../components/Vacuum.vue"),
  },
];

//Aquí creamos el objeto router que tiene, entre otras cosas, la forma en la que se verá el historial, las rutas que hemos definido antes y, en este caso, un scroll behavior que básicamente le dice a la web qué tiene que hacer
//cuando se carge todo. Hay páginas que al recargarse te mandan al top y hay páginas que te mantienen en el sitio. Esto ahora mismo no es relevante, solo es para que te suene.
const router = createRouter({
  history: createWebHistory("/"),
  routes,
  scrollBehavior() {
    document.getElementById("app").scrollIntoView();
  },
});

//Finalmente hacemos el export de este componente, que es lo que se usará cuando hagamos el import en App.vue -> Exportamos todos los datos del componente que están cargados en router.
export default router;
