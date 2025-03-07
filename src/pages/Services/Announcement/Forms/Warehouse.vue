<script lang="ts" setup>
import {inject, onMounted, ref} from 'vue';
import {useVuelidate} from '@vuelidate/core';
import useMapStore from "@/stores/map.store";
import {maxLength, minValue, numeric, required} from '@vuelidate/validators';
import {Announcement} from "../types";
import getGeoObject from "@/composables/getGeoObject";
import LocationItem from "@/components/form-elements/LocationItem.vue";

const mapStore = useMapStore()
const model = defineModel();
const props = defineProps({
  announceValue: {
    type: Object,
    default: () => ({}),
  },
  activeTab: {
    type: Number,
  }
});

const $api = inject('api');

// Refs for form data and lists
const imageList = ref<string[] | []>([]);
const categoriesAllList = ref([]);
const servicesAllList = ref([]);

const collectImages = ref([]);

const addAnnouncement = ref<Announcement>({
  adv_type: 'PROVIDE',
  service_type_id: 7,
  to_location: {
    lat: null,
    lng: null,
    name: null,
  },
  price: null,
  details: {
    area: null,
  },
  note: null,
});

// Validation rules
const rules = {
  to_location: {
    name: {required},
  },
  price: {
    required,
    numeric,
    minValue: minValue(0)
  },
  details: {
    area: {
      required,
      numeric,
      minValue: minValue(0)
    },
  },
  note: {maxLength: maxLength(1000)}
};

const v$ = useVuelidate(rules, addAnnouncement);

// Fetch lists on component mount
onMounted(async () => {
  try {
    const responseCategory = await $api.workshop.getWorkshopCategory();
    categoriesAllList.value = responseCategory?.data;

    const responseService = await $api.workshop.getWorkshopService();
    servicesAllList.value = responseService?.data;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
});

// File upload handler
const handleFileUpload = (event: Event) => {
  const input = event.target as HTMLInputElement;
  const file = input.files?.[0];

  if (file && file.type.startsWith('image/')) {
    const reader = new FileReader();
    reader.onload = (e) => {
      const base64 = e.target?.result as string;

      // Extract the base64 data without the metadata prefix
      const base64Data = base64.split(',')[1];

      collectImages.value.push({
        fileName: file.name,
        base64: base64Data, // Send only the base64 data without the prefix
      });

      imageList.value.push(URL.createObjectURL(file));
    };
    reader.readAsDataURL(file);
  } else {
    console.error("Invalid file type. Please upload an image.");
  }
};

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
  // hideDetailsOnLocationChange.value = true
}

// Delete image
const deleteImage = (index) => {
  imageList.value.splice(index, 1);
  collectImages.value.splice(index, 1);
};

// Create announcement submission handler
const createAnnouncement = async (announce) => {
  const isFormValid = await v$.value.$validate();

  if (!isFormValid) {
    // Show error toast or notification
    return;
  }

  try {
    // Set advertisement type based on active tab
    // announce.adv_type = props.activeTab === 1 ? 'RECEIVE' :
    //     props.activeTab === 2 ? 'PROVIDE' : '';

    const announcementResponse = await $api.workshop.createWorkshop(announce);
    const advertisementId = announcementResponse?.data?.id;

    // Send images
    if (collectImages.value.length > 0) {
      // Send images with proper format
      const imagePayload = {
        advertisement_id: advertisementId,
        images: collectImages.value.map(img => ({
          fileName: img.fileName,
          base64: img.base64, // This is already the clean base64 data
          mimeType: img.mimeType, // Include MIME type if the API requires it
        })),
      };

      await $api.image.sendImage(imagePayload);
    }

    // Reset form
    addAnnouncement.value = {
      adv_type: '',
      service_type_id: 7,
      to_location: {
        lat: null,
        lng: null,
        name: null,
      },
      price: null,
      details: {
        area: null,
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
</script>

<template>
  <Transition name="bounce">
    <form
        v-if="!hideDetailsOnLocationChange"
        @submit.prevent="createAnnouncement(addAnnouncement)"
    >
      <div class="grid grid-cols-2 gap-4">
        <LocationItem :location="addAnnouncement.to_location" as="div" class="" name="to_location"
                      @click="setLocation('to_location')"/>

        <FloatLabel variant="in">
          <InputText v-model="addAnnouncement.price" id="in_label" variant="filled" type="number"
                     class="w-full !bg-[#FAFAFA] !rounded-[24px] !pt-[34px] !pb-[18px] !px-[16px] !border-0"/>
          <label for="in_label" class="!text-[#292D324D]">Narx</label>
        </FloatLabel>

        <FloatLabel variant="in">
          <InputText v-model="addAnnouncement.details.area" id="in_label" variant="filled" type="number"
                     class="w-full !bg-[#FAFAFA] !rounded-[24px] !pt-[34px] !pb-[18px] !px-[16px] !border-0"/>
          <label for="in_label"
                 class="!text-[#292D324D]">Maydon</label>
        </FloatLabel>

      </div>

      <div class="flex flex-col gap-2 w-full !mt-[24px]">
        <label for="description" class="text-[#292D3280] text-[16px]">Izoh</label>
        <Textarea v-model="addAnnouncement.note" id="description" class="w-full   custom-placeholder-input" rows="3"
                  cols="30"
                  placeholder="Yuk haqida izoh qoldiring!"/>
      </div>

      <div class="bg-[#FAFAFA] rounded-[24px] !p-[16px] !mt-[24px]">
        <span class="text-[#292D324D] text-[12px]">Yuk rasmlari</span>
        <!--          {{ imageList }}-->

        <div class="grid grid-cols-6 gap-4 !mt-[8px] rounded-2xl">
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

      <!-- Example validation error display -->
      <div v-if="v$.$errors.length" class="text-red-500 mb-4">
        <p>
          {{ v$.$errors[0].$message }}
        </p>
      </div>

      <div class="w-full flex justify-end">
        <button
            type="submit"
            :disabled="v$.$invalid"
            class="text-white bg-[#66C61C] !py-4 !px-11 rounded-3xl disabled:opacity-50"
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
