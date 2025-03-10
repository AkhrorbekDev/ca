<script setup lang="ts">
import Cards from '@/pages/Services/Components/Cards.vue'
import {useRoute, useRouter} from "vue-router";
import {inject, onMounted, ref, watchEffect} from "vue";

const router = useRouter()
const route = useRoute()

const enterToDetail = (value: number) => {
  router.push(`/transport-view/${value}`)
}

const $auth = inject('auth')
const $api = inject('api')
const advertisementData = ref([])

watchEffect(() => {
  $api.advertisement.getAdvertisement({
    transport_id: route.params.id
  }).then(res => {
    advertisementData.value = res.data;
  });
})

onMounted(async () => {
  try {
    // await $api.advertisement.getAdvertisement({
    //   transport_id: route.params.id
    // }).then(res => {
    //   advertisementData.value = res.data;
    // });
  } catch (error) {
    console.error("Error fetching data:", error);
  }
})
</script>

<template>
  <div :key="$route.params.id">
    <h1 class="text-[#292D32] text  -[24px] font-500 !mb-[24px]">
      <!--      Yengil avtomobillar <span class="text-[#292D3266] font-400">(Kia Sonet)</span>-->
    </h1>

    <template v-if="advertisementData.length > 0">
      <div class="grid xl:grid-cols-6 lg:grid-cols-5 md:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-5">
        <Cards
            v-for="(item, index) in advertisementData"
            :key="index"
            :item="item"
            @click="enterToDetail(item?.id)"
        />
      </div>
    </template>
    <template v-else>
      <div class="w-full h-[100vh]">
        <div class="flex flex-col items-center gap-[10px] max-w-[300px] !mx-auto !my-auto">
          <img src="@/assets/images/empty.png" class="w-full" alt="">
          <p>
            Ma’lumot yo’q
          </p>
        </div>
      </div>
    </template>

  </div>
</template>
