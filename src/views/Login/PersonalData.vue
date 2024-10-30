<script setup lang="ts">
import {ref} from "vue";
import {useRouter} from "vue-router";

interface DataValue {
  company: null;
  stir: null;
  phone: null;
  agree: string;
}

const router = useRouter()

const dataValue = ref<DataValue>({
  company: null,
  stir: null,
  phone: null,
  agree: '',
})
</script>
<template>
  <div class="bg-[#FAFAFA]">
    <router-link to="/public">
      <img src="../../assets/images/logo2.svg" class="!p-[24px] absolute right-0" alt="logo"/>
    </router-link>

    <div class="flex items-center justify-center h-[100vh]">
      <div class="rounded-[24px] !w-[400px]">
        <h2 class="text-[#282B30] text-[36px] !mb-[10px] text-center font-600">Shaxs ma’lumotlari</h2>
        <p class="text-[#292D324D] text-[16px] text-center !m-auto !mb-[24px] w-[80%]">
          Ma’lumotlaringizni kiriting!
        </p>

        <div class="flex flex-col !mt-[24px]">
          <label for="company" class="text-[#292D324D] text-[14px] !mb-[8px]">Kompaniya nomi</label>
          <input
              id="company"
              v-model="dataValue.company"
              placeholder="Kiriting"
              class="!bg-[#fff] border-0 !p-[16px] outline-none rounded-[20px]"
          />

          <label for="stir" class="text-[#292D324D] text-[14px] !mt-[16px] !mb-[8px]">STIR</label>
          <input
              id="stir"
              v-model="dataValue.stir"
              placeholder="Kiriting"
              class="!bg-[#fff] border-0 !p-[16px] outline-none rounded-[20px]"
          />

          <label for="phone" class="text-[#292D324D] text-[14px] !mt-[16px] !mb-[8px]">Telefon</label>
          <input
              id="phone"
              v-model="dataValue.phone"
              placeholder="+998"
              class="!bg-[#fff] border-0 !p-[16px] outline-none rounded-[20px]"
          />

          <div class="flex items-center !mt-[36px]">
            <Checkbox v-model="dataValue.agree" inputId="ingredient1" name="pizza" value="Cheese"/>
            <label for="ingredient1" class="!ml-[8px] text-[14px]">
              <span class="text-[#218BFF]">Foydalanish shartlari</span>
              <span class="text-[#292D324D]">ga roziman</span>
            </label>
          </div>
        </div>

        <button
            @click="router.push('/')"
            class="!bg-[#66C61C] !py-[16px] text-white text-[16px] rounded-[20px] !mt-[24px] w-full"
        >
          Kirish
        </button>

        <div class="!mt-[24px]  text-gray-600">
          <router-link to="/selection" class="text-[#0BA5EC] !text-[15px] flex items-center justify-center">
            <img src="../../assets/images/toLeft.svg" alt="left"/>
            Ortga
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>
