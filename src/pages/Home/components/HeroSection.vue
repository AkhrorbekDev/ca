<script lang="ts">

</script>

<template>
  <div class="!h-[900px] relative">
    <video autoplay muted loop playsinline class="background-video">
      <source src="@/assets/video/road_transport_truck_industry_forest_nature_highwa_2023_11_27_05.mp4" type="video/mp4">
      Your browser does not support the video tag.
    </video>

    <div class="max-w-screen-xl  container lg:mx-auto">
      <div class="bg-[#FFFFFF] overflow-hidden rounded-[100px] flex items-center !mt-[32px] !pl-[32px]">
        <router-link to="/">
          <img class="!mr-[45px]" src="@/assets/logo.svg" alt="logo" width="130"/>
        </router-link>

        <nav class="flex items-center gap-7">
          <router-link to="#" class="text-[#4F5662] transition font-medium text-[16px] hover:text-green-500">Platforma haqida</router-link>
          <router-link to="#" class="text-[#4F5662] transition font-medium text-[16px] hover:text-green-500">Maqsad va qadriyatlarimiz</router-link>
          <router-link to="#" class="text-[#4F5662] transition font-medium text-[16px] hover:text-green-500">Xizmatlar</router-link>
          <router-link to="#" class="text-[#4F5662] transition font-medium text-[16px] hover:text-green-500">Afzalliklar</router-link>
          <router-link to="#" class="text-[#4F5662] transition font-medium text-[16px] hover:text-green-500">Hamkorlik</router-link>
          <router-link to="#" class="text-[#4F5662] transition font-medium text-[16px] hover:text-green-500">FAQ</router-link>
          <router-link to="#" class="text-[#4F5662] transition font-medium text-[16px] hover:text-green-500">Bog'lanish</router-link>
        </nav>

        <div class="bg-[#66C61C] !px-[24px] !py-[28px] !ml-auto relative">
            <span class="bg-[#66C61C] w-[32px] h-[32px] rounded-full flex items-center justify-center absolute left-[-15px]">
              <i class="pi pi-phone" style="width: 15px; color: white"/>
            </span>
          <a href="tel:+998998158762" class="text-white font-semibold text-[20px]">(99) 815 87 62</a>
        </div>
      </div>

      <div class="!mt-[138px]">
        <h1 class="text-white text-[90px] font-black text-center leading-tight">BARCHA <span class="text-[#66C61C]">TRANSPORT</span>
          <br>
          XIZMATLARI BIR JOYDA</h1>


        <span class="block text-white text-[18px] !mt-[18px] !mb-[56px] text-center">
            Carting — bu barcha turdagi transport xizmatlarini <br>
              bir joyga jamlagan innovatsion platforma.
          </span>


        <div class="flex items-center justify-center">
          <button
              class="!px-[24px] !py-[12px] bg-[#66C61C] rounded-full text-white text-[16px] font-medium !mr-[16px]">
            E’lon
            berish

          </button>

          <button class="flex items-center text-white text-[16px] font-medium">
            <div class="w-[48px] h-[48px] flex items-center justify-center bg-white rounded-full !mr-[12px]">
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                    d="M5.125 0.587239C2.95833 -0.663686 0.25 0.899966 0.25 3.40182V8.59797C0.25 11.0998 2.95833 12.6635 5.125 11.4126L9.625 8.81448C11.7917 7.56356 11.7917 4.43624 9.625 3.18532L5.125 0.587239Z"
                    fill="#363853"/>
              </svg>
            </div>

            Videoni ko‘rish
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.background-video {
  position: fixed; /* Fixes the video to the viewport */
  top: 0;
  left: 0;
  width: 100vw; /* Full viewport width */
  height: 900px; /* Full viewport height */
  object-fit: cover; /* Crops the video to cover the area */
  z-index: -1;
}
</style>