<template>
  <div class="min-h-screen bg-gradient-to-b from-zinc-900 to-purple-900 flex flex-col items-center py-6">
    <h1 class="text-3xl font-bold mb-6">Détails de l'image</h1>

    <div v-if="loading" class="text-blue-500 font-medium">Chargement des détails...</div>
    <div v-else-if="error" class="text-red-500 font-bold">Erreur : {{ error }}</div>
    <div v-else v-if="image">
      <h2 class="text-2xl font-bold">{{ image.title }}</h2>
      <p class="text-sm text-gray-600 mb-4">{{ image.date }}</p>
      <img
          v-if="image.url"
          :src="image.url"
          :alt="image.title"
          class="max-w-full rounded shadow-lg"
      />
      <p v-else class="text-red-500">Image non disponible</p>

      <div class="mt-6">
        <h3 class="text-xl font-semibold">Description :</h3>
        <p class="text-white">{{ image.explanation }}</p>
      </div>
    </div>

    <div class="mt-6">
      <button
          class="bg-gray-700 text-white px-4 py-2 rounded hover:bg-gray-600"
          @click="goBack"
      >
        Retour
      </button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      image: null,
      loading: false,
      error: null,
    };
  },
  methods: {
    async fetchImageDetails() {
      const date = this.$route.params.id; // Récupère la date depuis les paramètres de l'URL
      this.loading = true;
      this.error = null;

      try {
        const response = await fetch(
            `https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY&date=${date}`
        );
        if (!response.ok) {
          throw new Error(`Erreur API pour la date ${date}: ${response.statusText}`);
        }
        const data = await response.json();
        this.image = data; // Stocke les détails de l'image dans `image`
      } catch (err) {
        this.error = `Impossible de récupérer les détails : ${err.message}`;
      } finally {
        this.loading = false;
      }
    },
    goBack() {
      // Naviguer vers la page précédente
      this.$router.go(-1);
    },
  },
  mounted() {
    this.fetchImageDetails(); // Récupère les détails de l'image au montage du composant
  },
};
</script>
