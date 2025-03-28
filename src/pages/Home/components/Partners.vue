<script lang="ts" setup>
import {Swiper, SwiperSlide} from 'swiper/vue';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';
import 'swiper/css/navigation';

import {Autoplay} from 'swiper/modules';

interface DriversData {
  image: string;
}

const modules = [Autoplay];

const driverData: DriversData[] = [
  {
    image: "./alfa.png"
  },
  {
    image: "./asia.png"
  },
  {
    image: "./uzb.png"
  },
  {
    image: "./kapital.png"
  },
  {
    image: "./alfa.png"
  },
  {
    image: "./asia.png"
  },
];
</script>

<template>
  <div class="bg-white !py-[80px]">

    <h3 class="text-[#292D32] text-[64px] font-semibold text-center !mb-[40px]">{{ $t('home.sponsors') }}</h3>

    <swiper
        :loop="true"
        :slidesPerView="4"
        :spaceBetween="0"
        :autoplay="{
          delay: 0,
          disableOnInteraction: false,
        }"
        :speed="8000"
        :modules="modules"
    >
      <swiper-slide v-for="(item, index) in driverData" :key="index">
        <div class="relative rounded-2xl">
          <img :src="item.image" class="w-auto" :alt="item.full_name">
        </div>
      </swiper-slide>
    </swiper>
  </div>
</template>

<style lang="scss">
.swiper {
  width: 100%;
  height: 100%;
}

.swiper-wrapper {
  transition-timing-function: linear !important;
}
</style>
