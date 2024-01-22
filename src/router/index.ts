//createWebHashHistory
import {createRouter,createWebHistory,RouterOptions,Router,
RouteRecordRaw,} from "vue-router"

const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        name: 'Home',
        //views資料夾內必須要有Home.vue
        component: () => import('../views/Home.vue')
  },
  {
        path: '/table1',
        name: 'Table1',
        //views資料夾內必須要有Home.vue
        component: () => import('../views/Table1.vue')
    },
     {
        path: '/table',
        name: 'Table',
        //views資料夾內必須要有Home.vue
        component: () => import('../views/Table.vue')
    },
    {
    path: "/:catchAll(.*)",
    name: "404",
    component: () => import("../views/errorPage/404.vue"),
    meta: {
      title: "404",
    },
  },
]

const options: RouterOptions = {
  history: createWebHistory(), //井字號不顯示
  // history: createWebHashHistory(),//井字號顯示
  routes,
}

// Router是路由對象類型
const router: Router = createRouter(options);

export default router