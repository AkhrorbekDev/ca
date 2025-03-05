<script setup lang="ts">
import {Menu, services} from '@/components/fakeJson'
import {onMounted, onUnmounted, ref} from "vue";
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

const menuVisible = ref(false);
const showForm = ref(false);
const isLocationChanging = ref(false);
const formVisible = ref(false);
const value2 = ref('')
const toggleMenu = () => {
  menuVisible.value = !menuVisible.value;
};

const menuItems = ref<MenuItems[]>([
  {
    title: 'Xizmatlar',
    isOpen: false,
    icon: `<svg class="home" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <mask id="path-1-inside-1_1_1860" fill="white">
        <path d="M9.15722 20.7714V17.7047C9.1572 16.9246 9.79312 16.2908 10.581 16.2856H13.4671C14.2587 16.2856 14.9005 16.9209 14.9005 17.7047V20.7809C14.9003 21.4432 15.4343 21.9845 16.103 22H18.0271C19.9451 22 21.5 20.4607 21.5 18.5618V9.83784C21.4898 9.09083 21.1355 8.38935 20.538 7.93303L13.9577 2.6853C12.8049 1.77157 11.1662 1.77157 10.0134 2.6853L3.46203 7.94256C2.86226 8.39702 2.50739 9.09967 2.5 9.84736V18.5618C2.5 20.4607 4.05488 22 5.97291 22H7.89696C8.58235 22 9.13797 21.4499 9.13797 20.7714"/>
    </mask>
    <path d="M7.40722 20.7714C7.40722 21.7379 8.19072 22.5214 9.15722 22.5214C10.1237 22.5214 10.9072 21.7379 10.9072 20.7714H7.40722ZM9.15722 17.7047H10.9072V17.7046L9.15722 17.7047ZM10.581 16.2856V14.5356L10.5694 14.5356L10.581 16.2856ZM14.9005 20.7809L16.6505 20.7814V20.7809H14.9005ZM16.103 22L16.0624 23.7495C16.076 23.7498 16.0895 23.75 16.103 23.75V22ZM21.5 9.83784H23.25C23.25 9.82984 23.2499 9.82184 23.2498 9.81384L21.5 9.83784ZM20.538 7.93303L19.4468 9.30122C19.4564 9.30886 19.4661 9.31639 19.4758 9.32383L20.538 7.93303ZM13.9577 2.6853L15.0489 1.31711L15.0448 1.31386L13.9577 2.6853ZM10.0134 2.6853L8.92635 1.31384L8.91815 1.32042L10.0134 2.6853ZM3.46203 7.94256L4.51892 9.33736C4.53185 9.32756 4.54464 9.31759 4.55729 9.30744L3.46203 7.94256ZM2.5 9.84736L0.750085 9.83007C0.750028 9.83583 0.75 9.8416 0.75 9.84736H2.5ZM10.888 20.7714C10.888 19.8049 10.1045 19.0214 9.13797 19.0214C8.17148 19.0214 7.38797 19.8049 7.38797 20.7714H10.888ZM10.9072 20.7714V17.7047H7.40722V20.7714H10.9072ZM10.9072 17.7046C10.9072 17.903 10.7502 18.0345 10.5926 18.0356L10.5694 14.5356C8.836 14.5471 7.40718 15.9463 7.40722 17.7047L10.9072 17.7046ZM10.581 18.0356H13.4671V14.5356H10.581V18.0356ZM13.4671 18.0356C13.3089 18.0356 13.1505 17.904 13.1505 17.7047H16.6505C16.6505 15.9379 15.2086 14.5356 13.4671 14.5356V18.0356ZM13.1505 17.7047V20.7809H16.6505V17.7047H13.1505ZM13.1505 20.7804C13.1501 22.4096 14.4591 23.7123 16.0624 23.7495L16.1436 20.2505C16.4094 20.2566 16.6506 20.4768 16.6505 20.7814L13.1505 20.7804ZM16.103 23.75H18.0271V20.25H16.103V23.75ZM18.0271 23.75C20.895 23.75 23.25 21.4437 23.25 18.5618H19.75C19.75 19.4776 18.9953 20.25 18.0271 20.25V23.75ZM23.25 18.5618V9.83784H19.75V18.5618H23.25ZM23.2498 9.81384C23.2322 8.52587 22.6213 7.32208 21.6001 6.54224L19.4758 9.32383C19.6497 9.45662 19.7473 9.65578 19.7502 9.86183L23.2498 9.81384ZM21.6291 6.56484L15.0488 1.31711L12.8666 4.05349L19.4468 9.30122L21.6291 6.56484ZM15.0448 1.31386C13.2552 -0.104622 10.716 -0.104622 8.92637 1.31386L11.1005 4.05674C11.6164 3.64775 12.3547 3.64775 12.8707 4.05674L15.0448 1.31386ZM8.91815 1.32042L2.36676 6.57768L4.55729 9.30744L11.1087 4.05018L8.91815 1.32042ZM2.40513 6.54775C1.37684 7.32693 0.762863 8.53664 0.750085 9.83007L4.24991 9.86465C4.25191 9.66269 4.34767 9.46712 4.51892 9.33736L2.40513 6.54775ZM0.75 9.84736V18.5618H4.25V9.84736H0.75ZM0.75 18.5618C0.75 21.4437 3.10501 23.75 5.97291 23.75V20.25C5.00474 20.25 4.25 19.4776 4.25 18.5618H0.75ZM5.97291 23.75H7.89696V20.25H5.97291V23.75ZM7.89696 23.75C9.53222 23.75 10.888 22.433 10.888 20.7714H7.38797C7.38797 20.4669 7.63249 20.25 7.89696 20.25V23.75Z"
          fill="#A8AAADFF" mask="url(#path-1-inside-1_1_1860)"/>
</svg>
`,
    children: services
  },
  {
    title: 'E’lonlar',
    icon: `<svg class="box" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M3.27 6.9599L12 12.0099L20.73 6.9599M12 22.0799V11.9999M21 15.9999V7.9999C20.9996 7.64918 20.9071 7.30471 20.7315 7.00106C20.556 6.69742 20.3037 6.44526 20 6.2699L13 2.2699C12.696 2.09437 12.3511 2.00195 12 2.00195C11.6489 2.00195 11.304 2.09437 11 2.2699L4 6.2699C3.69626 6.44526 3.44398 6.69742 3.26846 7.00106C3.09294 7.30471 3.00036 7.64918 3 7.9999V15.9999C3.00036 16.3506 3.09294 16.6951 3.26846 16.9987C3.44398 17.3024 3.69626 17.5545 4 17.7299L11 21.7299C11.304 21.9054 11.6489 21.9979 12 21.9979C12.3511 21.9979 12.696 21.9054 13 21.7299L20 17.7299C20.3037 17.5545 20.556 17.3024 20.7315 16.9987C20.9071 16.6951 20.9996 16.3506 21 15.9999Z" stroke="#292D32" stroke-opacity="0.4" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
`,
    route: '/announcement'
  },
  {
    title: "Transport e'lonlari",
    isOpen: false,
    icon: `<svg class="car" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g clip-path="url(#clip0_1_1867)">
        <path d="M19.1284 20.0001V19.8715H18.9998H4.99985H4.87128V20.0001V21.1429C4.87128 21.7198 4.46553 22.1572 3.99985 22.1572H2.99985C2.53416 22.1572 2.12842 21.7198 2.12842 21.1429V12.5715V12.4745L2.03517 12.4479L0.792629 12.0929C0.412045 11.9842 0.128419 11.5852 0.128419 11.1077V10.2858C0.128419 10.0246 0.31031 9.84293 0.499847 9.84293H1.99985H2.08895L2.12023 9.7595L4.60073 3.14483C4.90007 2.34659 5.58024 1.84293 6.31864 1.84293H17.681C18.4195 1.84293 19.0996 2.34659 19.399 3.14483L21.8795 9.7595L21.9107 9.84293H21.9998H23.4998C23.6894 9.84293 23.8713 10.0246 23.8713 10.2858V11.1077C23.8713 11.5852 23.5877 11.9842 23.207 12.0929L21.9645 12.4479L21.8713 12.4745V12.5715V21.1429C21.8713 21.7198 21.4655 22.1572 20.9998 22.1572H19.9998C19.5341 22.1572 19.1284 21.7198 19.1284 21.1429V20.0001ZM19.9998 17.8429H20.1284V17.7144V12.0001V11.8715H19.9998H3.99985H3.87128V12.0001V17.7144V17.8429H3.99985H19.9998ZM18.9476 9.74961L18.9477 9.74957C19.5298 9.48343 19.7963 8.74348 19.5726 8.10456L18.1212 3.9576L18.0911 3.8715H17.9998H5.99985H5.90863L5.87849 3.9576L4.42705 8.10458C4.37495 8.25345 4.34831 8.41188 4.34831 8.5715C4.34831 9.25704 4.838 9.84293 5.47688 9.84293H18.5228C18.6689 9.84293 18.8131 9.81101 18.9476 9.74961ZM9.4135 16.3942L9.41348 16.3943C9.36044 16.4267 9.30256 16.4429 9.24481 16.4429H5.99985C5.53416 16.4429 5.12842 16.0055 5.12842 15.4286V13.2724C6.21397 13.2879 7.11817 13.5001 7.8467 13.9024C8.60226 14.3197 9.17636 14.9455 9.56927 15.7852C9.67498 16.0111 9.59475 16.2835 9.4135 16.3942ZM16.153 13.9024C16.8816 13.5001 17.7857 13.2879 18.8713 13.2724V15.4286C18.8713 16.0055 18.4655 16.4429 17.9998 16.4429H14.7548C14.6971 16.4429 14.6392 16.4267 14.5862 16.3943L14.5862 16.3942C14.405 16.2835 14.3248 16.0112 14.4305 15.7852C14.8234 14.9455 15.3975 14.3197 16.153 13.9024Z" fill="#292D32" fill-opacity="0.4" stroke="white" stroke-width="0.257143"/>
        </g>
        <defs>
        <clipPath id="clip0_1_1867">
        <rect width="24" height="24" fill="white"/>
        </clipPath>
        </defs>
        </svg>
`,
    children: Menu
  },
])
const selectedMenu = ref<MenuItems | null>(null)
const selectedService = ref(null)


