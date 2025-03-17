<script setup lang="ts">
import {ref} from 'vue';
import Login from '@/views/Login/components/Login.vue';

const showCodeField = ref(false);
</script>

<template>
  <div>
    <div v-show="!showCodeField">
      <div v-if="showBackground" class="fixed inset-0">
        <img src="../../assets/images/bgCar.png" alt="Background" class="w-full h-full object-cover">
      </div>

      <Login @on:send="showBackground = $event"/>
    </div>
  </div>
</template>

<style scoped lang="scss">

</style>
