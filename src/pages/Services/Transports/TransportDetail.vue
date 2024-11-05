<script setup lang="ts">
import {ref} from "vue";
import {useRoute} from "vue-router";

const is_active = ref<boolean>(false)

const route = useRoute()
</script>

<template>
  <div class="max-w-screen-xl lg:mx-auto">
    <div class="flex flex-col lg:flex-row bg-gray-50">
      <div class="flex flex-col items-center ">
        <div class="w-full lg:w-[660px]">
          <img src="@/assets/images/cars/back.png" alt="#" class="rounded-lg object-cover"/>
        </div>

        <div class="flex w-[100%] !mt-[24px] justify-between items-center overflow-auto">
          <img v-for="(index) in 5" :key="index"
               src="@/assets/images/cars/back.png"
               alt="Thumbnail 1"
               class="lg:w-[117px] md:w-[117px] w-full h-[100px] !mr-[18px] rounded-md object-cover cursor-pointer"
          />
        </div>
      </div>

      <div class="flex flex-col md:!ml-[100px] lg:w-1/2">
        <h2 class="text-[#292D32] text-[32px] font-500" v-if="route.name === 'transport-repair-room-id-id2'">AVTOritet</h2>
        <h2 class="text-[#292D32] text-[32px] font-500" v-if="route.name === 'transport-view-id'">Omborxona</h2>
<!--        <h2 class="text-[#292D32] text-[32px] font-500" >Kia Sonet classic</h2>-->

        <div class="flex items-center text-gray-500 !mt-[16px] !mb-[40px]">
          <img src="@/assets/images/icons/star.svg" alt="#">
          <span class="!ml-[8px] text-[#292D324D] text-[14px]">
            <span class="text-[14px] text-[#292D32] font-400">4.5,</span>
            25 ta izoh
          </span>
        </div>

        <p class="text-[16px] text-[#292D32] font-500 !mb-[40px]" v-if="route.name === 'transport-view-id'">
          <span class="text-[#292D324D] font-500">Maydon:</span>
          200 m²
        </p>

        <p class="text-[#292D324D] text-[16px] font-400 !mb-[40px]">
          Assalomu alaykum! Man sizga barcha turdagi yuklarni tashish uchun mo‘ljallangan Furqonimni taklif qilaman.
          Shanba yakshanba ham ishlayman.
        </p>

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
          <a href="tel:+998990893954" class="!p-[16px] bg-[#66C61C] rounded-full w-full text-white !mb-[16px] text-center">
            Qo'ng'iroq qilish
          </a>
          <a href="https://telegram.org/" target="_blank" class="!p-[16px] bg-[#27A7E7] rounded-full w-full text-white !mb-[16px] flex items-center justify-center">
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
      <button class="shadow-bg" :class="{ 'active': !is_active, 'inactive': is_active }" @click="is_active = false">Manzil</button>
      <button class="shadow-bg" :class="{ 'active': is_active, 'inactive': !is_active }" @click="is_active = true">Izohlar</button>
    </div>

    <div class="!mb-[50px]">
      <div v-if="!is_active" class="!p-[12px] rounded-[24px] bg-white relative">
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

      <template v-else>
        <div class="p-6 max-w-lg !mx-auto">
          <div class="flex justify-center mb-[32px] space-x-1">
            <span class="text-yellow-400 text-2xl cursor-pointer">★</span>
            <span class="text-yellow-400 text-2xl cursor-pointer">★</span>
            <span class="text-yellow-400 text-2xl cursor-pointer">★</span>
            <span class="text-gray-400 text-2xl cursor-pointer">★</span>
            <span class="text-gray-400 text-2xl cursor-pointer">★</span>
          </div>

          <span class="text-[#292D324D] text-[12px] !mb-[6px]">Izoh</span>
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