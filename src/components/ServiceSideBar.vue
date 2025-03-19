<script setup lang="ts">
import {Menu, services} from '@/components/fakeJson'
import {inject, onMounted, onUnmounted, ref, watch} from 'vue';
import {useRoute, useRouter} from 'vue-router';
import {useCommonStore} from '@/stores/common.store'
import useMapStore from '@/stores/map.store'
import useAdvertisementStore from '@/stores/advertisement';
import PeregonForm from '@/components/forms/PeregonForm.vue';
import ShippingForm from '@/components/forms/ShippingForm.vue';
import OilShippingForm from '@/components/forms/OilShippingForm.vue';
import PersonTransferForm from '@/components/forms/PersonTransferForm.vue';
import TransportTransferForm from '@/components/forms/TransportTransferForm.vue';
import SpecialTransportRentForm from '@/components/forms/SpecialTransportRentForm.vue';
import car from '@/assets/icons/car.svg'
import box from '@/assets/icons/box.svg'
import home from '@/assets/icons/home.svg'
import SidebarTransportsGrid from '@/components/SidebarTransportsGrid.vue';
import useBreadcrumbs from '@/stores/breadcrumbs'
import AutoRepair from '@/components/forms/AutoRepair.vue';
import ConfirmDialog from 'primevue/confirmdialog';
import {useConfirm} from 'primevue/useconfirm';
import {useI18n} from 'vue-i18n'

const {t} = useI18n()

const store = useCommonStore()
const mapStore = useMapStore()
const advStore = useAdvertisementStore()
const breadcrumbStore = useBreadcrumbs()

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
    title: t('services'),
    unique: 'service-detail',
    isOpen: false,
    icon: home,
    children: services
  },
  {
    title: t('announcements'),
    unique: 'announcement',
    icon: box,
    route: '/announcement'
  },
  {
    title: t('transportAnnouncements'),
    unique: 'transportAdv',
    isOpen: false,
    icon: car,
    children: Menu
  },
])
const selectedMenu = ref<MenuItems | null>(null)
const selectedService = ref(null)
const showTransportGrid = ref(false)
const showAutoRepairGrid = ref(false)
const transports = ref([])
const activeRouteName = ref('')


onMounted(() => closeMenu())

onUnmounted(() => closeMenu())

