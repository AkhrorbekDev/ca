<script setup lang="ts">
import {Menu, services, Truck} from '@/components/fakeJson'
import {onMounted, onUnmounted, ref, watchEffect} from "vue";
import {useRouter, useRoute} from "vue-router";
import {useCommonStore} from "@/stores/common.store"
import homeIcon from '@/assets/icons/home.svg'
import boxIcon from '@/assets/icons/box.svg'
import geoIcon from '@/assets/icons/geo.svg'
import * as yup from 'yup'
import LocationItem from "@/components/form-elements/LocationItem.vue";
import {Form} from 'vee-validate'
import useMapStore from '@/stores/map.store'
import getGeoObject from "@/composables/getGeoObject";

const store = useCommonStore()
const mapStore = useMapStore()

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
const formVisible = ref(false);

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
const currentIndex = ref<number | null>(null)

const baseSchema = {
  adv_type: yup.string().required(),
  service_type_id: yup.number().required(),
  price: yup.string().required(),
  note: yup.string().notRequired()
}

const deliverySchema = yup.object({

  from_location: yup.object({
    lat: yup.string().required(),
    lng: yup.string().required(),
    name: yup.string().required()
  }).nonNullable(),
  to_location: yup.object({
    lat: yup.string().required(),
    lng: yup.string().required(),
    name: yup.string().required()
  }).nonNullable(),
  details: yup.object({
    transportation_type_id: yup.number().required(),
    load_weight: yup.object({
      amount: yup.number().required(),
      name: yup.string().required()
    })
  }),
  ...baseSchema,

})

const passengerTrafficSchema = yup.object({
  from_location: yup.object({
    lat: yup.string().required(),
    lng: yup.string().required(),
    name: yup.string().required()
  }).nonNullable(),
  to_location: yup.object({
    lat: yup.string().required(),
    lng: yup.string().required(),
    name: yup.string().required()
  }).nonNullable(),
  details: yup.object({
    transportation_type_id: yup.number().required(),
    passenger_count: yup.number().required()
  }),
  ...baseSchema,
  price: yup.string().notRequired(),
})

const specialTechniqueSchema = yup.object({
  to_location: yup.object({
    lat: yup.string().required(),
    lng: yup.string().required(),
    name: yup.string().required()
  }).nonNullable(),
  details: yup.object({
    transportation_type_id: yup.number().required(),
  }),
  ...baseSchema
})

const transportRentSchema = yup.object({
  details: yup.object({
    car_id: yup.number().required(),
    "characteristics": yup.object({
      "model_id": yup.number().required(), //Avtomobil model id si
      "vehicle_body_id": yup.number().required(), //Avtomobil kuzov turi id si
      "transmission": yup.number().required(), // Uzatmalar qutisi
      "engine_capacity": yup.string().required(), //Dvigatel hajmi
      "colour_id": yup.number().required(), //Rangi
      "trunk_capacity": yup.string().required(), //Bagaj hajmi
      "passenger_count": yup.number().required(), // maksimal yo'lovchi yoki o‘rindiqlar soni
      "has_air_conditioner": yup.bool().required(), //Konditsioner bor yoki yo'qligi
      "has_insurance": yup.bool().required(), //Sug‘urta bor yoki yo'qligi
      "daily_distance_limit": yup.string().required(), //Sutkalik km kimiti
      "deposit_amount": yup.number().required() //Depozit summasi
    }), // Texnik xarakteristikalar
    "tariffs": yup.array({
      day: yup.number().required(),
      price: yup.number().required()
    })
  }),
  from_location: yup.object({
    lat: yup.string().required(),
    lng: yup.string().required(),
    name: yup.string().required()
  }).nonNullable(),


  ...baseSchema,
})

const autoRepairPlaceSchema = yup.object({
  from_location: yup.object({
    lat: yup.string().required(),
    lng: yup.string().required(),
    name: yup.string().required()
  }).nonNullable(),
  details: yup.object({
    repair_type_id: yup.number().required(),
    category: yup.array(yup.number()).required(),
    services: yup.array(yup.number()).required(),
    company_name: yup.string().required()
  }),
  ...baseSchema
})
const autoRepairSchema = yup.object({
  from_location: yup.object({
    lat: yup.string().required(),
    lng: yup.string().required(),
    name: yup.string().required()
  }).nonNullable(),
  details: yup.object({
    repair_type_id: yup.number().required(),
    transport_specialist_id: yup.number().required(),
    services: yup.array(yup.number()).required(),
    specialist_first_name: yup.string().required(),
    specialist_last_name: yup.string().required()
  }),
  ...baseSchema
})

