<script setup lang="ts">
import Cards from '@/pages/Services/Components/Cards.vue'
import {useRoute, useRouter} from "vue-router";
import {computed, inject, onMounted, ref, watch} from "vue";
import Breadcrumbs from "@/components/Breadcrumbs.vue";
import {useI18n} from 'vue-i18n'

const router = useRouter()
const route = useRoute()

const {t} = useI18n()
const enterToDetail = (value: number) => {
  router.push(`/transport-view/${value}`)
}
const openFilter = ref(false)

const toggleFilter = () => {
  openFilter.value = !openFilter.value
}
const $auth = inject('auth')
const $api = inject('api')
const categories = ref([])
const advertisementData = ref([])
const services = ref([])
const transport = ref(null)
const service = ref(null)

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
watch(() => route.params, () => {
  $api.services.getServices(route.params.id)
      .then(async res => {
        service.value = res.data.find(item => item.id === Number(route.params.id))
        if (!service.value) {
          router.push({
            name: 'NotFound',
            params: {pathMatch: route.path.substring(1).split('/')},
            // preserve existing query and hash if any
            query: route.query,
            hash: route.hash,
          })
          return Promise.reject(err)
        }
        const advertisementQuery = {
          service_id: route.params.id,
        }
        const requests = []
        if (route.params.transport_id) {
          advertisementQuery.transport_id = route.params.transport_id
          requests.push(
              $api.transport.getTransportByServiceId(route.params.id)
                  .then((res) => {
                    const _transport = res.data.find(item => item.id === Number(route.params.transport_id))
                    console.log(_transport, res.data, route.params.transport_id)
                    if (_transport) transport.value = _transport
                  })
                  .catch(() => {
                    return Promise.resolve(undefined)
                  }))
        }
        requests.push($api.advertisement.getAdvertisement(advertisementQuery).then(res => {
          advertisementData.value = res.data;
          return Promise.resolve(res)
        }).catch(err => {
          return Promise.resolve()
        }))
        await Promise.all(requests)
      })
      .catch(err => {
        if (err.status === 404) {
          router.push({
            name: 'NotFound',
            params: {pathMatch: route.path.substring(1).split('/')},
            // preserve existing query and hash if any
            query: route.query,
            hash: route.hash,
          })
          return Promise.reject(err)
        }
      })

}, {
  immediate: true
})

const breadcrumbItems = computed(() => {
  return [
    {
      title: t('transportAnnouncements')
    },
    {
      title: service.value?.name,
    },
    {
      title: transport.value?.name,
    }
  ]
})

onMounted(async () => {
  // try {
  //   await $api.transport.getTransportByServiceId().then(res => {
  //     const _transport = res.data.find(item => item.id === Number(route.params.id))
  //     if (!_transport) {
  //       return router.push({
  //         name: 'NotFound',
  //         params: {pathMatch: route.path.substring(1).split('/')},
  //         // preserve existing query and hash if any
  //         query: route.query,
  //         hash: route.hash,
  //       })
  //     }
  //     transport.value = _transport
  //   });
  // } catch (error) {
  //   console.error("Error fetching data:", error);
  // }
})
</script>

<template>
  <div :key="$route.params.id">
    <Breadcrumbs :breadcrumbs="breadcrumbItems"/>
    <div class="flex items-center justify-start !mb-[32px] gap-[32px]">
      <h1 class="text-[#292D32] !mb-0 text-[32px] leading-[48px] font-500">
        {{ transport?.name ? transport.name : service?.name }}
      </h1>
      <button
          class="flex items-center relative justify-center gap-[8px] w-[105px] h-[48px] filter-btn__shadow rounded-[18px] bg-[#ffffff] dark:!bg-zinc-700">
        <img src="@/assets/icons/filter.svg" alt="">
        <span>
          {{ $t('filter') }}
        </span>
        <div @click.stop v-if="openFilter"
             class="w-[375px] absolute z-[999] top-[130%] right-[0] bg-white text-start !p-[16px] rounded-[24px]">
          <div class="flex items-center justify-between !mb-[24px]">
            <span class="text-[#1A1F23] font-medium text-[16px]">
              {{ $t('filter') }}
            </span>
            <span @click="clearFilters" class="text-[#F04438] font-medium">
              {{ $t('clear') }}
            </span>
          </div>

          <div
              class="bg-[#FAFAFA] !py-[12px] !px-[16px] rounded-[24px] !mb-[24px]">
            <span class="text-[#292D324D] text-[12px] !mb-[8px] block text-start">
              {{ $t('categories') }}
            </span>

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
            <span class="text-[#292D324D] text-[12px] !mb-[8px] block text-start">
              {{ $t('services') }}
            </span>

            <div class="flex items-center gap-2">
              <button
                  v-for="(item, index) in servicesList" @click="pushService(index)"
                  :class="['!py-[4px] !px-[12px] text-[#292D32] text-[12px] rounded-[20px] bg-[#FFFFFF]', services.includes(index) && '!bg-[#66C61C] text-white']">
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
              <label for="in_label" class="!text-[#292D324D]">
                {{ $t('region') }}
              </label>
            </FloatLabel>
          </div>

          <div
              class="bg-[#FAFAFA] !py-[12px] !px-[16px] rounded-[24px] !mb-[24px]">
            <span class="text-[#292D324D] text-[12px] !mb-[8px] block text-start">
              {{ $t('rating') }}
            </span>

            <div class="grid grid-cols-5 gap-4">
              <button
                  v-for="(item, index) in 5" @click="pushRating(index)"
                  :class="['flex items-center gap-1 !py-[4px] !px-[12px] text-[#292D32] text-[12px] rounded-[20px] bg-[#FFFFFF]',
                  rating.includes(index) && '!bg-[#66C61C] text-white']">

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

<style class="">

</style>
