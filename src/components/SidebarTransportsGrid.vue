<script setup lang="ts">

defineProps({
  transports: {
    type: Array,
    default: () => ([])
  },
  serviceId: {
    type: Number,
    default: null
  },
  loading: {
    type: Boolean,
    default: true
  },
  show: {
    type: Boolean,
    default: true
  },

})
</script>

<template>
  <div
      :class="{
            '_form-active': show,
          }"
      class="navbar-items__form w-[180px] flex items-start !transition-all"
  >
    <div class="navbar-items__divider"/>

    <div v-if="transports.length > 0" class="grid grid-cols-3  gap-4 !p-[16px]">
      <!--      <template v-if="loading">-->
      <!--        <div class="cards animate-pulse"-->
      <!--             v-for="(item, index) in 6"-->
      <!--             :key="index"-->
      <!--        >-->
      <!--        </div>-->
      <!--      </template>-->
      <!--      <template v-else>-->
      <!--       -->
      <!--      </template>-->
      <div v-if="serviceId && serviceId !== 4" class="cards dark:!bg-zinc-700"
           v-for="(item, index) in transports"
           :key="index"
           @click="$emit('on:click',item)"
      >
        <img :src="item.icon" v-if="item.icon" class="!m-auto" alt="#"/>
        <div class="flex flex-col items-center !bg-transparent">
          <h4 class="text-[#292D32] text-[14px] ">{{ item.name }}</h4>
          <p class="text-gray-900 dark:!text-gray-400">{{ item.volume }}</p>
        </div>
      </div>
      <template v-if="serviceId && serviceId === 4">
        <div class="bg-[#FAFAFA] !w-[200px] col-span-full w-full text-[12px] text-[#292D324D] px-[8px] !mb-[12px]">
          Sedan
        </div>
        <div v-for="(item, index) in transports"
             :key="index"
             class="flex items-center col-span-full justify-between border-[#F5F5F7] border-b !mb-[12px] !pb-[12px] cursor-pointer"
             @click="$emit('on:click',item)"
        >

          <div class="flex flex-col">
            <h3 class="text-[#292D32] text-[14px]">{{ item.name }}</h3>
            <h5 class="text-[#292D324D] text-[12px]">{{ item.fuel_type }}</h5>
          </div>

          <img src="@/assets/images/arrowsR.svg" alt="right">
        </div>


      </template>

    </div>
    <template v-else>
      <div class="flex !p-[16px] flex-col !mt-auto !mb-auto items-center justify-center">
        <img src="@/assets/images/empty.png" class="w-full" alt="">
        <p>
          {{ $t('noData') }}
        </p>
      </div>
    </template>
  </div>
</template>

<style scoped lang="scss">
.cards {
  @apply w-[157px] p-[14px] bg-white rounded-[20px] text-center flex flex-col items-center justify-center;
  box-shadow: 0 2px 8.4px 0 #292D3214;
  cursor: pointer;
  min-height: 150px;
  overflow: hidden;

  p {
    @apply text-[#292D3266] text-[12px];
  }
}

.card-wrap:hover {
  @apply bg-[#66C61C];

  .swg {
    filter: brightness(13.5);
  }

  p {
    @apply text-[#fff];
  }
}
</style>
