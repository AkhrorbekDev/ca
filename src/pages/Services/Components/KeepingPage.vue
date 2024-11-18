<script setup lang="ts">
import {useCommonStore} from "@/stores/common.store"
import {services} from "@/components/fakeJson"
import {onMounted, ref} from "vue";
import {useRoute, useRouter} from "vue-router";

const store = useCommonStore()

onMounted(() => {

  let item = services.find(el => el.unique == 'keeping')
  if (Object.keys(item).length) {
    store.activeService = item
  }

})


const openFilter = ref(false)

const router = useRouter()
const route = useRoute()

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

</script>

<template>
  <div class="!mt-[40px]">
    <div class="flex items-center justify-between !mb-4">
      <span class="text-[#292D32] font-medium text-[24px]">Omborxonalar</span>


      <button @click="toggleFilter"
              class="flex items-center gap-2 bg-white !px-[16px] !py-[12px] rounded-[16px] relative">
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
              d="M14.3229 2.5H5.54773C3.92225 2.5 2.9757 4.3362 3.91865 5.66022L6.86104 9.79167C7.34357 10.4692 7.60288 11.2803 7.60288 12.1121V15.2744C7.60288 16.5036 8.59932 17.5 9.82848 17.5C11.0576 17.5 12.0541 16.5036 12.0541 15.2744V12.1719C12.0541 11.3032 12.3369 10.4581 12.8597 9.76435L15.9201 5.70375C16.9133 4.38587 15.9731 2.5 14.3229 2.5Z"
              stroke="#363853" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>

        Filtr

        <div @click.stop v-if="openFilter"
             class="w-[375px] absolute z-[999] top-[130%] right-[0] bg-white text-start !p-[16px] rounded-[24px]">
          <div class="flex items-center justify-between !mb-[24px]">
            <span class="text-[#1A1F23] font-medium text-[16px]">Filter</span>
            <span class="text-[#F04438] font-medium">Tozalash</span>
          </div>

          <div
              class="bg-[#FAFAFA] !py-[12px] !px-[16px] rounded-[24px] !mb-[24px]">
            <span class="text-[#292D324D] text-[12px] !mb-[8px] block text-start">Toifalar</span>

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
            <span class="text-[#292D324D] text-[12px] !mb-[8px] block text-start">Xizmatlar</span>

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
              <label for="in_label" class="!text-[#292D324D]">Hudud</label>
            </FloatLabel>
          </div>

          <div
              class="bg-[#FAFAFA] !py-[12px] !px-[16px] rounded-[24px] !mb-[24px]">
            <span class="text-[#292D324D] text-[12px] !mb-[8px] block text-start">Reyting</span>

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
            Saqlash
          </button>

        </div>
      </button>
    </div>

    <div class="grid grid-cols-6 gap-4">

      <div v-for="(item, index) in 12" @click="$router.push(`/service/keeping-detail/${index}`)"
           class="bg-[#FFFFFF] rounded-[24px] overflow-hidden cursor-pointer"
           style="box-shadow: 0px 2px 8.4px 0px #292D3214;">
        <img src="@/assets/images/sklad.png" alt="img" class="w-full h-[192px] object-contain">
        <div class="!px-[16px] !py-[12px]">
          <div class="flex items-center justify-between !mb-[8px]">
            <span class="text-[#000000]">Omborxona</span>
            <span class="text-[#000000] text-[16px] font-medium">800 000 UZS</span>
          </div>
          <p class="text-[#292D324D] text-[12px] !mb-1">Maydon: 200 m2</p>

          <div class="flex items-center gap-2 text-[#292D324D] text-[12px] !mb-[12px]">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="8" cy="7.33301" r="2" stroke="#4B465C" stroke-linecap="round" stroke-linejoin="round"/>
              <circle cx="8" cy="7.33301" r="2" stroke="#66C61C" stroke-linecap="round" stroke-linejoin="round"/>
              <path fill-rule="evenodd" clip-rule="evenodd"
                    d="M11.7726 11.1045L8.94397 13.9331C8.42338 14.4532 7.57989 14.4532 7.0593 13.9331L4.22997 11.1045C2.14725 9.02165 2.14731 5.64482 4.2301 3.56206C6.31289 1.47931 9.68972 1.47931 11.7725 3.56206C13.8553 5.64482 13.8554 9.02165 11.7726 11.1045V11.1045Z"
                    stroke="#4B465C" stroke-linecap="round" stroke-linejoin="round"/>
              <path fill-rule="evenodd" clip-rule="evenodd"
                    d="M11.7726 11.1045L8.94397 13.9331C8.42338 14.4532 7.57989 14.4532 7.0593 13.9331L4.22997 11.1045C2.14725 9.02165 2.14731 5.64482 4.2301 3.56206C6.31289 1.47931 9.68972 1.47931 11.7725 3.56206C13.8553 5.64482 13.8554 9.02165 11.7726 11.1045V11.1045Z"
                    stroke="#66C61C" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            Toshkent, Yakkasaroy tumani
          </div>

          <div class="flex items-center gap-4">
            <div class="flex items-center gap-1 text-[#000000] text-[12px]">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                    d="M1 6.83162V6.50778C1 6.48545 0.99998 6.46682 1.0262 6.44449C1.06998 6.24132 1.1772 6.05707 1.33256 5.91804C1.48792 5.77901 1.68351 5.69231 1.89139 5.67026C2.98003 5.50896 4.06991 5.35262 5.16104 5.20125C5.26132 5.19277 5.35744 5.15751 5.4392 5.09919C5.52096 5.04087 5.5853 4.96166 5.62546 4.86995C6.10111 3.89471 6.588 2.92315 7.07115 1.95163C7.1223 1.84525 7.18783 1.74635 7.26591 1.65759C7.376 1.53741 7.51415 1.44602 7.66819 1.39146C7.82224 1.33691 7.98745 1.32084 8.14921 1.34475C8.31096 1.36866 8.4643 1.4318 8.5957 1.52855C8.7271 1.6253 8.83249 1.75273 8.90261 1.89955C9.40074 2.88969 9.89512 3.88727 10.4007 4.87741C10.4406 4.96616 10.5036 5.04266 10.5833 5.09896C10.663 5.15527 10.7565 5.18931 10.854 5.19752C11.9513 5.35013 13.0449 5.50648 14.1423 5.66654C14.3477 5.69098 14.5402 5.77883 14.6927 5.91772C14.8452 6.05661 14.9501 6.23954 14.9925 6.44076C15.0329 6.61585 15.0251 6.79853 14.9697 6.96953C14.9143 7.14053 14.8135 7.2935 14.6779 7.41228C13.8839 8.17535 13.0974 8.94216 12.3071 9.70524C12.2399 9.76321 12.1892 9.83777 12.1603 9.92143C12.1314 10.0051 12.1252 10.0949 12.1423 10.1817C12.3196 11.1743 12.4906 12.1669 12.6554 13.1596C12.7086 13.3838 12.725 13.615 12.7041 13.8445C12.6781 14.0042 12.6128 14.1551 12.5139 14.2837C12.4151 14.4124 12.2858 14.5148 12.1376 14.5818C11.9893 14.6489 11.8268 14.6785 11.6642 14.668C11.5017 14.6576 11.3443 14.6074 11.206 14.5219C10.2472 14.0256 9.29338 13.5293 8.34456 13.033C8.24187 12.9708 8.12395 12.938 8.00373 12.938C7.8835 12.938 7.76563 12.9708 7.66294 13.033C6.71162 13.5429 5.74906 14.038 4.79026 14.5219C4.62121 14.619 4.42685 14.6639 4.23203 14.6506C4.0372 14.6374 3.85076 14.5666 3.69661 14.4475C3.54005 14.3356 3.42073 14.1798 3.35399 14.0001C3.28725 13.8203 3.27613 13.6248 3.32208 13.4387C3.50934 12.3704 3.69661 11.2984 3.88013 10.2301C3.90297 10.126 3.89692 10.0176 3.86262 9.91666C3.82831 9.8157 3.76708 9.72589 3.68541 9.65685C2.95882 8.96077 2.23969 8.25353 1.50936 7.55746C1.27246 7.3696 1.09552 7.11747 1 6.83162Z"
                    fill="#FCA807"/>
              </svg>
              4.5
            </div>

            <AvatarGroup>
              <Avatar image="https://picsum.photos/200/300" shape="circle"/>
              <Avatar image="https://picsum.photos/200/300" shape="circle"/>
              <Avatar image="https://picsum.photos/200/300" shape="circle"/>
              <Avatar label="+2" shape="circle"/>
            </AvatarGroup>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">

</style>