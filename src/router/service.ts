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
        component: () => import("@/pages/Services/Components/ServiceItem.vue"),
        meta: {layout: "ServiceLayoutWithSideBar"},
    },

    {
        path: "/service/keeping",
        name: "service-keeping",
        component: () => import("@/pages/Services/Components/KeepingPage.vue"),
        meta: {layout: "ServiceLayout"},
    },

    {
        path: "/service/keeping-detail/:id",
        name: "service-keeping-detail",
        component: () => import("@/pages/Services/Components/KeepingPageItem.vue"),
        meta: {layout: "ServiceLayout"},
    },

    {
        path: "/transport/:id/:transport_id?",
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
        path: "/transport-repair/:id",
        name: "transport-repair-id",
        component: () => import("@/pages/Services/Transports/TransportDetail.vue"),
        meta: {layout: "ServiceLayout"},
    },
    {
        path: "/transport-rental/:id",
        name: "transport-rental-id",
        component: () => import("@/pages/Services/TransportRental/TransporRent.vue"),
        meta: {layout: "ServiceLayout"},
    },
    {
        path: "/transport-rental-service/:id",
        name: "transport-rental-service-id",
        component: () => import("@/pages/Services/TransportRental/TransporRent.vue"),
        meta: {layout: "ServiceLayout"},
    },
    {
        path: "/transport-rental-service/:id/:id2",
        name: "transport-rental-service-id-id2",
        component: () => import("@/pages/Services/Components/RentPage.vue"),
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
        meta: {layout: "ServiceLayoutWithSideBar"},
    },
    {
        path: "/transport-repair",
        name: "transport-repair",
        component: () => import("@/pages/Services/TransportRepair/Repair.vue"),
        meta: {layout: "ServiceLayout"},
    },
    {

        path: "/transport-repair-rooms",
        name: "transport-repair-rooms-id",
        component: () => import("@/pages/Services/TransportRepair/RepairRooms.vue"),
        meta: {
            layout: "ServiceLayout"
        },

    },
    {
        path: "/transport-repair-room/:id/:id2",
        name: "transport-repair-room-id-id2",
        component: () => import("@/pages/Services/Transports/TransportDetail.vue"),
        meta: {layout: "ServiceLayout"},
    },

]
