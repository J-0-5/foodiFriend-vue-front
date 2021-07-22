<template>
  <b-navbar
    toggleable="md"
    type="dark"
    variant="info"
    style="background: #4caf50 !important"
  >
    <b-container>
      <b-navbar-brand href="/">FoodiFriend</b-navbar-brand>
      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
      <b-collapse is-nav id="nav-collapse">
        <b-navbar-nav>
          <b-nav-item :to="{ name: 'Login' }" v-if="guest">Iniciar sesion</b-nav-item>
          <b-nav-item :to="{ name: 'Commerces' }">Commercios</b-nav-item>
          <b-nav-item :to="{ name: 'About' }">About</b-nav-item>
        </b-navbar-nav>
      </b-collapse>
    </b-container>
  </b-navbar>
</template>
<script>
import { mapState } from "vuex";
export default {
  name: "NavBar",
  data() {
    return {
      guest: true,
    };
  },
  mounted() {
    this.guest = !this.isAuth;
  },
  computed: {
    ...mapState(["isAuth"]),
  },
};
</script>
