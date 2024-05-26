import { createRouter, createWebHistory } from 'vue-router';

// autoload routes
const modules = import.meta.glob('./**/*.js', {eager: true})
const routes = Object.entries(modules).map(([path, m]) => {
  return m.default
}).flatMap(arr => arr);

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;