<script lang="ts" setup>
import {computed, inject, onMounted, ref, watch} from 'vue';
import {useVuelidate} from '@vuelidate/core';
import {maxLength, minValue, numeric, required} from '@vuelidate/validators';
import LocationItem from "@/components/form-elements/LocationItem.vue";
import getGeoObject from "@/composables/getGeoObject";
import useMapStore from "@/stores/map.store";

const mapStore = useMapStore()
const model = defineModel();
const props = defineProps({
  announceValue: {
    type: Number,
    default: '',
  },
  activeTab: {
    type: Number,
  },
  childForm: {
    type: Object,
  },
});

const $api = inject('api');

// Refs for form data and lists
const tariffs = ref<{ day: string; price: number }[] | []>([]);
const imageList = ref<string[] | []>([]);
const carAllList = ref([]);
const formSubmitted = ref(false);

const collectImages = ref([]);

const addList = () => {
  tariffs.value.push({day: '', price: ''});
};

const addAnnouncement = ref({
  adv_type: 'PROVIDE',
  service_type_id: 8,
  from_location: {
    lat: null,
    lng: null,
    name: null,
  },
  price: null,
  details: {
    company_name: null,
    capacity: null,
    tariffs: [],
  },
  note: null,
});

// Enhanced validation rules
const rules = {
  from_location: {
    name: {required},
  },
  price: {
    required,
    numeric,
    minValue: minValue(0)
  },
  details: {
    company_name: {
      required,
    },
    capacity: {
      required,
      numeric,
    },
  },
  note: {maxLength: maxLength(1000)}
};

// Custom validation for fuels list
const isTariffsValid = computed(() => {
  if (tariffs.value.length === 0) return false;

  for (const item of tariffs.value) {
    if (!item.day || item.price === '' || item.price === null) {
      return false;
    }
  }
  return true;
});

const hideDetailsOnLocationChange = ref(false);

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
          addAnnouncement.value[name] = {
            lat: marker.markerProps.geometry.coordinates[0],
            lng: marker.markerProps.geometry.coordinates[1],
            name: res.data.description
          }
          mapStore.removeMarker(name)
        }).finally(() => {
          hideDetailsOnLocationChange.value = false
        })
      }
    }
  }, name)
  hideDetailsOnLocationChange.value = true
}

const setSelectedLocation = async (address, name) => {
  await getGeoObject({address: address})
      .then(res => {
        const marker = mapStore.getMarker(name)
        addAnnouncement.value[name] = {
          lat: marker.markerProps.geometry.coordinates[0],
          lng: marker.markerProps.geometry.coordinates[1],
          name: res.data.description
        }
        mapStore.removeMarker(name)
      }).finally(() => {
        hideDetailsOnLocationChange.value = false
      })
}

const v$ = useVuelidate(rules, addAnnouncement);

// Helper function to check if a field has errors
const hasError = (field) => {
  return formSubmitted.value && v$.value[field].$invalid;
};

// Helper function for nested fields
const hasNestedError = (parent, field) => {
  return formSubmitted.value && v$.value[parent][field].$invalid;
};

// Fetch lists on component mount
onMounted(async () => {
  try {
    const responseCars = await $api.workshop.getCars();
    carAllList.value = responseCars?.data;

    // Initialize with one empty oil item
    if (tariffs.value.length === 0) {
      addList();
    }
  } catch (error) {
    console.error("Error fetching data:", error);
  }
});

// File upload handler
const handleFileUpload = (event) => {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      const base64 = e.target.result as string;
      collectImages.value.push({
        fileName: file.name,
        base64: base64.split(',')[1],
      });
      imageList.value.push(URL.createObjectURL(file));
    };
    reader.readAsDataURL(file);
  }
};

// Delete image
const deleteImage = (index) => {
  imageList.value.splice(index, 1);
  collectImages.value.splice(index, 1);
};

// Remove oil type item
const removeOilItem = (index) => {
  tariffs.value.splice(index, 1);

  // Ensure there's always at least one oil item
  if (tariffs.value.length === 0) {
    addList();
  }
};

