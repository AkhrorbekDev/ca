<script setup lang="ts">
import Cards from '@/pages/Services/Components/Cards.vue'
import {useRoute, useRouter} from "vue-router";
import {services} from "@/components/fakeJson"
import {useCommonStore} from "@/stores/common.store";
import {inject, onMounted, ref, watchEffect} from "vue";
import Breadcrumbs from "@/components/Breadcrumbs.vue";

const store = useCommonStore()

onMounted(() => {

  let item = services.find(el => el.unique == 'repair')
  if (Object.keys(item).length) {
    store.activeService = item
  }

})

const openFilter = ref(false)

const router = useRouter()
const route = useRoute()

const enterToDetail = (value: any) => {
  router.push(`/transport-repair-room/1/${value}/`)
}

const toggleFilter = () => {
  openFilter.value = !openFilter.value
}

const categoriesList = [
  "Motorist",
  "Avtoelektrika",
  "Kuzovchi",
  "Avtotuning",
  "Hodovik",
]

const categories = ref([])

const servicesList = [
  "Polirovka",
  "Keramika",
  "Bo’yoq",
  "Myatina",
]

const service = ref([])
const rating = ref([])

const pushService = (index) => {
  if (service.value.includes(index)) {
    return
  }

  service.value.push(index)
}

const pushCategory = (index) => {
  if (categories.value.includes(index)) {
    return
  }

  categories.value.push(index)
}

const pushRating = (index) => {
  if (rating.value.includes(index)) {
    return
  }

  rating.value.push(index)
}
const $api = inject('api')
const advertisementData = ref([])

watchEffect(() => {
  $api.advertisement.getAdvertisement({
    service_id: 5,
    repair_type_id: route.query?.repair_type_id
  }).then(res => {
    advertisementData.value = res.data;
  });
})

const clearFilters = () => {
  rating.value = []
  categories.value = []
  service.value = []
}

</script>

