<script setup lang="ts">
import {formatNumber} from "@/utils/helper";
import emptyImage from '@/assets/images/empty.png'

defineProps({
  item: {
    type: Array,
    default: () => []
  },
  isRoom: {
    type: Boolean,
    default: () => false
  }
})
const baseUrlImage = 'https://api.carting.uz/uploads/files/'
</script>

<template>
  <div class="bg-[#FFFFFF] rounded-[24px] max-h-[340px] overflow-hidden cursor-pointer"
       style="box-shadow: 0 2px 8px 0 #292D3214"
  >
    <img
        :src="item.images && item.images.length > 0 ? `${baseUrlImage}${item.images[0]}` : emptyImage"
        class="w-full min-h-[190px] max-h-[190px] object-cover" alt="car"/>
    <div class="!px-[16px] !py-[12px]">
      <h1 class="text-[#000000] text-[14px] font-400">{{ isRoom ? 'Carbox' : item.transport_name }}</h1>
      <h2 class="text-[16px] text-[#000000] font-500 !mt-[4px]" v-if="!isRoom">{{ formatNumber(item?.price) }} UZS</h2>

      <div class="!mt-[8px] flex items-center">
        <img src="@/assets/images/icons/location.svg" alt="mark"/>
        <p class="text-[#292D324D] text-[12px] font-400 !ml-[4px] whitespace-nowrap overflow-hidden text-ellipsis">
          {{ !isRoom ? item.from_location.name : item.from_location.name }}
        </p>
      </div>

      <div class="flex !mt-[13px]">
        <div class="flex items-center">
          <img src="@/assets/images/icons/star.svg" alt="star"/>
          <p class="text-[#000000] text-[12px] font-400 !ml-[4px]">4.5</p>
        </div>

        <div class="flex items !ml-[8px] relative">
          <AvatarGroup>
            <Avatar
                image="https://primefaces.org/cdn/primevue/images/organization/walter.jpg"
                shape="circle"
                class="!h-[24px] !w-[24px]" alt="avatar"
                v-for="(in2) in 4" :key="in2"
            />
            <Avatar label="+2" shape="circle" class="!h-[24px] !w-[24px] !text-[8px] !text-[#1A1F23]"/>
          </AvatarGroup>
        </div>
      </div>
    </div>
  </div>
</template>
