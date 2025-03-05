<script lang="ts" setup>
import {ref, onMounted, inject, watch} from 'vue';
import { useVuelidate } from '@vuelidate/core';
import {
  required,
  numeric,
  minValue,
  maxLength
} from '@vuelidate/validators';
import { Announcement } from "../types";

const model = defineModel();
const props = defineProps({
  announceValue: {
    type: String,
    default: '',
  },
  activeTab: {
    type: Number,
  }
});

const pageValue = ref(props.announceValue);
watch(() => props.announceValue, (newValue) => {
  pageValue.value = newValue;
});

const $api = inject('api');

// Refs for form data and lists
const imageList = ref<string[] | []>([]);

const collectImages = ref([]);

const addAnnouncement = ref({
  adv_type: 'PROVIDE',
  service_type_id: null,
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
    transportation_type_id: 1,
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
    name: { required },
  },
  to_location: {
    name: { required },
  },
  price: {
    required,
    numeric,
    minValue: minValue(0)
  },
  details: {
    passenger_count: {required, numeric, minValue: 0},
    load_weight: {
      amount: { required, numeric, minValue: minValue(0) },
    },
  },
  note: { maxLength: maxLength(1000) }
};

const v$ = useVuelidate(rules, addAnnouncement);

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

// Create announcement submission handler
const createAnnouncement = async (announce) => {
  const isFormValid = await v$.value.$validate();

  if (!isFormValid) {
    // Show error toast or notification
    return;
  }

  try {
    addAnnouncement.service_type_id = props.announceValue.unique === 'shipping' ? 1 : props.announceValue.unique === 'passenger' ? 2 : '';

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

    // Optional: Show success message or close dialog
    model.value = false;
  } catch (error) {
    console.error("Error creating announcement: ", error);
    // Optional: Show error toast or notification
  }
};
</script>

<template>
  <form
      @submit.prevent="createAnnouncement(addAnnouncement)"
  >
    <pre>{{addAnnouncement}}</pre>
    <div class="grid grid-cols-2 gap-4">
      <FloatLabel variant="in">
        <InputText v-model="addAnnouncement.from_location.name" id="in_label" variant="filled"
                   class="w-full !bg-[#FAFAFA] !rounded-[24px] !pt-[34px] !pb-[18px] !px-[16px] !border-0"/>
        <label for="in_label" class="!text-[#292D324D]">Qayerdan</label>
      </FloatLabel>

      <FloatLabel variant="in">
        <InputText v-model="addAnnouncement.to_location.name" id="in_label" variant="filled"
                   class="w-full !bg-[#FAFAFA] !rounded-[24px] !pt-[34px] !pb-[18px] !px-[16px] !border-0"/>
        <label for="in_label" class="!text-[#292D324D]">Qayerga</label>
      </FloatLabel>

      <FloatLabel variant="in">
        <InputText v-model="addAnnouncement.details.load_weight.amount" id="in_label" variant="filled" type="number"
                   class="w-full !bg-[#FAFAFA] !rounded-[24px] !pt-[34px] !pb-[18px] !px-[16px] !border-0"/>
        <label for="in_label"
               class="!text-[#292D324D]">
          {{pageValue?.unique === 'passenger' ? 'Maksimal yo‘lovchi soni' : pageValue?.unique === 'transfer' ? 'Maksimal transport soni' : 'Maksimal yuk sig‘imi(kg)' }}
        </label>
      </FloatLabel>

      <FloatLabel variant="in">
        <InputText v-model="addAnnouncement.price" id="in_label" variant="filled" type="number"
                   class="w-full !bg-[#FAFAFA] !rounded-[24px] !pt-[34px] !pb-[18px] !px-[16px] !border-0"/>
        <label for="in_label" class="!text-[#292D324D]">Narx</label>
      </FloatLabel>
    </div>

    <div class="flex flex-col gap-2 w-full !mt-[24px]">
      <label for="description" class="text-[#292D3280] text-[16px]">Izoh</label>
      <Textarea v-model="addAnnouncement.note" id="description" class="w-full   custom-placeholder-input" rows="3" cols="30"
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
      <p v-for="error in v$.$errors" :key="error.$uid">
        {{ error.$message }}
      </p>
    </div>

    <div class="w-full flex justify-end !mt-5">
      <button
          type="submit"
          :disabled="v$.$invalid"
          class="text-white bg-[#66C61C] !py-4 !px-11 rounded-3xl disabled:opacity-50"
      >
        Joylash
      </button>
    </div>
  </form>
</template>