<script setup lang="ts">
import {Swiper, SwiperSlide} from "swiper/vue";
import {Navigation} from 'swiper/modules';
import {useRouter} from "vue-router";
import moto from '@/assets/images/icons/motobike.svg'
import rul from '@/assets/images/icons/rul.svg'
import truck from '@/assets/images/icons/labo.svg'
import pistol from '@/assets/images/icons/pistol.svg'
import car from '@/assets/images/icons/car.svg'
import carKey from '@/assets/images/icons/carKey.svg'
import exkavator from '@/assets/images/icons/exkovator.svg'
import evakvator from '@/assets/images/icons/evakvator.svg'
import home from '@/assets/images/icons/home.svg'
import settings from '@/assets/images/icons/settings.svg'
import {advertising, transportAdvertising} from './fakeJson'

import 'swiper/css';
import 'swiper/css/navigation';
import {inject, ref} from "vue";
import {useI18n} from 'vue-i18n'

const {t} = useI18n()

const router = useRouter()
const modules = [Navigation];
const $auth = inject('auth')

const openDetail = (item: any) => {
  if (!$auth.loggedIn) {

  }
  if (item.route) {
    router.push({name: item.route, params: {type: item.unique}})
  }
};

const services = ref([
  {
    title: t('services_.delivery.title'),
    subTitle: t('services_.delivery.subTitle'),
    img: moto,
    unique: "delivery",
    route: "service-detail"
  },
  {
    title: t('services_.distillation.title'),
    subTitle: t('services_.distillation.subTitle'),
    img: rul,
    unique: "distillation",
    route: "service-detail"
  },
  {
    title: t('services_.shipping.title'),
    subTitle: t('services_.shipping.subTitle'),
    img: truck,
    unique: "shipping",
    route: "service-detail"
  },
  {
    title: t('services_.oil.title'),
    subTitle: t('services_.oil.subTitle'),
    img: pistol,
    unique: "oil",
    route: "service-detail"
  },
  {
    title: t('services_.passenger.title'),
    subTitle: t('services_.passenger.subTitle'),
    img: car,
    unique: "passenger",
    route: "service-detail"
  },
  {
    title: t('services_.transport-rental.title'),
    subTitle: t('services_.transport-rental.subTitle'),
    img: carKey,
    unique: "transport-rental",
    route: "transport-rental"
  },
  {
    title: t('services_.technical.title'),
    subTitle: t('services_.technical.subTitle'),
    img: exkavator,
    unique: "technical",
    route: "service-detail"
  },
  {
    title: t('services_.transfer.title'),
    subTitle: t('services_.transfer.subTitle'),
    img: evakvator,
    unique: "transfer",
    route: "service-detail"
  },
  {
    title: t('services_.keeping.title'),
    subTitle: t('services_.keeping.subTitle'),
    img: home,
    unique: "keeping",
    route: "service-keeping"
  },
  {
    title: t('services_.repair.title'),
    subTitle: t('services_.repair.subTitle'),
    img: settings,
    unique: "repair",
    route: 'transport-repair'
  },
])
const transportAdvertising = ref([
  {
    title: t('services_.shipping.title'),
    subTitle: t('services_.shipping.subTitle'),
    id: 1,
    img: truck
  },
  {
    title: t('services_.passenger.title'),
    subTitle: t('services_.passenger.subTitle'),
    id: 2,
    img: car
  },
  {
    title: t('services_.technical.title'),
    subTitle: t('services_.technical.subTitle'),
    id: 3,
    img: exkavator
  },
  {
    title: t('services_.transport-rental.title'),
    subTitle: t('services_.transport-rental.subTitle'),
    img: carKey
  },
  {
    id: 6,
    title: t('services_.transfer.title'),
    subTitle: t('services_.transfer.subTitle'),
    img: evakvator
  },
])


const changeTransportRoute = (e) => {
  if (e.id) {
    router.push({
      name: 'transport-id',
      params: {
        id: e.id
      }
    })
  } else {

  }
}
</script>

