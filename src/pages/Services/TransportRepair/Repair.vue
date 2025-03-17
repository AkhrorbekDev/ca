<script setup lang="ts">
import {onMounted, ref} from "vue";
import {useRouter} from "vue-router";
import {services} from "@/components/fakeJson"
import {useCommonStore} from "@/stores/common.store";

const store = useCommonStore()

onMounted(() => {

  let item = services.find(el => el.unique == 'repair')
  if (Object.keys(item).length) {
    store.activeService = item
  }

})

interface Car {
  title: string;
}

const router = useRouter()

const is_room = ref<boolean>(false)
const is_master = ref<boolean>(false)
const masterRoom = ref<Car[]>([
  {
    title: 'Mannol center'
  },
  {
    title: 'Diamond center'
  },
  {
    title: 'Shark'
  },
  {
    title: 'Black star'
  },
])

const master = ref<Car[]>([
  {
    title: 'Kuzov ustasi'
  },
  {
    title: 'Avtoelektrik'
  },
  {
    title: 'Mator ustasi'
  },
])

const toggleVisibility = (type: 'car' | 'moto') => {
  if (type === 'car') {
    is_room.value = !is_room.value;
    is_master.value = false;
  } else {
    is_master.value = !is_master.value;
    is_room.value = false;
  }
};

const handleSubmit = (index: number) => {
  router.push(`/transport-repair-rooms/${index + 1}`)
}
</script>

<template>
  <div>
    <div class="flex items-center justify-center !mb-[12px]">
      <div class="menu-item" @click="toggleVisibility('car')">
        <img src="@/assets/images/icons/masterRoom.png" alt="xl"/>

        <span class="text-[#292D32] text-[14px]">Ustaxonalar</span>

        <img src="@/assets/images/arrowUp.svg" alt="arrow"/>
      </div>

      <div class="menu-item !ml-[24px]" @click="toggleVisibility('moto')">
        <img src="@/assets/images/icons/master.png" alt="xl"/>

        <span class="text-[#292D32] text-[14px]">Ustalar</span>

        <img src="@/assets/images/arrowUp.svg" alt="arrow"/>
      </div>
    </div>

    <div class="flex items-center justify-center">
      <div class="!p-[24px] rounded-[24px] bg-white menu-shadow !w-[343px]" v-if="is_room">
        <div class="bg-[#FAFAFA] w-full text-[12px] text-[#292D324D] px-[8px] !mb-[12px]">Sedan</div>

        <div v-for="(item, index) in masterRoom"
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


      <div class="!p-[24px] rounded-[24px] bg-white menu-shadow !w-[343px] !ml-[24px]" v-if="is_master">
        <div v-for="(item1, index1) in master"
             :key="index"
             class="flex items-center justify-between border-[#F5F5F7] border-b !mb-[12px] !pb-[12px] cursor-pointer"
             @click="handleSubmit(index1)"
        >
          <div class="flex flex-col">
            <h3 class="text-[#292D32] text-[14px]">{{ item1.title }}</h3>
            <h5 class="text-[#292D324D] text-[12px]">Polirovka, bo‘yoq, qirilish, buklanish</h5>
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
  @apply py-[15px] bg-[#fff] px-[16px] rounded-full w-[343px] flex items-center justify-between cursor-pointer;
  box-shadow: 0 2px 8.4px 0 #292D3214;
}

.menu-shadow {
  box-shadow: 0 32px 100px 0 #292D3229;
}
</style>