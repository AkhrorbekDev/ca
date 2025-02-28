<script lang="ts" setup>
import velosiped from "@/assets/images/velosiped.png"
import skuter from "@/assets/images/skuter.png"
import sedan from "@/assets/images/sedan.png"
import {useCommonStore} from "@/stores/common.store"
import {services} from "@/components/fakeJson"
import {
  YMap,
  YMapDefaultSchemeLayer,
  YMapDefaultFeaturesLayer,
  YMapMarker,
  YMapClusterer,
  clusterByGrid, YMapLayer,
  YMapDefaultMarker,
  YMapListener,
  YMapFeatureDataSource,
  YMapControls,
  YMapZoomControl,
  YMapGeolocationControl,
  YMapControl
} from '@/lib/ymaps';
import type {LngLatBounds, LngLat, YMapLocationRequest, Margin} from '@yandex/ymaps3-types';
import type {Feature} from '@yandex/ymaps3-clusterer';
import useMapStore from "@/stores/map.store";
import {watch, computed} from 'vue'

const mapStore = useMapStore()
const refreshMarkers = (m) => {
  console.log(m, 'refresh')
  return m.map(marker => {
    return {
      type: 'Feature',
      id: marker.id,
      geometry: {
        type: 'Point',
        ...marker.markerProps.geometry
      }
    }
  })
}
const _markers = ref(refreshMarkers(mapStore.getMarkers || []))

const gridSizedMethod = clusterByGrid({gridSize: 64});
const LOCATION: YMapLocationRequest = {
  center: [69.279719, 41.311145],
  zoom: 12
};
const store = useCommonStore()


import {onMounted, ref} from "vue";
import {useRoute, useRouter} from "vue-router";

const route = useRoute()
const router = useRouter()

const value2 = ref(null);
const ingredient = ref('');
const ingredient2 = ref('');
const ingredient3 = ref('');
const imageList = ref<string[] | []>([])

const extraMenu = ref(false)
const menu = ref(false)
const filterMenuList = [
  "Barchasi",
  "Baland narxlilar",
  "Past narxlilar",
]

const deleteImage = (index) => {
  imageList.value.splice(index, 1)
}

const handleFileUpload = (event) => {
  const file = event.target.files[0];
  if (file) {
    // Create a temporary URL for the uploaded file
    imageList.value.push(URL.createObjectURL(file))
  }
};

const selectedCountry = ref();
const countries = ref([
  {name: 'Velosiped', info: "3 kg gacha", image: velosiped},
  {name: 'Skuter', info: "5 kg gacha", image: skuter},
  {name: 'Sedan', info: "20 kg gacha", image: sedan},

]);

const selectedCompany = ref();
const oilStaion = ref([
  {price: "1 litr: 11 500 so‘m", name: 'FathOil', info: "Yetkazib berish narxi: 7 000 so‘m",},
  {price: "1 litr: 11 500 so‘m", name: 'Miss Petrol', info: "Yetkazib berish narxi: Bepul",},
  {price: "1 litr: 11 500 so‘m", name: 'Oktan Petrol', info: "Yetkazib berish narxi: 10 000 so‘m",},
  {price: "1 litr: 11 500 so‘m", name: 'IBR Petroleum', info: "Yetkazib berish narxi: 15 000 so‘m",},
  {price: "1 litr: 11 500 so‘m", name: 'Mustang', info: "Yetkazib berish narxi: Bepul",},

]);

const transport = ref();
const transportList = ref([
  {
    name: "Avtovozlar",
    info: "Maxsus yuk mashinalari",
    disabled: false
  },

  {
    name: "Evakuator",
    info: "Maxsus yuk mashinalari",
    disabled: true
  },

  {
    name: "Maxsus texnikalarni transferi",
    info: "Maxsus yuk mashinalari",
    disabled: false
  },

  {
    name: "Yaxtalar va qayiqlarni transferi",
    info: "Maxsus yuk mashinalari",
    disabled: false
  },
])

const extraToggleMenu = () => {
  extraMenu.value = !extraMenu.value
}

const toggle = (event) => {
  menu.value.toggle(event);
};


onMounted(() => {

  let item = services.find(el => el.unique == route.params.type)
  if (Object.keys(item).length) {
    store.activeService = item
  }
})


watch(mapStore.getMarkers, (newVal) => {
  _markers.value = refreshMarkers(newVal)
}, {
  immediate: true,
  deep: true
})


const visible = ref(false)
const mapCluster = ref(null)

const cor = ref([69.279719, 41.311145])
const lastChangedMarker = ref(0)
const changeMarkerPosition = (o, e) => {
  let marker
  if (_markers.value?.length > 1 && lastChangedMarker.value < _markers.value?.length) {
    marker = _markers.value[lastChangedMarker.value > 0 ? lastChangedMarker.value + 1 : lastChangedMarker.value]

    lastChangedMarker.value++
  } else {
    marker = _markers.value[0]
  }
  cor.value = e.coordinates
  mapStore.updateMarker({
    ...marker,
    geometry: {
      ...marker.geometry,
      coordinates: e.coordinates
    }
  }, marker.id)

  console.log(mapStore.getMarker(marker.id));
  mapStore.getMarker(marker.id)?.callback({
    ...marker.geometry,
    coordinates: e.coordinates
  })

}

</script>

