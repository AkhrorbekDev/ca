<script setup lang="ts">
import Cards from '@/pages/Services/Components/Cards.vue'
import {useRoute, useRouter} from "vue-router";

const router = useRouter()
const route = useRoute()

const enterToDetail = (value: any) => {
  router.push(`/transport-repair-room/1/${value}/`)
}
</script>

<template>
  <div>
    <h1 class="text-[#292D32] text-[24px] font-500 !mb-[24px]">
      Ustaxonalar
    </h1>

    <div class="grid md:grid-cols-6 gap-5">
      <Cards
          v-for="(item, index) in 30"
          :key="index"
          :item="item"
          :is-room="true"
          @click="enterToDetail(item)"
      />
    </div>
  </div>
</template>
