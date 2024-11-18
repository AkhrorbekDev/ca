<script setup lang="ts">
import Cards from '@/pages/Services/Components/Cards.vue'
import {useRoute, useRouter} from "vue-router";
import {useCommonStore} from "@/stores/common.store"
import {services} from "@/components/fakeJson"
import {onMounted} from "vue";

const store = useCommonStore()

onMounted(() => {

  let item = services.find(el => el.unique == 'rent')
  if (Object.keys(item).length) {
    store.activeService = item
  }

})

const router = useRouter()
const route = useRoute()

const enterToDetail = (value: any) => {
  router.push(`/transport-rental-service/${route.params.id}/${value}/`)
}
</script>

<template>
  <div>
    <h1 class="text-[#292D32] text-[24px] font-500 !mb-[24px]">
      Yengil avtomobillar (Kia Sonet)
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
