import { createApp } from 'vue';
import App from './App.vue';
import router from '../router/index.js'; // Import du router

const app = createApp(App);

app.use(router); // Ajoute Vue Router
app.mount('#app');
