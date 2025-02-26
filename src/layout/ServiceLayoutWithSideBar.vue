<script setup lang="ts">
import ServiceNavbar from "@/components/ServiceNavbar.vue";
import {useRoute} from "vue-router";
import ServiceSideBar from "@/components/ServiceSideBar.vue";

const route = useRoute()
</script>

<template>
  <div class="bg-[#FAFAFA] min-h-screen">
    <ServiceSideBar class="z-50"/>

    <div class="!pt-[118px] !px-[24px]">
      <slot/>
    </div>

  </div>
</template>

<style>
.support a {
  box-shadow: 0 24px 32px 0 #66C61C40;
}
</style>
