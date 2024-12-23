<template>
  <div class="min-h-screen bg-gradient-to-b from-zinc-900 to-purple-900 flex flex-col items-center py-6">
    <h1 class="text-3xl font-bold mb-6">Détails de l'image {{ imageId }}</h1>

    <!-- Message d'erreur si l'API APOD ne fonctionne pas -->
    <p v-if="!apodImage" class="text-red-500 mb-4">
      Impossible de charger l'image depuis APOD. Une image locale est affichée à la place.
    </p>

    <!-- Afficher une image dynamique ou une image locale -->
    <img
        :src="apodImage || localImage"
        alt="Image APOD ou locale"
        class="max-w-full rounded shadow-lg"
    />

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
import localImage from '../assets/image.jpg'; // Image locale pour le fallback

export default {
  data() {
    return {
      localImage: localImage, // Image locale pour le fallback
      apodImage: null, // URL de l'image APOD
      imageId: null, // Stockage de l'ID de la route
    };
  },
  created() {
    // Récupérer l'ID depuis les paramètres de la route
    this.imageId = this.$route.params.id;

    // Exemple : récupérer les données depuis une API APOD
    this.fetchAPODImage();
  },
  methods: {
    goBack() {
      this.$router.go(-1); // Retour à la page précédente
    },
    async fetchAPODImage() {
      try {
        const apiKey = 'OaoL2R3XLRPyDy2jP9vylqA4sExqzwG0H3mXZma1';
        const response = await fetch(
            `https://api.nasa.gov/planetary/apod?api_key=${apiKey}&date=${this.imageId}`
        );
        const data = await response.json();

        // Vérifier si l'API retourne une URL d'image
        if (data.url) {
          this.apodImage = data.url;
        } else {
          console.error('Aucune image retournée pour cette date.');
          this.apodImage = null;
        }
      } catch (error) {
        console.error('Erreur lors de la récupération de l\'image APOD :', error);
        this.apodImage = null;
      }
    },
  },
};
</script>
