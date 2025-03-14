<script lang="ts" setup>

import {ref} from "vue";

const value = ref(null);
</script>


<template>
  <div>
    <div class="bg-[#353C4A] !pt-[80px] !pb-[244px]" id="contact">
      <div class="max-w-screen-xl  container lg:mx-auto">
        <div class="flex items-start justify-between">
          <h3 class="text-white text-[48px] font-semibold">Sizni hamkorlikka <br>
            taklif qilamiz</h3>

          <p class="text-white text-[16px] w-[617px]">
            Agar sizda yuk va yo’lovchi tashish sohasida sifatli transport xizmatlariga
            ehtiyoj
            bo’lsa yoki sizo’zingiz transport xizmati ko’rsatuvchisi bo’lsangiz biz sizni o’zaro
            samarali hamkorlik qilishgataklif etamiz! Birgalikda muvaffaqiyatli va uzoq
            muddatli hamkorlikni yaratishga intilamiz!</p>
        </div>
      </div>
    </div>

    <div class="bg-[#FAFAFA] h-[505px]">
      <div class="max-w-screen-xl  container lg:mx-auto relative">
        <div class="flex rounded-[24px] overflow-hidden absolute w-full top-[-200px]">
          <img src="@/assets/images/offer-img.png" alt="">
          <div class="!px-[50px] !pt-[32px] !pb-[40px] grow bg-[#FAFAFA]">
            <h5 class="text-center text-[#101828] text-[18px] font-semibold">Biz bilan bog‘lanish</h5>

            <div class="flex flex-col gap-5">
              <div class="flex flex-col gap-2 w-full">
                <label for="username" class="text-[#344054] font-medium">Ism <span
                    class="text-red-500">*</span></label>

                <InputText type="text" class="w-full !bg-[#FAFAFA]  custom-placeholder-input"
                           placeholder="Ismingizni kiriting"/>
              </div>

              <div class="flex flex-col gap-2 w-full">
                <label for="username" class="text-[#344054] font-medium">Kompaniya <span
                    class="text-red-500">*</span></label>

                <InputText type="text" class="w-full !bg-[#FAFAFA]  custom-placeholder-input"
                           placeholder="Kompaniya nomi"/>
              </div>

              <div class="flex flex-col gap-2 w-full">
                <label for="phone" class="text-[#344054] font-medium">Telefon <span
                    class="text-red-500">*</span></label>

                <InputMask class="w-full !bg-[#FAFAFA]  custom-placeholder-input" id="phone" v-model="value"
                           mask="(999) 99-999-99-99" placeholder="(998)" fluid/>

              </div>

              <div class="flex flex-col gap-2 w-full">
                <label for="username" class="text-[#344054] font-medium">{{ $t('description') }}</label>
                <Textarea class="w-full !bg-[#FAFAFA]  custom-placeholder-input" rows="5" cols="30"/>
              </div>

              <button class="bg-[#66C61C] text-[16px] font-medium text-white rounded-[8px] text-center !py-[12px]">
                Yuvorish
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">


</style>
