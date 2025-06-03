import { createApp } from 'vue';
import App from './App.vue';
import store from './store';
import router from './router';

const app = createApp(App);
app.use(store);
app.use(router);

// Add error handling
app.config.errorHandler = (err) => {
  console.error('Global error:', err);
};

app.mount('#app');