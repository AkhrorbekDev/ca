<template>
  <div class="bg-[#FAFAFA]">
    <div class="max-w-screen-xl  container lg:mx-auto">
      <div class="!pt-[24px] !pb-[16px] flex justify-between">
        <div>
          <img class="!mb-[24px]" src="@/assets/logo.svg" alt="logo" width="130">

          <span class="block text-[#292D324D] text-[16px] !mb-[16px]">{{ $t('footerSiteDescription') }}</span>

          <div class="flex items-center gap-3">
            <img src="/icons/telegram.svg" alt="telegram">
            <img src="/icons/instagram.svg" alt="instagram">
            <img src="/icons/facebook.svg" alt="facebook">
            <img src="/icons/youtube.svg" alt="youtube">
          </div>
        </div>

        <div>
          <h3 class="font-semibold text-[#292D32] text-[16px] !mb-[16px]">Mijozlar uchun</h3>

          <router-link to="#" class="block text-[14px] !mb-[10px] text-[#292D324D]">Platforma haqida</router-link>
          <router-link to="#" class="block text-[14px] !mb-[10px] text-[#292D324D]">Maqsad va qadriyatlarimiz
          </router-link>
          <router-link to="#" class="block text-[14px] !mb-[10px] text-[#292D324D]">Xizmatlar</router-link>
          <router-link to="#" class="block text-[14px] !mb-[10px] text-[#292D324D]">Afzalliklar</router-link>
          <router-link to="#" class="block text-[14px] !mb-[10px] text-[#292D324D]">Hamkorlik</router-link>
          <router-link to="#" class="block text-[14px] text-[#292D324D]">Bog‘lanish</router-link>
        </div>

        <div>
          <h3 class="font-semibold text-[#292D32] text-[16px] !mb-[16px]">Mijozlar uchun</h3>

          <router-link to="#" class="block text-[14px] !mb-[10px] text-[#292D324D]">Yordam bo'limi</router-link>
          <router-link to="#" class="block text-[14px] !mb-[10px] text-[#292D324D]">Foydalanish tartibi</router-link>
          <router-link to="#" class="block text-[14px] !mb-[10px] text-[#292D324D]">Top haydovchilar</router-link>
          <router-link to="#" class="block text-[14px] !mb-[10px] text-[#292D324D]">Shaxsiy kabinet</router-link>
        </div>

        <div>
          <h3 class="font-semibold text-[#292D32] text-[16px] !mb-[16px]">Manzil</h3>

          <p class="text-[14px] text-[#292D324D] w-[180px]">
            Toshkent shahri,
            Shayxontohur tumani, Muqumiy ko‘chasi 46-uy
          </p>
        </div>
      </div>

      <span class="block w-full h-[1px] bg-[#292D321A]"></span>

      <div class="flex items-center justify-between !py-[16px]">
        <div class="flex items-center gap-6">
          <router-link to="#" class="text-[#292D32] font-medium text-[14px]">© 2024 “Carting”</router-link>
          <router-link to="#" class="text-[#292D324D] font-medium text-[14px]">Foydalanish shartlari</router-link>
          <router-link to="#" class="text-[#292D324D] font-medium text-[14px]">Maxfiylik siyosati</router-link>
        </div>

        <a href="https://anysoft.uz/" target="_blank" class="flex items-center gap-4">
          <span class="text-[#292D324D] font-medium text-[14px]">Ishlab chiqilgan</span>
          <img src="@/assets/anysoft.svg" alt="anysoft" width="85">
        </a>
      </div>
    </div>
  </div>
</template>
