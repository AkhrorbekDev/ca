<script setup lang="ts">
import {Menu, services} from '@/components/fakeJson'
import {inject, onMounted, onUnmounted, ref} from "vue";
import {useRoute, useRouter} from "vue-router";
import {useCommonStore} from "@/stores/common.store"
import useMapStore from '@/stores/map.store'
import DeliveryForm from "@/components/forms/DeliveryForm.vue";
import useAdvertisementStore from "@/stores/advertisement";
import PeregonForm from "@/components/forms/PeregonForm.vue";
import ShippingForm from "@/components/forms/ShippingForm.vue";
import OilShippingForm from "@/components/forms/OilShippingForm.vue";
import PersonTransferForm from "@/components/forms/PersonTransferForm.vue";
import TransportTransferForm from "@/components/forms/TransportTransferForm.vue";
import SpecialTransportRentForm from "@/components/forms/SpecialTransportRentForm.vue";
import car from '@/assets/icons/car.svg'
import box from '@/assets/icons/box.svg'
import home from '@/assets/icons/home.svg'
import SidebarTransportsGrid from "@/components/SidebarTransportsGrid.vue";

const store = useCommonStore()
const mapStore = useMapStore()
const advStore = useAdvertisementStore()

interface MenuItems {
  title: string;
  children?: MenuItems[];
  isOpen?: boolean,
  img?: string
  route?: string
}

const route = useRoute()
const router = useRouter()
const extraMenu = ref(false)
const $api = inject('api')

const menuVisible = ref(false);
const showForm = ref(false);
const toggleMenu = () => {
  menuVisible.value = !menuVisible.value;
};

const menuItems = ref<MenuItems[]>([
  {
    title: 'Xizmatlar',
    unique: 'service-detail',
    isOpen: false,
    icon: home,
    children: services
  },
  {
    title: 'E’lonlar',
    unique: 'adv',
    icon: box,
    route: '/announcement'
  },
  {
    title: "Transport e'lonlari",
    unique: 'transportAdv',
    isOpen: false,
    icon: car,
    children: Menu
  },
])
const selectedMenu = ref<MenuItems | null>(null)
const selectedService = ref(null)
const showTransportGrid = ref(false)
const transports = ref([])


onMounted(() => closeMenu())

onUnmounted(() => closeMenu())

const changeRoute = (item) => {

  if (selectedService.value.id === 7) {
    router.push({
      name: item.route,
      params: {
        id: item.id
      }
    })
    return
  }
  router.replace({
    name: 'transport-id',
    params: {
      id: item.id
    }
  })
  showTransportGrid.value = false
  selectedService.value = null
  selectedMenu.value = null
  menuVisible.value = false
  showForm.value = false

}
const closeMenu = () => {
  document.body.addEventListener("click", () => {
    menuItems.value.forEach((e) => {
      e.isOpen = false
    })
  });
}

const handleClickCard = (item: any) => {
  if (item.route) {
    menuItems.value.forEach((e) => e.isOpen = false)
    router.push(`/${item.id}`)
  }
}

const isLoadingTransports = ref(false)
const getTransports = serviceId => {
  isLoadingTransports.value = true
  showTransportGrid.value = true
  if (serviceId === 4) {
    $api.transport.getCars(serviceId).then(res => {
      transports.value = res.data
    })
        .finally(() => {
          isLoadingTransports.value = false
        })

    return
  }
  $api.transport.getTransportByServiceId(serviceId)
      .then(res => {
        transports.value = res.data
      })
      .finally(() => {
        isLoadingTransports.value = false
      })
}

const openChildMenu = (index: number, item: MenuItems) => {
  if (selectedMenu.value && item.unique === selectedMenu.value.unique) {
    menuVisible.value = false
    showForm.value = false
    showTransportGrid.value = false
    selectedMenu.value = null
    return
  } else {
    selectedMenu.value = item
    showForm.value = false
    showTransportGrid.value = false
  }

  if (item.route) {
    router.push(item.route)
    selectedService.value = null
    menuVisible.value = false
    return
  }
  mapStore.clearMarkers()
  menuVisible.value = !!item.children;

};

const openDetail = (value: any, item: any) => {
  selectedService.value = item
  showTransportGrid.value = false
  if (item.id === 7) {
    menuVisible.value = false
    showForm.value = false
    selectedMenu.value = null
    changeRoute(item)
    return
  }
  if (item.route) {
    router.push({name: item.route, params: {type: item.unique}})
  }
  if (selectedMenu.value.unique !== 'transportAdv' && item.id !== 4) {
    mapStore.clearMarkers()
    showForm.value = true
  } else {
    getTransports(item.id)
  }

};

onMounted(() => {
  if (route.params.type) {
    if (route.name === menuItems.value[0].unique) {
      selectedMenu.value = menuItems.value[0]
      selectedService.value = selectedMenu.value.children.find(item => item.unique === route.params.type)
    }/* else if (route.name === menuItems.value[2].unique) {
      selectedMenu.value = menuItems.value[2]
      selectedService.value = selectedMenu.value.children.find(item => item.unique === route.params.type)
    }*/
    menuVisible.value = true
    showForm.value = true
  }
})


</script>

