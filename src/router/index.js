import Vue from 'vue'
import Router from 'vue-router'
import Drop from '@/components/Drop'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Drop',
      component: Drop
    }
  ]
})
