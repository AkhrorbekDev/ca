<script setup lang="ts">
import {Menu, services, Truck} from '@/components/fakeJson'
import {onMounted, onUnmounted, ref, watchEffect} from "vue";
import {useRouter, useRoute} from "vue-router";
import {useCommonStore} from "@/stores/common.store"

const store = useCommonStore()

interface MenuItems {
  title: string;
  children?: MenuItems[];
  isOpen?: boolean,
  img?: string
  route?: string
}

const route = useRoute()
const router = useRouter()

const menuVisible = ref(false);

const toggleMenu = () => {
  menuVisible.value = !menuVisible.value;
};

const menuItems = ref<MenuItems[]>([
  {
    title: 'Xizmatlar',
    isOpen: false,
    children: services
  },
  {
    title: 'E’lonlar',
    route: '/announcement'
  },
  {
    title: "Transport e'lonlari",
    isOpen: false,
    children: Menu
  },
])
const currentIndex = ref<number | null>(null)


onMounted(() => closeMenu())

onUnmounted(() => closeMenu())


const closeMenu = () => {
  document.body.addEventListener("click", () => {
    menuItems.value.forEach((e) => {
      e.isOpen = false

      // currentIndex.value = 0
      //  e.children.forEach((val) => {
      //    val.isDetail = false
      //  })
    })
  });
}

const openChildMenu = (index: number, item: MenuItems) => {
  if (item.route) {
    router.push(item.route)
  }
  currentIndex.value = index
  if (index !== 0 && route.name !== 'service-detail') {
    store.activeService = {}
  }
  menuItems.value.forEach((item, i) => {
    if (item.children) {
      item.isOpen = i === index ? !item.isOpen : false;
    }
  });
};

const openDetail = (value: any, item: any) => {
  if (item.route) {
    store.activeService = item
    menuItems.value.forEach((e) => e.isOpen = false)
    router.push({name: item.route, params: {type: item.unique}})
  }
  if (item.child) {

    value.isDetail = !value.isDetail

  }
};

const handleClickCard = (item: any) => {
  if (item.route) {
    menuItems.value.forEach((e) => e.isOpen = false)
    router.push(`${item.route}/${item.id}`)
  }
}


watchEffect(() => {
  currentIndex.value = route.name == 'announcement' && 1
})
</script>