// Create announcement submission handler
const createAnnouncement = async (announce) => {
  formSubmitted.value = true;

  const isFormValid = await v$.value.$validate();

  // Check if oil list is valid
  if (!isTariffsValid.value) {
    return;
  }

  if (!isFormValid) {
    return;
  }

  try {
    announce.details.tariffs = tariffs.value;

    const announcementResponse = await $api.workshop.createWorkshop(announce);
    const advertisementId = announcementResponse?.data?.id;

    // Send images
    if (collectImages.value.length > 0) {
      const imagePayload = {
        advertisement_id: advertisementId,
        images: collectImages.value,
      };
      await $api.image.sendImage(imagePayload);
    }

    // Reset form
    addAnnouncement.value = {
      adv_type: 'PROVIDE',
      service_type_id: 8,
      from_location: {
        lat: null,
        lng: null,
        name: null,
      },
      price: null,
      details: {
        company_name: null,
        capacity: null,
        tariffs: [],
      },
      note: null,
    };

    imageList.value = [];
    collectImages.value = [];
    tariffs.value = [{day: '', price: ''}];
    formSubmitted.value = false;

    // Close dialog/form
    model.value = false;
  } catch (error) {
    console.error("Error creating announcement: ", error);
  }
};

const modelCar = [
  {id: 1, name: 'Sonata'},
  {id: 2, name: 'Chevrolet'},
  {id: 3, name: 'Hyundai'},
];

const carGearbox = ref([
  {id: 1, name: 'Avtomat'},
  {id: 2, name: 'Mexanika'},
]);

const carConditioner = ref([
  {id: 1, name: 'Bor'},
  {id: 2, name: 'Yo‘q'},
]);

const carInsurance = ref([
  {id: 1, name: 'Bor'},
  {id: 2, name: 'Yo‘q'},
]);

const carLuggage = ref([
  {id: 1, name: 'Bor'},
  {id: 2, name: 'Yo‘q'},
]);

const colorCar = computed(() => {
  return carAllList.value.map((item) => {
    return JSON.parse(item.colors.value);
  });
})

watch(() => props.childForm,
    (val) => addAnnouncement.value.service_type_id = val.id,
    {immediate: true}
)
</script>

<template>
  <Transition name="bounce">
    <form
        @submit.prevent="createAnnouncement(addAnnouncement)"
    >
