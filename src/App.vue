<script setup lang="ts">
import MainLayout from "@/layout/MainLayout.vue";
import LoginLayout from "@/layout/LoginLayout.vue";
import ErrorLayout from "@/layout/ErrorLayout.vue";
import Selection from "@/pages/Login/Selection.vue";
import IncomePasswordLayout from "@/pages/Login/IncomePassword.vue";
import PersonalData from "@/pages/Login/PersonalData.vue";
import Register from "@/pages/Login/Register.vue";
import { useRoute } from "vue-router";
import { computed } from "vue";

interface RouteMeta {
  layout?: "MainLayout" | "LoginLayout" | "ErrorLayout" | "Selection" | "IncomePasswordLayout" | "Register" | "PersonalData";
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
