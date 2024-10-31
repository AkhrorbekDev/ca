<script setup lang="ts">
import Cards from '@/pages/Services/Components/Cards.vue'
import {useRouter} from "vue-router";

const router = useRouter()

const enterToDetail = (value: any) => {
  router.push(`/transport-view/${value}`)
}
</script>

<template>
  <div>
    <h1 class="text-[#292D32] text-[24px] font-500 !mb-[24px]">
      Yengil avtomobillar <span class="text-[#292D3266] font-400">(Kia Sonet)</span>
    </h1>

    <div class="grid md:grid-cols-6 gap-5">
      <Cards
          v-for="(item, index) in 30"
          :key="index"
          :item="item"
          @click="enterToDetail(item)"
      />
    </div>
  </div>
</template>
