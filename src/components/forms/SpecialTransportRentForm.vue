<script setup lang="ts">
import {Field, Form} from 'vee-validate'
import LocationItem from '@/components/form-elements/LocationItem.vue';
import {inject, onMounted, onUnmounted, ref, watch} from 'vue'
import getGeoObject from '@/composables/getGeoObject';
import useMapStore from '@/stores/map.store';
import {ADV_TYPES} from '@/constants'
import {specialTechniqueSchema} from '@/components/form-elements/schema';
import {useI18n} from 'vue-i18n'

const {t} = useI18n()
const $api = inject('api')
const mapStore = useMapStore()
const props = defineProps({
  serviceTypeId: {
    type: Number,
    default: null
  },
  show: {
    type: Boolean,
    default: false
  }
})
const $auth = inject('auth')

const dateRef = ref(null)
const mainForm = ref(null)
const hideDetailsOnLocationChange = ref(false)
const isSubmited = ref(false)
const emit = defineEmits(['on:success', 'auth:invalid'])
const transports = ref([])
const isLoading = ref(false)
const selectedTransports = ref(null)
const setLocation = (name) => {
  mapStore.setMarker({
    id: name,
    marker: {
      id: name,
      markerProps: {
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: mapStore.defaultCoordinates
        }
      },
      callback: async (e) => {
        await getGeoObject({cord: e.coordinates}).then(res => {
          const marker = mapStore.getMarker(name)
          mainForm.value.setFieldValue(name, {
            lat: marker.markerProps.geometry.coordinates[0],
            lng: marker.markerProps.geometry.coordinates[1],
            name: res.data.description
          })
          mapStore.removeMarker(name)
        }).finally(() => {
          hideDetailsOnLocationChange.value = false
        })
      }
    }
  }, name)
  // hideDetailsOnLocationChange.value = true
}
const setSelectedLocation = async (address, name) => {
  await getGeoObject({address: address})
      .then(res => {
        const marker = mapStore.getMarker(name)
        mainForm.value.setFieldValue(name, {
          lat: marker.markerProps.geometry.coordinates[0],
          lng: marker.markerProps.geometry.coordinates[1],
          name: address
        })
        mapStore.removeMarker(name)
      }).finally(() => {
        hideDetailsOnLocationChange.value = false
      })
}
const onChangeDate = (e: Date, name) => {
  mainForm.value.setFieldValue(name, dateRef.value.formatDate(e, 'dd.mm.yy'))
}
const showDetails = ref(false)
const toggleShowDetails = () => {
  showDetails.value = !showDetails.value
}
const detailsWrapper = ref(null)

const clickOutSideDetails = e => {
  if (!detailsWrapper.value.contains(e.target)) {
    showDetails.value = false
  }
}

const registerClickOutside = (e) => {
  if (e) {
    // Use setTimeout to add the listener on the next event cycle
    setTimeout(() => {
      document.addEventListener('click', clickOutSideDetails)
    }, 0)
  } else {
    document.removeEventListener('click', clickOutSideDetails)
  }
}

watch(showDetails, (e) => {
  if (e) {
    registerClickOutside(e)
  } else {
    registerClickOutside(e)
  }
})
const paymentTypes = ref([
  {
    name: t('cash'),
    value: 'CASH',
    icon: `
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

    `
  },
  {
    name: t('card'),
    value: 'CARD',
    icon: `
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

    `
  }
])

const onSaveDetails = () => {
  showDetails.value = false
}

const staticValues = ref({
  service_type_id: props.serviceTypeId,
  adv_type: ADV_TYPES.receive,
  price: 0,
  details: {
    from_date: null,
    to_date: null
  },
  note: '',
  pay_type: 'CASH'
})

const submit = () => {
  mainForm.value.validate()
      .then(res => {
        if (res.valid) {
          if (!$auth.loggedIn) {
            return emit('auth:invalid')
          }
          isSubmited.value = true
          $api.advertisement.createAdvertisement(mainForm.value.getValues())
              .then(response => {
                mainForm.value.resetForm()
                emit('on:success')
                selectedTransports.value = null
              })
              .finally(() => {
                isSubmited.value = false
              })
        }
      })
}

const updateTransportType = (e) => {
  mainForm.value.setFieldValue('details.transportation_type_id', e.id)
  selectedTransports.value = e
}
onMounted(() => {
  isLoading.value = true
  $api.transport.getTransportByServiceId(props.serviceTypeId)
      .then(res => {
        transports.value = res.data
      })
      .finally(() => isLoading.value = false)
})
onUnmounted(() => {
  registerClickOutside(false)
})
</script>

