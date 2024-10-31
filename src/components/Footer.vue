<template>
  <div class="bg-[#FAFAFA]">
    <div class="max-w-screen-xl  container lg:mx-auto">
      <div class="!pt-[24px] !pb-[16px] flex justify-between">
        <div>
          <img class="!mb-[24px]" src="@/assets/logo.svg" alt="logo" width="130">

          <span class="block text-[#292D324D] text-[16px] !mb-[16px]">Transport xizmatlari <br> platformasi</span>

          <div class="flex items-center gap-3">
            <img src="/icons/telegram.svg" alt="telegram">
            <img src="/icons/instagram.svg" alt="instagram">
            <img src="/icons/facebook.svg" alt="facebook">
            <img src="/icons/youtube.svg" alt="youtube">
          </div>
        </div>

        <div>
          <h3 class="font-semibold text-[#292D32] text-[16px] !mb-[16px]">Mijozlar uchun</h3>

          <router-link to="#" class="block text-[14px] !mb-[10px] text-[#292D324D]">Пользовательское соглашение</router-link>
          <router-link to="#" class="block text-[14px] !mb-[10px] text-[#292D324D]">Как выбрать исполнителя</router-link>
          <router-link to="#" class="block text-[14px] !mb-[10px] text-[#292D324D]">Обратная связь</router-link>
          <router-link to="#" class="block text-[14px] !mb-[10px] text-[#292D324D]">Оплата и доставка</router-link>
          <router-link to="#" class="block text-[14px] !mb-[10px] text-[#292D324D]">Возвраты</router-link>
          <router-link to="#" class="block text-[14px] text-[#292D324D]">О сервисе</router-link>
        </div>

        <div>
          <h3 class="font-semibold text-[#292D32] text-[16px] !mb-[16px]">Ijrochilar uchun</h3>

          <router-link to="#" class="block text-[14px] !mb-[10px] text-[#292D324D]">Сайт для партнёров</router-link>
          <router-link to="#" class="block text-[14px] !mb-[10px] text-[#292D324D]">Справка для исполнителей</router-link>
          <router-link to="#" class="block text-[14px] !mb-[10px] text-[#292D324D]">Регистрация исполнителя</router-link>
          <router-link to="#" class="block text-[14px] !mb-[10px] text-[#292D324D]">Личный кабинет исполнителя</router-link>
        </div>

        <div>
          <h3 class="font-semibold text-[#292D32] text-[16px] !mb-[16px]">Hamkorlik</h3>

          <router-link to="#" class="block text-[14px] !mb-[10px] text-[#292D324D]">Работа с  брендом</router-link>
          <router-link to="#" class="block text-[14px] !mb-[10px] text-[#292D324D]">Партнёрская программа</router-link>
          <router-link to="#" class="block text-[14px] !mb-[10px] text-[#292D324D]">Новости компании</router-link>
        </div>
      </div>

      <span class="block w-full h-[1px] bg-[#292D321A]"></span>

      <div class="flex items-center justify-between !py-[16px]">
        <div class="flex items-center gap-6">
          <router-link to="#" class="text-[#292D32] font-medium text-[14px]">© 2023 “Carting”</router-link>
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