<script setup lang="ts">
import {useRoute} from "vue-router";
import ServiceSideBar from "@/components/ServiceSideBar.vue";
import {inject, onMounted} from "vue";
import useAdvertisementStore from '@/stores/advertisement'
import {ADV_TYPES} from "@/constants";

const adv_store = useAdvertisementStore()
const route = useRoute()
const $api = inject('api')
onMounted(() => {
  $api.services.getServices().then(res => {
    adv_store.setServices(ADV_TYPES.provide, res.data)
  })
})
</script>

<template>
  <div class="bg-[#FAFAFA] min-h-screen flex items-start">
    <ServiceSideBar class="z-50"/>

    <div class="w-full">
      <slot/>
    </div>

  </div>
</template>

<style>
.support a {
  box-shadow: 0 24px 32px 0 #66C61C40;
}
</style>