<!--      <pre>{{addAnnouncement}}</pre>-->
      <div class="grid grid-cols-2 gap-4">
        <div>
          <LocationItem
              :location="addAnnouncement.from_location"
              as="div"
              :class="['', { 'border border-red-500 rounded-[24px]': formSubmitted && !addAnnouncement.from_location.name }]"
              name="from_location"
              @on:select="setSelectedLocation($event,'from_location')"
              @click="setLocation('from_location')"
          />
          <small v-if="formSubmitted && !addAnnouncement.from_location.name" class="text-red-500 ml-2">
            Joylashuvni kiriting
          </small>
        </div>

        <div>
          <FloatLabel variant="in">
            <InputText
                v-model="addAnnouncement.price"
                id="company_name"
                variant="filled"
                type="number"
                :class="['w-full !bg-[#FAFAFA] !rounded-[24px] !pt-[34px] !pb-[18px] !px-[16px]',
                { '!border !border-red-500': hasNestedError('details', 'company_name') },
                { '!border-0': !hasNestedError('details', 'company_name') }
              ]"
            />
            <label for="company_name" class="!text-[#292D324D]">1 sutkalik narx</label>
          </FloatLabel>
          <small v-if="hasNestedError('details', 'company_name')" class="text-red-500 ml-2">
            Summani kiriting
          </small>
        </div>
      </div>

      <!--      Technical characteristics   -->
      <div class="bg-[#FAFAFA] rounded-[24px] !p-[16px] !mt-[24px]">
        <span class="block !mb-[16px] text-[#000000] text-[16px] font-medium">Yoqilg'i turi va narxlari</span>
        <div class="grid grid-cols-2 gap-4">
          <div>
            <FloatLabel variant="in">
              <Select
                  :options="carAllList"
                  optionLabel="car_name"
                  optionValue="car_name"
                  placeholder="Tanlang"
                  :class="[
                    'w-full !rounded-[24px] custom-placeholder-select h-[76px] flex items-center',
                    { '!border !border-red-500': formSubmitted && !item.type },
                    { '!border-0': !(formSubmitted && !item.type) }
                  ]"
              />
              <label for="company_name" class="!text-[#292D324D]">Model</label>
            </FloatLabel>
            <small v-if="hasNestedError('details', 'company_name')" class="text-red-500 ml-2">
              Modelni kiriting
            </small>
          </div>

          <div>
            <FloatLabel variant="in">
              <Select
                  :options="carGearbox"
                  optionLabel="name"
                  optionValue="name"
                  placeholder="Tanlang"
                  :class="[
                    'w-full !rounded-[24px] custom-placeholder-select h-[76px] flex items-center',
                    { '!border !border-red-500': formSubmitted && !item.type },
                    { '!border-0': !(formSubmitted && !item.type) }
                  ]"
              />
              <label for="company_name" class="!text-[#292D324D]">Kuzov turi</label>
            </FloatLabel>
            <small v-if="hasNestedError('details', 'company_name')" class="text-red-500 ml-2">
              Kuzov turini kiriting
            </small>
          </div>

          <div>
            <FloatLabel variant="in">
              <Select
                  :options="carGearbox"
                  optionLabel="name"
                  optionValue="name"
                  placeholder="Tanlang"
                  :class="[
                    'w-full !rounded-[24px] custom-placeholder-select h-[76px] flex items-center',
                    { '!border !border-red-500': formSubmitted && !item.type },
                    { '!border-0': !(formSubmitted && !item.type) }
                  ]"
              />
              <label for="in_label" class="!text-[#292D324D]">Uzatmalar qutisi</label>
            </FloatLabel>
            <small v-if="hasNestedError('details', 'company_name')" class="text-red-500 ml-2">
              Uzatmalar qutisini kiriting
            </small>
          </div>

          <div>
            <FloatLabel variant="in">
              <Select
                  :options="carAllList"
                  optionLabel="engine_capacity"
                  optionValue="engine_capacity"
                  placeholder="Tanlang"
                  :class="[
                    'w-full !rounded-[24px] custom-placeholder-select h-[76px] flex items-center',
                    { '!border !border-red-500': formSubmitted && !item.type },
                    { '!border-0': !(formSubmitted && !item.type) }
                  ]"
              />
              <label for="capacity" class="!text-[#292D324D]">Dvigatel hajmi</label>
            </FloatLabel>
            <small v-if="hasNestedError('details', 'capacity')" class="text-red-500 ml-2">
              Dvigatel hajmi kiriting
            </small>
          </div>
