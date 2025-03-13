<script setup lang="ts">
import {computed, inject, onMounted, ref} from "vue";
import {useRoute} from "vue-router";
import {services} from "@/components/fakeJson"
import {useCommonStore} from "@/stores/common.store";
// import Rating from 'primevue/rating';
// Import Swiper Vue.js components
import {Swiper, SwiperSlide} from 'swiper/vue';

// Import Swiper styles
import 'swiper/css';

import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';

// import required modules
import {FreeMode, Navigation, Thumbs} from 'swiper/modules';
import { useDateFormat } from "@vueuse/core";
import { all } from "axios";
import { id } from "element-plus/es/locale";

const formatDate = (date: string) => {
  return useDateFormat(date, 'DD MMMM YYYY', { locales: 'en-US' }).value;
}

const thumbsSwiper = ref(null);

const setThumbsSwiper = (swiper) => {
  console.log("SSa", swiper)
  thumbsSwiper.value = swiper;
};

const modules = [FreeMode, Navigation, Thumbs]

const store = useCommonStore()

onMounted(() => {

  let item = services.find(el => el.unique == 'repair')
  if (Object.keys(item).length) {
    store.activeService = item
  }

})

const is_active = ref<boolean>(false)

const route = useRoute()

const $api = inject('api')
const advertisementData = ref({})

const allComments = ref({
  id: route.params.id,
  comment_text: '',
  rating: '',
})


const sendComment = async () => {
  try {
    await $api.advertisement.createAdvertisementComment(allComments.value);
  } catch (error) {
    console.error("Error sending comment:", error);
  }
}

onMounted(async () => {
  try {
    const response = await $api.advertisement.getAdvertisement({
      id: route.params.id,
    });
    advertisementData.value = response?.data;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
})

const ratingComment = computed(() => {
  if (Array.isArray(advertisementData?.comments)) {
    return advertisementData?.comments.reduce((acc, item) => acc + item.rating / advertisementData?.comments?.length ,0)
  }
  return 0
})

const averageRating = computed(() => {

  console.log(`ratingComment`, advertisementData.value?.comments);
  
  if (Array.isArray(advertisementData.value?.comments)) {
      // Sum all ratings
  const sum = advertisementData.value?.comments.reduce((total, item) => total + item.rating, 0);
  
  // Divide by the number of ratings
  const average = sum / advertisementData.value?.comments.length;
  
  // Return with one decimal place precision
  return parseFloat(average.toFixed(1));
  }
  
  return 0

});

</script>

<template>
  <div class="max-w-screen-xl lg:mx-auto relative">
    <Breadcrumbs/>

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
            <swiper-slide v-for="(image, index) in advertisementData?.images" :key="index">
              <img class="rounded-xl h-full object-cover" :src="`https://api.carting.uz/uploads/files/${image}`" alt="img">
            </swiper-slide>

          </swiper>
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

            <swiper-slide v-for="(image, index) in advertisementData?.images" :key="index">
              <img class="rounded-xl h-full object-cover" :src="`https://api.carting.uz/uploads/files/${image}`" alt="img">
            </swiper-slide>

          </swiper>
        </div>
      </div>

    
      <div class="flex flex-col md:!ml-[100px] lg:w-1/2">
        <h2 class="text-[#292D32] text-[32px] font-500" v-if="route.name === 'transport-repair-room-id-id2'">
          AVTOritet</h2>
        <h2 class="text-[#292D32] text-[32px] font-500" v-if="route.name === 'transport-view-id'">{{ advertisementData?.service_name }}</h2>
        <!--        <h2 class="text-[#292D32] text-[32px] font-500" >Kia Sonet classic</h2>-->

        <div class="flex items-center text-gray-500 !mt-[16px] !mb-[40px]">
          <img src="@/assets/images/icons/star.svg" alt="#">
          <span class="!ml-[8px] text-[#292D324D] text-[14px]">
            <span class="text-[14px] text-[#292D32] font-400">{{ averageRating }},</span>
            {{ advertisementData.comments?.length }} ta izoh
          </span>
        </div>
      
        <p class="text-[16px] text-[#292D32] font-500 !mb-[40px]" v-if="route.name === 'transport-view-id'">
          <span class="text-[#292D324D] font-500">Yuk og'irligi:</span>
          {{ advertisementData?.details?.load_weight?.amount }} {{ advertisementData?.details?.load_weight?.name }}
        </p>

        <p class="text-[#292D324D] text-[16px] font-400 !mb-[40px]">
          {{ advertisementData?.note }}
        </p>

        <div v-if="false" class="!my-[40px] !w-[90%]">
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
          <a :href="`tel:+${advertisementData.created_by_phone}`"
             class="!p-[16px] bg-[#66C61C] rounded-full w-full text-white !mb-[16px] text-center">
            Qo'ng'iroq qilish
          </a>
          <a :href="advertisementData?.created_by_tg_link" target="_blank"
             class="!p-[16px] bg-[#27A7E7] rounded-full w-full text-white !mb-[16px] flex items-center justify-center cursor-pointer">
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
        Manzil
      </button>
      <button class="shadow-bg" :class="{ 'active': is_active, 'inactive': !is_active }" @click="is_active = true">
        Izohlar
      </button>
    </div>

    <div class="!mb-[50px]">
      <div v-if="!is_active" class="!p-[12px] rounded-[24px] bg-white relative">
        <div class="location">
          <img src="@/assets/images/icons/location.svg" alt="mark"/>
          <span class="!ml-[8px]">{{ advertisementData?.from_location?.name }}</span>
        </div>
        <iframe
            src="https://yandex.uz/map-widget/v1/?ll=69.279737%2C41.311151&z=12"
            width="100%"
            class="h-[576px]"
            frameborder="0"
        />
      </div>

      <template v-else>
        <div class="p-6 max-w-lg !mx-auto">
          <form @submit.prevent="sendComment">
            <Rating class="w-full flex justify-center" v-model="allComments.rating" />

            <span class="text-[#292D324D] text-[12px] !mb-[6px]">Izoh</span>
            <textarea
                v-model="allComments.comment_text"
                class="w-full !py-[12px] !px-[16px] border rounded-lg text-[#292D324D] text-[14px] outline-none"
                placeholder="O‘z fikringizni yozib qoldiring!"
                rows="4"
            />
            <button type="submit" class="bg-[#66C61C] text-white !py-[12px] !px-[20px] rounded-full !mt-[16px]">Publikatsiya qilish</button>
          </form>

          
          <div class="space-y-6 !mt-[56px]" v-for="(item, index) in advertisementData?.comments" :key="index">
            <div class="flex items-start space-x-4">
              <img src="@/assets/images/avatar.jpg" alt="User Avatar" class="w-10 h-10 rounded-full">
              <div class="flex-1 !ml-[12px]">
                <div class="flex justify-between">
                  <h4 class="text-[#292D32] text-[16px] font-500 !mb-0">Anvar Egamberdiyev</h4>
                  <Rating :modelValue="item?.rating" :stars="5" :cancel="false" />
                </div>
                <p class="text-[#292D324D] text-[12px]">{{formatDate(item.created_at)}}</p>
                <p class="text-[#292D324D] text-[16px] !mt-[16px]">
                  {{ item.comment_text }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<style lang="scss">
.p-rating-on-icon {
  font-size: 1.5rem;
  color: #FFC107 !important;
}

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
</style>
