<script setup lang="ts">
import MainLayout from "@/layout/MainLayout.vue";
import LoginLayout from "@/layout/LoginLayout.vue";
import ErrorLayout from "@/layout/ErrorLayout.vue";
import Selection from "@/views/Login/Selection.vue";
import IncomePasswordLayout from "@/views/Login/IncomePassword.vue";
import PersonalData from "@/views/Login/PersonalData.vue";
import Register from "@/views/Login/Register.vue";
import Service from "@/layout/ServiceLayout.vue"
import { useRoute } from "vue-router";
import { computed } from "vue";

interface RouteMeta {
  layout?: "MainLayout" | "LoginLayout" | "ErrorLayout" | "Selection" | "IncomePasswordLayout" | "Register" | "PersonalData" | "Service";
}

const route = useRoute();
const layout = computed(() => (route.meta as RouteMeta).layout);

const layouts = {
  MainLayout,
  LoginLayout,
  ErrorLayout,
  Selection,
  IncomePasswordLayout,
  Register,
  PersonalData,
  Service
};
</script>

<template>
  <component
      v-if="layout"
      :is="layouts[layout]"
  >
    <RouterView />
  </component>
</template>
