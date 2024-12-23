<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const currentYear = new Date().getFullYear();
const selectedYear = ref(currentYear);
const months = [
  'Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin',
  'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'
];
const daysInMonth = (month, year) => new Date(year, month + 1, 0).getDate();
const selectedDate = ref(null);

const selectDate = (day, month) => {
  const formattedMonth = String(month + 1).padStart(2, '0');
  const formattedDay = String(day).padStart(2, '0');
  selectedDate.value = `${selectedYear.value}-${formattedMonth}-${formattedDay}`;

  // Redirection vers ImageDetails.vue avec la date sélectionnée
  router.push({ name: 'ImageDetails', params: { id: selectedDate.value } });
};
</script>

<template>
  <div class="min-h-screen bg-gradient-to-b from-zinc-900 to-purple-900 flex flex-col items-center py-6">
    <h1 class="text-3xl font-bold text-white mb-6">Sélecteur d'images APOD</h1>

    <!-- Sélecteur d'année -->
    <div class="mb-6">
      <label for="year" class="text-white mr-4">Sélectionnez une année :</label>
      <select
          id="year"
          v-model="selectedYear"
          class="bg-gray-800 text-white px-4 py-2 rounded"
      >
        <option v-for="year in [2023, 2024]" :key="year" :value="year">
          {{ year }}
        </option>
      </select>
    </div>

    <!-- Affichage des mois -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full px-4">
      <div
          v-for="(month, monthIndex) in months"
          :key="month"
          class="bg-gray-800 text-white p-4 rounded shadow-lg"
      >
        <h2 class="text-lg font-bold mb-4">{{ month }}</h2>
        <div class="grid grid-cols-7 gap-1">
          <span v-for="day in daysInMonth(monthIndex, selectedYear)" :key="day">
            <button
                @click="selectDate(day, monthIndex)"
                class="bg-purple-600 hover:bg-purple-500 text-white rounded px-2 py-1"
            >
              {{ day }}
            </button>
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
button {
  transition: background-color 0.3s;
}
</style>