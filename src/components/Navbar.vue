<template>
  <nav class="navbar bg-zinc-900 text-white p-4 shadow-lg">
    <!-- Logo -->
    <div class="logo text-2xl font-bold flex items-center space-x-2">
      <span>🌌</span> <!-- Ajout d'une icône pour le style -->
      <span>APOD</span>
    </div>

    <!-- Liens de navigation -->
    <ul class="nav-links hidden md:flex space-x-6 items-center">
      <li>
        <router-link
            to="/"
            class="text-white hover:text-gray-200 transition duration-300"
            active-class="font-semibold"
        >
          Home
        </router-link>
      </li>
      <li>
        <router-link
            to="/monthly"
            class="text-white hover:text-gray-200 transition duration-300"
            active-class="font-semibold"
        >
          Monthly
        </router-link>
      </li>
      <li>
        <router-link
            to="/all"
            class="text-white hover:text-gray-200 transition duration-300"
            active-class="font-semibold"
        >
          Choose your date
        </router-link>
      </li>
    </ul>

    <!-- Menu hamburger pour mobile -->
    <button
        class="block md:hidden focus:outline-none"
        @click="toggleMenu"
        aria-label="Toggle Navigation"
    >
      <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-8 w-8 text-white"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
      >
        <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M4 6h16M4 12h16m-7 6h7"
        />
      </svg>
    </button>

    <!-- Menu déroulant mobile -->
    <ul
        v-if="menuOpen"
        class="absolute top-16 left-0 w-full bg-blue-700 text-white flex flex-col items-center space-y-4 py-6 shadow-md md:hidden"
    >
      <li>
        <router-link
            to="/"
            class="text-white hover:text-gray-200 transition duration-300"
            @click="toggleMenu"
        >
          Home
        </router-link>
      </li>
      <li>
        <router-link
            to="/monthly"
            class="text-white hover:text-gray-200 transition duration-300"
            @click="toggleMenu"
        >
          Monthly
        </router-link>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  data() {
    return {
      menuOpen: false, // État du menu hamburger
    };
  },
  methods: {
    toggleMenu() {
      this.menuOpen = !this.menuOpen; // Basculer l'état du menu
    },
  },
};
</script>

<style scoped>
.navbar {
  transition: background-color 0.3s ease-in-out; /* Animation douce au survol */
}
</style>
