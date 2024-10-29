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

interface SliderData {
  title: string;
  image: string;
  description: string;
}

// Define modules array including pagination and autoplay
const modules = [Autoplay];

// Define slider data array
const sliderData: SliderData[] = [
  {
    title: "Yetkazib berish",
    description: "Қурилиш ёки махсус ишларни бажариш учун зарур бўлган техникалар хизмати",
    image: "./delivery.png"
  },
  {
    title: "Yuk tashish",
    description: "Қурилиш ёки махсус ишларни бажариш учун зарур бўлган техникалар хизмати",
    image: "./shipping.png"
  },
  {
    title: "Yo'lovchi tashish",
    description: "Қурилиш ёки махсус ишларни бажариш учун зарур бўлган техникалар хизмати",
    image: "./passenger.png"
  },
  {
    title: "Maxsus texnika",
    description: "Қурилиш ёки махсус ишларни бажариш учун зарур бўлган техникалар хизмати",
    image: "./special.png"
  },
  {
    title: "Maxsus texnika",
    description: "Қурилиш ёки махсус ишларни бажариш учун зарур бўлган техникалар хизмати",
    image: "./special.png"
  }
];
</script>

<template>
  <div class="bg-white">
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