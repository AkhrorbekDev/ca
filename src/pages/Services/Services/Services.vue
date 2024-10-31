<script setup lang="ts">

</script>

<template>
  <div class="max-w-screen-xl lg:mx-auto !pb-[91px]">
    <!-- Xizmatlar-->
    <div>
      <h1 class="text-[#292D32] text-[32px] font-semibold">Xizmatlar</h1>
      <p class="text-[#292D3266] text-[16px] !mt-[4px] !mb-[24px]">
        Bu yerda umumiy xizmatlar haqida tushuntiruvchi text bo’ladi
      </p>

      <div class="grid gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
        <div class="card-service" v-for="(item, index) in 10" :key="index">
          <h1 class="text-[#292D32] text-[20px] !mb-[4px]">Yetkazib berish</h1>
          <p class="text-[#292D3266] text-[12px]">Tovar va mahsulotlarni tez va xavfsiz manzilga yetkazib berish
            xizmati</p>

          <img src="@/assets/images/icons/motobike.svg" class="!mb-[42px] !m-auto !mt-[24px]" alt="motobike">

          <div class="text-center !mb-[25px]">
            <button class="!px-[16px] !py-[10px] bg-[#66C61C] text-white text-[14px] rounded-full">
              E’lon berish
            </button>
          </div>
        </div>
      </div>
    </div>


    <!--Transport e’lonlari-->
    <div class="!mt-[96px]">
      <h1 class="text-[#292D32] text-[32px] font-semibold">Transport e’lonlari</h1>
      <p class="text-[#292D3266] text-[16px] !mt-[4px] !mb-[24px]">
        Bu yerda transport e’lonlari haqida tushuntiruvchi text bo’ladi
      </p>

      <div class="grid gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
        <div class="card-service2" v-for="(item, index) in 5" :key="index">
          <h1 class="text-[#292D32] text-[20px] !mb-[4px]">Yuk tashish</h1>
          <p class="text-[#292D3266] text-[12px]">
            Barcha turdagi kichikdan kattagacha yuklarni tashish uchun samarali yechim
          </p>

          <img src="@/assets/images/icons/kamaz.svg" class="!mb-[42px] !m-auto !mt-[24px]" alt="motobike">

          <div class="text-center !mb-[25px]">
            <button class="!px-[16px] !py-[10px] bg-[#66C61C] text-white text-[14px] rounded-full">
              E’lon berish
            </button>
          </div>
        </div>
      </div>
    </div>


    <!--E’lonlar-->
    <div class="!mt-[96px]">
      <h1 class="text-[#292D32] text-[32px] font-semibold">E’lonlar</h1>
      <p class="text-[#292D3266] text-[16px] !mt-[4px] !mb-[24px]">
        Bu yerda e’lonlar haqida tushuntiruvchi text bo’ladi
      </p>

      <div class="grid gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
        <div class="card-service" v-for="(item, index) in 5" :key="index">
          <h1 class="text-[#292D324D] text-[20px] !mb-[8px]">Yuk tashish</h1>
          <div class="flex items-center">
            <span class="text-[#1A1F23] text-[14px] font-medium !mr-[7px]">Toshkent</span>
            <svg width="11" height="12" viewBox="0 0 11 12" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M0.667969 4.72792H10.0013L6.10825 1.33398" stroke="#1A1F23" stroke-linecap="round"
                    stroke-linejoin="round"></path>
              <path d="M10 7.27305L0.666668 7.27305L4.55972 10.667" stroke="#1A1F23" stroke-linecap="round"
                    stroke-linejoin="round"></path>
            </svg>
            <span class="text-[#1A1F23] text-[14px] font-medium !ml-[7px]">Samarqand</span>
          </div>
          <h1 class="text-[#292D324D] text-[14px] !mt-[4px] !mb-[4px]">16.08.2024</h1>

          <img src="@/assets/images/trucks/gazel.png" class="!mb-[42px] !m-auto !mt-[24px]" alt="motobike">

          <div class="text-center !mb-[25px]">
            <button class="!px-[16px] !py-[10px] bg-[#66C61C] text-white text-[14px] rounded-full">
              Batafsil
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.card-service {
  @apply bg-white rounded-[20px] p-[16px];
  box-shadow: 0 2px 8.4px 0 #292D3214;
}

.card-service2 {
  @apply rounded-[20px] p-[16px];
}
</style>