const transportTransferSchema = yup.object({
  from_location: yup.object({
    lat: yup.string().required(),
    lng: yup.string().required(),
    name: yup.string().required()
  }).nonNullable(),
  to_location: yup.object({
    lat: yup.string().required(),
    lng: yup.string().required(),
    name: yup.string().required()
  }).nonNullable(),
  details: yup.object({
    transportation_type_id: yup.number().required(),
    transport_count: yup.number().required()
  }),
  ...baseSchema
})

const warehouseSchema = yup.object({
  to_location: yup.object({
    lat: yup.string().required(),
    lng: yup.string().required(),
    name: yup.string().required()
  }).nonNullable(),
  service_name: yup.string().required(),
  details: {
    area: yup.string().required()
  },
  ...baseSchema
})

const oilTransfer = yup.object({
  shipment_data: yup.string().required(),
  from_location: yup.object({
    lat: yup.string().required(),
    lng: yup.string().required(),
    name: yup.string().required()
  }).nonNullable(),
  details: yup.object({
    company_name: yup.string().required(),
    fuels: yup.array(yup.object({
      id: yup.number().required(),
      type: yup.string().required(),
      price: yup.string().required()
    }))
  }),
  ...baseSchema
})

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
  selectedMenu.value = item
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

  menuVisible.value = true
  formVisible.value = false
  mainForm.value.validate().then(res => {
    console.log(res, 'is res')
    mainForm.value.setFieldValue('to_location', {
      lat: 111,
      lng: 111,
      name: '111,111'
    })
  })
};

const openDetail = (value: any, item: any) => {
  if (item.route) {
    store.activeService = item
    menuItems.value.forEach((e) => e.isOpen = false)
    router.push({name: item.route, params: {type: item.unique}})
    formVisible.value = true

  }
  if (item.child) {

    value.isDetail = !value.isDetail
    console.log(formVisible.value)
  }
};

const handleClickCard = (item: any) => {
  if (item.route) {
    menuItems.value.forEach((e) => e.isOpen = false)
    router.push(`/${item.id}`)
  }
}

const extraToggleMenu = () => {
  extraMenu.value = !extraMenu.value
}

const cargoTypes = [
  {
    label: 'Boshqa yuklar',
    description: 'Boshqa yuklar'
  },
  {
    label: 'Qurilish mollari',
    description: 'Mebel, plintus, gipsokarton'
  }
]

const loadTypes = [
  {
    label: 'Yuk tashuvchilarsiz',
    description: 'Yordam kerak emas'
  },
  {
    label: 'Haydovchi yuklarni tashishi kerak',
    description: '50kg dan ortiq bo\'lmagan'
  }
]
const mainForm = ref(null)

let locationChange = {
  value: () => console.log('locationChange is empty'),
  set(callback) {
    this.value = callback
  },
  get() {
    return this.value
  },
  reset() {
    this.value = console.log('locationChange is empty')
  }
}

const setLocation = (name) => {
  console.log('sert test')

  mapStore.setMarker({
    id: name,
    marker: {
      id: name,
      markerProps: {
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: [69.279719, 41.311145]
        }
      },
      callback: async (e) => {
        await getGeoObject({cord: e.coordinates}).then(res => {
          const marker = mapStore.getMarker(name)
          mainForm.value.setFieldValue(name, {
            lat: marker.markerProps.geometry.coordinates[0],
            lng: marker.markerProps.geometry.coordinates[1],
            name: res.description
          })
          mapStore.removeMarker(name)

        })
      }
    }
  }, name)
  locationChange = (locationDetails) => {
    mainForm.value.setFieldValue()
  }

}


