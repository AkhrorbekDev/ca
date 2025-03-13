<script setup lang="ts">
import ModalAnnouncement from "@/pages/Services/Announcement/components/ModalAnnouncement.vue";
import AddAnnouncementModal from "@/pages/Services/Announcement/components/AddAnnouncementModal.vue";
import {announcement} from "@/pages/Services/Announcement/constants";
import {inject, nextTick, onMounted, onUnmounted, ref} from 'vue';
import {AnnouncementType} from "@/pages/Services/Announcement/announcement.types";
import {useRoute, useRouter} from "vue-router";
import { set } from "@vueuse/core";

const router = useRouter();
const route = useRoute()
const visible = ref(false);
const visible2 = ref(false);
const visible2Data = ref<any>({});
const childMenu = ref<any[]>([]);
const menuVisible = ref<boolean>(false);
const selectedAnnouncement = ref<any>(null);
const isLoading = ref(false);
const announcementAllData = ref<any[]>([]);
const activeTab = ref(0);
const tabs = ['Barchasi', 'Mening buyurtmalarim', 'Mening xizmatlarim'];

const $api = inject('api'); // Ensure $api is injected

// Fetch data for a specific announcement by ID
const fetchDataForAnnouncement = async (id: number) => {
  isLoading.value = true;
  if (id) {
    try {
      const response = await $api.transport.getTransportByServiceId(id);
      return response.data;
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      isLoading.value = false;
    }
  }
};

const dataTo = ref<any>();
// Handle menu item click
const openDetail = async (item: any) => {
  if (item?.id) {
    const data = await fetchDataForAnnouncement(item?.id); // Fetch new data
    if (data && data.length > 0) {
      item.child = data.map(child => ({...child, parentId: item.unique})); // Update the child property
      childMenu.value = data; // Set the childMenu for dropdown
      dataTo.value = { ...item, parentId: item.id }; // Set dataTo with the item's id
      // visible2.value = true; // Open the form

    } else {
      // If data is empty or null, set dataTo with the item's id and open the form
      dataTo.value = {...item, parentId: item.id};
      visible2.value = true;
      nextTick(() => {
        visible2Data.value = {...item, parentId: item.id};
      });
    }
  } else if (item.child && item.child.length > 0) {
    childMenu.value = item.child; // Use existing child data
    dataTo.value = {...item, parentId: item.id}; // Set dataTo with the item's id
  } else {
    // If no child data, set dataTo with the item's id and open the form
    dataTo.value = {...item, parentId: item.id};
    visible2.value = true;
    nextTick(() => {
      visible2Data.value = {...item, parentId: item.id};
    });
  }
};

// Handle child item click
const handleClickCard = (data: any) => {

  if (data.child && data.child.length > 0) {
    console.log('If Data', data);
    childMenu.value = data.child;
  } else {
    console.log('Else Data', data);
    visible2.value = true;
    nextTick(() => {
      visible2Data.value = {...data, parentId: data.parentId};
    });
  }
};

// Close the dropdown menu
const closeMenu = () => {
  document.body.addEventListener('click', () => {
    menuVisible.value = false;
  });
};

