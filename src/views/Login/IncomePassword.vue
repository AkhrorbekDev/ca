<script setup lang="ts">
import {ref} from "vue";
import InputOtp from 'primevue/inputotp';
import {useRouter} from "vue-router";

const router = useRouter()

const value = ref<null>(null)
</script>
<template>
  <div>
    <router-link to="/public">
      <img src="../../assets/images/logo2.svg" class="!p-[24px] absolute right-0" alt="logo"/>
    </router-link>

    <div class="flex items-center justify-center h-[100vh]">
      <div class="bg-white rounded-[24px] !w-[400px]">
        <h2 class="text-[#282B30] text-[36px] !mb-[20px] text-center font-600">Kodni kiriting</h2>
        <p class="text-[#292D324D] text-[16px] text-center !mb-[24px]">
          Tasdiqlash kodini +998******9763 raqamiga yubordik.
          Quyidagi maydonga mobil
          kodingizni kiriting.
        </p>

        <div class="flex flex-col items-center !mt-[24px]">
          <InputOtp v-model="value" class="!border-none !outline-none"/>
        </div>

        <button
            @click="router.push('/selection')"
            class="!bg-[#66C61C] !py-[16px] text-white text-[16px] rounded-[20px] !mt-[36px] w-full">
          Kirish
        </button>

        <div class="!mt-[24px] text-center text-gray-600">
          <span class="text-[#292D32] !text-[15px]">Kod olmadingizmi?</span>
          <router-link to="/public" class="text-[#0BA5EC] !ml-1 !text-[15px]">Qayta yuborish</router-link>
        </div>
      </div>
    </div>
  </div>
</template>
