<script setup lang="ts">
import {ref} from "vue";
import {useRoute} from "vue-router";
import {useCommonStore} from "@/stores/common.store"
import {services} from "@/components/fakeJson"
import {onMounted} from "vue";
// Import Swiper Vue.js components
import {Swiper, SwiperSlide} from 'swiper/vue';

// Import Swiper styles
import 'swiper/css';

import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';

// import required modules
import {FreeMode, Navigation, Thumbs} from 'swiper/modules';

const thumbsSwiper = ref(null);

const setThumbsSwiper = (swiper) => {
  thumbsSwiper.value = swiper;
};

const modules = [FreeMode, Navigation, Thumbs]

const store = useCommonStore()

onMounted(() => {

  let item = services.find(el => el.unique == 'rent')
  if (Object.keys(item).length) {
    store.activeService = item
  }

})

const is_active = ref<boolean>(false)

const route = useRoute()

const colors = ["#4A4A4A", "#F0F0F0", "#5E7C99", "#7F7F7F"]

const details = [
  {label: "Dvigitel hajmi:", value: "1.5 MPI"},
  {label: "Konditsioner:", value: "Bor"},
  {label: "Uzatmalar qutisi:", value: "Mexanika"},
  {label: "Sug'urta borligi:", value: "OSAGO"},
  {label: "Bagaj hajmi:", value: "316 litr"},
  {label: "O'rindiqlar soni:", value: "5 ta"},
  {label: "Sutkalik km limiti:", value: "200 km"},
  {label: "Depozit summasi:", value: "2 000 000 so'm"}
]
</script>

