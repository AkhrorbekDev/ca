<script lang="ts" setup>
import {Swiper, SwiperSlide} from 'swiper/vue';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';
import 'swiper/css/navigation';

import {Autoplay} from 'swiper/modules';

interface DriversData {
  full_name: string;
  image: string;
  rating: string;
}

const modules = [Autoplay];

const driverData: DriversData[] = [
  {
    full_name: "Dilshod Bunyodov",
    rating: "4.5",
    image: "./driver.png",
    rating: "4.5",
    who: "Yuk tashish"
  },

  {
    full_name: "Abdulaziz Aliyev",
    rating: "4.5",
    image: "./driver2.png",
    rating: "4.5",
    who: "Dispecher"
  },
  {
    full_name: "Begzod Rafikhov",
    rating: "4.5",
    image: "./driver3.png",
    rating: "4.5",
    who: "Meneger"
  },

  {
    full_name: "Abbos Mehmonov",
    rating: "4.5",
    image: "./driver4.png",
    rating: "4.5",
    who: "Direktor"
  },

  {
    full_name: "Sevara Nafisova",
    rating: "4.5",
    image: "./driver5.png",
    rating: "4.5",
    who: "Operator"
  },

  {
    full_name: "Asadbek ASD",
    rating: "4.5",
    image: "./driver2.png",
    rating: "4.5",
    who: "Mutaxasis"
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
        <div class="relative bg-[#DCE1E6] dark:!bg-zinc-700 rounded-2xl h-[364px]">
          <img class="" :src="item.image" :alt="item.full_name"/>
          <div class="name-absolute bg-[#292D32] rounded-full !py-[7px] !px-[20px] text-white">{{
              item.full_name
            }}
          </div>

          <div class="rating-absolute flex items-center justify-between !px-[20px]">

            <span class="text-[14px] text-[#ffffff] bg-[#66C61C] rounded-[100px] !py-[4px] !px-[8px]">{{ item.who}}</span>


            <div class="flex items-center justify-between">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                    d="M1.25 8.53904V8.13424C1.25 8.10632 1.24997 8.08304 1.28275 8.05512C1.33748 7.80116 1.4715 7.57085 1.6657 7.39706C1.8599 7.22327 2.10439 7.1149 2.36423 7.08734C3.72503 6.88571 5.08738 6.69029 6.4513 6.50107C6.57665 6.49048 6.6968 6.4464 6.799 6.3735C6.90119 6.3006 6.98162 6.20159 7.03182 6.08695C7.62639 4.8679 8.235 3.65345 8.83893 2.43904C8.90287 2.30608 8.98479 2.18245 9.08239 2.0715C9.22 1.92127 9.39269 1.80703 9.58524 1.73884C9.7778 1.67065 9.98432 1.65056 10.1865 1.68045C10.3887 1.71034 10.5804 1.78926 10.7446 1.9102C10.9089 2.03114 11.0406 2.19042 11.1283 2.37395C11.7509 3.61162 12.3689 4.8586 13.0009 6.09627C13.0507 6.20722 13.1295 6.30284 13.2292 6.37322C13.3288 6.4436 13.4456 6.48615 13.5674 6.49641C14.9392 6.68718 16.3062 6.88261 17.6779 7.08268C17.9346 7.11324 18.1753 7.22305 18.3659 7.39666C18.5565 7.57028 18.6876 7.79893 18.7406 8.05046C18.7912 8.26932 18.7813 8.49767 18.7121 8.71142C18.6429 8.92517 18.5169 9.11638 18.3474 9.26486C17.3549 10.2187 16.3717 11.1772 15.3839 12.1311C15.2998 12.2035 15.2365 12.2967 15.2004 12.4013C15.1642 12.5059 15.1565 12.6181 15.1779 12.7266C15.3995 13.9674 15.6133 15.2082 15.8193 16.449C15.8857 16.7292 15.9063 17.0183 15.8801 17.3051C15.8476 17.5048 15.766 17.6934 15.6424 17.8542C15.5189 18.015 15.3573 18.143 15.172 18.2268C14.9867 18.3106 14.7834 18.3476 14.5803 18.3345C14.3771 18.3215 14.1804 18.2587 14.0075 18.1519C12.809 17.5315 11.6167 16.9111 10.4307 16.2907C10.3023 16.2131 10.1549 16.172 10.0047 16.172C9.85438 16.172 9.70703 16.2131 9.57867 16.2907C8.38953 16.9282 7.18633 17.547 5.98783 18.1519C5.77651 18.2733 5.53357 18.3294 5.29004 18.3128C5.04651 18.2962 4.81345 18.2078 4.62076 18.0588C4.42506 17.9191 4.27592 17.7243 4.19249 17.4996C4.10906 17.2749 4.09516 17.0305 4.1526 16.7979C4.38668 15.4625 4.62076 14.1225 4.85016 12.7871C4.87871 12.657 4.87115 12.5215 4.82827 12.3953C4.78539 12.2691 4.70885 12.1569 4.60676 12.0706C3.69852 11.2005 2.79962 10.3164 1.8867 9.44633C1.59057 9.21152 1.3694 8.89635 1.25 8.53904Z"
                    fill="#FCA807"/>
              </svg>

              <span class="!ml-[6px]">{{ item.rating }}</span>
            </div>
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

.rating-absolute {
  position: absolute;
  top: 20px;
  width: 100%;
  //right: 25px;
}

.swiper-wrapper {
  transition-timing-function: linear !important;
}
</style>