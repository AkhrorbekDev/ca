<script setup lang="ts">

import ServiceSideBar from "@/components/ServiceSideBar.vue";
import ConfirmDialog from "primevue/confirmdialog";
import ProfileDropDown from "@/components/ProfileDropDown.vue";
import ProfileSideBar from "@/pages/Profile/components/ProfileSideBar.vue";
</script>

<template>
  <div class="bg-[#FAFAFA] min-h-screen flex items-start">
    <ServiceSideBar/>
    <Toast position="bottom-right" group="br"/>
    <ConfirmDialog group="auth"/>
    <div
        class="fixed z-[2] profile_shadow   !rounded-[100px] top-[24px] !px-[32px] !py-[20px] right-[24px] bg-[#ffffff] ">
      <ProfileDropDown class=" "/>
    </div>
    <div class="w-full !px-[24px]">
      <ProfileSideBar/>
      <div>
        <slot/>
      </div>
    </div>

  </div>
</template>

<style scoped lang="scss">

</style>