<template>
  <div class="max-w-screen-xl lg:mx-auto relative">
    <button @click="$router.go(-1)"
            class="text-[#000000] text-[16px] flex items-center gap-2 !py-[8px] !px-[16px] bg-white rounded-[100px] !mb-4 absolute top-0 right-[102%]">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
            d="M9.57141 18.8201C9.38141 18.8201 9.19141 18.7501 9.04141 18.6001L2.97141 12.5301C2.68141 12.2401 2.68141 11.7601 2.97141 11.4701L9.04141 5.40012C9.33141 5.11012 9.81141 5.11012 10.1014 5.40012C10.3914 5.69012 10.3914 6.17012 10.1014 6.46012L4.56141 12.0001L10.1014 17.5401C10.3914 17.8301 10.3914 18.3101 10.1014 18.6001C9.96141 18.7501 9.76141 18.8201 9.57141 18.8201Z"
            fill="#292D32"/>
        <path
            d="M20.5019 12.75H3.67188C3.26188 12.75 2.92188 12.41 2.92188 12C2.92188 11.59 3.26188 11.25 3.67188 11.25H20.5019C20.9119 11.25 21.2519 11.59 21.2519 12C21.2519 12.41 20.9119 12.75 20.5019 12.75Z"
            fill="#292D32"/>
      </svg>
      Ortga
    </button>
    <div class="flex flex-col lg:flex-row bg-gray-50">
      <div class="flex flex-col items-center">
        <div class="w-[684px] h-[600px] rounded-xl overflow-hidden">
          <swiper
              :style="{
                    '--swiper-navigation-color': '#fff',
                    '--swiper-pagination-color': '#fff',
                  }"
              :loop="true"
              :spaceBetween="10"
              :navigation="true"
              :thumbs="{ swiper: thumbsSwiper }"
              :modules="modules"
              class="mySwiper2"
          >
            <swiper-slide
            ><img
                src="@/assets/images/cars/sonet-big.png"/></swiper-slide
            >

            <swiper-slide
            ><img
                src="@/assets/images/cars/sonet-big.png"/></swiper-slide
            >

            <swiper-slide
            ><img
                src="@/assets/images/cars/sonet-big.png"/></swiper-slide
            >

            <swiper-slide
            ><img
                src="@/assets/images/cars/sonet-big.png"/></swiper-slide
            >
            <swiper-slide
            ><img
                src="@/assets/images/cars/sonet-big.png"/></swiper-slide
            >

          </swiper>
          <!--          <img src="@/assets/images/cars/sonet-big.png" alt="#" class="rounded-lg object-cover w-full h-full"/>-->
        </div>

        <div class="w-[684px] h-[110px] !mt-[24px]">
          <swiper
              @swiper="setThumbsSwiper"
              :loop="true"
              :spaceBetween="12"
              :slidesPerView="5"
              :freeMode="true"
              :watchSlidesProgress="true"
              :modules="modules"
              class="mySwiper"
          >
            <swiper-slide
            ><img class="rounded-xl h-full"
                  src="@/assets/images/cars/sonet.png"/></swiper-slide
            >

            <swiper-slide
            ><img class="rounded-xl h-full"
                  src="@/assets/images/cars/sonet.png"/></swiper-slide
            >

            <swiper-slide
            ><img class="rounded-xl h-full"
                  src="@/assets/images/cars/sonet.png"/></swiper-slide
            >

            <swiper-slide
            ><img class="rounded-xl h-full"
                  src="@/assets/images/cars/sonet.png"/></swiper-slide
            >

            <swiper-slide
            ><img class="rounded-xl h-full"
                  src="@/assets/images/cars/sonet.png"/></swiper-slide
            >

          </swiper>
          <!--          <img v-for="(index) in 5" :key="index"-->
          <!--               src="@/assets/images/cars/sonet.png"-->
          <!--               alt="Thumbnail 1"-->
          <!--               class="lg:w-[117px] md:w-[117px] w-full h-[100px] !mr-[18px] rounded-md object-cover cursor-pointer"-->
          <!--          />-->
        </div>
      </div>

      <div class="flex flex-col md:!ml-[100px] lg:w-1/2">
        <h2 class="text-[#292D32] text-[32px] font-500">
          Kia Sonet classic</h2>

        <div class="flex items-center text-gray-500 !mt-[16px] !mb-[40px]">
          <img src="@/assets/images/icons/star.svg" alt="#">
          <span class="!ml-[8px] text-[#292D324D] text-[14px]">
            <span class="text-[14px] text-[#292D32] font-400">4.5,</span>
            25 ta izoh
          </span>
        </div>

        <span class="text-[#292D32] text-[48px] font-medium block !mb-[40px]">800 000 UZS</span>

        <div class="flex items-center gap-4 !mb-[40px]">
          <div class="rounded-[16px] bg-white !py-[4px] !px-[8px]">
            <p class="text-[#292D324D] text-[12px]">5 kunlik</p>
            <p class="text-[#292D32] text-[12px] font-medium">3 000 000 UZS</p>
          </div>

          <div class="rounded-[16px] bg-white !py-[4px] !px-[8px]">
            <p class="text-[#292D324D] text-[12px]">10 kunlik</p>
            <p class="text-[#292D32] text-[12px] font-medium">5 000 000 UZS</p>
          </div>

          <div class="rounded-[16px] bg-white !py-[4px] !px-[8px]">
            <p class="text-[#292D324D] text-[12px]">1 oylik</p>
            <p class="text-[#292D32] text-[12px] font-medium">16 000 000 UZS</p>
          </div>
        </div>


        <div class="!mb-[64px]">
          <span class="text-gray-400 block !mb-[16px]">Ranglar:</span>
          <!-- Color circles -->
          <div class="flex items-center gap-2">
            <span
                v-for="(color, index) in colors"
                :key="index"
                :style="{ backgroundColor: color }"
                class="w-6 h-6 rounded-full cursor-pointer border border-gray-300"
            ></span>
          </div>
        </div>

        <div v-if="route.name === 'transport-repair-room-id-id2'" class="!my-[40px] !w-[90%]">
          <h4 class="text-[16px] text-[#292D324D] !mb-[8px]">Toifalar</h4>

          <div class="bg-[#fff] rounded-full !mr-[16px] inline-block !mb-[16px]" v-for="(index4) in 5" :key="index4">
            <span class="text-[12px] text-[#292D32] !py-[4px] !px-[16px]">Motorist</span>
          </div>

          <h4 class="text-[16px] text-[#292D324D] !mb-[8px] !mt-[40px]">Xizmatlar</h4>


          <div class="flex space-x-4">
            <div class="p-4 bg-white rounded-2xl text-center !w-auto" v-for="(index4) in 5" :key="index4">
              <p class="text-[12px] text-[#292D32] !py-[4px] !px-[16px] !mb-0">Polirovka</p>
              <p class="text-[10px] text-[#BBBCBE]">$200</p>
            </div>
          </div>
        </div>

        <div class="flex flex-col w-full">
          <a href="tel:+998990893954"
             class="!p-[16px] bg-[#66C61C] rounded-full w-full text-white !mb-[16px] text-center">
            Qo'ng'iroq qilish
          </a>
          <a href="https://telegram.org/" target="_blank"
             class="!p-[16px] bg-[#27A7E7] rounded-full w-full text-white !mb-[16px] flex items-center justify-center">
            <img src="@/assets/images/icons/telegram.svg" class="!mr-[13px]" alt="tg"/>
            Telegram orqali bog'lanish
          </a>

          <button
              v-if="route.name === 'transport-repair-room-id-id2'"
              class="!p-[16px] bg-[#D4D5D6] rounded-full w-full text-[#292D32] !mb-[16px] flex items-center justify-center"
          >
            Navbatga yozilish
          </button>
        </div>
      </div>
    </div>


    <div class="!my-[68px] flex">
      <button class="shadow-bg" :class="{ 'active': !is_active, 'inactive': is_active }" @click="is_active = false">
        Xususiyatlari
      </button>
      <button class="shadow-bg" :class="{ 'active': is_active, 'inactive': !is_active }" @click="is_active = true">
        Izohlar
      </button>
    </div>

    <div class="!mb-[50px]">
      <div v-if="!is_active">

        <div class="space-y-4">
          <div v-for="(item, index) in details" :key="index" class="flex items-end justify-between !mb-[32px]">
            <span class="text-[#292D32] text-[16px] font-medium">{{ item.label }}</span>
            <div class="flex-1 border-t border-dashed border-gray-300 !mx-2"></div>
            <span class="text-gray-800">{{ item.value }}</span>
          </div>
        </div>
        <div class="!p-[12px] rounded-[24px] bg-white relative">


          <div class="location">
            <img src="@/assets/images/icons/location.svg" alt="mark"/>
            <span class="!ml-[8px]">Toshkent, Yakkasaroy tumani</span>
          </div>
          <iframe
              src="https://yandex.uz/map-widget/v1/?ll=69.279737%2C41.311151&z=12"
              width="100%"
              class="h-[576px]"
              frameborder="0"
          />
        </div>
      </div>

      <template v-else>
        <div class="p-6 max-w-lg !mx-auto">
          <div class="flex justify-center mb-[32px] space-x-1">
            <span class="text-yellow-400 text-2xl cursor-pointer">★</span>
            <span class="text-yellow-400 text-2xl cursor-pointer">★</span>
            <span class="text-yellow-400 text-2xl cursor-pointer">★</span>
            <span class="text-gray-400 text-2xl cursor-pointer">★</span>
            <span class="text-gray-400 text-2xl cursor-pointer">★</span>
          </div>

          <span class="text-[#292D324D] text-[12px] !mb-[6px]">{{ $t('description') }}</span>
          <textarea
              class="w-full !py-[12px] !px-[16px] border rounded-lg text-[#292D324D] text-[14px] outline-none"
              placeholder="O‘z fikringizni yozib qoldiring!"
              rows="4"
          />
          <button class="bg-[#66C61C] text-white !py-[12px] !px-[20px] rounded-full !mt-[16px]">Publikatsiya qilish
          </button>

          <div class="space-y-6 !mt-[56px]" v-for="(index3) in 3" :key="index3">
            <div class="flex items-start space-x-4">
              <img src="@/assets/images/avatar.jpg" alt="User Avatar" class="w-10 h-10 rounded-full">
              <div class="flex-1 !ml-[12px]">
                <div class="flex justify-between">
                  <h4 class="text-[#292D32] text-[16px] font-500 !mb-0">Anvar Egamberdiyev</h4>
                  <div class="flex space-x-1">
                    <span class="text-yellow-400 text-lg">★</span>
                    <span class="text-yellow-400 text-lg">★</span>
                    <span class="text-yellow-400 text-lg">★</span>
                    <span class="text-yellow-400 text-lg">★</span>
                    <span class="text-yellow-400 text-lg">★</span>
                  </div>
                </div>
                <p class="text-[#292D324D] text-[12px]">27 yanvar 2024</p>
                <p class="text-[#292D324D] text-[16px] !mt-[16px]">Mashina ancha yumshoq, 5 kun Sonetni haydadim,
                  o‘rindiq haydovchi uchun ancha qulay charachoq his qildirmadi, shaharda xarakatlanish uchun hamyonbop
                  zo‘r mashina.</p>
              </div>
            </div>
          </div>
        </div>
      </template>
    </div>
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

