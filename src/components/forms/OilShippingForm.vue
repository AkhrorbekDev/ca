<script setup lang="ts">
import {Field, Form} from 'vee-validate'
import {oilTransfer} from "@/components/form-elements/schema";
import LocationItem from "@/components/form-elements/LocationItem.vue";
import {inject, onMounted, ref} from 'vue'
import getGeoObject from "@/composables/getGeoObject";
import useMapStore from "@/stores/map.store";
import {ADV_TYPES} from '@/constants'

const $api = inject('api')
const mapStore = useMapStore()
const emit = defineEmits(['on:success'])

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
const dateRef = ref(null)
const mainForm = ref(null)
const hideDetailsOnLocationChange = ref(false)
const isSubmited = ref(false)
const fuelCompanies = ref([])
const selectedOil = ref(null)
const selectedOilCompany = ref(null)
const isLoading = ref(false)
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
const onChangeDate = (e: Date, name) => {
  mainForm.value.setFieldValue(name, dateRef.value.formatDate(e, 'dd.mm.yy'))
}
const onSelectOilCompany = (item) => {
  mainForm.value.setFieldValue('details.company_id', item.id)
  selectedOilCompany.value = item
}
const showDetails = ref(false)
const toggleShowDetails = () => {
  showDetails.value = !showDetails.value
}

const oilTypes = ref([
  {
    "id": 1,
    "type": "AI 80",
    "price": "8500"
  },
  {
    "id": 2,
    "type": "AI 92",
    "price": "10500"
  },
  {
    "id": 3,
    "type": "AI 95",
    "price": "13500"
  },
  {
    "id": 4,
    "type": "AI 98",
    "price": "14500"
  },
  {
    "id": 5,
    "type": "AI 100",
    "price": "15500"
  },
  {
    "id": 6,
    "type": "Disel",
    "price": "13000"
  }
])

const onSaveDetails = () => {
  const errors = mainForm.value.getErrors()
  if (errors) {
    if (!errors['details.company_id']) {
      showDetails.value = false
      onSelectOilCompany(fuelCompanies.value.find(item => item.id === mainForm.value.values.details.company_id))
    }
  }
  showDetails.value = false
}

const staticValues = ref({
  service_type_id: props.serviceTypeId,
  adv_type: ADV_TYPES.receive,
  details: {
    fuel_amount: 0,
    fuel_type_id: selectedOil.value?.id,
    company_id: null
  },
})

const submit = () => {
  mainForm.value.validate()
      .then(res => {
        if (res.valid) {
          isSubmited.value = true
          $api.advertisement.createAdvertisement(mainForm.value.getValues())
              .then(response => {
                mainForm.value.resetForm()
                emit('on:success')
                selectedOil.value = null
                selectedOilCompany.value = null
                fuelCompanies.value = []
              })
              .finally(() => {
                isSubmited.value = false
              })
        }
      })
}

const onChangeOil = (e) => {
  mainForm.value.setFieldValue('details.fuel_type_id', e.id)
  selectedOil.value = e
  $api.services.getFuelCompanies({
    fuel_id: e.id
  })
      .then((res) => {
        fuelCompanies.value = res.data
      })
}

onMounted(() => {
  // isLoading.value = true
  // $api.transport.getTransportByServiceId(props.serviceTypeId)
  //     .then(res => {
  //       transports.value = res.data
  //     })
  //     .finally(() => isLoading.value = false)
})
</script>

