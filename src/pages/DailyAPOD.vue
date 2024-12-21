<template>
  <div class="min-h-screen bg-gradient-to-b from-zinc-900 to-purple-900 text-white flex flex-col items-center py-8 px-4">
    <h1 class="text-4xl font-bold mb-8 text-center">Astronomy Picture of the Day</h1>

    <div class="w-full max-w-4xl bg-white text-black rounded-lg shadow-lg p-6 flex flex-col items-center">
      <!-- Afficher l'image -->
      <img
          class="rounded-lg shadow-md w-full max-h-[500px] object-cover mb-6"
          :src="imageUrl"
          alt="Astronomy Picture of the Day"
          v-if="imageUrl"
      />

      <!-- Afficher la description -->
      <p class="text-gray-700 text-lg leading-relaxed" v-if="description">{{ description }}</p>

      <!-- Afficher un message de chargement si l'API est en cours de chargement -->
      <p class="text-indigo-500 font-medium" v-else-if="loading">Chargement de l'image...</p>

      <!-- Afficher une erreur si l'appel échoue -->
      <p v-else-if="error" class="text-red-500 font-bold">Erreur : {{ error }}</p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      imageUrl: null,
      description: null,
      loading: true,
      error: null
    };
  },
  created() {
    this.fetchAPOD();
  },
  methods: {
    // Méthode pour faire l'appel à l'API
    async fetchAPOD() {
      const apiKey = 'OaoL2R3XLRPyDy2jP9vylqA4sExqzwG0H3mXZma1';
      const url = `https://api.nasa.gov/planetary/apod?api_key=${apiKey}`;

      try {
        const response = await fetch(url);
        const data = await response.json();

        // Si la requête réussit, mettre à jour l'image et la description
        this.imageUrl = data.url;
        this.description = data.explanation;
      } catch (err) {
        // En cas d'erreur, afficher l'erreur
        this.error = "Impossible de récupérer l'image.";
      } finally {
        // Terminer le chargement
        this.loading = false;
      }
    }
  }
};
</script>
