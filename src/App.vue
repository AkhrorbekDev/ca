<script setup lang="ts">
import MainLayout from "@/layout/MainLayout.vue";
import LoginLayout from "@/layout/LoginLayout.vue";
import ErrorLayout from "@/layout/ErrorLayout.vue";
import Selection from "@/views/Login/Selection.vue";
import IncomePasswordLayout from "@/views/Login/IncomePassword.vue";
import PersonalData from "@/views/Login/PersonalData.vue";
import Register from "@/views/Login/Register.vue";
import ServiceLayout from "@/layout/ServiceLayout.vue"
import {useRoute} from "vue-router";
import {computed, onMounted} from "vue";
import ServiceLayoutWithSideBar from "@/layout/ServiceLayoutWithSideBar.vue";

interface RouteMeta {
  layout?: "MainLayout" | "LoginLayout" | "ErrorLayout" | "Selection" | "IncomePasswordLayout" | "Register" | "PersonalData" | "ServiceLayout" | "ServiceLayoutWithSideBar";
}

const route = useRoute();
const layout = computed(() => (route.meta as RouteMeta).layout);
import {inject} from "vue";

const $auth = inject('auth')
const $api = inject('api')

const layouts = {
  MainLayout,
  LoginLayout,
  ErrorLayout,
  Selection,
  IncomePasswordLayout,
  Register,
  PersonalData,
  ServiceLayout,
  ServiceLayoutWithSideBar
};
onMounted(async () => {

  // console.log($api.services._fetch('test', {
  //   method: 'put'
  // }))

  // const res = await $api.auth.sendSmsCode({
  //   "phone_number":"998970175492",
  //   "sms_type":"phone",
  //   "type": 1 // 1-Login, 2-Regisrt
  // })
  console.log($auth.loggedIn)
  $auth.login({
    "phone_number": "998970175492",
    "sms_type": "phone", // phone, mail
    "session_token": "56139af2098c26094899ece593debbdb",
    "security_code": "5555"
  }).then(res => {
    console.log(res)
    console.log($api.services.getServices())
  })
})
</script>

<template>
  <component
      v-if="layout"
      :is="layouts[layout]"
  >
    <RouterView/>
  </component>
</template>
