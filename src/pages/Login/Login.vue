<script setup lang="ts">
import {ref} from "vue";
import {useRouter} from "vue-router";

const router = useRouter()

const value = ref<string>('+998990893954')
</script>
<template>
  <div>
    <div class="fixed inset-0">
      <img src="../../assets/images/bgCar.svg" alt="Background" class="w-full h-full object-cover">
    </div>

    <div class="absolute flex justify-around md:w-[60%] w-full top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
      <img src="../../assets/images/logo.svg" class="w-[217px] hidden md:block" alt="logo">

      <div class="bg-white rounded-[24px] !w-[400px] !px-[40px] !py-[32px] -translate-x-8">
        <h2 class="text-[#282B30] text-[36px] !mb-[20px] text-center font-600">Kirish</h2>
        <p class="text-[#292D324D] text-[16px] text-center !mb-[24px]">
          Profilingizga kirish uchun ro'yxatdan o'tgan raqamingizni kiriting!
        </p>

        <div class="flex flex-col !mt-[24px]">
          <label for="username" class="text-[#292D324D] text-[14px]">Telefon</label>
          <input
              id="username"
              v-model="value"
              placeholder="+998"
              class="!bg-[#FAFAFA] border-0 !p-[16px] outline-none rounded-[20px]"
          />
        </div>

        <button
            @click="router.push('/income-password')"
            class="!bg-[#66C61C] !py-[16px] text-white text-[16px] rounded-[20px] !mt-[36px] w-full"
        >
          Kirish
        </button>

        <div class="!mt-[24px] text-center text-gray-600">
          <span class="text-[#292D32] !text-[15px]">Platformamizda yangimisiz?</span>
          <router-link to="/register" class="text-[#0BA5EC] !ml-1 !text-[15px]">Ro'yxatdan o'tish</router-link>
        </div>
      </div>
    </div>
  </div>
</template>