<!--          <pre>{{colorCar[0]}}</pre>-->
          <div>
            <FloatLabel variant="in">
              <Select
                  :options="colorCar[0]"
                  optionLabel="name"
                  optionValue="color_id"
                  placeholder="Tanlang"
                  :class="[
                    'w-full !rounded-[24px] custom-placeholder-select h-[76px] flex items-center',
                    { '!border !border-red-500': formSubmitted && !item.type },
                    { '!border-0': !(formSubmitted && !item.type) }
                  ]"
              />
              <label for="capacity" class="!text-[#292D324D]">Rangi</label>
            </FloatLabel>
            <small v-if="hasNestedError('details', 'capacity')" class="text-red-500 ml-2">
              Rangini kiriting
            </small>
          </div>

          <div>
            <FloatLabel variant="in">
              <Select
                  :options="carLuggage"
                  optionLabel="name"
                  optionValue="name"
                  placeholder="Tanlang"
                  :class="[
                    'w-full !rounded-[24px] custom-placeholder-select h-[76px] flex items-center',
                    { '!border !border-red-500': formSubmitted && !item.type },
                    { '!border-0': !(formSubmitted && !item.type) }
                  ]"
              />
              <label for="capacity" class="!text-[#292D324D]">Bagaj hajmi</label>
            </FloatLabel>
            <small v-if="hasNestedError('details', 'capacity')" class="text-red-500 ml-2">
              Bagaj hajmini kiriting
            </small>
          </div>

          <div>
            <FloatLabel variant="in">
              <Select
                  :options="carAllList"
                  optionLabel="seat_count"
                  optionValue="seat_count"
                  placeholder="Tanlang"
                  :class="[
                    'w-full !rounded-[24px] custom-placeholder-select h-[76px] flex items-center',
                    { '!border !border-red-500': formSubmitted && !item.type },
                    { '!border-0': !(formSubmitted && !item.type) }
                  ]"
              />
              <label for="capacity" class="!text-[#292D324D]">O‘rindiqlar soni</label>
            </FloatLabel>
            <small v-if="hasNestedError('details', 'capacity')" class="text-red-500 ml-2">
              O‘rindiqlar sonini kiriting
            </small>
          </div>

          <div>
            <FloatLabel variant="in">
              <Select
                  :options="carConditioner"
                  optionLabel="name"
                  optionValue="name"
                  placeholder="Tanlang"
                  :class="[
                    'w-full !rounded-[24px] custom-placeholder-select h-[76px] flex items-center',
                    { '!border !border-red-500': formSubmitted && !item.type },
                    { '!border-0': !(formSubmitted && !item.type) }
                  ]"
              />
              <label for="in_label" class="!text-[#292D324D]">Konditsioner</label>
            </FloatLabel>
            <small v-if="hasNestedError('details', 'company_name')" class="text-red-500 ml-2">
              Tanlang
            </small>
          </div>

          <div>
            <FloatLabel variant="in">
              <Select
                  :options="carInsurance"
                  optionLabel="name"
                  optionValue="name"
                  placeholder="Tanlang"
                  :class="[
                    'w-full !rounded-[24px] custom-placeholder-select h-[76px] flex items-center',
                    { '!border !border-red-500': formSubmitted && !item.type },
                    { '!border-0': !(formSubmitted && !item.type) }
                  ]"
              />
              <label for="capacity" class="!text-[#292D324D]">Sug’urta</label>
            </FloatLabel>
            <small v-if="hasNestedError('details', 'capacity')" class="text-red-500 ml-2">
              Sug’urtani kiriting
            </small>
          </div>