<template>
  <div>

    <div class="!hidden z-10">
      <div v-if="route.params.type == 'delivery'" class="grid grid-cols-9 gap-4 bg-white !p-[16px] rounded-[40px]">
        <div class="col-span-2">
          <FloatLabel variant="in">
            <InputText id="in_label" variant="filled" placeholder="Manzilni tanlang"
                       class="w-full !bg-[#FAFAFA] !rounded-[24px] !pt-[34px] !pb-[18px] !px-[16px] !border-0"/>
            <label for="in_label" class="!text-[#292D324D]">Qayerdan</label>
          </FloatLabel>
        </div>

        <div class="col-span-2">
          <FloatLabel variant="in">
            <InputText id="in_label" variant="filled" placeholder="Manzilni tanlang"
                       class="w-full !bg-[#FAFAFA] !rounded-[24px] !pt-[34px] !pb-[18px] !px-[16px] !border-0"/>
            <label for="in_label" class="!text-[#292D324D]">Qayerga</label>
          </FloatLabel>
        </div>

        <div class="col-span-1">
          <FloatLabel variant="in">
            <DatePicker v-model="value2" inputId="in_label" showIcon iconDisplay="input" variant="filled"
                        class="custom-date"/>
            <!--            <InputText id="in_label" variant="filled" placeholder="Manzilni tanlang"-->
            <!--                       class="w-full bg-[#FAFAFA] !rounded-[24px] !pt-[34px] !pb-[18px] !px-[16px] !border-0"/>-->
            <label for="in_label" class="!text-[#292D324D]">Jo‘natish sanasi</label>
          </FloatLabel>
        </div>

        <div class="col-span-2">

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


            <!--            filter absolute start-->
            <div
                v-if="extraMenu"
                @click.stop
                class="bg-white rounded-[24px] !p-[16px] w-full absolute left-0 top-[130%] max-h-[600px] h-auto overflow-y-auto"
                style="box-shadow: 0px 32px 100px 0px #292D3229;">

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
          </div>

        </div>

        <div class="col-span-2">
          <FloatLabel variant="in">
            <Select v-model="selectedCountry" :options="countries" optionLabel="name" placeholder="Transportni tanlang"
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
                      <path d="M8.33203 11.9999H15.6654M15.6654 11.9999L12.6065 9.33325M15.6654 11.9999L12.6065 14.6666"
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

      <div v-if="route.params.type == 'distillation'" class="grid grid-cols-10 gap-4 bg-white !p-[16px] rounded-[40px]">
        <div class="col-span-3">
          <FloatLabel variant="in">
            <InputText id="in_label" variant="filled" placeholder="Manzilni tanlang"
                       class="w-full !bg-[#FAFAFA] !rounded-[24px] !pt-[34px] !pb-[18px] !px-[16px] !border-0"/>
            <label for="in_label" class="!text-[#292D324D]">Qayerdan</label>
          </FloatLabel>
        </div>

        <div class="col-span-3">
          <FloatLabel variant="in">
            <InputText id="in_label" variant="filled" placeholder="Manzilni tanlang"
                       class="w-full !bg-[#FAFAFA] !rounded-[24px] !pt-[34px] !pb-[18px] !px-[16px] !border-0"/>
            <label for="in_label" class="!text-[#292D324D]">Qayerga</label>
          </FloatLabel>
        </div>

        <div class="col-span-1">
          <FloatLabel variant="in">
            <DatePicker v-model="value2" inputId="in_label" showIcon iconDisplay="input" variant="filled"
                        class="custom-date"/>
            <!--            <InputText id="in_label" variant="filled" placeholder="Manzilni tanlang"-->
            <!--                       class="w-full bg-[#FAFAFA] !rounded-[24px] !pt-[34px] !pb-[18px] !px-[16px] !border-0"/>-->
            <label for="in_label" class="!text-[#292D324D]">Jo‘natish sanasi</label>
          </FloatLabel>
        </div>

        <div class="col-span-3">

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


            <!--            filter absolute start-->
            <div
                v-if="extraMenu"
                @click.stop
                class="bg-white rounded-[24px] !p-[16px] w-full absolute left-0 top-[130%] max-h-[600px] h-auto overflow-y-auto"
                style="box-shadow: 0px 32px 100px 0px #292D3229;">

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
          </div>

        </div>

      </div>

      <div v-if="route.params.type == 'shipping'" class="grid grid-cols-10 gap-4 bg-white !p-[16px] rounded-[40px]">
        <div class="col-span-2">
          <FloatLabel variant="in">
            <InputText id="in_label" variant="filled" placeholder="Manzilni tanlang"
                       class="w-full !bg-[#FAFAFA] !rounded-[24px] !pt-[34px] !pb-[18px] !px-[16px] !border-0"/>
            <label for="in_label" class="!text-[#292D324D]">Qayerdan</label>
          </FloatLabel>
        </div>

        <div class="col-span-2">
          <FloatLabel variant="in">
            <InputText id="in_label" variant="filled" placeholder="Manzilni tanlang"
                       class="w-full !bg-[#FAFAFA] !rounded-[24px] !pt-[34px] !pb-[18px] !px-[16px] !border-0"/>
            <label for="in_label" class="!text-[#292D324D]">Qayerga</label>
          </FloatLabel>
        </div>

        <div class="col-span-1">
          <FloatLabel variant="in">
            <DatePicker v-model="value2" inputId="in_label" showIcon iconDisplay="input" variant="filled"
                        class="custom-date"/>
            <!--            <InputText id="in_label" variant="filled" placeholder="Manzilni tanlang"-->
            <!--                       class="w-full bg-[#FAFAFA] !rounded-[24px] !pt-[34px] !pb-[18px] !px-[16px] !border-0"/>-->
            <label for="in_label" class="!text-[#292D324D]">Jo‘natish sanasi</label>
          </FloatLabel>
        </div>

        <div class="col-span-1">
          <FloatLabel variant="in">
            <InputText id="in_label" variant="filled" placeholder="0" type="number"
                       class="w-full !bg-[#FAFAFA] !rounded-[24px] !pt-[34px] !pb-[18px] !px-[16px] !border-0"/>
            <label for="in_label" class="!text-[#292D324D]">Yuk vazni (kg)</label>
          </FloatLabel>
        </div>

        <div class="col-span-2">

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


            <!--            filter absolute start-->
            <div
                v-if="extraMenu"
                @click.stop
                class="bg-white rounded-[24px] !p-[16px] w-full absolute left-0 top-[130%] max-h-[600px] h-auto overflow-y-auto"
                style="box-shadow: 0px 32px 100px 0px #292D3229;">

              <!--              Yuk turi-->
              <div>
                <div class="bg-[#FAFAFA] rounded-[50px] !px-[8px] text-[#292D324D] text-[12px] font-medium">
                  Yuk turi
                </div>

                <div>
                  <div class="flex items-center justify-between !py-4 border-b border-[#F5F5F7]">
                    <label for="ingredient2" class="flex flex-col cursor-pointer">
                      <span class="text-[#292D32] font-medium">Boshqa materiallar</span>
                      <span class="text-[#292D324D] text-[12px]">Boshqa materiallar</span>
                    </label>
                    <RadioButton v-model="ingredient2" inputId="ingredient2" name="yuk" value="yuk1"/>
                  </div>

                  <div class="flex items-center justify-between !py-4 border-b border-[#F5F5F7]">
                    <label for="yuk2" class="flex flex-col cursor-pointer">
                      <span class="text-[#292D32] font-medium">Qurilish mollari</span>
                      <span class="text-[#292D324D] text-[12px]">Mebel, plintus, gipsokarton</span>
                    </label>
                    <RadioButton v-model="ingredient2" inputId="yuk2" name="yuk" value="yuk2"/>
                  </div>

                  <div class="flex items-center justify-between !py-4 border-b border-[#F5F5F7]">
                    <label for="yuk3" class="flex flex-col cursor-pointer">
                      <span class="text-[#292D32] font-medium">Oziq ovqat</span>
                      <span class="text-[#292D324D] text-[12px]">Ichimliklar, gazli, mineral suvlar</span>
                    </label>
                    <RadioButton v-model="ingredient2" inputId="yuk3" name="yuk" value="yuk3"/>
                  </div>

                  <div class="flex items-center justify-between !py-4">
                    <label for="yuk4" class="flex flex-col cursor-pointer">
                      <span class="text-[#292D32] font-medium">Uskunalar va ehtiyot qismlar</span>
                      <span class="text-[#292D324D] text-[12px]">kuzovlar, yoritgich, generator</span>
                    </label>
                    <RadioButton v-model="ingredient2" inputId="yuk4" name="yuk" value="yuk4"/>
                  </div>

                </div>
              </div>

              <!--              Yuk turi-->

              <!--              Yuklash xizmati-->
              <div class="!mb-[24px]">
                <div class="bg-[#FAFAFA] rounded-[50px] !px-[8px] text-[#292D324D] text-[12px] font-medium">
                  Yuk turi
                </div>

                <div>
                  <div class="flex items-center justify-between !py-4 border-b border-[#F5F5F7]">
                    <label for="xizmat1" class="flex flex-col cursor-pointer">
                      <span class="text-[#292D32] font-medium">Yuk tashuvchilarsiz</span>
                      <span class="text-[#292D324D] text-[12px]">Yordam kerak emas</span>
                    </label>
                    <RadioButton v-model="ingredient3" inputId="xizmat1" name="xizmati" value="xizmat1"/>
                  </div>

                  <div class="flex items-center justify-between !py-4">
                    <label for="xizmat2" class="flex flex-col cursor-pointer">
                      <span class="text-[#292D32] font-medium">Haydovchi yuklarni tashishi kerak</span>
                      <span class="text-[#292D324D] text-[12px]">50 kgdan ortiq bo’lmagan yuklarni tashish</span>
                    </label>
                    <RadioButton v-model="ingredient3" inputId="xizmat2" name="xizmati" value="xizmat2"/>
                  </div>

                </div>
              </div>

              <!--              Yuklash xizmati-->

              <!--              Yuk rasmlari (10 tagacha)-->
              <div class="!mb-[24px]">
                <div class="bg-[#FAFAFA] rounded-[50px] !px-[8px] text-[#292D324D] text-[12px] font-medium">
                  Yuk rasmlari (10 tagacha)
                </div>

                <div class="grid grid-cols-3 gap-2 !mt-[8px] rounded-2xl">
                  <div v-for="(img, index) in imageList" :key="index" class="relative group !mr-0 w-[105px] h-[105px]">
                    <img class="w-full h-full object-cover rounded-2xl"
                         :src="img" alt="img"
                         width="105">

                    <div
                        class="group-hover:flex hidden absolute top-0 left-0 w-full h-full bg-black bg-opacity-50 rounded-2xl items-center justify-center">
                      <button @click="deleteImage(index)">
                        <i class="pi pi-trash cursor-pointer" style="font-size: 1.5rem; color: red"></i>
                      </button>
                    </div>
                  </div>

                  <label for="fileAnnouncement" class="relative">
                    <button>
                      <svg width="110" height="110" viewBox="0 0 110 110" fill="none"
                           xmlns="http://www.w3.org/2000/svg">
                        <rect x="0.5" y="0.5" width="109" height="109" rx="15.5" stroke="#66C61C"
                              stroke-dasharray="8 8"/>
                        <path d="M55.5046 62V55" stroke="#66C61C" stroke-width="1.5" stroke-linecap="round"
                              stroke-linejoin="round"/>
                        <path d="M53.3164 57L55.5033 54.833L57.6902 57" stroke="#66C61C" stroke-width="1.5"
                              stroke-linecap="round"
                              stroke-linejoin="round"/>
                        <path
                            d="M59.5406 62H62.124C64.0697 62 65.6562 60.428 65.6562 58.5C65.6562 56.572 64.0697 55 62.124 55H61.685V54C61.685 50.69 58.9704 48 55.63 48C52.6257 48 50.135 50.178 49.6628 53.023C47.2639 53.144 45.3516 55.093 45.3516 57.5C45.3516 59.985 47.385 62 49.8928 62H51.4672"
                            stroke="#66C61C" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                      </svg>

                      <input @change="handleFileUpload" class="absolute opacity-0 inset-0 cursor-pointer"
                             id="fileAnnouncement" type="file"
                             accept="image/*">

                    </button>
                  </label>
                </div>

              </div>

              <!--              Yuk rasmlari (10 tagacha)-->

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
          </div>

        </div>

        <div class="col-span-2">
          <FloatLabel variant="in">
            <Select v-model="selectedCountry" :options="countries" optionLabel="name" placeholder="Transportni tanlang"
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
                      <path d="M8.33203 11.9999H15.6654M15.6654 11.9999L12.6065 9.33325M15.6654 11.9999L12.6065 14.6666"
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

      <div v-if="route.params.type == 'oil'" class="grid grid-cols-10 gap-4 bg-white !p-[16px] rounded-[40px]">
        <div class="col-span-4">
          <FloatLabel variant="in">
            <InputText id="in_label" variant="filled" placeholder="Manzilni tanlang"
                       class="w-full !bg-[#FAFAFA] !rounded-[24px] !pt-[34px] !pb-[18px] !px-[16px] !border-0"/>
            <label for="in_label" class="!text-[#292D324D]">Qayerga</label>
          </FloatLabel>
        </div>

        <div class="col-span-1">
          <FloatLabel variant="in">
            <InputText id="in_label" variant="filled" placeholder="Miqdorni kiriting" type="number"
                       class="w-full !bg-[#FAFAFA] !rounded-[24px] !pt-[34px] !pb-[18px] !px-[16px] !border-0"/>
            <label for="in_label" class="!text-[#292D324D]">Hamji (litr)</label>
          </FloatLabel>
        </div>

        <div class="col-span-1">
          <FloatLabel variant="in">
            <Select placeholder="Ai 92"
                    class="w-full !bg-[#FAFAFA] !border-0 !rounded-[24px] custom-placeholder-select h-[76px] flex items-center">
            </Select>
            <label for="in_label" class="!text-[#292D324D]">Benzin turi</label>
          </FloatLabel>
        </div>

        <div class="col-span-4">
          <FloatLabel variant="in">
            <Select v-model="selectedCompany" :options="oilStaion" optionLabel="name" placeholder="Kompaniyani tanlang"
                    class="w-full !bg-[#FAFAFA] !border-0 !rounded-[24px] custom-placeholder-select h-[76px] flex items-center">
              <template #header>

                <div class="">
                  <button type="button" @click="toggle" aria-haspopup="true" aria-controls="overlay_menu">
                    <div class="text-[#66C61C] flex items-center cursor-pointer gap-1 !pl-4 !mb-2">Saralash
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M11.3346 6.33329L8.0013 9.66663L4.66797 6.33329" stroke="#66C61C"
                              stroke-linecap="round"
                              stroke-linejoin="round"/>
                      </svg>
                    </div>
                  </button>
                  <Menu ref="menu" id="overlay_menu" :model="filterMenuList" :popup="true">

                    <template #item="{ item, props }">
                      <div>
                        <div class="flex items-center justify-between !py-4">
                          <label for="ingredient2" class="flex flex-col cursor-pointer">
                            <span class="text-[#292D32] font-medium">{{ item }}</span>
                          </label>
                          <RadioButton v-model="ingredient2" inputId="ingredient2" name="yuk" value="yuk1"/>
                        </div>
                      </div>
                    </template>
                  </Menu>
                </div>

              </template>

              <template #value="slotProps">
                <div v-if="slotProps.value" class="flex items-center">
                  <div>{{ slotProps.value.name }}</div>
                </div>
                <span v-else>
                    {{ slotProps.placeholder }}
                </span>
              </template>
              <template #option="slotProps">
                <div class="flex items-center grow border-t border-[#C2C2C233] !py-2">
                  <div class="flex items-center justify-between grow">
                    <div>
                      <span class="block text-[#292D32]">{{ slotProps.option.name }}</span>
                      <span class="block text-[#292D324D] font-light text-[12px]">{{ slotProps.option.price }}</span>
                      <span class="block text-[#292D324D] font-light text-[12px]">{{ slotProps.option.info }}</span>
                    </div>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <rect width="24" height="24" rx="12" fill="#66C61C"/>
                      <path
                          d="M15.3973 18.6667C14.6952 18.6667 13.9558 18.4993 13.1916 18.1768C12.446 17.8605 11.6943 17.4264 10.9611 16.8993C10.2342 16.3659 9.53209 15.7706 8.86729 15.1194C8.2087 14.4559 7.61224 13.7551 7.08413 13.0357C6.5498 12.2915 6.1211 11.5473 5.81665 10.8279C5.49357 10.059 5.33203 9.31477 5.33203 8.61399C5.33203 8.13027 5.41901 7.67136 5.58677 7.24345C5.76074 6.80314 6.04033 6.39384 6.41933 6.04035C6.89773 5.56903 7.44449 5.33337 8.02852 5.33337C8.27083 5.33337 8.51936 5.38919 8.7306 5.48841C8.97291 5.60004 9.17795 5.76748 9.32706 5.99074L10.7685 8.01865C10.899 8.19849 10.9984 8.37213 11.0667 8.54578C11.1475 8.73182 11.191 8.91787 11.191 9.09772C11.191 9.33337 11.1226 9.56283 10.9922 9.77989C10.899 9.94733 10.7561 10.1272 10.5759 10.307L10.1534 10.7473C10.1596 10.7659 10.1658 10.7783 10.172 10.7907C10.2466 10.921 10.3957 11.1442 10.6815 11.4791C10.986 11.8264 11.2718 12.1427 11.5576 12.4341C11.9241 12.7938 12.2286 13.0791 12.5144 13.3148C12.8685 13.6124 13.0984 13.7613 13.2351 13.8295L13.2227 13.8605L13.6762 13.414C13.8688 13.2217 14.0552 13.0791 14.2354 12.9861C14.5771 12.7752 15.0121 12.738 15.447 12.9179C15.6085 12.9861 15.7825 13.0791 15.9689 13.2093L18.0316 14.6729C18.2615 14.8279 18.4293 15.0264 18.5287 15.2621C18.6219 15.4977 18.6654 15.7148 18.6654 15.9318C18.6654 16.2295 18.597 16.5272 18.4665 16.8062C18.3361 17.0853 18.1745 17.3272 17.9695 17.5504C17.6153 17.9411 17.2301 18.2202 16.7828 18.4C16.3541 18.5737 15.8881 18.6667 15.3973 18.6667ZM8.02852 6.26361C7.6868 6.26361 7.36993 6.41244 7.06549 6.71012C6.77969 6.97678 6.58087 7.26826 6.4566 7.58454C6.32613 7.90702 6.264 8.2481 6.264 8.61399C6.264 9.19074 6.40069 9.8171 6.67406 10.4621C6.95365 11.1194 7.34508 11.8016 7.84213 12.4838C8.33918 13.1659 8.90457 13.8295 9.52588 14.4559C10.1472 15.0698 10.8182 15.6404 11.5079 16.1427C12.1789 16.6326 12.8685 17.0295 13.552 17.3148C14.6144 17.7675 15.6085 17.8729 16.4286 17.5318C16.7455 17.4016 17.0251 17.2031 17.2798 16.9179C17.4227 16.7628 17.5346 16.5954 17.6278 16.3969C17.7023 16.2419 17.7396 16.0807 17.7396 15.9194C17.7396 15.8202 17.721 15.721 17.6713 15.6093C17.6526 15.5721 17.6153 15.5039 17.4973 15.4233L15.4345 13.9597C15.3103 13.8729 15.1984 13.8109 15.0928 13.7675C14.9561 13.7117 14.9002 13.6559 14.689 13.7861C14.5647 13.8481 14.4529 13.9411 14.3286 14.0652L13.8564 14.5303C13.6141 14.7659 13.2413 14.8217 12.9555 14.7163L12.7878 14.6419C12.533 14.5055 12.2348 14.2946 11.9055 14.0155C11.6073 13.7613 11.2842 13.4636 10.8928 13.0791C10.5883 12.769 10.2839 12.4404 9.96701 12.0745C9.67499 11.7334 9.46375 11.4419 9.33327 11.2L9.25872 11.014C9.22144 10.8714 9.20901 10.7907 9.20901 10.7039C9.20901 10.4807 9.28978 10.2822 9.44511 10.1272L9.91109 9.64345C10.0354 9.51942 10.1286 9.40159 10.1907 9.29616C10.2404 9.21554 10.259 9.14733 10.259 9.08531C10.259 9.0357 10.2404 8.96128 10.2093 8.88686C10.1658 8.78764 10.0975 8.67601 10.0105 8.55818L8.56906 6.52407C8.50693 6.43725 8.43237 6.37523 8.33918 6.33182C8.23977 6.28841 8.13414 6.26361 8.02852 6.26361ZM13.2227 13.8667L13.1233 14.2884L13.291 13.8543C13.26 13.8481 13.2351 13.8543 13.2227 13.8667Z"
                          fill="white"/>
                    </svg>
                  </div>
                </div>
              </template>
            </Select>
            <label for="in_label" class="!text-[#292D324D]">Kompaniyalar ro‘yhati</label>
          </FloatLabel>
        </div>
      </div>

      <div v-if="route.params.type == 'passenger'" class="grid grid-cols-10 gap-4 bg-white !p-[16px] rounded-[40px]">
        <div class="col-span-2">
          <FloatLabel variant="in">
            <InputText id="in_label" variant="filled" placeholder="Manzilni tanlang"
                       class="w-full !bg-[#FAFAFA] !rounded-[24px] !pt-[34px] !pb-[18px] !px-[16px] !border-0"/>
            <label for="in_label" class="!text-[#292D324D]">Qayerdan</label>
          </FloatLabel>
        </div>

        <div class="col-span-2">
          <FloatLabel variant="in">
            <InputText id="in_label" variant="filled" placeholder="Manzilni tanlang"
                       class="w-full !bg-[#FAFAFA] !rounded-[24px] !pt-[34px] !pb-[18px] !px-[16px] !border-0"/>
            <label for="in_label" class="!text-[#292D324D]">Qayerga</label>
          </FloatLabel>
        </div>

        <div class="col-span-1">
          <FloatLabel variant="in">
            <DatePicker v-model="value2" inputId="in_label" showIcon iconDisplay="input" variant="filled"
                        class="custom-date"/>
            <label for="in_label" class="!text-[#292D324D]">Jo‘natish sanasi</label>
          </FloatLabel>
        </div>

        <div class="col-span-1">
          <FloatLabel variant="in">
            <InputText id="in_label" variant="filled" placeholder="0" type="number"
                       class="w-full !bg-[#FAFAFA] !rounded-[24px] !pt-[34px] !pb-[18px] !px-[16px] !border-0"/>
            <label for="in_label" class="!text-[#292D324D]">Yo‘lovchi soni</label>
          </FloatLabel>
        </div>

        <div class="col-span-2">

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


            <!--            filter absolute start-->
            <div
                v-if="extraMenu"
                @click.stop
                class="bg-white rounded-[24px] !p-[16px] w-full absolute left-0 top-[130%] max-h-[600px] h-auto overflow-y-auto"
                style="box-shadow: 0px 32px 100px 0px #292D3229;">

              <!--              Yuk turi-->
              <!--              <div>-->
              <!--                <div class="bg-[#FAFAFA] rounded-[50px] !px-[8px] text-[#292D324D] text-[12px] font-medium">-->
              <!--                  Yuk turi-->
              <!--                </div>-->

              <!--                <div>-->
              <!--                  <div class="flex items-center justify-between !py-4 border-b border-[#F5F5F7]">-->
              <!--                    <label for="ingredient2" class="flex flex-col cursor-pointer">-->
              <!--                      <span class="text-[#292D32] font-medium">Boshqa materiallar</span>-->
              <!--                      <span class="text-[#292D324D] text-[12px]">Boshqa materiallar</span>-->
              <!--                    </label>-->
              <!--                    <RadioButton v-model="ingredient2" inputId="ingredient2" name="yuk" value="yuk1"/>-->
              <!--                  </div>-->

              <!--                  <div class="flex items-center justify-between !py-4 border-b border-[#F5F5F7]">-->
              <!--                    <label for="yuk2" class="flex flex-col cursor-pointer">-->
              <!--                      <span class="text-[#292D32] font-medium">Qurilish mollari</span>-->
              <!--                      <span class="text-[#292D324D] text-[12px]">Mebel, plintus, gipsokarton</span>-->
              <!--                    </label>-->
              <!--                    <RadioButton v-model="ingredient2" inputId="yuk2" name="yuk" value="yuk2"/>-->
              <!--                  </div>-->

              <!--                  <div class="flex items-center justify-between !py-4 border-b border-[#F5F5F7]">-->
              <!--                    <label for="yuk3" class="flex flex-col cursor-pointer">-->
              <!--                      <span class="text-[#292D32] font-medium">Oziq ovqat</span>-->
              <!--                      <span class="text-[#292D324D] text-[12px]">Ichimliklar, gazli, mineral suvlar</span>-->
              <!--                    </label>-->
              <!--                    <RadioButton v-model="ingredient2" inputId="yuk3" name="yuk" value="yuk3"/>-->
              <!--                  </div>-->

              <!--                  <div class="flex items-center justify-between !py-4">-->
              <!--                    <label for="yuk4" class="flex flex-col cursor-pointer">-->
              <!--                      <span class="text-[#292D32] font-medium">Uskunalar va ehtiyot qismlar</span>-->
              <!--                      <span class="text-[#292D324D] text-[12px]">kuzovlar, yoritgich, generator</span>-->
              <!--                    </label>-->
              <!--                    <RadioButton v-model="ingredient2" inputId="yuk4" name="yuk" value="yuk4"/>-->
              <!--                  </div>-->

              <!--                </div>-->
              <!--              </div>-->

              <!--              Yuk turi-->

              <!--              Yuklash xizmati-->
              <!--              <div class="!mb-[24px]">-->
              <!--                <div class="bg-[#FAFAFA] rounded-[50px] !px-[8px] text-[#292D324D] text-[12px] font-medium">-->
              <!--                  Yuk turi-->
              <!--                </div>-->

              <!--                <div>-->
              <!--                  <div class="flex items-center justify-between !py-4 border-b border-[#F5F5F7]">-->
              <!--                    <label for="xizmat1" class="flex flex-col cursor-pointer">-->
              <!--                      <span class="text-[#292D32] font-medium">Yuk tashuvchilarsiz</span>-->
              <!--                      <span class="text-[#292D324D] text-[12px]">Yordam kerak emas</span>-->
              <!--                    </label>-->
              <!--                    <RadioButton v-model="ingredient3" inputId="xizmat1" name="xizmati" value="xizmat1"/>-->
              <!--                  </div>-->

              <!--                  <div class="flex items-center justify-between !py-4">-->
              <!--                    <label for="xizmat2" class="flex flex-col cursor-pointer">-->
              <!--                      <span class="text-[#292D32] font-medium">Haydovchi yuklarni tashishi kerak</span>-->
              <!--                      <span class="text-[#292D324D] text-[12px]">50 kgdan ortiq bo’lmagan yuklarni tashish</span>-->
              <!--                    </label>-->
              <!--                    <RadioButton v-model="ingredient3" inputId="xizmat2" name="xizmati" value="xizmat2"/>-->
              <!--                  </div>-->

              <!--                </div>-->
              <!--              </div>-->

              <!--              Yuklash xizmati-->

              <!--              Yuk rasmlari (10 tagacha)-->
              <!--              <div class="!mb-[24px]">-->
              <!--                <div class="bg-[#FAFAFA] rounded-[50px] !px-[8px] text-[#292D324D] text-[12px] font-medium">-->
              <!--                  Yuk rasmlari (10 tagacha)-->
              <!--                </div>-->

              <!--                <div class="grid grid-cols-3 gap-2 !mt-[8px] rounded-2xl">-->
              <!--                  <div v-for="(img, index) in imageList" :key="index" class="relative group !mr-0 w-[105px] h-[105px]">-->
              <!--                    <img class="w-full h-full object-cover rounded-2xl"-->
              <!--                         :src="img" alt="img"-->
              <!--                         width="105">-->

              <!--                    <div-->
              <!--                        class="group-hover:flex hidden absolute top-0 left-0 w-full h-full bg-black bg-opacity-50 rounded-2xl items-center justify-center">-->
              <!--                      <button @click="deleteImage(index)">-->
              <!--                        <i class="pi pi-trash cursor-pointer" style="font-size: 1.5rem; color: red"></i>-->
              <!--                      </button>-->
              <!--                    </div>-->
              <!--                  </div>-->

              <!--                  <label for="fileAnnouncement" class="relative">-->
              <!--                    <button>-->
              <!--                      <svg width="110" height="110" viewBox="0 0 110 110" fill="none"-->
              <!--                           xmlns="http://www.w3.org/2000/svg">-->
              <!--                        <rect x="0.5" y="0.5" width="109" height="109" rx="15.5" stroke="#66C61C"-->
              <!--                              stroke-dasharray="8 8"/>-->
              <!--                        <path d="M55.5046 62V55" stroke="#66C61C" stroke-width="1.5" stroke-linecap="round"-->
              <!--                              stroke-linejoin="round"/>-->
              <!--                        <path d="M53.3164 57L55.5033 54.833L57.6902 57" stroke="#66C61C" stroke-width="1.5"-->
              <!--                              stroke-linecap="round"-->
              <!--                              stroke-linejoin="round"/>-->
              <!--                        <path-->
              <!--                            d="M59.5406 62H62.124C64.0697 62 65.6562 60.428 65.6562 58.5C65.6562 56.572 64.0697 55 62.124 55H61.685V54C61.685 50.69 58.9704 48 55.63 48C52.6257 48 50.135 50.178 49.6628 53.023C47.2639 53.144 45.3516 55.093 45.3516 57.5C45.3516 59.985 47.385 62 49.8928 62H51.4672"-->
              <!--                            stroke="#66C61C" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>-->
              <!--                      </svg>-->

              <!--                      <input @change="handleFileUpload" class="absolute opacity-0 inset-0 cursor-pointer"-->
              <!--                             id="fileAnnouncement" type="file"-->
              <!--                             accept="image/*">-->

              <!--                    </button>-->
              <!--                  </label>-->
              <!--                </div>-->

              <!--              </div>-->

              <!--              Yuk rasmlari (10 tagacha)-->

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
          </div>

        </div>

        <div class="col-span-2">
          <FloatLabel variant="in">
            <Select v-model="selectedCountry" :options="countries" optionLabel="name" placeholder="Transportni tanlang"
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
                      <path d="M8.33203 11.9999H15.6654M15.6654 11.9999L12.6065 9.33325M15.6654 11.9999L12.6065 14.6666"
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

      <div v-if="route.params.type == 'technical'" class="grid grid-cols-8 gap-4 bg-white !p-[16px] rounded-[40px]">

        <div class="col-span-2">
          <FloatLabel variant="in">
            <InputText id="in_label" variant="filled" placeholder="Manzilni tanlang"
                       class="w-full !bg-[#FAFAFA] !rounded-[24px] !pt-[34px] !pb-[18px] !px-[16px] !border-0"/>
            <label for="in_label" class="!text-[#292D324D]">Qayerga</label>
          </FloatLabel>
        </div>

        <div class="col-span-1">
          <FloatLabel variant="in">
            <DatePicker v-model="value2" inputId="in_label" showIcon iconDisplay="input" variant="filled"
                        class="custom-date"/>
            <label for="in_label" class="!text-[#292D324D]">Qaysi sanadan</label>
          </FloatLabel>
        </div>

        <div class="col-span-1">
          <FloatLabel variant="in">
            <DatePicker v-model="value2" inputId="in_label" showIcon iconDisplay="input" variant="filled"
                        class="custom-date"/>
            <label for="in_label" class="!text-[#292D324D]">Qaysi sanagacha</label>
          </FloatLabel>
        </div>

        <div class="col-span-2">

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


            <!--            filter absolute start-->
            <div
                v-if="extraMenu"
                class="bg-white rounded-[24px] !p-[16px] w-full absolute left-0 top-[130%] max-h-[600px] h-auto overflow-y-auto"
                style="box-shadow: 0px 32px 100px 0px #292D3229;">

              <!--              Yuk turi-->
              <!--              <div>-->
              <!--                <div class="bg-[#FAFAFA] rounded-[50px] !px-[8px] text-[#292D324D] text-[12px] font-medium">-->
              <!--                  Yuk turi-->
              <!--                </div>-->

              <!--                <div>-->
              <!--                  <div class="flex items-center justify-between !py-4 border-b border-[#F5F5F7]">-->
              <!--                    <label for="ingredient2" class="flex flex-col cursor-pointer">-->
              <!--                      <span class="text-[#292D32] font-medium">Boshqa materiallar</span>-->
              <!--                      <span class="text-[#292D324D] text-[12px]">Boshqa materiallar</span>-->
              <!--                    </label>-->
              <!--                    <RadioButton v-model="ingredient2" inputId="ingredient2" name="yuk" value="yuk1"/>-->
              <!--                  </div>-->

              <!--                  <div class="flex items-center justify-between !py-4 border-b border-[#F5F5F7]">-->
              <!--                    <label for="yuk2" class="flex flex-col cursor-pointer">-->
              <!--                      <span class="text-[#292D32] font-medium">Qurilish mollari</span>-->
              <!--                      <span class="text-[#292D324D] text-[12px]">Mebel, plintus, gipsokarton</span>-->
              <!--                    </label>-->
              <!--                    <RadioButton v-model="ingredient2" inputId="yuk2" name="yuk" value="yuk2"/>-->
              <!--                  </div>-->

              <!--                  <div class="flex items-center justify-between !py-4 border-b border-[#F5F5F7]">-->
              <!--                    <label for="yuk3" class="flex flex-col cursor-pointer">-->
              <!--                      <span class="text-[#292D32] font-medium">Oziq ovqat</span>-->
              <!--                      <span class="text-[#292D324D] text-[12px]">Ichimliklar, gazli, mineral suvlar</span>-->
              <!--                    </label>-->
              <!--                    <RadioButton v-model="ingredient2" inputId="yuk3" name="yuk" value="yuk3"/>-->
              <!--                  </div>-->

              <!--                  <div class="flex items-center justify-between !py-4">-->
              <!--                    <label for="yuk4" class="flex flex-col cursor-pointer">-->
              <!--                      <span class="text-[#292D32] font-medium">Uskunalar va ehtiyot qismlar</span>-->
              <!--                      <span class="text-[#292D324D] text-[12px]">kuzovlar, yoritgich, generator</span>-->
              <!--                    </label>-->
              <!--                    <RadioButton v-model="ingredient2" inputId="yuk4" name="yuk" value="yuk4"/>-->
              <!--                  </div>-->

              <!--                </div>-->
              <!--              </div>-->

              <!--              Yuk turi-->

              <!--              Yuklash xizmati-->
              <!--              <div class="!mb-[24px]">-->
              <!--                <div class="bg-[#FAFAFA] rounded-[50px] !px-[8px] text-[#292D324D] text-[12px] font-medium">-->
              <!--                  Yuk turi-->
              <!--                </div>-->

              <!--                <div>-->
              <!--                  <div class="flex items-center justify-between !py-4 border-b border-[#F5F5F7]">-->
              <!--                    <label for="xizmat1" class="flex flex-col cursor-pointer">-->
              <!--                      <span class="text-[#292D32] font-medium">Yuk tashuvchilarsiz</span>-->
              <!--                      <span class="text-[#292D324D] text-[12px]">Yordam kerak emas</span>-->
              <!--                    </label>-->
              <!--                    <RadioButton v-model="ingredient3" inputId="xizmat1" name="xizmati" value="xizmat1"/>-->
              <!--                  </div>-->

              <!--                  <div class="flex items-center justify-between !py-4">-->
              <!--                    <label for="xizmat2" class="flex flex-col cursor-pointer">-->
              <!--                      <span class="text-[#292D32] font-medium">Haydovchi yuklarni tashishi kerak</span>-->
              <!--                      <span class="text-[#292D324D] text-[12px]">50 kgdan ortiq bo’lmagan yuklarni tashish</span>-->
              <!--                    </label>-->
              <!--                    <RadioButton v-model="ingredient3" inputId="xizmat2" name="xizmati" value="xizmat2"/>-->
              <!--                  </div>-->

              <!--                </div>-->
              <!--              </div>-->

              <!--              Yuklash xizmati-->

              <!--              Yuk rasmlari (10 tagacha)-->
              <!--              <div class="!mb-[24px]">-->
              <!--                <div class="bg-[#FAFAFA] rounded-[50px] !px-[8px] text-[#292D324D] text-[12px] font-medium">-->
              <!--                  Yuk rasmlari (10 tagacha)-->
              <!--                </div>-->

              <!--                <div class="grid grid-cols-3 gap-2 !mt-[8px] rounded-2xl">-->
              <!--                  <div v-for="(img, index) in imageList" :key="index" class="relative group !mr-0 w-[105px] h-[105px]">-->
              <!--                    <img class="w-full h-full object-cover rounded-2xl"-->
              <!--                         :src="img" alt="img"-->
              <!--                         width="105">-->

              <!--                    <div-->
              <!--                        class="group-hover:flex hidden absolute top-0 left-0 w-full h-full bg-black bg-opacity-50 rounded-2xl items-center justify-center">-->
              <!--                      <button @click="deleteImage(index)">-->
              <!--                        <i class="pi pi-trash cursor-pointer" style="font-size: 1.5rem; color: red"></i>-->
              <!--                      </button>-->
              <!--                    </div>-->
              <!--                  </div>-->

              <!--                  <label for="fileAnnouncement" class="relative">-->
              <!--                    <button>-->
              <!--                      <svg width="110" height="110" viewBox="0 0 110 110" fill="none"-->
              <!--                           xmlns="http://www.w3.org/2000/svg">-->
              <!--                        <rect x="0.5" y="0.5" width="109" height="109" rx="15.5" stroke="#66C61C"-->
              <!--                              stroke-dasharray="8 8"/>-->
              <!--                        <path d="M55.5046 62V55" stroke="#66C61C" stroke-width="1.5" stroke-linecap="round"-->
              <!--                              stroke-linejoin="round"/>-->
              <!--                        <path d="M53.3164 57L55.5033 54.833L57.6902 57" stroke="#66C61C" stroke-width="1.5"-->
              <!--                              stroke-linecap="round"-->
              <!--                              stroke-linejoin="round"/>-->
              <!--                        <path-->
              <!--                            d="M59.5406 62H62.124C64.0697 62 65.6562 60.428 65.6562 58.5C65.6562 56.572 64.0697 55 62.124 55H61.685V54C61.685 50.69 58.9704 48 55.63 48C52.6257 48 50.135 50.178 49.6628 53.023C47.2639 53.144 45.3516 55.093 45.3516 57.5C45.3516 59.985 47.385 62 49.8928 62H51.4672"-->
              <!--                            stroke="#66C61C" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>-->
              <!--                      </svg>-->

              <!--                      <input @change="handleFileUpload" class="absolute opacity-0 inset-0 cursor-pointer"-->
              <!--                             id="fileAnnouncement" type="file"-->
              <!--                             accept="image/*">-->

              <!--                    </button>-->
              <!--                  </label>-->
              <!--                </div>-->

              <!--              </div>-->

              <!--              Yuk rasmlari (10 tagacha)-->

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
          </div>

        </div>

        <div class="col-span-2">
          <FloatLabel variant="in">
            <Select v-model="selectedCountry" :options="countries" optionLabel="name" placeholder="Transportni tanlang"
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
                      <path d="M8.33203 11.9999H15.6654M15.6654 11.9999L12.6065 9.33325M15.6654 11.9999L12.6065 14.6666"
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

      <div v-if="route.params.type == 'transfer'" class="grid grid-cols-10 gap-4 bg-white !p-[16px] rounded-[40px]">
        <div class="col-span-2">
          <FloatLabel variant="in">
            <InputText id="in_label" variant="filled" placeholder="Manzilni tanlang"
                       class="w-full !bg-[#FAFAFA] !rounded-[24px] !pt-[34px] !pb-[18px] !px-[16px] !border-0"/>
            <label for="in_label" class="!text-[#292D324D]">Qayerdan</label>
          </FloatLabel>
        </div>

        <div class="col-span-2">
          <FloatLabel variant="in">
            <InputText id="in_label" variant="filled" placeholder="Manzilni tanlang"
                       class="w-full !bg-[#FAFAFA] !rounded-[24px] !pt-[34px] !pb-[18px] !px-[16px] !border-0"/>
            <label for="in_label" class="!text-[#292D324D]">Qayerga</label>
          </FloatLabel>
        </div>

        <div class="col-span-1">
          <FloatLabel variant="in">
            <DatePicker v-model="value2" inputId="in_label" showIcon iconDisplay="input" variant="filled"
                        class="custom-date"/>
            <!--            <InputText id="in_label" variant="filled" placeholder="Manzilni tanlang"-->
            <!--                       class="w-full bg-[#FAFAFA] !rounded-[24px] !pt-[34px] !pb-[18px] !px-[16px] !border-0"/>-->
            <label for="in_label" class="!text-[#292D324D]">Jo‘natish sanasi</label>
          </FloatLabel>
        </div>

        <div class="col-span-1">
          <FloatLabel variant="in">
            <InputText id="in_label" variant="filled" placeholder="0" type="number"
                       class="w-full !bg-[#FAFAFA] !rounded-[24px] !pt-[34px] !pb-[18px] !px-[16px] !border-0"/>
            <label for="in_label" class="!text-[#292D324D]">Transport soni</label>
          </FloatLabel>
        </div>

        <div class="col-span-2">

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


            <!--            filter absolute start-->
            <div
                v-if="extraMenu"
                class="bg-white rounded-[24px] !p-[16px] w-full absolute left-0 top-[130%] max-h-[600px] h-auto overflow-y-auto"
                style="box-shadow: 0px 32px 100px 0px #292D3229;">

              <!--              Yuk turi-->
              <!--              <div>-->
              <!--                <div class="bg-[#FAFAFA] rounded-[50px] !px-[8px] text-[#292D324D] text-[12px] font-medium">-->
              <!--                  Yuk turi-->
              <!--                </div>-->

              <!--                <div>-->
              <!--                  <div class="flex items-center justify-between !py-4 border-b border-[#F5F5F7]">-->
              <!--                    <label for="ingredient2" class="flex flex-col cursor-pointer">-->
              <!--                      <span class="text-[#292D32] font-medium">Boshqa materiallar</span>-->
              <!--                      <span class="text-[#292D324D] text-[12px]">Boshqa materiallar</span>-->
              <!--                    </label>-->
              <!--                    <RadioButton v-model="ingredient2" inputId="ingredient2" name="yuk" value="yuk1"/>-->
              <!--                  </div>-->

              <!--                  <div class="flex items-center justify-between !py-4 border-b border-[#F5F5F7]">-->
              <!--                    <label for="yuk2" class="flex flex-col cursor-pointer">-->
              <!--                      <span class="text-[#292D32] font-medium">Qurilish mollari</span>-->
              <!--                      <span class="text-[#292D324D] text-[12px]">Mebel, plintus, gipsokarton</span>-->
              <!--                    </label>-->
              <!--                    <RadioButton v-model="ingredient2" inputId="yuk2" name="yuk" value="yuk2"/>-->
              <!--                  </div>-->

              <!--                  <div class="flex items-center justify-between !py-4 border-b border-[#F5F5F7]">-->
              <!--                    <label for="yuk3" class="flex flex-col cursor-pointer">-->
              <!--                      <span class="text-[#292D32] font-medium">Oziq ovqat</span>-->
              <!--                      <span class="text-[#292D324D] text-[12px]">Ichimliklar, gazli, mineral suvlar</span>-->
              <!--                    </label>-->
              <!--                    <RadioButton v-model="ingredient2" inputId="yuk3" name="yuk" value="yuk3"/>-->
              <!--                  </div>-->

              <!--                  <div class="flex items-center justify-between !py-4">-->
              <!--                    <label for="yuk4" class="flex flex-col cursor-pointer">-->
              <!--                      <span class="text-[#292D32] font-medium">Uskunalar va ehtiyot qismlar</span>-->
              <!--                      <span class="text-[#292D324D] text-[12px]">kuzovlar, yoritgich, generator</span>-->
              <!--                    </label>-->
              <!--                    <RadioButton v-model="ingredient2" inputId="yuk4" name="yuk" value="yuk4"/>-->
              <!--                  </div>-->

              <!--                </div>-->
              <!--              </div>-->

              <!--              Yuk turi-->

              <!--              Yuklash xizmati-->
              <!--              <div class="!mb-[24px]">-->
              <!--                <div class="bg-[#FAFAFA] rounded-[50px] !px-[8px] text-[#292D324D] text-[12px] font-medium">-->
              <!--                  Yuk turi-->
              <!--                </div>-->

              <!--                <div>-->
              <!--                  <div class="flex items-center justify-between !py-4 border-b border-[#F5F5F7]">-->
              <!--                    <label for="xizmat1" class="flex flex-col cursor-pointer">-->
              <!--                      <span class="text-[#292D32] font-medium">Yuk tashuvchilarsiz</span>-->
              <!--                      <span class="text-[#292D324D] text-[12px]">Yordam kerak emas</span>-->
              <!--                    </label>-->
              <!--                    <RadioButton v-model="ingredient3" inputId="xizmat1" name="xizmati" value="xizmat1"/>-->
              <!--                  </div>-->

              <!--                  <div class="flex items-center justify-between !py-4">-->
              <!--                    <label for="xizmat2" class="flex flex-col cursor-pointer">-->
              <!--                      <span class="text-[#292D32] font-medium">Haydovchi yuklarni tashishi kerak</span>-->
              <!--                      <span class="text-[#292D324D] text-[12px]">50 kgdan ortiq bo’lmagan yuklarni tashish</span>-->
              <!--                    </label>-->
              <!--                    <RadioButton v-model="ingredient3" inputId="xizmat2" name="xizmati" value="xizmat2"/>-->
              <!--                  </div>-->

              <!--                </div>-->
              <!--              </div>-->

              <!--              Yuklash xizmati-->

              <!--              Yuk rasmlari (10 tagacha)-->
              <!--              <div class="!mb-[24px]">-->
              <!--                <div class="bg-[#FAFAFA] rounded-[50px] !px-[8px] text-[#292D324D] text-[12px] font-medium">-->
              <!--                  Yuk rasmlari (10 tagacha)-->
              <!--                </div>-->

              <!--                <div class="grid grid-cols-3 gap-2 !mt-[8px] rounded-2xl">-->
              <!--                  <div v-for="(img, index) in imageList" :key="index" class="relative group !mr-0 w-[105px] h-[105px]">-->
              <!--                    <img class="w-full h-full object-cover rounded-2xl"-->
              <!--                         :src="img" alt="img"-->
              <!--                         width="105">-->

              <!--                    <div-->
              <!--                        class="group-hover:flex hidden absolute top-0 left-0 w-full h-full bg-black bg-opacity-50 rounded-2xl items-center justify-center">-->
              <!--                      <button @click="deleteImage(index)">-->
              <!--                        <i class="pi pi-trash cursor-pointer" style="font-size: 1.5rem; color: red"></i>-->
              <!--                      </button>-->
              <!--                    </div>-->
              <!--                  </div>-->

              <!--                  <label for="fileAnnouncement" class="relative">-->
              <!--                    <button>-->
              <!--                      <svg width="110" height="110" viewBox="0 0 110 110" fill="none"-->
              <!--                           xmlns="http://www.w3.org/2000/svg">-->
              <!--                        <rect x="0.5" y="0.5" width="109" height="109" rx="15.5" stroke="#66C61C"-->
              <!--                              stroke-dasharray="8 8"/>-->
              <!--                        <path d="M55.5046 62V55" stroke="#66C61C" stroke-width="1.5" stroke-linecap="round"-->
              <!--                              stroke-linejoin="round"/>-->
              <!--                        <path d="M53.3164 57L55.5033 54.833L57.6902 57" stroke="#66C61C" stroke-width="1.5"-->
              <!--                              stroke-linecap="round"-->
              <!--                              stroke-linejoin="round"/>-->
              <!--                        <path-->
              <!--                            d="M59.5406 62H62.124C64.0697 62 65.6562 60.428 65.6562 58.5C65.6562 56.572 64.0697 55 62.124 55H61.685V54C61.685 50.69 58.9704 48 55.63 48C52.6257 48 50.135 50.178 49.6628 53.023C47.2639 53.144 45.3516 55.093 45.3516 57.5C45.3516 59.985 47.385 62 49.8928 62H51.4672"-->
              <!--                            stroke="#66C61C" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>-->
              <!--                      </svg>-->

              <!--                      <input @change="handleFileUpload" class="absolute opacity-0 inset-0 cursor-pointer"-->
              <!--                             id="fileAnnouncement" type="file"-->
              <!--                             accept="image/*">-->

              <!--                    </button>-->
              <!--                  </label>-->
              <!--                </div>-->

              <!--              </div>-->

              <!--              Yuk rasmlari (10 tagacha)-->

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
          </div>

        </div>

        <div class="col-span-2">
          <FloatLabel variant="in">
            <Select v-model="transport" :options="transportList" :optionDisabled="(el) => el.disabled"
                    optionLabel="name" placeholder="Transportni tanlang"
                    class="w-full !bg-[#FAFAFA] !border-0 !rounded-[24px] custom-placeholder-select h-[76px] flex items-center">
              <template #value="slotProps">
                <div v-if="slotProps.value" class="flex items-center">
                  <div>{{ slotProps.value.name }}</div>
                </div>
                <span v-else>
                    {{ slotProps.placeholder }}
                </span>
              </template>
              <template #option="slotProps">
                <div class="flex items-center grow border-b border-[#C2C2C233] !pb-2">
                  <div class="flex items-center justify-between grow">
                    <div>
                      <span class="block text-[#292D32]">{{ slotProps.option.name }}</span>
                      <span class="block text-[#292D324D] font-light text-[12px]">{{ slotProps.option.info }}</span>
                    </div>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <rect width="24" height="24" rx="12" fill="#66C61C"/>
                      <path d="M8.33203 11.9999H15.6654M15.6654 11.9999L12.6065 9.33325M15.6654 11.9999L12.6065 14.6666"
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

    </div>

    <div v-if="route.params.type !== 'oil'"
         class="bg-white rounded-[32px] !p-[16px] absolute bottom-[20px] right-[20px] z-[100] w-[368px]">
      <button class="bg-[#66C61C] w-full text-center rounded-[24px] text-white text-[16px] !p-[16px]">
        E’lonni joylash
      </button>
    </div>


    <div
        width="100%"
        style="width: 100%; height: 100vh; top: 0; left: 0"
    >
      <YMap :location="LOCATION" :ref="refMap">
        <YMapDefaultSchemeLayer/>
        <YMapDefaultFeaturesLayer/>
        <YMapFeatureDataSource id="clusterer-source"/>
        <YMapLayer source="clusterer-source" type="markers" :zIndex="1800"/>

        <YMapClusterer ref="mapCluster" :method="gridSizedMethod" :features="_markers">
          <template #marker="{feature}">
            <YMapMarker
                draggable
                v-bind="{
                  size: 'normal',
                  iconName: 'fallback',
                }"
                :key="feature.id"
                :coordinates="feature.geometry.coordinates"
                :onDragEnd="(e) => console.log('drag end', e)"
                source="clusterer-source"
            >
              <div class="map-geo-icon">
                <img width="24" height="24" src="@/assets/icons/map-pin.svg" alt="">
              </div>
            </YMapMarker>
          </template>
          <template #cluster="{coordinates, features}">
            <YMapMarker
                :key="features[0].id + features.length"
                :coordinates="coordinates"
                draggable
                source="clusterer-source">
              <div class="map-geo-icon">
                <img width="24" height="24" src="@/assets/icons/map-pin.svg" alt="">

              </div>
            </YMapMarker>
          </template>
        </YMapClusterer>
        <YMapControls position="right">
          <YMapGeolocationControl v-bind="{easing: 'ease-in-out', duration: 1000, zoom: 15}"/>

          <YMapZoomControl/>
        </YMapControls>
        <YMapListener
            @click="changeMarkerPosition"
        />
      </YMap>
    </div>
  </div>
</template>

<style lang="scss">
.p-floatlabel label {
  top: 1rem !important;
}

.map-geo-icon {
  width: 56px;
  height: 56px;
  border-radius: 100%;
  padding: 8px;
  background: white;
  transform: translate(-50%, calc(-100% + 2px));
  position: absolute;

  img {
    width: 40px;
    height: 40px;
  }

}

.custom-date input {
  border: none;
  height: 76px;
  border-radius: 24px;
  background-color: #FAFAFA !important;
}

.no-scrollbar::-webkit-scrollbar {
  display: none;
}

/* Hide scrollbar for IE, Edge and Firefox */
.no-scrollbar {
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
}

.p-select-overlay {
  top: 235px !important;
  border-radius: 24px !important;
  padding: 12px 20px !important;
}

.p-select-list-container {
  @apply no-scrollbar
}

.p-menu {
  border-radius: 16px !important;
}

.p-menu-item-content {
  padding: 8px 12px !important;
  border-radius: 16px !important;
}

.p-select-list-container {
  min-height: 500px;
}
</style>
