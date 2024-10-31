<script setup lang="ts">
defineProps({
  item: {
    type: Array,
    default: () => []
  }
})
</script>

<template>
  <div class="bg-[#FFFFFF] rounded-[24px] overflow-hidden cursor-pointer"
       style="box-shadow: 0 2px 8px 0 #292D3214"
  >
    <img src="@/assets/images/cars/sonet.png" class="w-full" alt="car"/>

    <div class="!px-[16px] !py-[12px]">
      <h1 class="text-[#000000] text-[14px] font-400">Kia Sonet classic</h1>
      <h2 class="text-[16px] text-[#000000] font-500 !mt-[4px]">800 000 UZS</h2>

      <div class="!mt-[8px] flex items-center">
        <img src="@/assets/images/icons/location.svg" alt="mark"/>
        <p class="text-[#292D324D] text-[12px] font-400 !ml-[4px]">Toshkent, Yakkasaroy tumani</p>
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
