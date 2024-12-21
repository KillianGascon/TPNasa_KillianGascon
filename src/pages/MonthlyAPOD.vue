<template>
  <div class="min-h-screen bg-gradient-to-b from-zinc-900 to-purple-900 flex flex-col items-center py-6">
    <h1 class="text-3xl font-bold mb-6">Astronomy Pictures of the Month</h1>

    <!-- Sélecteur de mois -->
    <div class="mb-6">
      <label for="month" class="text-lg font-semibold">Sélectionnez un mois : </label>
      <select
          id="month"
          v-model="selectedMonth"
          class="border border-gray-300 rounded px-4 py-2"
          @change="fetchImages"
      >
        <option v-for="month in months" :key="month.value" :value="month.value">
          {{ month.label }}
        </option>
      </select>
    </div>

    <!-- Affichage des images -->
    <div v-if="loading" class="text-blue-500 font-medium">Chargement des images...</div>
    <div v-else-if="error" class="text-red-500 font-bold">Erreur : {{ error }}</div>
    <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      <div
          v-for="image in images"
          :key="image.date"
          class="bg-white shadow rounded p-4"
      >
        <img
            v-if="image.url"
            :src="image.url"
            :alt="image.title"
            class="rounded mb-4 object-cover max-h-48 w-full"
        />
        <p v-else class="text-red-500">Image non disponible</p>
        <h2 class="text-lg font-bold">{{ image.title }}</h2>
        <p class="text-sm text-gray-600">{{ image.date }}</p>
        <!-- Bouton redirigeant vers la page des détails avec image.date comme paramètre -->
        <button
            class="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            @click="viewDetails(image)"
        >
          Voir les détails
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      selectedMonth: "2024-01", // Mois par défaut
      months: [
        {value: "2024-01", label: "Janvier 2024"},
        {value: "2024-02", label: "Février 2024"},
        {value: "2024-03", label: "Mars 2024"},
        {value: "2024-04", label: "Avril 2024"},
        {value: "2024-05", label: "Mai 2024"},
        {value: "2024-06", label: "Juin 2024"},
        {value: "2024-07", label: "Juillet 2024"},
        {value: "2024-08", label: "Août 2024"},
        {value: "2024-09", label: "Septembre 2024"},
        {value: "2024-10", label: "Octobre 2024"},
        {value: "2024-11", label: "Novembre 2024"},
        {value: "2024-12", label: "Décembre 2024"},
      ],
      images: [],
      loading: false,
      error: null,
    };
  },
  methods: {
    async fetchImages() {
      const [year, month] = this.selectedMonth.split("-");
      this.loading = true;
      this.error = null;
      this.images = [];

      try {
        const requests = [];
        const daysInMonth = new Date(year, month, 0).getDate();

        // Crée des requêtes pour chaque jour du mois
        for (let day = 1; day <= daysInMonth; day++) {
          const date = `${year}-${month.padStart(2, "0")}-${String(day).padStart(2, "0")}`;
          requests.push(
              fetch(`https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY&date=${date}`).then(
                  (res) => {
                    if (!res.ok) {
                      throw new Error(`Erreur API pour la date ${date}: ${res.statusText}`);
                    }
                    return res.json();
                  }
              )
          );
        }

        const results = await Promise.all(requests);

        // Filtre les résultats pour ne garder que ceux ayant des images
        this.images = results.filter(
            (result) => result.media_type === "image" && result.url
        );
      } catch (err) {
        this.error = `Impossible de récupérer les images : ${err.message}`;
      } finally {
        this.loading = false;
      }
    },
    viewDetails(image) {
      // Naviguer vers la page des détails avec `image.date` comme paramètre
      this.$router.push({
        name: "ImageDetails",
        params: {
          id: image.date,  // Utiliser la date comme identifiant unique pour l'image
        },
      });
    },
  },
  mounted() {
    this.fetchImages();
  },
};
</script>