body {
  background: #000;
  color: #000;
}

.swiper {
  width: 100%;
  height: 300px;
  margin-left: auto;
  margin-right: auto;
}

.swiper-slide {
  background-size: cover;
  background-position: center;
}

.mySwiper2 {
  height: 100%;
  width: 100%;
}

.mySwiper {
  height: 100%;
  box-sizing: border-box;
  padding: 10px 0;
}

.mySwiper .swiper-slide {
  width: 25%;
  height: 100%;
  opacity: 0.4;
}

.mySwiper .swiper-slide-thumb-active {
  opacity: 1;
}

.swiper-slide img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.shadow-bg {
  @apply py-[12px] px-[20px] text-[14px] rounded-[8px];
}

.active {
  @apply bg-[#1A1F23] text-white;
  box-shadow: 0 1.5px 4px -1px #0A090B12;
}

.inactive {
  @apply text-[#292D324D];
}

.location {
  @apply flex items-center text-[#292D32] text-[16px] !p-[16px] rounded-[24px] border-[#292D324D] border w-[300px] absolute bg-white top-[32px] left-[32px];
}


.box-h { // Animated
  background-image: repeating-linear-gradient(0deg, var(--clr-border), var(--clr-border) 10px, transparent 10px, transparent 20px), // left
  repeating-linear-gradient(90deg, var(--clr-border), var(--clr-border) 10px, transparent 10px, transparent 20px), // top
  repeating-linear-gradient(180deg, var(--clr-border), var(--clr-border) 10px, transparent 10px, transparent 20px), // right
  repeating-linear-gradient(270deg, var(--clr-border), var(--clr-border) 10px, transparent 10px, transparent 20px) // bottom
;
  background-size: 3px calc(100% + 20px), calc(100% + 20px) 3px, 3px calc(100% + 20px), calc(100% + 20px) 3px;
  animation: boxBorderAnimation 1s infinite linear;

  @keyframes boxBorderAnimation {
    from {
      background-position: 0 0, -20px 0, 100% -20px, 0 100%;
    }
    to {
      background-position: 0 -20px, 0 0, 100% 0, -20px 100%;
    }
  }
}
</style>
