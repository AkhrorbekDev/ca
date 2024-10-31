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
        component: () => import("@/views/Login/Login.vue"),
        meta: {layout: "LoginLayout"},
    },
    {
        path: "/income-password",
        name: "income-password",
        component: () => import("@/views/Login/IncomePassword.vue"),
        meta: {layout: "IncomePasswordLayout"},
    },
    {
        path: "/register",
        name: "register",
        component: () => import("@/views/Login/Register.vue"),
        meta: {layout: "Register"},
    },
    {
        path: "/selection",
        name: "selection",
        component: () => import("@/views/Login/Selection.vue"),
        meta: {layout: "Selection"},
    },
    {
        path: "/personal-data",
        name: "personal-data",
        component: () => import("@/views/Login/PersonalData.vue"),
        meta: {layout: "PersonalData"},
    },

    // services
    {
        path: "/services",
        name: "services",
        component: () => import("@/pages/Services/Map.vue"),
        meta: {layout: "ServiceLayout"},
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
    const DEFAULT_TITLE = "Carting transport xizmati";
    document.title = to.meta.title || DEFAULT_TITLE;
});

export default router;
