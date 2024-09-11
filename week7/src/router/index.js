import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AboutView from '../views/AboutView.vue'
import LoginView from '@/views/LoginView.vue'
import FirebaseSigninView from '../views/FirebaseSigninView.vue'
import FirebaseRegisterView from '../views/FirebaseRegisterView.vue'
import UserDashboard from '@/views/UserDashboard.vue'
import AdminDashboard from '@/views/AdminDashboard.vue'
import AddBookView from '@/views/AddBookView.vue'
import { getAuth } from 'firebase/auth'
import { getFirestore, doc, getDoc } from 'firebase/firestore'


const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'About',
    component: AboutView,

  },
  {
    path: '/login',
    name: 'Login',
    component: LoginView
  },
  {
    path: '/FireLogin',
    name: 'FireLogin',
    component: FirebaseSigninView
  },
  {
    path: '/FireRegister',
    name: 'FireRegister',
    component: FirebaseRegisterView
  },
  {
    path: '/UserDashboard',
    name: 'UserDashboard',
    component: UserDashboard,
    meta: { requiresAuth: true, role: 'user' } 
  },
  {
    path: '/AdminDashboard',
    name: 'AdminDashboard',
    component: AdminDashboard,
    meta: { requiresAuth: true, role: 'admin' }
  },
  {
    path: '/addbook',
    name: 'AddBook',
    component: AddBookView
  },
]


const router = createRouter({
  history: createWebHistory(),
  routes
})


router.beforeEach(async (to, from, next) => {
  const auth = getAuth()
  const db = getFirestore()
  const currentUser = auth.currentUser

  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!currentUser) {
      next({ name: 'Login' }) 
    } else {
      console.log('Current User:', currentUser)
      const userDoc = await getDoc(doc(db, "users", currentUser.uid))
      if (userDoc.exists()) {
        const userData = userDoc.data()
        const userRole = userData.role

   
        if (to.meta.role && to.meta.role !== userRole) {
          next({ name: 'Home' })  
        } else {
          next() 
        }
      } else {
        next({ name: 'Login' })  
      }
    }
  } else {
    next()
  }
})

export default router
