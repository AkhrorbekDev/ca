<script lang="ts" setup>
// Import Swiper Vue.js components
import {Swiper, SwiperSlide} from 'swiper/vue';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';
import 'swiper/css/navigation';

// Import required modules
import {Autoplay} from 'swiper/modules';
import {useI18n} from 'vue-i18n';

interface SliderData {
  title: string;
  image: string;
  description: string;
}

// Define modules array including pagination and autoplay
const modules = [Autoplay];
const {t} = useI18n();
// Define slider data array
const sliderData: SliderData[] = [
  {
    title: t('services_.delivery.title'),
    description: t('services_.delivery.description'),
    image: './delivery.png'
  },
  {
    title: t('services_.technical.title'),
    description: t('services_.technical.description'),
    image: './special.png'
  },
  {
    title: t('services_.shipping.title'),
    description: t('services_.shipping.description'),
    image: './shipping.png'
  },
  {
    title: t('services_.passenger.title'),
    description: t('services_.passenger.description'),
    image: './passenger.png'
  }
];
</script>

<template>
  <div id="services" class="bg-white">
    <swiper
        :loop="true"
        :slidesPerView="4"
        :spaceBetween="0"
        :autoplay="{
      delay: 0,
      disableOnInteraction: false,

    }"
        :speed="6000"
        :modules="modules"
        class="mySwiper"
    >
      <swiper-slide v-for="(item, index) in sliderData" :key="index">
        <div class="relative group">
          <img :src="item.image" :alt="item.title">
          <div class="group-hover:hidden text-white title-absolute text-[24px] font-bold">{{ item.title }}</div>
          <div class="hidden group-hover:flex hover-data flex-col items-center justify-center">
            <span class="block text-white text-[24px] font-bold !mb-[12px]">{{ item.title }}</span>
            <span class="block text-white text-[16px] font-medium">{{ item.description }}</span>
          </div>
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

.swiper-slide {
  text-align: center;
  font-size: 18px;
  background: #fff;

  /* Center slide text vertically */
  display: flex;
  justify-content: center;
  align-items: center;
}

.swiper-slide img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.swiper-wrapper {
  transition-timing-function: linear !important;
}

.title-absolute {
  position: absolute;
  left: 25px;
  bottom: 24px;

}

.hover-data {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgb(0, 0, 0, 0.6);
}
</style>