onMounted(() => closeMenu())

onUnmounted(() => closeMenu())


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

const currentIndex = ref<number | null>(null)

const openChildMenu = (index: number, item: MenuItems) => {
  selectedMenu.value = item
  showForm.value = false
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
  mapStore.clearMarkers()

  menuVisible.value = true
};

const openDetail = (value: any, item: any) => {
  if (item.route) {
    menuItems.value.forEach((e) => e.isOpen = false)
    router.push({name: item.route, params: {type: item.unique}})
    formVisible.value = true

  }
  if (item.child) {
    value.isDetail = !value.isDetail
  }
  selectedService.value = item
  showForm.value = true

  mapStore.clearMarkers()
};

</script>

<template>
  <div class="bg-[#FFFFFF] h-[100vh]"
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
               :class="{_active: list.isOpen || (currentIndex === index2 && list.route)}"
               @click.stop="openChildMenu(index2, list)"
          >
            <div class="navbar-items__menu-item-image">
              <div v-html="list.icon"></div>
            </div>
            <div class="navbar-items__menu-item-text"
                 :class="{'!text-[#66C61C]' : list.isOpen || (currentIndex === index2 && list.route)}"
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
        '_on-location-changing': isLocationChanging
      }"
      >
        <div class="navbar-items__divider"/>

        <div class="navbar-items__menu service-items !py-[16px] !mx-[12px]">
          <div class="navbar-items__menu-items">
            <div v-for="(list, index2) in selectedMenu?.children" :key="index2"
                 class="navbar-items__menu-item !px-[12px] !py-[14px]"
                 :class="{_inactiveServiceItem: $route.query.type !== list.unique}"
                 @click="openDetail(selectedMenu, list)"
            >
              <div class="navbar-items__menu-item-image">
                <img :src="list.img" alt="">
              </div>
              <div class="navbar-items__menu-item-text"
                   :class="{'text-[#66C61C]' : list.isOpen || (currentIndex === index2 && list.route)}"
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

    &.service-items {
      width: 80px;

      .navbar-items__menu-item {
        min-height: 90px;
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

      &._inactiveServiceItem {
        filter: contrast(0);
      }

      &._active {
        .navbar-items__menu-item-image {
          svg.home {
            path {
              fill: #66C61C;
            }
          }

          svg.box {
            path {
              stroke: #66C61C;
            }
          }

          svg.car {
            path {
              fill: #66C61C;
            }
          }
        }
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
  @apply absolute top-[80px] left-[-50px] !p-[16px] bg-[#FAFAFA] w-[359px] rounded-[24px];
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
