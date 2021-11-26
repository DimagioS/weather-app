import { createRouter, createWebHistory } from 'vue-router'
import Login from '../views/Login.vue'
import Signup from '../views/Signup.vue'
import CitySearch from '../views/CitySearch.vue'
import Details from '../views/Details.vue'
import AddCard from '../views/AddCard.vue'
import firebase from 'firebase/compat/app'

const routes = [
  {
    path: '/home',
    name: 'Home',
    meta: { auth: true },
    component: AddCard,
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    alias: '/'
  },
  {
    path: '/signup',
    name: 'Signup',
    component: Signup
  },
  {
    path: '/search',
    name: 'CitySearch',
    meta: { auth: true },
    component: CitySearch
  },
  {
    path: '/details',
    name: 'Details',
    meta: { auth: true },
    component: Details
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  linkActiveClass: 'active',
  linkExactActiveClass: 'active'
})

router.beforeEach((to, from, next) => {
  const currentUser = firebase.auth().currentUser;
  const requierAuth = to.matched.some(record => record.meta.auth)
  const existingUrl = routes.find(route => route.path === to.path)

  if (!existingUrl && currentUser) {
    from
  } else if (!existingUrl) {
    next('/login')
  } else if (!currentUser && requierAuth) {
    next('/login')
  } else {
    next()
  }
})

export default router
