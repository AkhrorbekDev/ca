<script setup lang="ts">
import {ref} from 'vue';

const selectedCity = ref();
const cities = ref([
  {name: 'New York', code: 'NY'},
  {name: 'Rome', code: 'RM'},
  {name: 'London', code: 'LDN'},
  {name: 'Istanbul', code: 'IST'},
  {name: 'Paris', code: 'PRS'}
]);
</script>

<template>
  <div class="about-us ">
    <div class="max-w-screen-xl  container lg:mx-auto !pt-[334px] !pb-[100px] relative">

      <div
          class="bg-white rounded-[24px] !p-[40px] grid grid-cols-3 gap-6 shadow-custom absolute top-[-80px] w-full left-0">
        <div class="flex flex-col gap-2 w-full">
          <label for="username" class="text-[#292D32] font-medium text-[16px]">Xizmat turi</label>
          <Select v-model="selectedCity" :options="cities" optionLabel="name" placeholder="Manzilni tanlang"
                  class="w-full !bg-[#FAFAFA] !border-0 custom-placeholder-select"/>
        </div>

        <div class="flex flex-col gap-2 w-full">
          <label for="username" class="text-[#292D32] font-medium text-[16px]">Qayerdan</label>
          <InputText type="text" class="w-full !bg-[#FAFAFA] !border-0 custom-placeholder-input"
                     placeholder="Manzilni kiriting"/>
        </div>

        <div class="flex flex-col gap-2 w-full">
          <label for="username" class="text-[#292D32] font-medium text-[16px]">Qayerga</label>
          <InputText type="text" class="w-full !bg-[#FAFAFA] !border-0 custom-placeholder-input"
                     placeholder="Manzilni kiriting"/>
        </div>

        <div class="flex flex-col gap-2 w-full">
          <label for="username" class="text-[#292D32] font-medium text-[16px]">Qachon</label>
          <InputText type="text" class="w-full !bg-[#FAFAFA] !border-0 custom-placeholder-input"
                     placeholder="Kiriting"/>
        </div>

        <div class="flex flex-col gap-2 w-full">
          <label for="username" class="text-[#292D32] font-medium text-[16px]">Transport turi</label>
          <Select v-model="selectedCity" :options="cities" optionLabel="name" placeholder="Transportni tanlang"
                  class="w-full !bg-[#FAFAFA] !border-0 custom-placeholder-select"/>
        </div>

        <button class="bg-[#66C61C] h-[40px] text-white rounded-full !mt-auto">
          Izlash
        </button>

      </div>


      <div class="flex justify-between">
        <div class="!mr-[40px]">
          <span class="block text-[16px] text-[#292D3266] font-medium !mb-[24px]">Biz haqimizda</span>

          <h2 class="text-[#292D32] text-[40px] font-semibold !mb-[24px]">Carting – Siz bilan Har <br>
            Qadamda endi Birga!</h2>

          <p class="w-[592px] text-[#292D3266] text-[18px] !mb-[24px]">
            Biz aholi va korporativ mijozlarga eng ommabop transport va
            logistika xizmatlarini tez, oson va ishonchli tarzda, zamonaviy
            texnologiyalar asosida taqdim etishni taklif etamiz. Maqsadimiz,
            ushbu platforma orqali yirik va kichik kompaniyalar, yakka tartibdagi
            tadbirkorlar va jismoniy shaxslar uchun sifatli, arzon va xavfsiz
            transport xizmatlaridan istalgan vaqtda, istalgan joydanfoydalanish
            imkoniyatini yaratishdir.</p>

          <button class="bg-[#66C61C] font-medium text-white rounded-[8px] !px-[24px] !py-[12px]">
            Xizmatdan foydalanish
          </button>
        </div>

        <div>
          <img src="@/assets/images/about-us-img.png" alt="img" width="600">
        </div>
      </div>

    </div>
  </div>
</template>

<style lang="scss">
.about-us {
  background-color: white;
  background-image: url("@/assets/images/about-us-bg.png");
  background-size: cover;
  background-position: center center;
  background-repeat: no-repeat;
}

.custom-placeholder-select .p-placeholder {
  font-size: 14px !important;
  color: #292D324D !important;
}

.custom-placeholder-input::placeholder {
  font-size: 14px !important;
  color: #292D324D !important;
}
</style>