<template>
  <div>
    <Breadcrumbs/>

    <div class="flex items-center justify-between !mb-4">
      <span class="text-[#292D32] font-medium text-[24px]">{{
          $route.query?.repair_type_id ? $t('masters') : $t('workshops')
        }}</span>


      <button @click="toggleFilter"
              class="flex items-center gap-2 bg-white !px-[16px] !py-[12px] rounded-[16px] relative">
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
              d="M14.3229 2.5H5.54773C3.92225 2.5 2.9757 4.3362 3.91865 5.66022L6.86104 9.79167C7.34357 10.4692 7.60288 11.2803 7.60288 12.1121V15.2744C7.60288 16.5036 8.59932 17.5 9.82848 17.5C11.0576 17.5 12.0541 16.5036 12.0541 15.2744V12.1719C12.0541 11.3032 12.3369 10.4581 12.8597 9.76435L15.9201 5.70375C16.9133 4.38587 15.9731 2.5 14.3229 2.5Z"
              stroke="#363853" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>

        {{ $t('filter') }}

        <div @click.stop v-if="openFilter"
             class="w-[375px] absolute z-[999] top-[130%] right-[0] bg-white text-start !p-[16px] rounded-[24px]">
          <div class="flex items-center justify-between !mb-[24px]">
            <span class="text-[#1A1F23] font-medium text-[16px]">{{ $t('filter') }}</span>
            <span @click="clearFilters" class="text-[#F04438] font-medium">{{ $t('clear') }}</span>
          </div>

          <div
              class="bg-[#FAFAFA] !py-[12px] !px-[16px] rounded-[24px] !mb-[24px]">
            <span class="text-[#292D324D] text-[12px] !mb-[8px] block text-start">{{ $t('categories') }}</span>

            <div class="grid grid-cols-3 gap-4">
              <button
                  v-for="(item, index) in categoriesList" @click="pushCategory(index)"
                  :class="['!py-[4px] !px-[12px] text-[#292D32] text-[12px] rounded-[20px] bg-[#FFFFFF]', categories.includes(index) && '!bg-[#66C61C] text-white']">
                {{
                  item
                }}
              </button>
            </div>
          </div>

          <div class="bg-[#FAFAFA] !py-[12px] !px-[16px] rounded-[24px]">
            <span class="text-[#292D324D] text-[12px] !mb-[8px] block text-start">{{ $t('services') }}</span>

            <div class="flex items-center gap-2">
              <button
                  v-for="(item, index) in servicesList" @click="pushService(index)"
                  :class="['!py-[4px] !px-[12px] text-[#292D32] text-[12px] rounded-[20px] bg-[#FFFFFF]', service.includes(index) && '!bg-[#66C61C] text-white']">
                {{
                  item
                }}
              </button>
            </div>
          </div>

          <div class="!my-[16px]">
            <FloatLabel variant="in">
              <Select placeholder="Hududni tanlang"
                      class="w-full !bg-[#FAFAFA] !border-0 !rounded-[24px] custom-placeholder-select h-[76px] flex items-center">
              </Select>
              <label for="in_label" class="!text-[#292D324D]">{{ $t('region') }}</label>
            </FloatLabel>
          </div>

          <div
              class="bg-[#FAFAFA] !py-[12px] !px-[16px] rounded-[24px] !mb-[24px]">
            <span class="text-[#292D324D] text-[12px] !mb-[8px] block text-start">{{ $t('rating') }}</span>

            <div class="grid grid-cols-5 gap-4">
              <button
                  v-for="(item, index) in 5" @click="pushRating(index)"
                  :class="['flex items-center gap-1 !py-[4px] !px-[12px] text-[#292D32] text-[12px] rounded-[20px] bg-[#FFFFFF]', rating.includes(index) && '!bg-[#66C61C] text-white']">

                <svg :style="rating.includes(index) &&  'filter: brightness(100);'" width="15" height="14"
                     viewBox="0 0 15 14" fill="none"
                     xmlns="http://www.w3.org/2000/svg">
                  <path
                      d="M0 5.83162V5.50778C0 5.48545 -2.01166e-05 5.46682 0.0261971 5.44449C0.0699841 5.24132 0.177202 5.05707 0.332562 4.91804C0.487921 4.77901 0.683509 4.69231 0.891388 4.67026C1.98003 4.50896 3.06991 4.35262 4.16104 4.20125C4.26132 4.19277 4.35744 4.15751 4.4392 4.09919C4.52096 4.04087 4.5853 3.96166 4.62546 3.86995C5.10111 2.89471 5.588 1.92315 6.07115 0.951626C6.1223 0.845254 6.18783 0.74635 6.26591 0.657594C6.376 0.537411 6.51415 0.446016 6.66819 0.391461C6.82224 0.336907 6.98745 0.320839 7.14921 0.344751C7.31096 0.368662 7.4643 0.431798 7.5957 0.528549C7.7271 0.6253 7.83249 0.75273 7.90261 0.899554C8.40074 1.88969 8.89512 2.88727 9.40074 3.87741C9.44058 3.96616 9.50364 4.04266 9.58334 4.09896C9.66305 4.15527 9.75652 4.18931 9.85395 4.19752C10.9513 4.35013 12.0449 4.50648 13.1423 4.66654C13.3477 4.69098 13.5402 4.77883 13.6927 4.91772C13.8452 5.05661 13.9501 5.23954 13.9925 5.44076C14.0329 5.61585 14.0251 5.79853 13.9697 5.96953C13.9143 6.14053 13.8135 6.2935 13.6779 6.41228C12.8839 7.17535 12.0974 7.94216 11.3071 8.70524C11.2399 8.76321 11.1892 8.83777 11.1603 8.92143C11.1314 9.00509 11.1252 9.0949 11.1423 9.18171C11.3196 10.1743 11.4906 11.1669 11.6554 12.1596C11.7086 12.3838 11.725 12.615 11.7041 12.8445C11.6781 13.0042 11.6128 13.1551 11.5139 13.2837C11.4151 13.4124 11.2858 13.5148 11.1376 13.5818C10.9893 13.6489 10.8268 13.6785 10.6642 13.668C10.5017 13.6576 10.3443 13.6074 10.206 13.5219C9.24719 13.0256 8.29338 12.5293 7.34456 12.033C7.24187 11.9708 7.12395 11.938 7.00373 11.938C6.8835 11.938 6.76563 11.9708 6.66294 12.033C5.71162 12.5429 4.74906 13.038 3.79026 13.5219C3.62121 13.619 3.42685 13.6639 3.23203 13.6506C3.0372 13.6374 2.85076 13.5666 2.69661 13.4475C2.54005 13.3356 2.42073 13.1798 2.35399 13.0001C2.28725 12.8203 2.27613 12.6248 2.32208 12.4387C2.50934 11.3704 2.69661 10.2984 2.88013 9.2301C2.90297 9.12598 2.89692 9.01763 2.86262 8.91666C2.82831 8.8157 2.76708 8.72589 2.68541 8.65685C1.95882 7.96077 1.23969 7.25353 0.509358 6.55746C0.272459 6.3696 0.0955184 6.11747 0 5.83162Z"
                      fill="#FCA807"/>
                </svg>

                {{
                  item
                }}
              </button>
            </div>
          </div>

          <button @click="openFilter = false"
                  class="w-full bg-[#66C61C] rounded-[24px] !p-[16px] text-white !mt-[148px]">
            {{ $t('save') }}
          </button>

        </div>
      </button>
    </div>

    <template v-if="advertisementData.length > 0">
      <div class="grid xl:grid-cols-6 lg:grid-cols-5 md:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-5">
        <Cards
            v-for="(item, index) in advertisementData"
            :key="index"
            :item="item"
            :is-room="true"
            @click="enterToDetail(item?.id)"
        />
      </div>
    </template>
    <template v-else>
      <div class="w-full h-[100vh]">
        <div class="flex flex-col items-center gap-[10px] max-w-[300px] !mx-auto !my-auto">
          <img src="@/assets/images/empty.png" class="w-full" alt="">
          <p>
            {{ $t('noData') }}
          </p>
        </div>
      </div>
    </template>
  </div>
</template>

<style lang="scss">
.p-floatlabel label {
  top: 1rem !important;
}

.custom-placeholder-select .p-placeholder {
  font-size: 14px !important;
  color: #292D324D !important;
}

.custom-placeholder-input::placeholder {
  font-size: 14px !important;
  color: #292D324D !important;
}
</style>
