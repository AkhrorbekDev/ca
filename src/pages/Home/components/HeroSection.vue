<template>
  <div class="!h-[900px] relative !bg-transparent">
    <video autoplay muted loop playsinline class="background-video">
      <source
          src="@/assets/video/road_transport_truck_industry_forest_nature_highwa_2023_11_27_05.mp4"
          type="video/mp4"
      >
      Your browser does not support the video tag.
    </video>

    <div class="max-w-screen-xl  container lg:mx-auto dark:!bg-transparent">
      <div
          class="bg-[#FFFFFF] overflow-hidden rounded-[100px] flex items-center !mt-[32px] !pl-[32px] dark:!bg-zinc-700"
      >
        <router-link to="/">
          <img class="!mr-[45px] " src="@/assets/logo.svg" alt="logo" width="130"/>
        </router-link>

        <nav class="flex items-center gap-7 !mx-auto dark:!bg-zinc-700">
          <a href="#about" class="text-[#4F5662] transition font-medium text-[16px] hover:text-green-500">
            {{ $t('home.navbar.platformInfo') }}
          </a>
          <!--          <router-link to="#" class="text-[#4F5662] transition font-medium text-[16px] hover:text-green-500">-->
          <!--            Maqsad va qadriyatlarimiz-->
          <!--          </router-link>-->
          <a href="#services" class="text-[#4F5662] transition font-medium text-[16px] hover:text-green-500">

            {{ $t('home.navbar.services') }}
          </a>
          <a href="#advantage" class="text-[#4F5662] transition font-medium text-[16px] hover:text-green-500">
            {{ $t('home.navbar.advantages') }}
          </a>
          <a href="#contact" class="text-[#4F5662] transition font-medium text-[16px] hover:text-green-500">
            {{ $t('home.navbar.collaboration') }}
          </a>
          <a href="#faq" class="text-[#4F5662] transition font-medium text-[16px] hover:text-green-500">
            {{ $t('home.navbar.faq') }}
          </a>
          <a href="#contact" class="text-[#4F5662] transition font-medium text-[16px] hover:text-green-500">
            {{ $t('home.navbar.contact') }}
          </a>
        </nav>

        <div class="!bg-[#66C61C] !px-[24px] !py-[28px] !ml-auto relative">
            <span
                class="bg-[#66C61C] w-[32px] h-[32px] rounded-full flex items-center justify-center absolute left-[-15px]"
            >
              <i class="pi pi-phone" style="width: 15px; color: white"/>
            </span>
          <a href="tel:+998777000007" class="text-white font-semibold text-[20px]">(77) 700 00 07</a>
        </div>
      </div>

      <div class="!mt-[138px] dark:!bg-transparent">
        <h1 class="text-white text-[90px] font-black text-center leading-tight">
          {{ $t('home.title.all') }} <span class="text-[#66C61C]">
          {{ $t('home.title.transport') }}
        </span>
          <br>
          {{ $t('home.title.services') }}
        </h1>


        <span class="block text-white text-[18px] !mt-[18px] !mb-[56px] text-center">
            {{ $t('home.title.description') }}
          </span>


        <div class="flex items-center justify-center gap-10">
          <router-link
              to="/services"
              class="!px-[24px] !py-[12px] bg-[#66C61C] rounded-full text-white text-[20px] font-medium"
          >
            {{ $t('home.title.createAnnouncement') }}
          </router-link>

          <button class="flex items-center text-white  text-[20px] font-medium">
            <div class="w-[48px] h-[48px] flex items-center justify-center !bg-white rounded-full !mr-[12px]">
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                    d="M5.125 0.587239C2.95833 -0.663686 0.25 0.899966 0.25 3.40182V8.59797C0.25 11.0998 2.95833 12.6635 5.125 11.4126L9.625 8.81448C11.7917 7.56356 11.7917 4.43624 9.625 3.18532L5.125 0.587239Z"
                    fill="#363853"
                />
              </svg>
            </div>

            {{ $t('home.title.watchVideo') }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.background-video {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 900px;
  object-fit: cover;
  z-index: -1;
}
</style>
