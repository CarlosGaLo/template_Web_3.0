<template>
  <!-- Le pongo la id jsonReader para que cuando lo vea en el DOM sepa identificar de dónde me está viniendo este código. -->
  <div id="jsonReader">
    <hr />
    <ul>
      <!-- <li v-for="notice in dataBase" :key="notice.notice">
        {{ element.string1 }}
        {{ element.string2 }}
        {{ element.string3 }}
        {{ element.string0 }}
      </li> -->
    </ul>
    <hr />
  </div>
</template>

<script>
// Aquí estoy importando la base de datos, si no la importase el componente no sabría dónde tiene que buscar.
import wikiArtciles from "../DataBase/DataBase.json";

// Aquí le digo al componente que, cuando lo exporte a otro sitio, lo debo hacer de una forma concreta.
export default {
  name: "jsonReader",
  data() {
    return {
      dataBase: wikiArtciles,
    };
  },
};
</script>