const loadingAnnouncement = ref(true);
// Fetch all announcements
const fetchAnnouncements = async () => {
  try {
    loadingAnnouncement.value = true;
    let params: any = {};
    if (activeTab.value === 1) {
      params.adv_type = 'RECEIVE';
    } else if (activeTab.value === 2) {
      params.adv_type = 'PROVIDE';
    }
    const response = await $api.announcement.getAnnouncement(params);
    
    setTimeout(() => {
      announcementAllData.value = response?.data;
      loadingAnnouncement.value = false;
    }, 1000);

  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

// Change active tab
const changeTab = (index: number) => {
  activeTab.value = index;
  fetchAnnouncements();
};

// Open modal with selected announcement
const openModal = (item: any) => {
  selectedAnnouncement.value = item;
  visible.value = true;
};

// Toggle menu visibility
const toggleMenu = () => {
  if (activeTab.value === 1) {
    return router.push({path: 'services'});
  }
  menuVisible.value = !menuVisible.value;
};

const getServicesData = ref<any[]>([]);
onMounted(async () => {
  try {
    const response = await $api.services.getServices();
    getServicesData.value = response.data;
  } catch (error) {
    console.error('Error fetching services:', error);
  }
});

onMounted(() => {
  closeMenu();
  fetchAnnouncements();
});

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
            @click="changeTab(index)"
        >
          {{ tab }}
        </button>
      </div>

      <div class="flex items-center gap-4">
        <div class="relative">
          <button
              @click.stop="toggleMenu"
              v-if="activeTab == 1 || activeTab == 2"
              class="flex items-center gap-4 bg-[#66C61C] rounded-[16px] !p-[16px] text-white text-[16px] text-nowrap">
            <svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                  d="M3.85288 8.95043C4.50437 6.17301 6.67301 4.00437 9.45043 3.35288C11.4563 2.88237 13.5437 2.88237 15.5496 3.35288C18.327 4.00437 20.4956 6.17301 21.1471 8.95044C21.6176 10.9563 21.6176 13.0437 21.1471 15.0496C20.4956 17.827 18.327 19.9956 15.5496 20.6471C13.5437 21.1176 11.4563 21.1176 9.45044 20.6471C6.67301 19.9956 4.50437 17.827 3.85288 15.0496C3.38237 13.0437 3.38237 10.9563 3.85288 8.95043Z"
                  stroke="white" stroke-width="1.5"/>
              <path d="M15 12H10M12.5 14.5L12.5 9.5" stroke="white" stroke-width="1.5" stroke-linecap="round"/>
            </svg>
            E’lon joylash
          </button>

          <div v-if="menuVisible">
            <!--dropdown 1-->
            <div class="mega-drop-menu">
              <div class="grid grid-cols-2 gap-3">
                <div class="cards card-wrap cursor-pointer"
                     v-for="(item, index) in getServicesData"
                     :key="index"
                     @click.stop="openDetail(item, item?.id)"
                >
                  <img src="@/assets/images/icons/car.svg" class="!m-auto w-10 object-contain swg !my-0" alt="icon"/>
                  <p class="text-gray-900">{{ item.name }}</p>
                </div>
              </div>
            </div>

            <!--dropdown 2-->
            <div v-if="childMenu.length" class="mega-drop-menu !left-[185%]" @click.stop>
              <button @click="childMenu = []" class="text-[#000]">x</button>
              <div class="grid grid-cols-2 gap-3">
                <div class="cards cursor-pointer"
                     v-for="(item2, index) in childMenu"
                     :key="index"
                     @click="handleClickCard(item2, item2?.id)"
                >
                  <img v-if="item2.icon" :src="item2.icon" class="!m-auto !my-0 w-20 h-12 object-contain" alt="#"/>
                  <h4 class="text-[#292D32] text-[14px]">{{ item2.name }}</h4>
                  <p class="text-gray-900">{{ item2?.volume }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

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

      <div v-if="loadingAnnouncement" class="grid xl:grid-cols-5 grid-cols-4 gap-6 animate-pulse">
          <div v-for="item in 20" :key="item" class="h-32 bg-gray-200 rounded-3xl w-full mb-4"></div>
       
      </div>

      <div v-else class="grid xl:grid-cols-5 grid-cols-4 gap-6">
        <div class="bg-white rounded-[24px] !py-[7px] !px-[18px] cursor-pointer"
             v-for="(item) in announcementAllData"
             :key="item?.id" @click="openModal(item)">
          <div
              class="flex items-center"
              :class="activeTab !== 0 ? 'justify-between' : 'justify-center'"
          >
            <div
                v-if="activeTab !== 0"
                :class="['!px-[11px] !py-[4px] rounded-[50px] text-[10px] font-medium flex items-center gap-3', item.status ? 'bg-[#F0FAE9] text-[#66C61C]' : 'bg-[#FEEDEC] text-[#F04438]']">
              {{ item.status === 'ACTIVE' ? 'Faol' : 'Faol emas' }}
              <div v-if="!item.status && (activeTab == 1 || activeTab == 2)" class="flex items-center">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                      d="M10.7765 6.88856C8.63259 6.88856 6.88759 8.63356 6.88759 10.7775C6.88759 12.9213 8.63259 14.6663 10.7765 14.6663C12.9204 14.6663 14.6654 12.9213 14.6654 10.7775C14.6654 8.63356 12.9204 6.88856 10.7765 6.88856ZM10.7765 13.5552C9.24481 13.5552 7.9987 12.3091 7.9987 10.7775C7.9987 9.24579 9.24481 7.99967 10.7765 7.99967C12.3081 7.99967 13.5543 9.24579 13.5543 10.7775C13.5543 12.3091 12.3081 13.5552 10.7765 13.5552ZM11.332 10.5475L12.2804 11.4958L11.4948 12.2813L10.2209 11.0075V9.11079H11.332V10.5475ZM6.61981 13.5552H4.84759C4.56425 13.5552 4.32648 13.3425 4.29592 13.0608L3.36314 4.66634H11.502L11.3743 5.81634C11.7526 5.86134 12.1165 5.95079 12.4637 6.07523L12.6204 4.66634H13.5548V3.55523H10.2215V2.44412C10.2215 1.83134 9.72314 1.33301 9.11036 1.33301H5.77703C5.16425 1.33301 4.66592 1.83134 4.66592 2.44412V3.55523H1.33203V4.66634H2.24481L3.19148 13.1836C3.28536 14.0286 3.99703 14.6663 4.84759 14.6663H7.63703C7.24481 14.3491 6.90092 13.9752 6.61981 13.5552ZM5.77648 2.44412H9.10981V3.55523H5.77648V2.44412Z"
                      fill="#F04438"/>
                </svg>
                5 kun 12 soat
              </div>
            </div>

            <img v-if="item?.transport_icon" class="h-[50px] object-contain " :src="item?.transport_icon" alt="image"
                 height="50px">
          </div>

          <h5 class="text-[#292D324D] text-lg !mb-[4px] line-clamp-1">{{ item.service_name ?? '' }}</h5>

          <div class="!mb-[4px]">
            <div class="flex items-center">
              <span v-if="item.from_location?.name"
                    class="text-[#1A1F23] font-medium !mr-[7px] line-clamp-1">{{ item.from_location?.name }}</span>
              <svg v-if="item.from_location?.name && item.to_location?.name" width="11" height="12" viewBox="0 0 11 12"
                   fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M0.667969 4.72792H10.0013L6.10825 1.33398" stroke="#1A1F23" stroke-linecap="round"
                      stroke-linejoin="round"/>
                <path d="M10 7.27305L0.666668 7.27305L4.55972 10.667" stroke="#1A1F23" stroke-linecap="round"
                      stroke-linejoin="round"/>
              </svg>
              <span v-if="item.to_location?.name"
                    class="text-[#1A1F23] font-medium !ml-[7px] line-clamp-1">{{ item.to_location?.name }}</span>
            </div>
          </div>

          <span class="text-[#292D324D] text-[12px] font-light">{{ item?.shipment_date }}</span>
        </div>
      </div>
    </div>

    <ModalAnnouncement :announcement="selectedAnnouncement" v-model="visible" :tabIndex="activeTab"/>

    <AddAnnouncementModal :active-tab="activeTab" v-model="visible2" :announceValue="visible2Data" :data="dataTo"/>
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
  position: static !important;
}
</style>