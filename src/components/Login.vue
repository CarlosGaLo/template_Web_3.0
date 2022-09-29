<template>
  <div>
    <div id="login-warning">
      <p>
        Advertencia: Solo puedes tener una cuenta si el administrador de la web
        te crea una. Si no tienes cuenta y quieres una usa el formulario de
        contacto.
      </p>
    </div>
    <form id="login-card" @submit.prevent="login">
      <p>E-mail</p>
      <input
        type="email"
        name="email"
        id="3"
        class="contacto"
        v-model="email"
      />
      <p>Contraseña</p>
      <input type="password" v-model="password" />
      <button class="btnPrimary" type="submit">Login</button>
    </form>
  </div>
</template>

<script setup>
//Nuestra página será un poco especial, no queremos que cualquiera pueda entrar y crearse una cuenta. Así pues, deberemos dar de alta las cuentas manualmente en supabase pero, al hacerlo así, ¿cómo podemos pedir al usuario que cree su contraseña sin que pase por nosotros? Vamos a crear toda esta lógica de creación de cuentas en el componente LogIn.
import { ref } from "vue";
import { useSupabase } from "../SupabaseMain.js";

const email = ref(null);
const password = ref(null);
const confirmPassword = ref(null);

async function login() {
  if((useSupabase().userExist(email))){

  }else{
    
  }
}
</script>

<style>
* {
  margin: 0 0 0 0;
  padding: 0 0 0 0;
}

#login-card {
  margin: 10px 0 10px 0;
}

#login-card input {
  margin-bottom: 15px;
}

.btnPrimary {
  display: block;
  margin: auto;
}
</style>
