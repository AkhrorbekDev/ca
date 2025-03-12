<script setup lang="ts">
import {useRoute} from "vue-router";
import ServiceSideBar from "@/components/ServiceSideBar.vue";
import {computed, inject, onMounted, ref} from "vue";
import useAdvertisementStore from '@/stores/advertisement'
import useBreadcrumbs from '@/stores/breadcrumbs'
import {ADV_TYPES} from "@/constants";
import ProfileDropDown from "@/components/ProfileDropDown.vue";
import ConfirmDialog from "primevue/confirmdialog";

const breadcrumbsStore = useBreadcrumbs()

const adv_store = useAdvertisementStore()
const route = useRoute()
const $api = inject('api')
onMounted(() => {
  $api.services.getServices().then(res => {
    adv_store.setServices(ADV_TYPES.provide, res.data)
  })
})
const home = ref({
  icon: 'pi pi-home',
  route: '/',
  class: '!text-[#292D3266]'
});

const breadcrumbs = computed(() => {
  return breadcrumbsStore.getBreadcrumbs
})
</script>

<template>
  <div class="bg-[#FAFAFA] min-h-screen flex items-start">
    <ServiceSideBar class="z-50"/>
    <Toast position="bottom-right" group="br"/>

    <ConfirmDialog group="auth"/>
    <div
        class="fixed z-[2] profile_shadow   !rounded-[100px] top-[24px] !px-[32px] !py-[20px] right-[24px] bg-[#ffffff] ">
      <ProfileDropDown class=" "/>
    </div>
    <div class="w-full !px-[24px]">
      <slot/>
    </div>

  </div>
</template>

<style>
.support a {
  box-shadow: 0 24px 32px 0 #66C61C40;
}

.profile_shadow {
  box-shadow: 0px 32px 100px 0px #292D3229;

}
</style>
