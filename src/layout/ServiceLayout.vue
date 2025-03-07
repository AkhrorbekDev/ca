<script setup lang="ts">
import ServiceNavbar from "@/components/ServiceNavbar.vue";
import {useRoute} from "vue-router";

const route = useRoute()
</script>

<template>
  <div class="bg-[#FAFAFA] min-h-screen">
    <ServiceNavbar class="z-50"/>
    <div class="!pt-[118px] !px-[24px]">
      <slot/>
    </div>

    <div v-if="route.name !== 'service-detail'" class="support flex flex-col fixed bottom-[30px] right-[30px]">
      <a href="tel:+998990893954" class="!p-[16px] rounded-full bg-[#66C61C]">
        <img src="@/assets/images/icons/phone.svg" alt="phone"/>
      </a>

      <a href="https://telegram.org/" target="_blank" class="!p-[16px] rounded-full bg-[#66C61C] !mt-[24px]">
        <img src="@/assets/images/icons/sms.svg" alt="sms"/>
      </a>
    </div>
  </div>
</template>

<style>
.support a {
  box-shadow: 0 24px 32px 0 #66C61C40;
}
</style>
