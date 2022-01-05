import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    component: () => import( '../views/About.vue')
  },
  {
    path: '/signup',
    name: 'Signup',
    component: () => import( '../views/Signup.vue')
  },
  {
    path: '/signin',
    name: 'Signin',
    component: () => import( '../views/Signin.vue')
  },
  {
    path: '/profile/:username',
    name: 'Profile',
    component: () => import( '../views/Profile.vue')
  },
  {
    path: '/user/:id',
    name: 'user',
    component: () => import( '../views/UserProfile.vue')
  },
  {
    path: '/profile/edit',
    name: 'edit',
    component: () => import( '../views/EditProfile.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
