<script lang="ts" setup>
import {computed, inject, ref, watch} from 'vue';
import {useVuelidate} from '@vuelidate/core';
import useMapStore from "@/stores/map.store";
import getGeoObject from "@/composables/getGeoObject";
import LocationItem from "@/components/form-elements/LocationItem.vue";

import {maxLength, minValue, numeric, required} from '@vuelidate/validators';
import {Field, Form} from "vee-validate";
import {useI18n} from "vue-i18n";

const {t} = useI18n()
const mapStore = useMapStore()
const model = defineModel();
const loading = ref(true);
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

const pageValue = ref(props.announceValue);
watch(() => props.announceValue, (newValue) => {
  pageValue.value = newValue;
});

const transportType = ref(props.childForm?.id);
watch(() => props.childForm, (newValue) => {
  transportType.value = newValue?.id;
});

const $api = inject('api');

// Refs for form data and lists
const imageList = ref<string[] | []>([]);

const collectImages = ref([]);

const serviceTypeId = computed(() => {
  switch (pageValue.value) {
    case 1:
      return pageValue.value;
    case 2:
      return pageValue.value;
    case 6:
      return pageValue.value;
    case 9:
      return pageValue.value;
    default:
      return null;
  }
});

const addAnnouncement = ref({
  adv_type: 'PROVIDE',
  service_type_id: serviceTypeId.value,
  from_location: {
    lat: null,
    lng: null,
    name: null,
  },
  to_location: {
    lat: null,
    lng: null,
    name: null,
  },
  price: null,
  details: {
    transportation_type_id: transportType,
    transport_count: null,
    passenger_count: null,
    company_name: null,
    load_weight: {
      amount: null,
      name: null
    }
  },
  note: null,
});

// Validation rules
const rules = {
  from_location: {
    name: {required},
  },
  to_location: {
    name: {required},
  },
  price: {
    required,
    numeric,
    minValue: minValue(0)
  },
  // details: {
  //   passenger_count: {required, numeric, minValue: 0},
  //   load_weight: {
  //     amount: { required, numeric, minValue: minValue(0) },
  //   },
  // },
  note: {maxLength: maxLength(1000)}
};

const v$ = useVuelidate(rules, addAnnouncement);

