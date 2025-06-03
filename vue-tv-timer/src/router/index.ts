import { createRouter, createWebHashHistory } from 'vue-router';
import Home from '../views/Home.vue';
import TimerGrid from '../views/TimerGrid.vue';
import CountdownTimer from '../views/CountdownTimer.vue';

const routes = [
  {
    path: '/',
    component: Home
  },
  {
    path: '/timer-grid',
    component: TimerGrid
  },
  {
    path: '/countdown',
    component: CountdownTimer
  }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes
});

export default router;
