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

interface DriversData {
  full_name: string;
  image: string;
  rating: string;
}

// Define modules array including pagination and autoplay
const modules = [Autoplay];

// Define slider data array
const driverData: DriversData[] = [
  {
    full_name: "Abdulaziz Aliyev",
    rating: "4.5",
    image: "./driver.png"
  },

  {
    full_name: "Abdulaziz Aliyev",
    rating: "4.5",
    image: "./driver2.png"
  },
  {
    full_name: "Abdulaziz Aliyev",
    rating: "4.5",
    image: "./driver3.png"
  },

  {
    full_name: "Abdulaziz Aliyev",
    rating: "4.5",
    image: "./driver4.png"
  },

  {
    full_name: "Abdulaziz Aliyev",
    rating: "4.5",
    image: "./driver5.png"
  },

  {
    full_name: "Abdulaziz Aliyev",
    rating: "4.5",
    image: "./driver.png"
  },

];
</script>

<template>
  <div class="bg-white !py-[100px]">

    <h3 class="text-[#292D32] text-[64px] font-semibold text-center !mb-[40px]">Top haydovchilar</h3>

    <swiper
        :loop="true"
        :slidesPerView="5"
        :spaceBetween="0"
        :autoplay="{
      delay: 0,
      disableOnInteraction: false,

    }"
        :speed="8000"
        :modules="modules"
        class="mySwiper"
    >
      <swiper-slide v-for="(item, index) in driverData" :key="index">
        <div class="relative bg-[#DCE1E6] rounded-2xl h-[364px]">
          <img class="" :src="item.image" :alt="item.full_name">
          <div class="name-absolute bg-[#292D32] rounded-full !py-[7px] !px-[20px] text-white">{{
              item.full_name
            }}
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

.name-absolute {
  white-space: nowrap;
  position: absolute;
  left: 50%;
  bottom: 24px;
  transform: translateX(-50%);
}

.swiper-wrapper {
  transition-timing-function: linear !important;
}
</style>