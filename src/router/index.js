import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import store from '../store/index.js';
const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta:{
      auth: true
    }
  },
  {
    path: '/about',
    name: 'About',
    component: () => import( '../views/About.vue'),
    meta:{
      auth: false
    }
  },
  {
    path: '/signup',
    name: 'Signup',
    component: () => import( '../views/Signup.vue'),
    meta:{
      auth: false
    }
  },
  {
    path: '/signin',
    name: 'Signin',
    component: () => import( '../views/Signin.vue'),
    meta:{
      auth: false
    }
  },
  {
    path: '/profile/:username',
    name: 'Profile',
    component: () => import( '../views/Profile.vue'),
    meta:{
      auth: true
    }
  },
  {
    path: '/user/:id',
    name: 'user',
    component: () => import( '../views/UserProfile.vue'),
    meta:{
      auth: true
    }
  },
  {
    path: '/profile/edit',
    name: 'edit',
    component: () => import( '../views/EditProfile.vue'),
    meta:{
      auth: true
    }
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next)=>{
  if (to.meta.auth && store.getters.getUser === "") {
    next('/signin')
  }
  else if(to.meta.auth && store.getters.getUser !== ""){
    next()
  }else{
    next()
  }
})

export default router
