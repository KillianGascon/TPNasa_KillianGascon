import { createRouter, createWebHistory } from 'vue-router';
import DailyAPOD from '../src/pages/DailyAPOD.vue'; // Page d'accueil
import MonthlyAPOD from '../src/pages/MonthlyAPOD.vue'; // Page Monthly
import AllAPOD from "../src/pages/AllAPOD.vue";
import ImageDetails from '../src/pages/ImageDetails.vue'; // Import de la nouvelle page

const routes = [
    { path: '/', name: 'DailyAPOD', component: DailyAPOD },
    { path: '/monthly', name: 'MonthlyAPOD', component: MonthlyAPOD },
    { path: '/all', name: 'AllAPOD', component: AllAPOD },
    // Route modifiée avec un paramètre dynamique `id`
    { path: '/details/:id', name: 'ImageDetails', component: ImageDetails },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
