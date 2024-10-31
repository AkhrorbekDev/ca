<script setup lang="ts">
import ServiceNavbar from "@/components/ServiceNavbar.vue";
import {useRoute} from "vue-router";

const route = useRoute()
</script>

<template>
  <div>
    <ServiceNavbar/>

    <div :class="route.name === 'services' ? '' : '!mt-[148px]'">
      <slot/>
    </div>
  </div>
</template>
