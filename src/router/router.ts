import {createRouter, createWebHistory, RouteRecordRaw} from "vue-router";

const routes: RouteRecordRaw[] = [

    {
        path: "/",
        name: 'home',

        component: () => import("@/pages/Home/Home.vue"),
        meta: {layout: "MainLayout"},
    },
    {
        path: "/login",
        name: "login",
        component: () => import("@/views/Login.vue"),
        meta: {layout: "LoginLayout"},
    },
];


const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes
});

router.beforeEach(async (to: any, _, next) => {
    if (!to.meta.layout) to.meta.layout = "MainLayout";
    next()
});


router.afterEach((to: any) => {
    const DEFAULT_TITLE = "CARTING";
    document.title = to.meta.title || DEFAULT_TITLE;
});

export default router;