<template>
  <Form
      v-slot="{values, errors}"
      ref="mainForm"
      as="div"
      :initial-values="staticValues"
      :validation-schema="specialTechniqueSchema"
      class="navbar-items__form min-w-[360px] flex items-start !transition-all"
      :class="{
            '_form-active': show,
            hideDetailsOnLocationChange: hideDetailsOnLocationChange
          }"
  >
    <div class="navbar-items__divider"/>
    <div
        class="flex flex-col h-full w-full gap-4 !p-[16px]"
    >

      <LocationItem
          :class="{
        _invalid: (errors['to_location.lat'] || errors['to_location.lng'])
      }"
          @on:select="setSelectedLocation($event,'to_location')"

          :location="values.to_location"
          as="div"
          class="col-span-full"
          name="to_location"
          @click="setLocation('to_location')"
      />
      <Field
          v-slot="{field}"
          name="details.from_date"
          :class="{
                _invalid: errors['details.from_date']
              }"
          as="div"
          class=" !px-[4px]  col-span-full"
      >
        <FloatLabel variant="in">
          <DatePicker
              :model-value="values.details.from_date"
              ref="dateRef"
              dateFormat="dd/mm/yy"
              inputId="in_label"
              showIcon
              @update:model-value="onChangeDate($event, field.name)"
              iconDisplay="input"
              variant="filled"
              class="custom-date w-full"
          />
          <!--            <InputText id="in_label" variant="filled" placeholder="Manzilni tanlang"-->
          <!--                       class="w-full bg-[#FAFAFA] !rounded-[24px] !pt-[34px] !pb-[18px] !px-[16px] !border-0"/>-->
          <label for="in_label" class="text-[#292D324D] dark:!text-white">
            {{ $t('fromWhatDay') }}
          </label>
        </FloatLabel>
      </Field>
      <Field
          v-slot="{field}"
          name="details.to_date"
          :class="{
                _invalid: errors['details.to_date']
              }"
          as="div"
          class=" !px-[4px]  col-span-full"
      >
        <FloatLabel variant="in">
          <DatePicker
              :model-value="values.details.to_date"
              ref="dateRef"
              dateFormat="dd/mm/yy"
              inputId="in_label"
              showIcon
              @update:model-value="onChangeDate($event, field.name)"
              iconDisplay="input"
              variant="filled"
              class="custom-date w-full"
          />
          <!--            <InputText id="in_label" variant="filled" placeholder="Manzilni tanlang"-->
          <!--                       class="w-full bg-[#FAFAFA] !rounded-[24px] !pt-[34px] !pb-[18px] !px-[16px] !border-0"/>-->
          <label for="in_label" class="text-[#292D324D] dark:!text-white">
            {{ $t('toWhatDay') }}
          </label>
        </FloatLabel>
      </Field>

      <div class="col-span-full">
        <div
            @click="toggleShowDetails"
            :class="{
                _invalid: errors.price
              }"
            class="w-full bg-[#FAFAFA] dark:!bg-zinc-700 border-0 !rounded-[24px] h-[76px] !px-[16px] !pt-[12px] cursor-pointer relative"
        >
            <span class="text-[#292D324D] text-[12px] !mb-2">
              {{ $t('additionalInfo') }}
            </span>
          <div class="flex items-center justify-between !bg-transparent">
            <span class="text-[#292D32]">
