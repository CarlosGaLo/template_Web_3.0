<template>
  <!-- HAY QUE ARREGLAS EL :class del id slider. -->
  <div
    id="slider"
    class="slider-big"
    :class="{ force_reduce_slider: isThisForced }"
  >
    <h2>Bienvenido a Cosmos Rol</h2>
    <a href="/big" class="btn-dark">Ir a la Wiki</a>
    <div class="clearfix"></div>
  </div>
</template>

<script>
export default {
  //Por lifecycle
  methods: {
    currentRouteName() {
      return this.$route.name;
    },
  },

  //Las computed cambian en función a otras funciones del mismo archivo
  computed: {
    isThisForced() {
      return (
        this.currentRouteName() != "home" && this.currentRouteName() != "init"
      );
    },
  },
};
</script>