<template>
  <div class="fixed top-[24px] !px-[24px] w-full">
    <div class="bg-[#FFFFFF] rounded-[100px] flex1 !shadow-header !py-[12px] !px-[32px]">
      <router-link to="/">
        <img class="!mr-[45px]" src="@/assets/logo.svg" alt="logo" width="130"/>
      </router-link>

      <div class="hidden md:block">
        <div class="bg-[#1A1F23] !px-[5px] !py-[4px] flex1 rounded-[50px]">
          <div v-for="(list, index2) in menuItems"
               :key="index2"
               class="flex1 group text relative"
               :class="{'bg-white activeClass' : list.isOpen || (currentIndex === index2 && list.route)}"
               @click.stop="openChildMenu(index2, list)"
          >
            <div class="flex1">
              <span :class="list.isOpen ? 'text-[#000]' : ''">{{ list.title }} <span
                  v-if="list.title == 'Xizmatlar' && (route.name == 'service-detail' || route.name == 'transport-rental' || route.name == 'transport-repair-room-id-id2' || route.name == 'transport-repair-rooms-id' || route.name == 'service-keeping'  || route.name == 'transport-repair'  || route.name == 'transport-rental-service-id'  || route.name == 'transport-rental-service-id-id2')">({{
                  store.activeService && store.activeService.title
                }})</span>
              </span>
              <svg v-if="list.children" width="25" height="24" viewBox="0 0 25 24" fill="none"
                   xmlns="http://www.w3.org/2000/svg">
                <path d="M17.75 9.5L12.75 14.5L7.75 9.5" :class="list.isOpen ? 'stroke-black' : 'stroke-white'"
                      stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </div>


            <!--dropdown 1-->
            <div class="mega-drop-menu" v-if="list.isOpen && list.children">
              <!--              <span class="text-black">{{ list.children }}</span>-->
              <div class="grid grid-cols-2 gap-3">
                <div class="cards card-wrap"
                     v-for="(item, index) in list.children"
                     :class="currentIndex == 0 && item.unique && store.activeService.unique && store.activeService.unique == item.unique ? 'menu-active !bg-[#66C61C] text-[#fff]' : ''"
                     :key="index"
                     @click.stop="openDetail(list, item)"
                >
                  <img :src="item.img" class="!m-auto swg !my-0 w-[40px] h-[40px]" alt="#"/>
                  <p class="text-gray-900">{{ item.title }}</p>
                </div>
              </div>
            </div>

            <!--dropdown 2-->
            <div class="mega-drop-menu" @click.stop v-if="list.children && currentIndex === index2 && list.isDetail">
              <div class="grid grid-cols-2 gap-3">
                <div class="cards"
                     v-for="(item, index) in Truck"
                     :key="index"
                     @click="handleClickCard(item)"
                >
                  <img :src="item.img" v-if="item.img" class="!m-auto !my-0" alt="#"/>
                  <h4 class="text-[#292D32] text-[14px]">{{ item.title }}</h4>
                  <p class="text-gray-900">{{ item.subTitle }}</p>
                </div>
              </div>
              <button @click="list.isDetail = false"
                      class="text-[#000000] text-[16px] flex items-center gap-2 !py-[8px] !px-[16px] bg-white rounded-[100px] !mx-auto !mt-4">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                      d="M9.57141 18.8201C9.38141 18.8201 9.19141 18.7501 9.04141 18.6001L2.97141 12.5301C2.68141 12.2401 2.68141 11.7601 2.97141 11.4701L9.04141 5.40012C9.33141 5.11012 9.81141 5.11012 10.1014 5.40012C10.3914 5.69012 10.3914 6.17012 10.1014 6.46012L4.56141 12.0001L10.1014 17.5401C10.3914 17.8301 10.3914 18.3101 10.1014 18.6001C9.96141 18.7501 9.76141 18.8201 9.57141 18.8201Z"
                      fill="#292D32"/>
                  <path
                      d="M20.5019 12.75H3.67188C3.26188 12.75 2.92188 12.41 2.92188 12C2.92188 11.59 3.26188 11.25 3.67188 11.25H20.5019C20.9119 11.25 21.2519 11.59 21.2519 12C21.2519 12.41 20.9119 12.75 20.5019 12.75Z"
                      fill="#292D32"/>
                </svg>
                Ortga
              </button>

            </div>
          </div>
        </div>
      </div>

      <div class="flex items-center relative z-50">
        <h4 class="text-[#292D3266] text-[18px] !mr-[18px]">Asror</h4>
        <img @click="toggleMenu" src="@/assets/images/avatar.jpg" alt="avatar"
             class="h-[40px] w-[40px] !rounded-full cursor-pointer"/>

        <div v-if="menuVisible"
             class="bg-white rounded-[24px] !p-[16px] absolute z-50 top-[180%] right-[-30px] w-[300px]">
          <div class="flex flex-col items-center">
            <img src="@/assets/images/avatar.jpg" alt="avatar" class="h-[40px] w-[40px] !rounded-full !mb-[8px]"/>

            <h3 class="font-medium text-[#292D32] text-[24px]">Asror Imomqulov</h3>

            <span class="text-[14px] text-[#292D324D]">+998 99 844 13 54</span>
          </div>

          <div class="!mt-[16px]">

            <div
                class="flex items-center justify-between rounded-[16px] bg-[#FAFAFA] !py-[12px] !px-[16px] !mb-[8px] cursor-pointer">
              <div class="flex items-center gap-2">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                      d="M13.3986 7.64605C13.495 7.37724 13.88 7.37724 13.9764 7.64605L14.2401 8.38111C14.271 8.46715 14.3395 8.53484 14.4266 8.56533L15.1709 8.82579C15.443 8.92103 15.443 9.30119 15.1709 9.39644L14.4266 9.65689C14.3395 9.68738 14.271 9.75507 14.2401 9.84112L13.9764 10.5762C13.88 10.845 13.495 10.845 13.3986 10.5762L13.1349 9.84112C13.104 9.75507 13.0355 9.68738 12.9484 9.65689L12.2041 9.39644C11.932 9.30119 11.932 8.92103 12.2041 8.82579L12.9484 8.56533C13.0355 8.53484 13.104 8.46715 13.1349 8.38111L13.3986 7.64605Z"
                      fill="#BFC0C2"/>
                  <path
                      d="M16.3074 10.9122C16.3717 10.733 16.6283 10.733 16.6926 10.9122L16.8684 11.4022C16.889 11.4596 16.9347 11.5047 16.9928 11.525L17.4889 11.6987C17.6704 11.7622 17.6704 12.0156 17.4889 12.0791L16.9928 12.2527C16.9347 12.2731 16.889 12.3182 16.8684 12.3756L16.6926 12.8656C16.6283 13.0448 16.3717 13.0448 16.3074 12.8656L16.1316 12.3756C16.111 12.3182 16.0653 12.2731 16.0072 12.2527L15.5111 12.0791C15.3296 12.0156 15.3296 11.7622 15.5111 11.6987L16.0072 11.525C16.0653 11.5047 16.111 11.4596 16.1316 11.4022L16.3074 10.9122Z"
                      fill="#BFC0C2"/>
                  <path
                      d="M17.7693 3.29184C17.9089 2.90272 18.4661 2.90272 18.6057 3.29184L19.0842 4.62551C19.1288 4.75006 19.2281 4.84805 19.3542 4.89219L20.7045 5.36475C21.0985 5.50263 21.0985 6.05293 20.7045 6.19081L19.3542 6.66337C19.2281 6.7075 19.1288 6.80549 19.0842 6.93005L18.6057 8.26372C18.4661 8.65284 17.9089 8.65284 17.7693 8.26372L17.2908 6.93005C17.2462 6.80549 17.1469 6.7075 17.0208 6.66337L15.6705 6.19081C15.2765 6.05293 15.2765 5.50263 15.6705 5.36475L17.0208 4.89219C17.1469 4.84805 17.2462 4.75006 17.2908 4.62551L17.7693 3.29184Z"
                      fill="#BFC0C2"/>
                  <path
                      d="M3 13.4597C3 17.6241 6.4742 21 10.7598 21C14.0591 21 16.8774 18.9993 18 16.1783C17.1109 16.5841 16.1181 16.8109 15.0709 16.8109C11.2614 16.8109 8.17323 13.8101 8.17323 10.1084C8.17323 8.56025 8.71338 7.13471 9.62054 6C5.87502 6.5355 3 9.67132 3 13.4597Z"
                      stroke="#BFC0C2" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                <span class="text-[#292D32]">Mavzu</span>
              </div>


              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M6.33464 4.66658L9.66797 7.99992L6.33464 11.3333" stroke="#292D32" stroke-opacity="0.3"
                      stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </div>


            <div
                class="flex items-center justify-between rounded-[16px] bg-[#FAFAFA] !py-[12px] !px-[16px] !mb-[8px] cursor-pointer">
              <div class="flex items-center gap-2">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M4 5H11" stroke="#BFC0C2" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M9 3V5C9 9.418 6.761 13 4 13" stroke="#BFC0C2" stroke-width="1.5" stroke-linecap="round"
                        stroke-linejoin="round"/>
                  <path d="M5 9C4.997 11.144 7.952 12.908 11.7 13" stroke="#BFC0C2" stroke-width="1.5"
                        stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M12 20L16 11L20 20" stroke="#BFC0C2" stroke-width="1.5" stroke-linecap="round"
                        stroke-linejoin="round"/>
                  <path d="M19.0984 18H12.8984" stroke="#BFC0C2" stroke-width="1.5" stroke-linecap="round"
                        stroke-linejoin="round"/>
                </svg>

                <span class="text-[#292D32]">Til</span>
              </div>


              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M6.33464 4.66658L9.66797 7.99992L6.33464 11.3333" stroke="#292D32" stroke-opacity="0.3"
                      stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </div>

            <div
                class="flex items-center justify-between rounded-[16px] bg-[#FAFAFA] !py-[12px] !px-[16px] cursor-pointer">
              <div class="flex items-center gap-2">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                      d="M18.6363 18.364C17.3553 19.6226 15.7232 20.4798 13.9464 20.8271C12.1697 21.1743 10.328 20.9961 8.65432 20.3149C6.98064 19.6337 5.55012 18.4802 4.54366 17.0001C3.5372 15.5201 3 13.78 3 12C3 10.22 3.53719 8.47992 4.54365 6.99988C5.55011 5.51983 6.98063 4.36628 8.6543 3.68509C10.328 3.0039 12.1697 2.82567 13.9464 3.17293C15.7232 3.5202 17.3553 4.37736 18.6362 5.63603M21 12L16.2725 12"
                      stroke="#F04438" stroke-width="1.5" stroke-linecap="round"/>
                </svg>


                <span class="text-[#292D32]">Chiqish</span>
              </div>


              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M6.33464 4.66658L9.66797 7.99992L6.33464 11.3333" stroke="#292D32" stroke-opacity="0.3"
                      stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </div>

          </div>
        </div>
      </div>


    </div>
  </div>
