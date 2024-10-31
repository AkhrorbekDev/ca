<script setup lang="ts">
import {ref} from "vue";
import {useRouter} from "vue-router";

interface Car {
  title: string;
}

const router = useRouter()

const is_car = ref<boolean>(false)
const is_moto = ref<boolean>(false)
const car = ref<Car[]>([
  {
    title: 'Chevrolet Cobalt'
  },
  {
    title: 'Chevrolet Lacetti'
  },
  {
    title: 'BYD Chazor DMI'
  },
  {
    title: 'Kia Sonet'
  },
  {
    title: 'Chevrolet Tracker'
  },
])
const moto = ref<Car[]>([
  {
    title: 'Dugatti'
  },
  {
    title: 'Honda'
  },
  {
    title: 'Ferrari'
  },
  {
    title: 'Bike'
  },
  {
    title: 'Chevrolet'
  },
])

const toggleVisibility = (type: 'car' | 'moto') => {
  if (type === 'car') {
    is_car.value = !is_car.value;
    is_moto.value = false;
  } else {
    is_moto.value = !is_moto.value;
    is_car.value = false;
  }
};

const handleSubmit = (index: number) => {
  router.push(`/transport/${index + 1}`)
}
</script>

<template>
  <div>
    <div class="flex items-center justify-center !mb-[12px]">
      <div class="menu-item" @click="toggleVisibility('car')">
        <img src="@/assets/images/cars/xl.png" alt="xl"/>

        <span class="text-[#292D32] text-[14px]">Yengil avtomobillar</span>

        <img src="@/assets/images/arrowUp.svg" alt="arrow"/>
      </div>

      <div class="menu-item !ml-[24px]" @click="toggleVisibility('moto')">
        <img src="@/assets/images/cars/moto.png" alt="xl"/>

        <span class="text-[#292D32] text-[14px]">Mototexnika</span>

        <img src="@/assets/images/arrowUp.svg" alt="arrow"/>
      </div>
    </div>

    <div class="flex items-center justify-center">
      <div class="!p-[24px] rounded-[24px] bg-white menu-shadow !w-[343px]" v-if="is_car">
        <div class="bg-[#FAFAFA] w-full text-[12px] text-[#292D324D] px-[8px] !mb-[12px]">Sedan</div>

        <div v-for="(item, index) in car"
             :key="index"
             class="flex items-center justify-between border-[#F5F5F7] border-b !mb-[12px] !pb-[12px] cursor-pointer"
             @click="handleSubmit(index)"
        >

          <div class="flex flex-col">
            <h3 class="text-[#292D32] text-[14px]">{{ item.title }}</h3>
            <h5 class="text-[#292D324D] text-[12px]">Sedan, benzin</h5>
          </div>

          <img src="@/assets/images/arrowsR.svg" alt="right">
        </div>
      </div>
      <div v-else class="!w-[343px]"/>


      <div class="!p-[24px] rounded-[24px] bg-white menu-shadow !w-[343px] !ml-[24px]" v-if="is_moto">
        <div class="bg-[#FAFAFA] w-full text-[12px] text-[#292D324D] px-[8px] !mb-[12px]">Mototexnika</div>

        <div v-for="(item1, index1) in moto"
             :key="index"
             class="flex items-center justify-between border-[#F5F5F7] border-b !mb-[12px] !pb-[12px] cursor-pointer"
             @click="handleSubmit(index1)"
        >
          <div class="flex flex-col">
            <h3 class="text-[#292D32] text-[14px]">{{ item1.title }}</h3>
            <h5 class="text-[#292D324D] text-[12px]">Mototexnika, benzin</h5>
          </div>

          <img src="@/assets/images/arrowsR.svg" alt="right">
        </div>
      </div>
      <div v-else class="!w-[343px] !ml-[24px]"/>
    </div>
  </div>
</template>

<style scoped lang="scss">
.menu-item {
  @apply py-[15px] px-[16px] rounded-full w-[343px] flex items-center justify-between cursor-pointer;
  box-shadow: 0 2px 8.4px 0 #292D3214;
}

.menu-shadow {
  box-shadow: 0 32px 100px 0 #292D3229;
}
</style>