<!--          <div>-->
<!--            <FloatLabel variant="in">-->
<!--              <InputText-->
<!--                  v-model="addAnnouncement.details.capacity"-->
<!--                  id="capacity"-->
<!--                  variant="filled"-->
<!--                  type="number"-->
<!--                  :class="['w-full !bg-white !rounded-[24px] !pt-[34px] !pb-[18px] !px-[16px]',-->
<!--                { '!border !border-red-500': hasNestedError('details', 'capacity') },-->
<!--                { '!border-0': !hasNestedError('details', 'capacity') }-->
<!--              ]"-->
<!--              />-->
<!--              <label for="capacity" class="!text-[#292D324D]">Sutkalik km limiti</label>-->
<!--            </FloatLabel>-->
<!--            <small v-if="hasNestedError('details', 'capacity')" class="text-red-500 ml-2">-->
<!--              Sutkalik km limitini kiriting-->
<!--            </small>-->
<!--          </div>-->
        </div>
      </div>

      <div class="bg-[#FAFAFA] rounded-[24px] !p-[16px] !mt-[24px]">
        <span class="block !mb-[16px] text-[#000000] text-[16px] font-medium">Yoqilg'i turi va narxlari</span>

        <small v-if="formSubmitted && !isTariffsValid" class="text-red-500 mb-4 block">
          Yoqilg'i turi va narxi to'ldirilishi shart
        </small>

        <div class="grid grid-cols-2 gap-4">
          <template v-for="(item, index) in tariffs" :key="index">
            <div>
              <FloatLabel variant="in">
                <InputText
                    v-model="item.day"
                    id="oil_price"
                    variant="filled"
                    type="number"
                    :class="[
                    'w-full !bg-[#FFFFFF] !rounded-[24px] !pt-[34px] !pb-[18px] !px-[16px]',
                    { '!border !border-red-500': formSubmitted && (item.price === '' || item.price === null) },
                    { '!border-0': !(formSubmitted && (item.price === '' || item.price === null)) }
                  ]"
                />
                <label for="oil_price" class="!text-[#292D324D]">Kun</label>
              </FloatLabel>
            </div>

            <div class="relative">
              <FloatLabel variant="in">
                <InputText
                    v-model="item.price"
                    id="oil_price"
                    variant="filled"
                    type="number"
                    :class="[
                    'w-full !bg-[#FFFFFF] !rounded-[24px] !pt-[34px] !pb-[18px] !px-[16px]',
                    { '!border !border-red-500': formSubmitted && (item.price === '' || item.price === null) },
                    { '!border-0': !(formSubmitted && (item.price === '' || item.price === null)) }
                  ]"
                />
                <label for="oil_price" class="!text-[#292D324D]">{{ $t('price') }}</label>
              </FloatLabel>

              <!-- Remove button for oil items (except the first one if it's the only one) -->
              <button
                  v-if="tariffs.length > 1"
                  type="button"
                  @click="removeOilItem(index)"
                  class="absolute right-2 top-2 text-red-500 p-2"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                        stroke-linejoin="round"/>
                </svg>
              </button>
            </div>
          </template>
        </div>

        <button
            type="button"
            @click="addList"
            class="!mt-4 flex items-center text-[#66C61C] !pl-[115px] !py-[12px] !pr-[107px] rounded-[24px] border-[1px] border-[#66C61C]">
          <svg class="!mr-[16px]" width="10" height="10" viewBox="0 0 10 10" fill="none"
               xmlns="http://www.w3.org/2000/svg">
            <path d="M1 5H9M5 1L5 9" stroke="#66C61C" stroke-width="1.5" stroke-linecap="round"/>
          </svg>
          {{$t('send')}}
        </button>
      </div>

      <div class="flex flex-col gap-2 w-full !mt-[24px]">
        <label for="description" class="text-[#292D3280] text-[16px]">{{ $t('description') }}</label>
        <Textarea
            v-model="addAnnouncement.note"
            id="description"
            class="w-full custom-placeholder-input"
            rows="3"
            cols="30"
            placeholder="Yuk haqida izoh qoldiring!"
            :class="{ 'border border-red-500': hasError('note') }"
        />
        <small v-if="hasError('note')" class="text-red-500">
          Izoh 1000 belgidan oshmasligi kerak
        </small>
      </div>

      <div class="bg-[#FAFAFA] rounded-[24px] !p-[16px] !mt-[24px]">
        <span class="text-[#292D324D] text-[12px]">Yuk rasmlari</span>

        <div class="grid grid-cols-6 gap-4 !mt-[8px] rounded-2xl">
          <div v-for="(img, index) in imageList" :key="index" class="relative group !mr-0 w-[105px] h-[105px]">
            <img class="w-full h-full object-cover rounded-2xl"
                 :src="img" alt="img"
                 width="105">

            <div
                class="group-hover:flex hidden absolute top-0 left-0 w-full h-full bg-black bg-opacity-50 rounded-2xl items-center justify-center">
              <button type="button" @click="deleteImage(index)">
                <i class="pi pi-trash cursor-pointer" style="font-size: 1.5rem; color: red"></i>
              </button>
            </div>
          </div>

          <label for="fileAnnouncement" class="relative">
            <button type="button">
              <svg width="110" height="110" viewBox="0 0 110 110" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="0.5" y="0.5" width="109" height="109" rx="15.5" stroke="#66C61C" stroke-dasharray="8 8"/>
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

      <div class="w-full flex justify-end !mt-5">
        <button
            type="submit"
            class="text-white bg-[#66C61C] !py-4 !px-11 rounded-3xl hover:bg-[#58ad18] transition-colors"
        >
          Joylash
        </button>
      </div>
    </form>
  </Transition>
</template>

<style scoped>
.bounce-enter-active {
  animation: bounce-in 0.5s;
}

.bounce-leave-active {
  animation: bounce-in 0.5s reverse;
}

@keyframes bounce-in {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.25);
  }
  100% {
    transform: scale(1);
  }
}
</style>
