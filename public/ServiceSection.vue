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
        <div>
          <img :src="item.image" :alt="item.title">
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
</style>