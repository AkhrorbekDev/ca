export default [
    {
        path: "/services",
        name: "services",
        component: () => import("@/pages/Services/Services/Services.vue"),
        meta: {layout: "ServiceLayout"},
    },
    {
        path: "/service-detail/:type",
        name: "service-detail",
        component: () => import("@/pages/Services/components/ServiceItem.vue"),
        meta: {layout: "ServiceLayout"},
    },
    {
        path: "/transport/:id",
        name: "transport-id",
        component: () => import("@/pages/Services/Transports/Transports.vue"),
        meta: {layout: "ServiceLayout"},
    },
    {
        path: "/transport-view/:id",
        name: "transport-view-id",
        component: () => import("@/pages/Services/Transports/TransportDetail.vue"),
        meta: {layout: "ServiceLayout"},
    },
    {
        path: "/transport-rental",
        name: "transport-rental",
        component: () => import("@/pages/Services/TransportRental/Rental.vue"),
        meta: {layout: "ServiceLayout"},
    },
    {
        path: "/announcement",
        name: "announcement",
        component: () => import("@/pages/Services/Announcement/Announcement.vue"),
        meta: {layout: "ServiceLayout"},
    },
]