onMounted(() => {
  if (route.query && route.query.type && route.query.type === 'announcement') {
    selectedMenu.value = menuItems.value[1]
    menuItems.value[1].isOpen = true
    currentIndex.value = 1

  } else {
    selectedMenu.value = menuItems.value[0]
    menuItems.value[0].isOpen = true
    currentIndex.value = 0
  }
})


watchEffect(() => {
  currentIndex.value = route.name == 'announcement' && 1
})
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
          :class="{ '_active-subitems': menuVisible}"
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
        <Form ref="mainForm" as="div" :validation-schema="deliverySchema"
              class="navbar-items__form w flex items-start !transition-all"
              :class="{
            '_form-active': formVisible
          }"
        >
          <div class="navbar-items__divider"/>

          <div
              class="grid grid-cols-1 gap-4 !p-[16px]">
            <LocationItem as="div" class="col-span-full" name="from_location" @click="setLocation('from_location')"/>

            <LocationItem as="div" class="col-span-full" name="to_location" @click="setLocation('to_location')"/>
            <div class="col-span-full">
              <FloatLabel variant="in">
                <DatePicker v-model="value2" inputId="in_label" showIcon iconDisplay="input" variant="filled"
                            class="custom-date w-full"/>
                <!--            <InputText id="in_label" variant="filled" placeholder="Manzilni tanlang"-->
                <!--                       class="w-full bg-[#FAFAFA] !rounded-[24px] !pt-[34px] !pb-[18px] !px-[16px] !border-0"/>-->
                <label for="in_label" class="!text-[#292D324D]">Jo‘natish sanasi</label>
              </FloatLabel>
            </div>

            <div class="col-span-full">

              <div
                  @click="extraToggleMenu"
                  class="w-full !bg-[#FAFAFA] !border-0 !rounded-[24px] h-[76px] !px-[16px] !pt-[12px] cursor-pointer relative">
                <span class="text-[#292D324D] text-[12px] !mb-2">Qo‘shimcha ma’lumotlar</span>
                <div class="flex items-center justify-between">
                  <span class="text-[#292D32]">Yuk turi, rasmi, yuklash xizmati, to‘lov...</span>
                  <svg width="12" height="8" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1 6.5L6 1.5L11 6.5" stroke="#292D32" stroke-opacity="0.3" stroke-width="1.5"
                          stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                </div>

              </div>

            </div>

            <div class="col-span-full">
              <FloatLabel variant="in">
                <Select v-model="selectedCountry" :options="countries" optionLabel="name"
                        placeholder="Transportni tanlang"
                        class="w-full !bg-[#FAFAFA] !border-0 !rounded-[24px] custom-placeholder-select h-[76px] flex items-center">
                  <template #value="slotProps">
                    <div v-if="slotProps.value" class="flex items-center">
                      <img :alt="slotProps.value.label"
                           :src="slotProps.value.image"
                           class="mr-2" style="width: 80px; height: 40px; object-fit: contain"/>
                      <div>{{ slotProps.value.name }}</div>
                    </div>
                    <span v-else>
                    {{ slotProps.placeholder }}
                </span>
                  </template>
                  <template #option="slotProps">
                    <div class="flex items-center grow">
                      <img :alt="slotProps.option.label"
                           :src="slotProps.option.image"
                           :class="`mr-2`" style="width: 94px; height: 73px; object-fit: contain"/>
                      <div class="flex items-center justify-between grow">
                        <div>
                          <span class="block">{{ slotProps.option.name }}</span>
                          <span class="block">{{ slotProps.option.info }}</span>
                        </div>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <rect width="24" height="24" rx="12" fill="#66C61C"/>
                          <path
                              d="M8.33203 11.9999H15.6654M15.6654 11.9999L12.6065 9.33325M15.6654 11.9999L12.6065 14.6666"
                              stroke="white" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>


                      </div>
                    </div>
                  </template>
                </Select>
                <label for="in_label" class="!text-[#292D324D]">Transport turi</label>
              </FloatLabel>
            </div>

          </div>
          <div
              v-if="extraMenu"
              @click.stop
              class="bg-white rounded-[24px] !p-[16px] w-full absolute left-[110%] bottom-0 top-[0] max-h-[100vh] h-auto overflow-y-auto"
              style="box-shadow: 0px 32px 100px 0px #292D3229;"
          >
            <div>
              <div v-for="item in cargoTypes" :key="item.label"
                   class="flex items-center justify-between !py-4 border-b border-[#F5F5F7]">
                <div class="w-full flex flex-col items-start justify-start">
                  <label for="ingredient1" class="flex items-center gap-4 cursor-pointer">
                    {{ item.label }}
                  </label>
                  <span>
                  {{ item.description }}
                </span>
                </div>
                <RadioButton v-model="ingredient" inputId="ingredient1" name="pizza" value="Cheese"/>

              </div>
            </div>
            <div>
              <div v-for="item in loadTypes" :key="item.label"
                   class="flex items-center justify-between !py-4 border-b border-[#F5F5F7]">
                <div class="w-full flex flex-col items-start justify-start">
                  <label for="ingredient1" class="flex items-center gap-4 cursor-pointer">
                    {{ item.label }}
                  </label>
                  <span class="">
                  {{ item.description }}
                </span>
                </div>
                <RadioButton v-model="ingredient" inputId="loadType" name="loadType" :value="item.label"/>

              </div>
            </div>

            <div class="flex flex-col gap-2 w-full !mb-[24px]">
              <label for="description" class="text-[#292D3280] text-[12px]">Izoh</label>
              <Textarea id="description" class="w-full  !rounded-[16px] !placeholder-[#292D324D]"
                        style="border: 1px solid #C2C2C233" rows="3"
                        cols="30"
                        placeholder="Buyurtma haqida izoh qoldiring!"/>
            </div>

            <div class="!mb-[24px]">
              <div class="bg-[#FAFAFA] rounded-[50px] !px-[8px] text-[#292D324D] text-[12px] font-medium">
                To‘lov
              </div>

              <div>
                <div class="flex items-center justify-between !py-4 border-b border-[#F5F5F7]">
                  <label for="ingredient1" class="flex items-center gap-4 cursor-pointer">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path
                          d="M20.5384 7.43761H21.6892C21.8684 7.42277 22.0489 7.44607 22.2179 7.50575C22.3869 7.56543 22.5404 7.66011 22.6676 7.78317C22.7949 7.90624 22.8927 8.05462 22.9544 8.21811C23.0161 8.38159 23.0401 8.55621 23.0248 8.72961C23.0248 11.5735 23.0248 14.4174 23.0248 17.245C23.0248 17.4156 23.0248 17.5862 23.0248 17.7569C23.0294 18.0747 22.9056 18.3816 22.6796 18.6123C22.4537 18.843 22.1435 18.9793 21.8152 18.992H5.0149C4.80917 19.0063 4.60275 18.9758 4.41083 18.9027C4.21892 18.8296 4.04635 18.7156 3.90602 18.5694C3.69567 18.3488 3.58397 18.0568 3.59522 17.7569C3.59522 17.3425 3.59522 16.9443 3.59522 16.5299C3.59522 13.9054 3.59522 11.289 3.59522 8.66455C3.61172 8.32782 3.75797 8.00929 4.00518 7.77167C4.25239 7.53405 4.58271 7.39461 4.93092 7.38077C10.0718 7.44578 15.2883 7.43761 20.5384 7.43761ZM13.3227 9.25778C11.483 9.25778 9.65175 9.25778 7.81211 9.25778C7.64404 9.23328 7.47247 9.2682 7.32894 9.35627C7.18542 9.44435 7.07965 9.57963 7.03096 9.73715C6.917 10 6.74751 10.237 6.53343 10.4328C6.31935 10.6287 6.06532 10.7793 5.78765 10.8747C5.67922 10.9077 5.5859 10.9758 5.5232 11.0675C5.46049 11.1593 5.43229 11.269 5.44332 11.3785C5.44332 12.5729 5.44332 13.7673 5.44332 14.9698C5.42322 15.1045 5.45362 15.2417 5.52914 15.3565C5.60466 15.4713 5.72028 15.5561 5.85492 15.5955C6.13261 15.705 6.38485 15.8671 6.5969 16.0722C6.80895 16.2773 6.97651 16.5213 7.08971 16.7899C7.12673 16.9179 7.20955 17.029 7.3234 17.1034C7.43726 17.1778 7.57473 17.2107 7.71132 17.1962H18.8583C19.0935 17.1962 19.2952 17.1962 19.396 16.9362C19.5198 16.6209 19.7098 16.334 19.9542 16.0934C20.1985 15.8529 20.4918 15.664 20.8155 15.5387C20.9032 15.5098 20.9783 15.4532 21.0286 15.378C21.0789 15.3028 21.1015 15.2134 21.0928 15.1243C21.0928 13.8648 21.0928 12.6135 21.0928 11.3622C21.1059 11.2673 21.0846 11.1708 21.0325 11.0894C20.9804 11.0079 20.9008 10.9464 20.8071 10.9153C20.4959 10.7999 20.2128 10.6234 19.9757 10.3968C19.7386 10.1703 19.5527 9.89858 19.4296 9.59898C19.3903 9.49065 19.3139 9.39861 19.213 9.33802C19.1122 9.27744 18.993 9.25192 18.8752 9.26581C17.0187 9.26581 15.1539 9.25778 13.289 9.25778H13.3227Z"
                          fill="#01D08D"/>
                      <path
                          d="M20.5384 7.43761C15.3219 7.43761 10.1055 7.43759 4.88896 7.43759C4.54075 7.45142 4.21053 7.59096 3.96332 7.82858C3.71611 8.0662 3.56987 8.38473 3.55336 8.72146C3.55336 11.346 3.55336 13.9623 3.55336 16.5868H2.34369C2.16869 16.5961 1.99366 16.5698 1.82986 16.5095C1.66606 16.4492 1.51715 16.3562 1.39283 16.2367C1.2685 16.1172 1.17156 15.9738 1.10817 15.8158C1.04479 15.6577 1.01641 15.4886 1.02491 15.3192V6.29198C1.01925 6.12785 1.04789 5.96426 1.1092 5.81113C1.17051 5.65799 1.26318 5.51842 1.38165 5.40079C1.50012 5.28316 1.64192 5.18993 1.79858 5.12664C1.95524 5.06335 2.12357 5.03133 2.29334 5.03251H19.0432C19.2423 5.00403 19.4456 5.02086 19.6368 5.08171C19.828 5.14256 20.0019 5.24576 20.1446 5.38304C20.2873 5.52031 20.395 5.68793 20.459 5.87252C20.523 6.05711 20.5415 6.25356 20.5132 6.44632C20.5384 6.75508 20.5384 7.09634 20.5384 7.43761Z"
                          fill="#00B177"/>
                      <path
                          d="M13.289 9.25778C15.1539 9.25778 17.0188 9.25778 18.8836 9.25778C19.0014 9.24388 19.1206 9.2693 19.2215 9.32989C19.3223 9.39047 19.3986 9.48252 19.4379 9.59085C19.561 9.89045 19.747 10.1621 19.9842 10.3887C20.2213 10.6153 20.5043 10.7918 20.8156 10.9072C20.9092 10.9382 20.9889 10.9997 21.0409 11.0812C21.093 11.1627 21.1144 11.2591 21.1012 11.3541C21.1012 12.6054 21.1012 13.8567 21.1012 15.1161C21.11 15.2053 21.0872 15.2947 21.0369 15.3699C20.9866 15.445 20.9116 15.5017 20.824 15.5305C20.5003 15.6558 20.207 15.8447 19.9626 16.0853C19.7183 16.3258 19.5282 16.6128 19.4044 16.9281C19.3036 17.1556 19.102 17.188 18.8668 17.188H7.67771C7.54113 17.2026 7.40365 17.1697 7.2898 17.0953C7.17594 17.0209 7.09312 16.9098 7.05611 16.7818C6.9429 16.5132 6.77534 16.2692 6.5633 16.0641C6.35125 15.8589 6.099 15.6969 5.82131 15.5874C5.68668 15.5479 5.57116 15.4631 5.49564 15.3483C5.42012 15.2335 5.38961 15.0964 5.40971 14.9617C5.40971 13.7591 5.40971 12.5648 5.40971 11.3704C5.39868 11.2609 5.42689 11.1511 5.48959 11.0594C5.55229 10.9677 5.64572 10.8996 5.75415 10.8666C6.03181 10.7711 6.28585 10.6206 6.49993 10.4247C6.714 10.2288 6.8834 9.99188 6.99735 9.72901C7.04604 9.57149 7.15191 9.43621 7.29544 9.34814C7.43896 9.26006 7.61054 9.22514 7.77861 9.24964C9.61824 9.27402 11.4494 9.25778 13.289 9.25778ZM15.4395 13.1904C15.4374 12.6322 15.2076 12.0973 14.8003 11.7018C14.393 11.3063 13.8409 11.0821 13.2638 11.0779C12.9628 11.0599 12.6612 11.1017 12.3776 11.2007C12.0939 11.2998 11.8342 11.454 11.6145 11.6538C11.3947 11.8537 11.2196 12.0948 11.0999 12.3626C10.9802 12.6304 10.9184 12.919 10.9184 13.2108C10.9184 13.5025 10.9802 13.791 11.0999 14.0588C11.2196 14.3266 11.3947 14.5679 11.6145 14.7677C11.8342 14.9675 12.0939 15.1216 12.3776 15.2207C12.6612 15.3197 12.9628 15.3616 13.2638 15.3437C13.5552 15.3483 13.8444 15.2953 14.1139 15.1881C14.3834 15.0809 14.6273 14.9217 14.831 14.7202C15.0346 14.5186 15.1936 14.279 15.2982 14.016C15.4029 13.7529 15.451 13.472 15.4395 13.1904Z"
                          fill="#00B177"/>
                      <path
                          d="M15.4395 13.1904C15.451 13.4713 15.4031 13.7516 15.299 14.0141C15.1949 14.2765 15.0367 14.5158 14.834 14.7172C14.6312 14.9186 14.3881 15.0781 14.1197 15.1858C13.8512 15.2935 13.5629 15.3472 13.2723 15.3437C12.9712 15.3616 12.6697 15.3197 12.386 15.2207C12.1023 15.1216 11.8426 14.9675 11.6229 14.7677C11.4032 14.5679 11.228 14.3266 11.1083 14.0588C10.9886 13.791 10.9268 13.5025 10.9268 13.2108C10.9268 12.919 10.9886 12.6304 11.1083 12.3626C11.228 12.0948 11.4032 11.8536 11.6229 11.6538C11.8426 11.454 12.1023 11.2998 12.386 11.2007C12.6697 11.1017 12.9712 11.0599 13.2723 11.0779C13.8479 11.0842 14.3979 11.3093 14.8034 11.7046C15.2089 12.0999 15.4374 12.6336 15.4395 13.1904Z"
                          fill="#01D08D"/>
                    </svg>
                    Naqd
                  </label>
                  <RadioButton v-model="ingredient" inputId="ingredient1" name="pizza" value="Cheese"/>

                </div>
                <div class="flex items-center justify-between !py-4 border-b border-[#F5F5F7]">
                  <label for="ingredient2" class="flex items-center gap-4 cursor-pointer">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <g clip-path="url(#clip0_1148_13700)">
                        <path
                            d="M21.9812 10.5452C21.9812 13.165 21.9876 15.7849 21.9812 18.4048C21.9812 19.2306 21.2733 19.9557 20.4735 19.9958C20.4224 19.9958 20.3718 19.9958 20.3207 19.9958H3.68121C2.85066 19.9958 2.2154 19.464 2.04045 18.6279C2.02683 18.5616 2.01982 18.4939 2.01953 18.426C2.01953 15.7987 2.01953 13.1713 2.01953 10.5439L21.9812 10.5452ZM8.04086 15.8631C8.04086 15.4011 8.04086 14.9391 8.04086 14.4765C8.04086 13.9969 7.75665 13.6883 7.30098 13.6883C6.40747 13.683 5.51415 13.683 4.62103 13.6883C4.1671 13.6883 3.86545 13.9987 3.86022 14.468C3.85324 15.4151 3.85324 16.3619 3.86022 17.3086C3.86429 17.7476 4.16361 18.0477 4.57975 18.0489C5.49535 18.0517 6.41038 18.0517 7.32481 18.0489C7.7706 18.0489 8.03795 17.7639 8.04028 17.2952C8.0426 16.8266 8.04086 16.3427 8.04086 15.8656V15.8631ZM11.5223 18.0495C11.8199 18.0495 12.1186 18.0349 12.415 18.0531C12.5095 18.06 12.6043 18.047 12.6938 18.0147C12.7833 17.9825 12.8656 17.9317 12.9359 17.8655C13.0061 17.7992 13.0628 17.7189 13.1025 17.6292C13.1423 17.5396 13.1642 17.4425 13.1671 17.3437C13.1863 16.9606 12.8614 16.6089 12.4633 16.5998C11.8391 16.5848 11.2148 16.5848 10.5906 16.5998C10.4975 16.6012 10.4057 16.6222 10.3206 16.6615C10.2354 16.7008 10.1588 16.7576 10.0952 16.8286C10.0316 16.8995 9.98237 16.9831 9.95045 17.0743C9.91854 17.1655 9.90459 17.2625 9.90945 17.3595C9.91875 17.7451 10.2303 18.0453 10.6296 18.0489C10.9271 18.0537 11.2247 18.0519 11.5223 18.0519V18.0495ZM16.179 18.0495C16.4835 18.0495 16.7881 18.0495 17.0926 18.0495C17.489 18.0459 17.7808 17.7773 17.8 17.405C17.822 16.969 17.5605 16.6168 17.1461 16.6034C16.5068 16.5804 15.8674 16.5816 15.2281 16.6034C14.8125 16.6162 14.5463 16.96 14.5644 17.3959C14.58 17.7791 14.8736 18.0477 15.2839 18.0507C15.5838 18.0537 15.8814 18.0519 16.179 18.0519V18.0495Z"
                            fill="#87A6E7"/>
                        <path
                            d="M21.981 10.5452H2.01996C2.01531 9.76969 2.00601 8.99483 2.00717 8.21935C2.00717 7.8592 1.98276 7.49724 2.02402 7.13708C2.11818 7.13708 2.21233 7.14072 2.30707 7.14072H20.8442C21.222 7.14072 21.5997 7.14072 21.9769 7.13708C22.0159 7.32383 21.9944 7.51239 21.9944 7.69974C21.9921 8.65044 21.9857 9.59932 21.981 10.5452Z"
                            fill="#233EB1"/>
                        <path
                            d="M21.9773 7.1395C21.5995 7.1395 21.2218 7.14314 20.8446 7.14314H2.30746C2.21272 7.14314 2.11856 7.14314 2.02441 7.1395C2.02441 6.6023 2.00465 6.0639 2.02441 5.52731C2.05521 4.68454 2.79451 4.00183 3.65877 4.00122C7.79001 4.00122 11.9212 4.00122 16.0525 4.00122C17.4683 4.00122 18.8841 4.00122 20.3 4.00122C21.295 4.00122 21.982 4.71607 21.9855 5.75407C21.9861 6.21608 21.9802 6.67809 21.9773 7.1395Z"
                            fill="#87A6E7"/>
                      </g>
                      <defs>
                        <clipPath id="clip0_1148_13700">
                          <rect width="20" height="16" fill="white" transform="translate(2 4)"/>
                        </clipPath>
                      </defs>
                    </svg>
                    Karta
                  </label>
                  <RadioButton v-model="ingredient" inputId="ingredient2" name="pizza" value="Mushroom"/>

                </div>
              </div>
            </div>

            <div class="flex flex-col gap-2">
              <label for="price" class="text-[#292D324D] txt-[12px]">Narx</label>
              <InputText
                  class="!py-[12px] !px-[16px] !rounded-[16px] border !border-[#C2C2C233] !placeholder-[#292D324D]"
                  id="price" aria-describedby="username-help"
                  placeholder="Narxni kiriting"/>
            </div>


            <div class="footer">
              <button
                  class="!p-[16px] bg-[#66C61C] rounded-[24px] text-white text-center w-full !mt-[72px] text-[16px]">
                Tasdiqlash
              </button>
            </div>

          </div>

          <!--            filter absolute end-->

        </Form>
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
    background-color: red;
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