<template>
  <div class="bg-[#FFFFFF] h-[100vh] sticky top-0 left-0 bottom-0"
       :class="{
          'rounded-r-[32px] !shadow-header': !menuVisible
       }">
    <div class="navbar-items relative h-[100vh]  max-w-max ">
      <div class="navbar-items__menu  !py-[16px] !px-[12px] !mx-[12px]">
        <router-link to="/">
          <img class="!mb-[40px] !mt-[10px]" src="@/assets/icons/logo-new.svg" alt="logo" width="130"/>
        </router-link>
        <div class="navbar-items__menu-items">
          <div v-for="(list, index2) in menuItems" :key="index2" class="navbar-items__menu-item"
               :class="{_active: selectedMenu && selectedMenu.unique === list.unique}"
               @click.stop="openChildMenu(index2, list)"
          >
            <div class="navbar-items__menu-item-image">
              <img :src="list.icon" alt="">
            </div>
            <div class="navbar-items__menu-item-text"
                 :class="{'!text-[#66C61C]' : selectedMenu && selectedMenu.unique === list.unique}"
            >
              {{ list.title }}
            </div>
          </div>
        </div>
      </div>
      <div
          class="navbar-items subitems absolute top-0 bottom-0 left-full bg-[#FFFFFF] pr-[24px] h-[100vh] rounded-r-[32px] !transition-all"
          :class="{
        '_active-subitems': menuVisible,
      }"
      >
        <div class="navbar-items__divider"/>

        <div class="navbar-items__menu service-items !py-[16px] !mx-[12px]">
          <div class="navbar-items__menu-items">
            <div v-for="(list, index2) in selectedMenu?.children" :key="index2"
                 class="navbar-items__menu-item !px-[12px] !py-[14px]"
                 :class="{_activeServiceItem: selectedService && selectedService.id === list.id}"
                 @click="openDetail(selectedMenu, list)"
            >
              <div class="navbar-items__menu-item-image">
                <img :src="list.img" alt="">
              </div>
              <div class="navbar-items__menu-item-text"
                   :class="{'!text-[#66C61C]' : selectedService && selectedService.id === list.id}"
              >
                {{ list.title }}
              </div>
            </div>
          </div>
        </div>
        <ShippingForm v-if="selectedService && (selectedService.id === 1 || selectedService.id === 9)"
                      :service-type-id="selectedService.id"
                      :show="showForm"/>
        <DeliveryForm v-if="selectedService && selectedService.id === 123" :service-type-id="selectedService.id"
                      :show="showForm"/>
        <PeregonForm v-if="selectedService && selectedService.id === 10" :service-type-id="selectedService.id"
                     :show="showForm"/>
        <OilShippingForm v-if="selectedService && selectedService.id === 8" :service-type-id="selectedService.id"
                         :show="showForm"/>
        <PersonTransferForm v-if="selectedService && selectedService.id === 2" :service-type-id="selectedService.id"
                            :show="showForm"/>
        <TransportTransferForm v-if="selectedService && selectedService.id === 6" :service-type-id="selectedService.id"
                               :show="showForm"/>
        <SpecialTransportRentForm v-if="selectedService && selectedService.id === 3"
                                  :service-type-id="selectedService.id"
                                  :show="showForm"/>

        <SidebarTransportsGrid v-if="showTransportGrid" :service-id="selectedService?.id" :loading="isLoadingTransports"
                               :transports="transports"
                               @on:click="changeRoute"></SidebarTransportsGrid>
      </div>
    </div>
  </div>
</template>

<style lang="scss">

.navbar-items {
  display: flex;
  align-items: flex-start;
  height: 100%;

  &__divider {
    width: 1px;
    height: 100%;
    background-color: #C2C2C233;
  }

  &.subitems {
    visibility: hidden;
    width: 0;
    padding: 0 !important;

    &._active-subitems {
      visibility: visible;
      width: auto;
      padding-right: 16px !important;
    }
  }

  &__menu {
    width: 64px;
    height: 100%;
    overflow: hidden auto;

    &::-webkit-scrollbar {
      background: transparent;
      width: 5px;
    }

    &::-webkit-scrollbar-thumb {
      background: #e5e7eb !important;
      border: 0;
      border-radius: 16px;
      outline: none;
    }


    &.service-items {
      width: 80px;


      .navbar-items__menu-item {
        min-height: 90px;
      }

      ::-webkit-scrollbar {
        display: none;
      }
    }

    &-items {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 24px;

    }

    &-item {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      width: 100%;
      min-height: 64px;
      row-gap: 8px;
      filter: contrast(0);
      cursor: pointer;

      &._activeServiceItem {
        filter: unset;
      }

      &._active {
        filter: unset;
      }

      &-image {
        width: 24px;
        height: 24px;

        img {
          width: 100%;
          height: 100%;
        }
      }

      &-text {
        font-size: 12px;
        line-height: 16px;
        color: #292D32;
        text-align: center;
      }

    }

  }

  &__form {
    height: 100%;
    position: relative;
    visibility: hidden;
    width: 0;
    min-width: 0 !important;

    &._form-active {
      visibility: visible;
      width: max-content;
    }


  }
}

.geo-icon {
  width: 40px;
  height: 40px;
  border-radius: 12px;
  padding: 8px;
  background: #66C61C;

}

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
  @apply absolute top-[80px] left-[-50px] p-[16px] bg-[#FAFAFA] w-[359px] rounded-[24px];
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
