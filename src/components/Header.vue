<template>
  <div>
    <header id="header">
      <div class="center">
        <!-- logo -->
        <div id="logo">
          <img src="../assets/CosmosRolLogo.png" alt="Cosmos Rol Logo" />
          <router-link to="/" id="brand">
            <strong>Cosmos</strong>Rol
          </router-link>
        </div>
        <!-- menu -->
        <!-- Acuérdate que si quieres pasar una ruta como parámetro debes usar el siguiente esquema, como se vio en la V1 y V2
          :to="{
                  name: 'id_de_prueba',
                }"
               -->
        <nav id="menu">
          <ul>
            <li>
              <router-link to="/big" active-class="active"
                >Wiki-Rol</router-link
              >
            </li>
            <li>
              <router-link to="/home" active-class="active">Rol</router-link>
            </li>
            <li>
              <router-link to="/vacuum" active-class="active"
                >Building</router-link
              >
            </li>
            <li>
              <router-link to="/login" active-class="active">Login</router-link>
            </li>
            <li>
              <router-link to="/contacto" active-class="active"
                >Contacto</router-link
              >
            </li>
          </ul>
        </nav>

        <!-- clear -->
        <div class="clearfix"></div>
      </div>
    </header>
  </div>
</template>

<script>
export default {
  name: "Header",
};
</script>

<style></style>