<template>
  <Form
      v-slot="{values, errors}"
      ref="mainForm"
      as="div"
      :initial-values="staticValues"
      :validation-schema="oilTransfer"
      class="navbar-items__form min-w-[360px] flex items-start !transition-all"
      :class="{
            '_form-active': show,
            hideDetailsOnLocationChange: hideDetailsOnLocationChange
          }"
  >
    <div class="navbar-items__divider"/>
    <div
        class="flex flex-col h-full gap-4 w-full !p-[16px]">

      <LocationItem :class="{
        _invalid: (errors['to_location.lat'] || errors['to_location.lng'])
      }" :location="values.to_location" as="div" class="col-span-full" name="to_location"
                    @click="setLocation('to_location')"/>
      <Field v-slot="{field}" as="div" :class="{
        _invalid: errors.shipment_date
      }" name="shipment_date" class="  !px-[4px]  col-span-full">
        <FloatLabel variant="in">
          <DatePicker
              :model-value="values.shipment_date"
              ref="dateRef"
              dateFormat="dd/mm/yy"
              inputId="in_label"
              showIcon
              @update:model-value="onChangeDate($event, field.name)"
              iconDisplay="input" variant="filled"
              class="custom-date w-full"/>
          <!--            <InputText id="in_label" variant="filled" placeholder="Manzilni tanlang"-->
          <!--                       class="w-full bg-[#FAFAFA] !rounded-[24px] !pt-[34px] !pb-[18px] !px-[16px] !border-0"/>-->
          <label for="in_label" class="!text-[#292D324D]">Jo‘natish sanasi</label>
        </FloatLabel>
      </Field>
      <Field as="div" :class="{
        _invalid: errors['details.fuel_amount']
      }" name="details.fuel_amount" class="formItem flex flex-col">
        <label for="price" class="text-[#292D324D] txt-[12px]">Hajmi (litrr)</label>
        <InputText

            :model-value="values.details.fuel_amount"
            type="number"
            class=" !bg-transparent  !py-[8px] !px-[0] shadow-none !border-0"
            id="price" aria-describedby="username-help"
            placeholder="Miqdorni kiriting"
        />
      </Field>
      <Field v-slot="{handleChange, field}" :class="{
        _invalid: errors['details.fuel_type_id']
      }" name="details.fuel_type_id" as="div" class="col-span-full">
        <FloatLabel variant="in">
          <Select :loading="isLoading" :model-value="selectedOil?.id"
                  @update:model-value="onChangeOil"
                  :options="oilTypes"
                  optionLabel="type"
                  placeholder="Tanlang"
                  class="w-full !bg-[#FAFAFA] !border-0 !rounded-[24px] custom-placeholder-select h-[76px] flex items-center">
            <template #value="slotProps">
              <div v-if="selectedOil" class="flex items-center">
                <div>{{ selectedOil.type }}</div>
              </div>
            </template>
            <template #option="slotProps">
              <div

                  class="flex items-center min-w-[60px] w-full justify-between !py-4 border-b border-[#F5F5F7]"
              >
                <div class="w-full flex flex-col items-start justify-start">
                  <label for="ingredient1" class="flex items-center gap-4 cursor-pointer">
                    {{ slotProps.option.type }}
                  </label>
                </div>
                <RadioButton
                    :model-value="selectedOil?.id"
                    :inputId="`name.${slotProps.option.value}`"
                    :name="field.name"
                    :value="slotProps.option.id"/>

              </div>
            </template>
          </Select>
          <label for="in_label" class="!text-[#292D324D]">Yoqilg'i turi</label>
        </FloatLabel>
      </Field>
      <div class="col-span-full">

        <div
            @click="toggleShowDetails"
            :class="{
        _invalid: !selectedOilCompany
      }"
            class="w-full !bg-[#FAFAFA] border-0 !rounded-[24px] h-[76px] !px-[16px] !pt-[12px] cursor-pointer relative"
        >
            <span class="text-[#292D324D] text-[12px] !mb-2">
              Kompaniyalar ro'yhati
            </span>
          <div class="flex items-center justify-between">
            <span class="text-[#292D32]">
               {{ selectedOilCompany ? selectedOilCompany.company_name : 'Kompaniyani tanlang' }}
            </span>
            <svg :style="{
              transform: showDetails ? 'rotate(90deg)' : 'rotate(180deg)'
            }" width="12" height="8" viewBox="0 0 12 8" fill="none"
                 xmlns="http://www.w3.org/2000/svg">
              <path d="M1 6.5L6 1.5L11 6.5" stroke="#292D32" stroke-opacity="0.3" stroke-width="1.5"
                    stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </div>

        </div>

      </div>

      <Field name="service_type_id">
        <input :value="serviceTypeId" type="hidden">
      </Field>
      <button
          @click="submit"
          class="!bg-[#66C61C] !py-[16px] flex items-center justify-center gap-2 text-white text-[16px] rounded-[20px] !mt-auto w-full"
      >

        E’lonni joylash

        <svg v-if="isLoading" class="mr-3 -ml-1 size-5 animate-spin text-white" xmlns="http://www.w3.org/2000/svg"
             fill="none"
             viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      </button>
    </div>
    <div
        v-show="show && showDetails"
        @click.stop
        class="bg-white rounded-[24px] !p-[16px] w-full absolute
              gap-y-[13px] left-[110%] bottom-0 top-[0] max-h-[100vh] h-max !mt-auto !mb-auto overflow-y-auto"
        style="box-shadow: 0 32px 100px 0 #292D3229;"
    >
      <div>
        <Field v-slot="{handleChange}" name="details.company_id" v-if="fuelCompanies.length > 0">
          <label v-for="(item, index) in fuelCompanies"
                 :key="index"
                 :for="item.id"
                 class="flex items-center col-span-full justify-between border-[#F5F5F7] border-b !mb-[12px] !pb-[12px] cursor-pointer"
                 @click="$emit('on:click',item)"
          >
            <div class="flex flex-col">
              <h3 class="text-[#292D32] text-[14px]">{{ item.company_name }}</h3>
              <h5 class="text-[#292D324D] text-[12px]">1 litr: {{ item.price }}</h5>
              <h5 class="text-[#292D324D] text-[12px]">Yetkazib berish narxi:
                {{ item.delivery_price ? item.delivery_price : 'Bepul' }}</h5>
            </div>

            <RadioButton
                :model-value="values.details.company_id"
                :inputId="item.id"
                :value="item.id"
                @update:model-value="handleChange"/>
          </label>
        </Field>
        <template v-else>
          <div class="flex flex-col items-center justify-center">
            <img src="@/assets/images/empty.png" class="w-full" alt="">
            <p>
              Ma’lumot yo’q
            </p>
          </div>
        </template>
      </div>
      <div class="footer">
        <button
            @click="onSaveDetails"
            class="!p-[16px] bg-[#66C61C] rounded-[24px] text-white text-center w-full !mt-[72px] text-[16px]">
          Tasdiqlash
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

.load_weight_select .p-select {
  --p-select-shadow: none;
}


</style>

<style>
.load_type_name {
  top: 100%;
  z-index: 2;
  right: 0 !important;
  left: auto !important;
  min-width: 200px !important;
}
</style>