</template>

<style lang="scss">
.activeClass {
  background-color: #fff;

  span {
    color: #000;
  }

  svg path {
    stroke: #2d2b32 !important;
  }
}

.flex1 {
  @apply flex items-center justify-between;

  span {
    user-select: none;
  }
}

.text {
  @apply text-[#FFFFFF] text-[18px] font-medium cursor-pointer !py-[11px] !px-[16px] rounded-[50px];
}

.text:hover {
  background-color: #fff;
  transition: all .3s;

  span {
    color: #292D32;
  }

  svg path {
    stroke: #2d2b32 !important;
  }
}

.group {
  margin-right: 32px;

  &:last-child {
    margin-right: 0;
  }
}

.mega-drop-menu {
  @apply absolute top-[80px] right-0 !p-[16px] bg-[#FAFAFA] w-[359px] rounded-[24px];
  box-shadow: 0 32px 100px 0 #292D3229;

  .cards {
    @apply w-[157px] h-[112px] p-[14px] bg-white rounded-[20px] text-center flex flex-col items-center justify-center;
    box-shadow: 0 2px 8.4px 0 #292D3214;

    p {
      @apply text-[#292D3266] text-[12px];
    }
  }

  .card-wrap:hover {
    @apply bg-[#66C61C];

    .swg {
      filter: brightness(13.5);
    }

    p {
      @apply text-[#fff];
    }
  }
}

.menu-active {
  background-color: #66C61C !important;

  .swg {
    filter: brightness(13.5);
  }

}

.menu-active p {
  color: white !important;
}
</style>