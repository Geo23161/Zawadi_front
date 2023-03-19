import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';

const routes: Array<RouteRecordRaw> = [
  {
    path: '',
    redirect: '/acheteur'
  },
  {
    path: '/acheteur',
    component: () => import ('../views/AcheteurView.vue')
  },
  {
    path: '/profil',
    component: () => import ('../views/ProfilAcheteurView.vue')
  },
  {
    path: '/choosing',
    component: () => import ('../views/ChooseProductView.vue')
  },
  {
    path: '/seller',
    component: () => import('../views/SellerLoginView.vue'),
  },
  {
    path: '/seller/register',
    component: () => import('../views/SellerRegisterView.vue'),
  },
  {
    path: '/seller/home',
    component: () => import('../views/SellerView.vue'),
  },
  {
    path: '/seller/params',
    component: () => import('../views/ParamsSeller.vue'),
  },
  {
    path: '/seller/pay',
    component: () => import('../views/PayView.vue'),
  },
  {
    path: '/seller/product/:id',
    component: () => import('../views/ProductPage.vue'),
  },
  {
    path: '/seller/add',
    component: () => import('../views/AddPage.vue'),
  },
  {
    path: '/seller/sold',
    component: () => import('../views/SoldProduct.vue'),
  },
  {
    path: '/patner',
    component: () => import('../views/PatnerLogin.vue'),
  },
  {
    path: '/patner/register',
    component: () => import('../views/PatnerRegister.vue'),
  },
  {
    path: '/patner/home',
    component: () => import('../views/PatnerView.vue'),
  },
  {
    path: '/patner/params',
    component: () => import('../views/ParamsPatner.vue'),
  },
  {
    path: '/patner/pay',
    component: () => import('../views/PayPatnerView.vue'),
  },
  {
    path: '/patner/cat/:id',
    component: () => import('../views/CatPage.vue'),
  },
  {
    path: '/patner/add',
    component: () => import('../views/AddCatPatner.vue'),
  },
  {
    path: '/patner/dem',
    component: () => import('../views/PatnerDem.vue'),
  },
  {
    path: '/patner/dem/:id',
    component: () => import('../views/DemPage.vue'),
  },
  {
    path: '/about',
    component: () => import('../views/AboutVue.vue'),
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
