/*
Este componente no es neecsario para que el programa funcione, pero sí para explicarte que tenemos que instalar Pinia para que todo funcione. 
¿Y cómo se instala Pinia? Empieza por visitar su web y leer la documentación, tras la instalación, debes poner las líneas de este componente en tu js principal, en nuestro caso main.js


import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'

const pinia = createPinia()
const app = createApp(App)

app.use(pinia)
app.mount('#app')*/
