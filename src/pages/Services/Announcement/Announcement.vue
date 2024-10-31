<script setup lang="ts">
import ModalAnnouncement from "@/pages/Services/Announcement/components/ModalAnnouncement.vue";
import {ref} from 'vue';

const visible = ref(false);

interface AnnouncementType {
  status: boolean,
  image: string
  title: string
  from: string
  to?: string
  created_at: string
}

const announcementData: AnnouncementType[] = [
  {
    title: "Yuk tashish",
    from: "Toshkent",
    to: "Samarqand",
    image: "./truck.png",
    status: true,
    created_at: "16.08.2024"
  },
  {
    title: "Maxsus texnika",
    from: "Toshkent",
    image: "./roller.png",
    status: false,
    created_at: "16.08.2024"
  },
  {
    title: "Omborda saqlash",
    from: "Toshkent",
    to: "Samarqand",
    image: "./vito.png",
    status: true,
    created_at: "16.08.2024"
  },
]

const activeTab = ref(0);
const tabs = ['Barchasi', 'Mening e\'lonlarim', 'Mening e\'lonlarim'];
</script>

<template>
  <div>
    <div class="flex items-center justify-between">

      <div class="flex items-center space-x-4 bg-white rounded-lg !p-1.5">
        <button
            v-for="(tab, index) in tabs"
            :key="index"
            :class="[
        '!px-4 !py-3 rounded-lg font-medium',
        activeTab == index ? 'bg-gray-800 text-white' : 'text-gray-400'
      ]"
            @click="activeTab = index"
        >
          {{ tab }}
        </button>
      </div>

      <div class="flex items-center gap-4">
        <div class="flex flex-col gap-2 w-full">
          <Select v-model="selectedCity" :options="[]" optionLabel="name" placeholder="Xizmatlar"
                  class="w-full !border-0 !rounded-[16px] custom-placeholder-select h-[56px] flex items-center"/>
        </div>

        <div class="flex flex-col gap-2 w-full">
          <Select v-model="selectedCity" :options="[]" optionLabel="name" placeholder="Status"
                  class="w-full !border-0 !rounded-[16px] custom-placeholder-select h-[56px] flex items-center"/>
        </div>

        <AutoComplete
            type="text"
            placeholder="Kerakli e’lonni qidiring"
            :scrollHeight="'300'"
        />
      </div>
    </div>

    <div class="!mt-[31px]">
      <div class="grid grid-cols-5 gap-6">
        <div class="bg-white rounded-[24px] !py-[7px] !px-[18px] cursor-pointer"
             v-for="(item, index) in announcementData"
             :key="index" @click="visible = true">
          <div class="flex items-center justify-between">
            <div
                :class="['!px-[11px] !py-[4px] rounded-[50px] text-[10px] font-medium', item.status ? 'bg-[#F0FAE9] text-[#66C61C]' : 'bg-[#FEEDEC] text-[#F04438]']">
              {{ item.status ? 'Faol' : 'Faol emas' }}
            </div>

            <img class="h-[50px]" :src="item.image" alt="image" height="50px">
          </div>

          <h5 class="text-[#292D324D] text-[20px] !mb-[4px]">{{ item.title }}</h5>

          <div class="!mb-[4px]">
            <div class="flex items-center" v-if="item.from && item.to">
              <span class="text-[#1A1F23] font-medium !mr-[7px]">{{ item.from }}</span>
              <svg width="11" height="12" viewBox="0 0 11 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M0.667969 4.72792H10.0013L6.10825 1.33398" stroke="#1A1F23" stroke-linecap="round"
                      stroke-linejoin="round"/>
                <path d="M10 7.27305L0.666668 7.27305L4.55972 10.667" stroke="#1A1F23" stroke-linecap="round"
                      stroke-linejoin="round"/>
              </svg>
              <span class="text-[#1A1F23] font-medium !ml-[7px]">{{ item.to }}</span>
            </div>

            <span v-else class="text-[#1A1F23] font-medium">{{ item.from }}</span>
          </div>

          <span class="text-[#292D324D] text-[12px] font-light">{{ item.created_at }}</span>
        </div>
      </div>
    </div>

    <ModalAnnouncement v-model="visible"/>
  </div>
</template>

<style lang="scss">
.custom-placeholder-select .p-placeholder {
  font-size: 14px !important;
  color: #292D324D !important;
}


.p-autocomplete-input::placeholder {
  color: #292D3233 !important;

}

.p-autocomplete-input {
  background-image: url("../../../../node_modules/primeicons/raw-svg/search.svg") !important;
  background-size: 1.5em !important;
  background-color: #F3F3F3 !important;
  background-position: left 10px top 17px !important;
  background-repeat: no-repeat !important;
  text-indent: 30px !important;
  padding: 16px !important;
  border-radius: 16px !important;
  border: none !important;
  width: 350px;
}

.p-select {
  position: static!important;
}
</style>