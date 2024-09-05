import { createRouter, createWebHistory } from "vue-router"
import HomeView from "../views/HomeView.vue"
import DetailView from "@/views/SubjectView.vue"
import ListView from "@/views/ListView.vue"

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
      children: [
        {
          path: "",
          name: "list",
          component: ListView,
        },
        {
          path: "/subject/:id",
          name: "detail",
          component: DetailView,
        },
      ],
    },
  ],
})

export default router
