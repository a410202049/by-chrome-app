import { createRouter, createWebHashHistory } from 'vue-router'
import { useLoginStore } from '../store/login'

const routes = [
  {
    path: '/login',
    name: 'login',
    component: () => import('../view/Login.vue'),
    meta: { requiresAuth: false }
  },
  { path: '/:pathMatch(.*)', redirect: '/' },
  {
    path: '/',
    name: 'main',
    component: () => import('../view/main.vue'),
    meta: {
      keepAlive: true // 需要缓存的页面
    }
  },
  {
    path: '/windowList',
    name: 'windowList',
    component: () => import('../view/WindowList.vue'),
    meta: {
      keepAlive: true // 需要缓存的页面
    }
  },
  {
    path: '/proxy',
    name: 'proxy',
    component: () => import('../view/ProxyList.vue'),
    meta: {
      keepAlive: true // 需要缓存的页面
    }
  },
  {
    path: '/sync',
    name: 'sync',
    component: () => import('../view/SyncList.vue'),
    meta: {
      keepAlive: true // 需要缓存的页面
    }
  },
  {
    path: '/newProxy',
    name: 'newproxy',
    component: () => import('../view/NewProxy.vue'),
    meta: {
      keepAlive: false // 不需要缓存的页面
    }
  },
  {
    path: '/editProxy',
    name: 'editproxy',
    component: () => import('../view/EditProxy.vue'),
    meta: {
      keepAlive: false // 不需要缓存的页面
    }
  },
  {
    path: '/editWin',
    name: 'editwin',
    component: () => import('../view/EditWindow.vue'),
    meta: {
      keepAlive: false // 不需要缓存的页面
    }
  },
  {
    path: '/settings',
    name: 'settings',
    component: () => import('../view/Settings.vue'),
    meta: {
      keepAlive: true // 需要缓存的页面
    }
  }
  ,
  {
    path: '/about',
    name: 'about',
    component: () => import('../view/About.vue'),
    meta: {
      keepAlive: true // 需要缓存的页面
    }
  }
]
export const router = createRouter({
  history: createWebHashHistory(),
  routes: routes
})


router.beforeEach((to, from, next) => {
  const loginStore = useLoginStore()
  const isLoggedIn = loginStore.isLoggedIn()

  if (to.meta.requiresAuth === false) {
    if (isLoggedIn) {
      next('/')
    } else {
      next()
    }
  } else if (!isLoggedIn && to.path !== '/login') {
    next('/login')
  } else {
    next()
  }
})

// 给所有路由添加 requiresAuth 元信息
routes.forEach(route => {
  if (route.meta === undefined) {
    route.meta = { requiresAuth: true }
  }
})

export default router