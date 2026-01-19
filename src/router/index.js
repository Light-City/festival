import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../pages/Home.vue'
import ProgramList from '../pages/ProgramList.vue'
import AICard from '../pages/AICard.vue'
import CoCreator from '../pages/CoCreator.vue'
import ProgramShowcase from '../pages/ProgramShowcase.vue'
import Matchmaking from '../pages/Matchmaking.vue'
import CreatorSupport from '../pages/CreatorSupport.vue'
import Admin from '../pages/Admin.vue'
import About from '../pages/About.vue'
import NotFound from '../pages/NotFound.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/program-list',
    name: 'ProgramList',
    component: ProgramList
  },
  {
    path: '/ai-card',
    name: 'AICard',
    component: AICard
  },
  {
    path: '/co-creator',
    name: 'CoCreator',
    component: CoCreator
  },
  {
    path: '/program-showcase',
    name: 'ProgramShowcase',
    component: ProgramShowcase
  },
  {
    path: '/matchmaking',
    name: 'Matchmaking',
    component: Matchmaking
  },
  {
    path: '/creator-support',
    name: 'CreatorSupport',
    component: CreatorSupport
  },
  {
    path: '/admin',
    name: 'Admin',
    component: Admin
  },
  {
    path: '/about',
    name: 'About',
    component: About
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: NotFound
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router