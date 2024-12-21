<template>
  <div id="app">
    <NavBar /> <!-- Composant de navigation -->
    <router-view /> <!-- Affiche la vue liée à la route actuelle -->
  </div>
</template>

<script>
import NavBar from './components/Navbar.vue';

export default {
  components: {
    NavBar,
  },
};
</script>

<style>
/* Ajoutez vos styles globaux ici */
</style>
