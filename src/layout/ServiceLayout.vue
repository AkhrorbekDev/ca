<script setup lang="ts">
import ServiceNavbar from "@/components/ServiceNavbar.vue";
import {useRoute} from "vue-router";

const route = useRoute()
</script>

<template>
  <div class="bg-[#FAFAFA] min-h-screen">
    <ServiceNavbar/>

    <div :class="route.name === 'services' ? '' : '!pt-[148px] !px-[24px]'">
      <slot/>
    </div>
  </div>
</template>
