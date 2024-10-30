<script setup lang="ts">
import {ref} from "vue";
import {useRouter} from "vue-router";

const router = useRouter()

const ingredient = ref<null>(null)
</script>
<template>
  <div class="bg-[#FAFAFA]">
    <router-link to="/">
      <img src="@/assets/images/logo2.svg" class="!p-[24px] absolute right-0" alt="logo"/>
    </router-link>

    <div class="flex items-center justify-center h-[100vh]">
      <div class="rounded-[24px] !w-[400px]">
        <h2 class="text-[#282B30] text-[36px] !mb-[10px] text-center font-600">Shaxsingizni tanlang!</h2>
        <p class="text-[#292D324D] text-[16px] text-center !m-auto !mb-[24px] w-[80%]">
          Siz platformamizdan kim sifatida
          foydalanmoqchisiz?
        </p>

        <div class="flex flex-col items-center !mt-[24px]">
          <label for="legal" class="bg-[#FFFFFF] !p-[16px] w-full flex items-center justify-between rounded-[20px] cursor-pointer">
            <span class="text-[16px] text-[#292D324D]">Yuridik shaxs</span>
            <RadioButton v-model="ingredient" inputId="legal" name="personType" value="legal"/>
          </label>

          <label for="physical" class="bg-[#FFFFFF] !p-[16px] w-full flex items-center justify-between rounded-[20px] cursor-pointer !mt-[8px]">
            <span class="text-[16px] text-[#292D324D]">Jismoniy shaxs</span>
            <RadioButton v-model="ingredient" inputId="physical" name="personType" value="physical"/>
          </label>
        </div>

        <button
            @click="router.push('/personal-data')"
            :disabled="!ingredient"
            :class="!ingredient ? '!bg-[#8ccc5a]' : '!bg-[#66C61C]'"
            class="!py-[16px] text-white text-[16px] rounded-[20px] !mt-[24px] w-full"
        >
          Kirish
        </button>

        <div class="!mt-[24px]  text-gray-600">
          <router-link to="/income-password" class="text-[#0BA5EC] !text-[15px] flex items-center justify-center">
            <img src="@/assets/images/toLeft.svg" alt="left">
            Ortga
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
.p-radiobutton-checked .p-radiobutton-box {
  border-color: #66C61C !important;
  background: #66C61C !important;
}
</style>