<!--              {{ $t('description') }}, {{ $t('paymentType') }}, {{ $t('price') }}-->
            </span>
            <svg
                :style="{
              transform: showDetails ? 'rotate(90deg)' : 'rotate(180deg)'
            }"
                width="12"
                height="8"
                viewBox="0 0 12 8"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
              <path
                  d="M1 6.5L6 1.5L11 6.5"
                  stroke="#292D32"
                  stroke-opacity="0.3"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
              />
            </svg>
          </div>

        </div>

      </div>
      <Field
          name="details.transportation_type_id"
          as="div"
          :class="{
                _invalid: (errors['details.transportation_type_id'])
              }"
          class="col-span-full !px-[4px]"
      >
        <FloatLabel variant="in">
          <Select :loading="isLoading" :model-value="selectedTransports"
                  @update:model-value="updateTransportType" :options="transports"
                  optionLabel="name"
                  :placeholder="$t('pickTransport')"
                  class="w-full bg-[#FAFAFA] dark:!bg-zinc-700 !border-0 !rounded-[24px] custom-placeholder-select h-[76px] flex items-center">
            <template #value="slotProps">
              <div v-if="slotProps.value" class="flex items-center !bg-transparent">
                <img :alt="slotProps.value.name"
                     :src="slotProps.value.icon"
                     class="mr-2" style="width: 80px; height: 40px; object-fit: contain"/>
                <p>{{ slotProps.value.name }}</p>
              </div>
              <span v-else>
                    {{ slotProps.placeholder }}
                </span>
            </template>
            <template #option="slotProps">
              <div class="flex items-center grow">
                <img
                    :alt="slotProps.option.name"
                    :src="slotProps.option.icon"
                    :class="`mr-2`"
                    style="width: 94px; height: 73px; object-fit: contain"
                />
                <div class="flex items-center justify-between grow">
                  <div>
                    <span class="block">{{ slotProps.option.name }}</span>
                  </div>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect width="24" height="24" rx="12" fill="#66C61C"/>
                    <path
                        d="M8.33203 11.9999H15.6654M15.6654 11.9999L12.6065 9.33325M15.6654 11.9999L12.6065 14.6666"
                        stroke="white"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                    />
                  </svg>


                </div>
              </div>
            </template>
          </Select>
          <label for="in_label" class="text-[#292D324D] dark:!text-white">{{ $t('transportType') }}</label>
        </FloatLabel>
      </Field>

      <Field name="service_type_id">
        <input :value="serviceTypeId" type="hidden">
      </Field>
      <button
          @click="submit"
          class="!bg-[#66C61C] !py-[16px] flex items-center justify-center gap-2 text-white text-[16px] rounded-[20px] !mt-auto w-full"
      >
        {{ $t('createAdvertisement') }}

        <svg
            v-if="isSubmited"
            class="mr-3 -ml-1 size-5 animate-spin text-white"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
        >
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path
              class="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          ></path>
        </svg>
      </button>
    </div>
    <div
        v-show="show && showDetails"
        @click.stop
        ref="detailsWrapper"
        class="bg-white rounded-[24px] !p-[16px] w-full absolute
              gap-y-[13px] left-[110%] bottom-0 top-[0] max-h-[100vh] h-max !mt-auto !mb-auto overflow-y-auto"
        style="box-shadow: 0 32px 100px 0 #292D3229;"
    >
      <div>
        <Field as="div" name="note" class="flex flex-col gap-2 w-full !mb-[24px]">
          <label for="description" class="text-[#292D3280] text-[12px]">{{ $t('description') }}</label>
          <Textarea :model-value="values.note" id="description"
                    class="w-full dark:!bg-zinc-700 !rounded-[16px] dark:!placeholder-white placeholder-[#292D324D]"
                    style="border: 1px solid #C2C2C233" rows="3"
                    cols="30"
                    :placeholder="$t('leaveOrderComment')"/>
        </Field>
        <Field name="pay_type" v-slot="{handleChange }" as="div" class="!mb-[24px]">
          <span class="bg-[#FAFAFA] dark:!bg-zinc-700 rounded-[50px] !px-[8px] text-sm text-[#292D324D]">
                {{ $t('paymentType') }}
              </span>

          <div v-for="paymentType in paymentTypes" :key="paymentType.value">
            <div class="flex items-center justify-between !py-4 border-b border-[#F5F5F7]">
              <label
                  :for="`paymentType.${paymentType.value}`"
                  class="flex items-center gap-4 cursor-pointer"
              >
                <span v-html="paymentType.icon"/>
                {{ paymentType.name }}
              </label>
              <RadioButton
                  :model-value="values.pay_type"
                  :inputId="`paymentType.${paymentType.value}`"
                  name="pay_type"
                  :value="paymentType.value"
                  @update:model-value="handleChange"
              />

            </div>
          </div>
        </Field>

        <Field as="div" name="price" class="flex flex-col gap-2">
          <label for="price" class="text-[#292D324D] txt-[12px]">{{ $t('price') }}</label>
          <InputText
              :model-value="values.price"
              type="number"
              :class="{
                _invalid: errors['price']
              }"
              class="!py-[12px] !px-[16px] !rounded-[16px] border border-[#C2C2C233] !placeholder-[#292D324D]"
              id="price"
              aria-describedby="username-help"
              :placeholder="$t('enterPrice')"
          />
        </Field>
      </div>
      <div class="footer">
        <button
            @click="onSaveDetails"
            class="!p-[16px] bg-[#66C61C] rounded-[24px] text-white text-center w-full !mt-[72px] text-[16px]"
        >
          {{ $t('confirm') }}
        </button>
      </div>
    </div>


  </Form>
</template>

<style scoped lang="scss">
.hideDetailsOnLocationChange {
  transform: translateX(-100%) !important;
  visibility: hidden !important;
  width: 0 !important;
}

</style>