<template>
  <div>
    <div class="max-w-screen-xl lg:mx-auto">
      <!-- Xizmatlar-->
      <div class="!mb-[64px]">
        <h1 class="text-[#292D32] text-[32px] font-semibold">{{ $t('services') }}</h1>
        <!--        <p class="text-[#292D3266] text-[16px] !mt-[4px] !mb-[24px]">-->
        <!--          Bu yerda umumiy xizmatlar haqida tushuntiruvchi text bo’ladi-->
        <!--        </p>-->

        <div class="grid gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
          <div class="card-service !flex !flex-col !justify-between"
               v-for="(item, index) in services" :key="index"
          >
            <div>
              <h1 class="text-[#292D32] text-[20px] !mb-[4px]">{{ item.title }}</h1>
              <p class="text-[#292D3266] text-[12px]">
                {{ item.subTitle }}
              </p>
            </div>

            <img :src="item.img" class="!mb-[42px] !m-auto !mt-[24px]" alt="motobike">

            <div class="text-center !mb-[25px]">
              <button @click="openDetail(item)"
                      class="!px-[16px] !py-[10px] bg-[#66C61C] text-white text-[14px] rounded-full">
                {{ $t('createAdvertisement') }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="bg-[#fff]">
      <div class="max-w-screen-xl lg:mx-auto !pt-[32px] !pb-[56px]">
        <div>
          <h1 class="text-[#292D32] text-[32px] font-semibold">{{ $t('transportAnnouncements') }}</h1>
          <!--          <p class="text-[#292D3266] text-[16px] !mt-[4px] !mb-[24px]">-->
          <!--            Bu yerda transport e’lonlari haqida tushuntiruvchi text bo’ladi-->
          <!--          </p>-->

          <div class="grid gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
            <div class="card-service2 bg-[#FAFAFA] hover:shadow-lg transition !flex !flex-col !justify-between"
                 v-for="(item2, index2) in transportAdvertising" :key="index2"
            >
              <div>
                <h1 class="text-[#292D32] text-[20px] !mb-[4px]">{{ item2.title }}</h1>
                <p class="text-[#292D3266] text-[12px]">
                  {{ item2.subTitle }}
                </p>
              </div>

              <img :src="item2.img" class="!mb-[42px] !m-auto !mt-[24px]" alt="motobike">

              <div class="text-center !mb-[25px]">
                <button @click="changeTransportRoute(item2)"
                        class="!px-[16px] !py-[10px] bg-[#66C61C] text-white text-[14px] rounded-full">
                  {{ $t('createAdvertisement') }}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="max-w-screen-xl !pt-[64px] lg:mx-auto !pb-[50px]">
      <h1 class="text-[#292D32] text-[32px] font-semibold">{{ $t('announcements') }}</h1>
      <!--      <p class="text-[#292D3266] text-[16px] !mt-[4px] !mb-[24px]">-->
      <!--        Bu yerda e’lonlar haqida tushuntiruvchi text bo’ladi-->
      <!--      </p>-->

      <swiper
          :modules="modules"
          :slidesPerView="5"
          :centeredSlides="false"
          :spaceBetween="30"
          :pagination="{type: 'fraction'}"
          :navigation="true"
          class="mySwiper2 !py-[5px] !px-[5px]"
          @swiper="setSwiperRef"
      >
        <swiper-slide
            v-for="(item3, index3) in advertising" :key="index3"
            :virtualIndex="index3"
        >
          <div class="card-service !h-[356px] !flex !flex-col !justify-between">
            <div>
              <h1 class="text-[#292D324D] text-[20px] !mb-[8px]">{{ item3.title }}</h1>
              <div class="!flex !items-center">
                <span class="text-[#1A1F23] text-[14px] font-medium !mr-[7px]">Toshkent</span>
                <svg width="11" height="12" viewBox="0 0 11 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M0.667969 4.72792H10.0013L6.10825 1.33398" stroke="#1A1F23" stroke-linecap="round"
                        stroke-linejoin="round"></path>
                  <path d="M10 7.27305L0.666668 7.27305L4.55972 10.667" stroke="#1A1F23" stroke-linecap="round"
                        stroke-linejoin="round"></path>
                </svg>
                <span class="text-[#1A1F23] text-[14px] font-medium !ml-[7px]">Samarqand</span>
              </div>
              <h1 class="text-[#292D324D] text-[14px] !mt-[4px] !mb-[4px]">{{ item3.date }}</h1>
            </div>

            <img :src="item3.img" class="!mb-[42px] !m-auto !mt-[24px] !object-contain !w-auto !h-[95px]"
                 :alt="item3.title"/>

            <div class="text-center !mb-[25px]">
              <button class="!px-[16px] !py-[10px] bg-[#66C61C] text-white text-[14px] rounded-full">
                {{ $t('more') }}
              </button>
            </div>
          </div>
        </swiper-slide>
      </swiper>
    </div>
  </div>
</template>

<style lang="scss">
.card-service {
  @apply bg-white rounded-[20px] p-[16px] cursor-pointer;
  box-shadow: 0 2px 8.4px 0 #292D3214 !important;
}

.card-service2 {
  @apply rounded-[20px] p-[16px] cursor-pointer;
}

.mySwiper2 {
  .swiper-button-prev {
    background-color: #292D3266;
    height: 47px;
    width: 47px;
    border-radius: 100%;

    &:after {
      font-size: 14px;
      color: white;
    }
  }

  .swiper-button-next {
    background-color: #292D3266;
    height: 47px;
    width: 47px;
    border-radius: 100%;

    &:after {
      font-size: 14px;
      color: white;
      font-weight: bold;
    }
  }
}
</style>
