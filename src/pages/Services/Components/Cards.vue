<script setup lang="ts">
import {formatNumber, max, min} from '@/utils/helper';
import emptyImage from '@/assets/images/empty.png'
import {imageCDN} from '@/config'

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
</script>

<template>
  <div class="bg-[#FFFFFF] dark:bg-zinc-700 rounded-[24px] max-h-[340px] overflow-hidden cursor-pointer"
       style="box-shadow: 0 2px 8px 0 #292D3214"
  >
    <img
        :src="item.images && item.images.length > 0 ? `${imageCDN}${item.images[0]}` : emptyImage"
        class="w-full min-h-[190px] max-h-[190px] object-cover" alt="car"/>
    <div class="!px-[16px] !py-[12px] !bg-transparent">
      <h1 class="text-[#000000] text-[14px] font-400">{{
          isRoom ? item.details.company_name : item.transport_name
        }}</h1>
      <h2 class="text-[16px] text-[#000000] font-500 !mt-[4px]" v-if="!isRoom">{{ formatNumber(item?.price) }} UZS</h2>

      <div class="!mt-[8px] flex items-center !bg-transparent">
        <img src="@/assets/images/icons/location.svg" alt="mark"/>
        <p class="text-[#292D324D] text-[12px] font-400 !ml-[4px] whitespace-nowrap overflow-hidden text-ellipsis">
          {{ !isRoom ? item.to_location.name : item.from_location.name }}
        </p>
      </div>

      <div class="flex !mt-[13px] !bg-transparent">
        <div class="flex items-center !bg-transparent">
          <img src="@/assets/images/icons/star.svg" alt="star"/>
          <p class="text-[#000000] text-[12px] font-400 !ml-[4px]">{{ max(item.rating, 0) }}</p>
        </div>

        <div class="flex items !ml-[8px] relative">
          <AvatarGroup>
            <Avatar
                v-for="(in2) in min(item.comments?.length || 0, 4)"
                :key="in2.comment_text"
                :image="item.user?.avatar ? item.user.avatar : ''"
                :icon="item.user?.avatar ? '' : 'pi pi-user'"
                shape="circle"
                class="!h-[24px] !w-[24px] !bg-[#F3F3F3] !text-[#B7B8BA]"
                alt="avatar"
            />
            <Avatar
                v-if="item.commenst?.length > 4"
                :label="`+${item.comments.length}`"
                shape="circle"
                class="!h-[24px] !w-[24px] !text-[8px] !text-[#1A1F23]"
            />
          </AvatarGroup>
        </div>
      </div>
    </div>
  </div>
</template>