const computedModelValue = computed({
  get() {
    return pageValue.value === 2 ? addAnnouncement.value.details.passenger_count : pageValue.value === 6 ? addAnnouncement.value.details.transport_count : addAnnouncement.value.details.load_weight.amount;
  },

  set(value) {
    if (pageValue.value === 2) {
      addAnnouncement.value.details.passenger_count = value;
    } else if (pageValue.value === 6) {
      addAnnouncement.value.details.transport_count = value;
    } else {
      addAnnouncement.value.details.load_weight.amount = value;
    }
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

const loadWeightTypes = [
  {
    label: t('kg'),
    value: 'kg'
  },
  {
    label: t('m3'),
    value: 'm3'
  },
  {
    label: t('litr'),
    value: 'litr'
  }
]

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

// Create announcement submission handler
const createAnnouncement = async (announce) => {
  const isFormValid = await v$.value.$validate();

  if (!isFormValid) {
    // Show error toast or notification
    return;
  }

  try {
    const announcementResponse = await $api.workshop.createWorkshop(announce);
    const advertisementId = announcementResponse?.data?.id;

    // Send images
    const imagePayload = {
      advertisement_id: advertisementId,
      images: collectImages.value,
    };
    await $api.image.sendImage(imagePayload);

    imagePayload.images = [];

    // Reset form
    addAnnouncement.value = {
      adv_type: '',
      service_type_id: '',
      from_location: {
        lat: null,
        lng: null,
        name: null,
      },
      to_location: {
        lat: null,
        lng: null,
        name: null,
      },
      price: null,
      details: {
        transportation_type_id: null,
        company_name: null,
        load_weight: {
          amount: null,
          name: null
        }
      },
      note: null,
    };

    imageList.value = [];
    collectImages.value = [];

    // Optional: Show success message or close dialog
    model.value = false;
  } catch (error) {
    console.error("Error creating announcement: ", error);
    // Optional: Show error toast or notification
  }
};

watch(() => props.announceValue, (newValue) => {
  pageValue.value = newValue;
  addAnnouncement.value.service_type_id = serviceTypeId.value;
});
</script>

<template>
  <Transition name="bounce">
    <form
        @submit.prevent="createAnnouncement(addAnnouncement)"
    >
      <div class="grid grid-cols-2 gap-4">
        <LocationItem
            :location="addAnnouncement.from_location"
            as="div" class=""
            name="from_location"
            @on:select="setSelectedLocation($event,'from_location')"
            @click="setLocation('from_location')"
        />

        <LocationItem
            :location="addAnnouncement.to_location"
            as="div" class=""
            name="to_location"
            @on:select="setSelectedLocation($event,'to_location')"
            @click="setLocation('to_location')"
        />

        <Field as="div" name="details.load_weight.amount"
              class="load_weight_select formItem flex items-center justify-between relative dark:bg-zinc-700"
        >
          <div class="flex flex-col  items-start justify-center dark:bg-zinc-700">

            <label for="details.load_weight.amount" class="text-[#292D324D] dark:!text-white">{{ pageValue === 2 ? $t('max_passenger_count') : pageValue === 6 ? $t('max_vehicle_count') : $t('max_cargo_capacity_kg') }}</label>
            <InputText
                v-model="computedModelValue"
                type="number"
                class=" !bg-transparent  !py-[8px] !px-[0] dark:!text-white shadow-none !border-0"
                id="details.load_weight.amount" aria-describedby="username-help"
                variant="outline"
            />
          </div>

          <Field
              v-if="addAnnouncement.service_type_id !== 2 && addAnnouncement.service_type_id !== 6"
              name="details.load_weight.name"
              v-slot="{handleChange, field}"
              class="dark:bg-zinc-700"
          >
            <Select
                placeholder=""
                append-to="self"
                overlay-class="load_type_name !mt-5 dark:bg-zinc-800"
                v-model="addAnnouncement.details.load_weight.name"
                optionValue="value"
                :options="loadWeightTypes"
                optionLabel="label"
                @update:model-value="handleChange"
                class="bg-[#FAFAFA] dark:bg-zinc-700 shadow-[none] !border-0 flex items-center">
              <template #option="slotProps" class="">
                <div
                    class="flex items-center min-w-[60px] w-full justify-between !py-4 border-b border-[#F5F5F7]"
                >
                  <div class="w-full flex flex-col items-start justify-start ">
                    <label :for="`name.${slotProps.option.value}`" class="flex items-center gap-4 cursor-pointer">
                      {{ slotProps.option.label }}
                    </label>
                  </div>
                  <RadioButton
                      v-model="addAnnouncement.details.load_weight.name"
                      :inputId="`name.${slotProps.option.value}`"
                      :name="field.name"
                      :value="slotProps.option.value"
                      class=""
                  />
                </div>
              </template>
            </Select>
          </Field>

        </Field>

<!--        <FloatLabel variant="in">-->
<!--          <InputText-->
<!--              v-model="computedModelValue" id="in_label" variant="filled" type="number"-->
<!--              :class="[-->
<!--              'w-full !bg-[#FAFAFA] !rounded-[24px] !pt-[34px] !pb-[18px] !px-[16px] !border-0',-->

<!--            ]"-->
<!--          />-->
<!--          <label for="in_label"-->
<!--                 class="!text-[#292D324D]">-->
<!--            {{-->
<!--              pageValue === 2 ? $t('max_passenger_count') : pageValue === 6 ? $t('max_vehicle_count') : $t('max_cargo_capacity_kg')-->
<!--            }}-->
<!--          </label>-->
<!--        </FloatLabel>-->

        <FloatLabel variant="in">
          <InputText v-model="addAnnouncement.price" id="in_label" variant="filled" type="number"
                     class="w-full bg-[#FAFAFA] dark:!bg-zinc-700 !rounded-[24px] !pt-[34px] !pb-[18px] !px-[16px] !border-0"/>
          <label for="in_label" class="text-[#292D324D] dark:!text-white">{{ $t('price') }}</label>
        </FloatLabel>
      </div>

      <div class="flex flex-col gap-2 w-full !mt-[24px]">
        <label for="description" class="text-[#292D3280] text-[16px]">{{ $t('description') }}</label>
        <Textarea v-model="addAnnouncement.note" id="description" class="w-full dark:bg-zinc-700 dark:!text-white custom-placeholder-input" rows="3"
                  cols="30"
                  :placeholder="$t('leave_cargo_comment')"/>
      </div>

      <div class="bg-[#FAFAFA] dark:bg-zinc-700 rounded-[24px] !p-[16px] !mt-[24px]">
        <span class="text-[#292D324D] text-[12px]">{{$t('cargoImages')}}</span>
        <!--          {{ imageList }}-->

        <div class="grid grid-cols-6 gap-4 !mt-[8px] rounded-2xl dark:bg-zinc-700">
          <div v-for="(img, index) in imageList" :key="index" class="relative group !mr-0 w-[105px] h-[105px] dark:bg-zinc-700">
            <img class="w-full h-full object-cover rounded-2xl"
                 :src="img" alt="img"
                 width="105"
            >

            <div
                class="group-hover:flex hidden absolute top-0 left-0 w-full h-full bg-black bg-opacity-50 rounded-2xl items-center justify-center">
              <button @click="deleteImage(index)">
                <i class="pi pi-trash cursor-pointer" style="font-size: 1.5rem; color: red"></i>
              </button>
            </div>
          </div>

          <label for="fileAnnouncement" class="relative">
            <button>
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
            class="text-white bg-[#66C61C] !py-4 !px-11 rounded-3xl disabled:opacity-50"
        >
          {{$t('post')}}
        </button>
      </div>
    </form>
  </Transition>
</template>

<style scoped>
.dark .p-select .p-select-option {
  background-color: #8a8787 !important;
}

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

.load_type_name {
  margin-top: 90px !important;
}

.p-select-list, .p-select-option {
  background-color: #fff; /* Black background for dark mode */
}
</style>
