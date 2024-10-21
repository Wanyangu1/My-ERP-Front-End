// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router';
import { useAuthStore } from '../store/auth';  // Import the auth store
import Home from '../views/Home.vue';
import Login from '../views/Login.vue';
import Register from '../views/Register.vue';
import TeacherDashboard from '../views/TeacherDashboard.vue';
import CourseDetail from '../components/CourseDetail.vue';
import ModuleDetail from '../components/ModuleDetail.vue';

// Define the routes
const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/login', name: 'Login', component: Login },
  { path: '/register', name: 'Register', component: Register },
  { path: '/dashboard', name: 'TeacherDashboard', component: TeacherDashboard },
  { path: '/courses/:id', name: 'CourseDetail', component: CourseDetail },
  { path: '/courses/:courseId/modules/:moduleId', name: 'ModuleDetail', component: ModuleDetail },
];

// Create the router instance
const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Navigation guard to protect routes
router.beforeEach((to, from, next) => {
  const auth = useAuthStore();  // Access the auth store
  const publicPages = ['Login', 'Register', 'Home'];  // Define public pages

  // Check if the route is public or if the user is authenticated
  if (!publicPages.includes(to.name) && !auth.token) {
    // If not authenticated, redirect to Login
    next({ name: 'Login' });
  } else {
    // Proceed to the requested route
    next();
  }
});

export default router;
