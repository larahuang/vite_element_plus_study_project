//createWebHashHistory
import {createRouter,createWebHistory,RouterOptions,Router,
  RouteRecordRaw,
} from "vue-router"

import Layout from "../layout/Layout.vue"
import LayoutBack from "../layout/LayoutBack.vue"
import { ElMessage } from "element-plus"

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    redirect: "/index",
    component: Layout,
    children: [
      {
        path: "index",
        component: () => import("../views/Home.vue"),
        name: "Login",
        meta: { title: "首頁", noAauth: true },
      },
      {
        path: '/table1',
        name: 'Table1',
        component: () => import('../views/Table1.vue')
      },
      {
          path: '/table1',
          name: 'Table1',
          component: () => import('../views/Table1.vue')
      },
     {
        path: '/table2/:page',
        name: 'Table',
        component: () => import('../views/Table2.vue')
      },
      {
        path: '/teleport',
        name: 'Teleport',
            component: () => import('../views/Teleport.vue')
      },
      {
        path: '/products',
        name: 'Products',
        component: () => import('../views/Products.vue')
      },
      {
        path: '/product/:id',
          name: 'Product',
        component: () => import('../views/Product.vue')
      },
    ]
  },
  {
   //後台
    path: "/admin/",
    //  redirect: "/admin",
    component: LayoutBack,
    children: [
      {
        path: "index",
        component: () => import("../views/Dashboard/Admin.vue"),
        name: "Admin",
        meta: { title: "admin", requiresAuth: true },
      },
    ]
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

// 導航守衛
router.beforeEach(async (to, from, next) => {
  const isAuthenticated = localStorage.getItem("token")
  if (to.name == "Login" || to.name == "Register" || to.name == "FormDesign") {
    // console.log(from)
    next()
  } else {
    if (isAuthenticated === null || isAuthenticated === "") {
      ElMessage.error("你還沒有登入 請先登入")
      to.name !== "Admin"
      next({ name: "Login" })
    } else {
      next()
    }
  }
})

export default router