const changeRouteRepair = (item) => {
  showAutoRepairGrid.value = false
  showTransportGrid.value = false
  selectedService.value = null
  selectedMenu.value = null
  menuVisible.value = false
  showForm.value = false
}

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
      id: selectedService.value.id,
      transport_id: item.id

    },
    query: {}
  })
  showTransportGrid.value = false
  selectedService.value = null
  selectedMenu.value = null
  menuVisible.value = false
  showForm.value = false

}
const closeMenu = () => {
  document.body.addEventListener('click', () => {
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

watch(() => route.name, async () => {
  if (route.name === menuItems.value[0].unique) {
    selectedMenu.value = menuItems.value[0]
    selectedService.value = selectedMenu.value.children.find(item => item.unique === route.params.type)
    menuVisible.value = true
    showForm.value = true
    activeRouteName.value = selectedMenu.value.unique
  } else if (route.name === menuItems.value[1].unique) {
    menuVisible.value = false
    showForm.value = false
    showTransportGrid.value = false
    selectedService.value = null
    activeRouteName.value = menuItems.value[1].unique
  } else if (route.name === 'transport-id') {
    activeRouteName.value = menuItems.value[2].unique
  }
  console.log(route.name, 'route.name')

}, {
  immediate: true
})


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
    menuVisible.value = !menuVisible.value
    showForm.value = false
    showTransportGrid.value = false
    showAutoRepairGrid.value = false
    return
  }
  selectedMenu.value = item
  activeRouteName.value = selectedMenu.value.unique

  if (item.route) {
    router.push(item.route)
    menuVisible.value = false
    showForm.value = false
    showTransportGrid.value = false
    showAutoRepairGrid.value = false
    selectedMenu.value = null
    return
  }
  showForm.value = false
  showTransportGrid.value = false
  showAutoRepairGrid.value = false
  mapStore.clearMarkers()
  menuVisible.value = !!item.children;

};
const confirm = useConfirm();
const showConfirmModal = () => {
  confirm.require({
    group: 'auth',
    message: 'Bu amal avtorizatsiya talab etadi',
    header: 'Avtorizatsiya',
    icon: 'pi pi-exclamation-triangle',
    rejectProps: {
      label: 'Bekor qilish',
      severity: 'secondary',
      outlined: true
    },
    acceptProps: {
      label: t('register')
    },
    accept: () => {
      router.push({
        name: 'login'
      })
    }
  });
}
const openDetail = (value: any, item: any) => {
  showTransportGrid.value = false
  if (selectedService.value && selectedService.value.id === item.id) {
    showForm.value = false
    selectedService.value = null
    return
  }
  selectedService.value = item
  if (item.id === 7) {
    menuVisible.value = false
    showForm.value = false
    selectedMenu.value = null
    changeRoute(item)
    return
  }

  if (item.id === 5) {
    showForm.value = false
    showTransportGrid.value = false
    showAutoRepairGrid.value = true
    return
  } else {
    showAutoRepairGrid.value = false
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
  // if (route.params.type) {
  //   if (route.name === menuItems.value[0].unique) {
  //     selectedMenu.value = menuItems.value[0]
  //     selectedService.value = selectedMenu.value.children.find(item => item.unique === route.params.type)
  //     activeRouteName.value = selectedMenu.value.unique
  //   } else if (route.name === menuItems.value[2].unique) {
  //     selectedMenu.value = menuItems.value[2]
  //     selectedService.value = selectedMenu.value.children.find(item => item.unique === route.params.type)
  //     activeRouteName.value = selectedMenu.value.unique
  //   }
  //   menuVisible.value = true
  //   showForm.value = true
  // }
  console.log(activeRouteName.value, route.params, 'asd')
})


</script>

<template>
  <div
      class="bg-[#FFFFFF] h-[100vh] sticky top-0 left-0 bottom-0"
      :class="{
          'rounded-r-[32px] !shadow-header': !menuVisible
       }"
  >
    <div class="navbar-items relative h-[100vh] dark:!bg-zinc-800 max-w-max ">
      <ConfirmDialog group="headless"/>
      <div class="navbar-items__menu dark:!bg-transparent !py-[16px] !mx-[12px]">
        <router-link to="/">
          <img class="!mb-[40px] !mt-[10px]" src="@/assets/icons/logo-new.svg" alt="logo" width="130"/>
        </router-link>
        <div class="navbar-items__menu-items dark:!bg-transparent">
          <div
              v-for="(list, index2) in menuItems"
              :key="index2"
              class="navbar-items__menu-item dark:!bg-transparent"
              :class="{_active: activeRouteName === list.unique}"
              @click.stop="openChildMenu(index2, list)"
          >
            <div class="navbar-items__menu-item-image dark:!bg-transparent">
              <img :src="list.icon" alt="">
            </div>
            <p
                class="navbar-items__menu-item-text dark:!text-white"
                :class="{'text-[#66C61C]' : activeRouteName === list.unique}"
            >
              {{ list.title }}
            </p>
          </div>
        </div>
      </div>
      <div
          class="navbar-items subitems absolute top-0 bottom-0 left-full bg-[#FFFFFF] dark:!bg-zinc-800 pr-[24px] h-[100vh] rounded-r-[32px] !transition-all"
          :class="{
        '_active-subitems': menuVisible,
      }"
      >
        <div class="navbar-items__divider"/>

        <div class="navbar-items__menu service-items !py-[16px] !mx-[12px] dark:!bg-transparent">
          <div class="navbar-items__menu-items dark:!bg-transparent">
            <div
                v-for="(list, index2) in selectedMenu?.children"
                :key="index2"
                class="navbar-items__menu-item !px-[12px] !py-[14px] dark:!bg-transparent"
                :class="{_activeServiceItem: selectedService && selectedService.id === list.id}"
                @click="openDetail(selectedMenu, list)"
            >
              <div class="navbar-items__menu-item-image dark:!bg-transparent">
                <img :src="list.img" alt="">
              </div>
              <div
                  class="navbar-items__menu-item-text dark:!bg-transparent"
                  :class="{'!text-[#66C61C]' : selectedService && selectedService.id === list.id}"
              >
                {{ $t(list.title) }}
              </div>
            </div>
          </div>
        </div>
        <ShippingForm
            v-if="selectedService && (selectedService.id === 1 || selectedService.id === 9)"
            :service-type-id="selectedService.id"
            :show="showForm"
            @auth:invalid="showConfirmModal"
        />
        <!--        <DeliveryForm v-if="selectedService && selectedService.id === 123" :service-type-id="selectedService.id"-->
        <!--                      :show="showForm"/>-->
        <PeregonForm
            v-if="selectedService && selectedService.id === 10"
            :service-type-id="selectedService.id"
            :show="showForm"
            @auth:invalid="showConfirmModal"
        />
        <OilShippingForm
            v-if="selectedService && selectedService.id === 8"
            :service-type-id="selectedService.id"
            :show="showForm"
            @auth:invalid="showConfirmModal"
        />
        <PersonTransferForm
            v-if="selectedService && selectedService.id === 2"
            :service-type-id="selectedService.id"
            :show="showForm"
            @auth:invalid="showConfirmModal"
        />
        <TransportTransferForm
            v-if="selectedService && selectedService.id === 6"
            :service-type-id="selectedService.id"
            :show="showForm"
            @auth:invalid="showConfirmModal"
        />
        <SpecialTransportRentForm
            v-if="selectedService && selectedService.id === 3"
            :service-type-id="selectedService.id"
            :show="showForm"
            @auth:invalid="showConfirmModal"
        />

        <SidebarTransportsGrid
            v-if="showTransportGrid"
            :service-id="selectedService?.id"
            :loading="isLoadingTransports"
            :transports="transports"
            @on:click="changeRoute"
            @auth:invalid="showConfirmModal"
        />
        <AutoRepair
            v-if="showAutoRepairGrid"
            :service="selectedService"
            :service-id="selectedService?.id"
            :loading="isLoadingTransports"
            :transports="transports"
            @on:click="changeRouteRepair"
            @auth:invalid="showConfirmModal"
        />
      </div>
    </div>

  </div>
</template>

<style lang="scss">

._invalid {
  border: 1px solid #EA5455 !important;
  border-radius: 24px;

  .p-inputtext {
    border-color: #EA5455 !important;

  }
}

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
    width: 76px;
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
        word-break: break-word;
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
