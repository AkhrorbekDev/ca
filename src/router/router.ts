import {createRouter, createWebHistory, RouteRecordRaw} from "vue-router";
import PersonalData from "@/pages/Login/PersonalData.vue";

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
        component: () => import("@/pages/Login/Login.vue"),
        meta: {layout: "LoginLayout"},
    },
    {
        path: "/income-password",
        name: "income-password",
        component: () => import("@/pages/Login/IncomePassword.vue"),
        meta: {layout: "IncomePasswordLayout"},
    },
    {
        path: "/register",
        name: "register",
        component: () => import("@/pages/Login/Register.vue"),
        meta: {layout: "Register"},
    },
    {
        path: "/selection",
        name: "selection",
        component: () => import("@/pages/Login/Selection.vue"),
        meta: {layout: "Selection"},
    },
    {
        path: "/personal-data",
        name: "personal-data",
        component: () => import("@/pages/Login/PersonalData.vue"),
        meta: {layout: "PersonalData"},
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
