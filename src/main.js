import { createApp } from "vue";
import App from "./App.vue";
// Cargamos el archivo donde hemos configurado el router.
import router from "./router";
// Cargamos pinia para poder usar stores
import { createPinia } from "pinia";
const pinia = createPinia();

createApp(App).use(router).use(pinia).mount("#app");
