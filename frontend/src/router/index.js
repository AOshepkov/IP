import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import RegView from '@/views/RegView.vue'
import LogView from '@/views/LogView.vue'
import ExcercisesVue from '@/views/exs/ExcercisesVue.vue'
import ExrcTable from '@/views/exs/ExrcTable.vue'
import ExrcPair from '@/views/exs/ExrcPair.vue'
import ExrcNum from '@/views/exs/ExrcNum.vue'
import ExrcGeom from '@/views/exs/ExrcGeom.vue'
import ExrcTypes from '@/views/exs/ExrcTypes.vue'

import { computed } from 'vue'
import { useAccountStore } from '@/stores/account'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/register',
      name: 'reg',
      component: RegView,
    },
    {
      path: '/login',
      name: 'log',
      component: LogView,
    },
    {
      path: '/excrc',
      name: 'excrcs',
      component: ExcercisesVue,
    },
    {
      path: '/excrc/id-1',
      name: 'excrc_table',
      component: ExrcTable,
    },
    {
      path: '/excrc/id-2',
      name: 'excrc_pair',
      component: ExrcPair,
    },
    {
      path: '/excrc/id-3',
      name: 'excrc_num',
      component: ExrcNum,
    },
    {
      path: '/excrc/id-4',
      name: 'excrc_geom',
      component: ExrcGeom,
    },
    {
      path: '/excrc/id-5',
      name: 'excrc_types',
      component: ExrcTypes,
    },
  ],
})
router.beforeEach(async (to) => {
  const userStore = useAccountStore()
  let token = computed(() => userStore.token)
  if (!token.value && !['home','reg','log'].includes(to.name)) return { name: 'log' }
})

export default router
export { router }
