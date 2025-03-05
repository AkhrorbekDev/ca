<script lang="ts" setup>
import ConfirmDialog from 'primevue/confirmdialog';
import { Announcement } from "../types";
import { useConfirm } from "primevue/useconfirm";
import { inject, onMounted, ref } from "vue";
import services from "@/api/Services";

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

const oilList = ref<{ oil_type: string; price: number }[] | []>([]);
const rentList = ref<{ oil_type: string; price: number }[] | []>([]);
const definitionList = ref<{ oil_type: string; price: number }[] | []>([]);
const imageList = ref<string[] | []>([]);

const confirm = useConfirm();

const confirm1 = () => {
  confirm.require({
    group: 'headless',
    message: 'Haqiqatdan ham e’lonni bekor qilmoqchimisiz?',
    headerActions: false,
    pcCloseButton: false,
    rejectProps: {
      label: 'Cancel',
      severity: 'secondary',
      outlined: true,
    },
    acceptProps: {
      label: 'Save',
    },
    accept: () => {},
    reject: () => {},
  });
};

const handleFileUpload = (event) => {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      const base64 = e.target.result as string;
      collectImages.value.push({
        fileName: file.name,
        base64: base64.split(',')[1], // Remove the data URL prefix
      });
      imageList.value.push(URL.createObjectURL(file)); // For preview
    };
    reader.readAsDataURL(file);
  }
};

const deleteImage = (index) => {
  imageList.value.splice(index, 1);
};

// Fetching data
const $auth = inject('auth');
const $api = inject('api');

const categoriesAllList = ref([]);
const servicesAllList = ref([]);

onMounted(async () => {
  await fetchAnnouncements();
});

const fetchAnnouncements = async () => {
  try {
    await $auth.login({
      phone_number: "998990195492",
      sms_type: "phone",
      session_token: "64430f938253f55cb6ebecbb46928523",
      security_code: "5555",
    });

    const response = await $api.workshop.getWorkshopCategory();
    categoriesAllList.value = response?.data;

    const responseOne = await $api.workshop.getWorkshopService();
    servicesAllList.value = responseOne?.data;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

// Sending data
const categories = ref([]);
const service = ref([]);
const collectImages = ref([]);

const addAnnouncement = ref<Announcement>({
  adv_type: '',
  service_type_id: 5,
  from_location: {
    lat: null,
    lng: null,
    name: null,
  },
  price: null,
  details: {
    repair_type_id: null,
    category: [],
    services: [],
    company_name: null,
  },
  note: null,
});

const pushService = (index) => {
  const serviceIndex = service.value.indexOf(index);
  console.log("Selected Services Prev:", service.value); // Debugging
  if (serviceIndex !== -1) {
    service.value.splice(serviceIndex, 1);
  } else {
    service.value.push(index);
  }
  console.log("Selected Services:", service.value); // Debugging
};

const pushCategory = (index) => {
  const categoryIndex = categories.value.indexOf(index);
  console.log("Selected Categories Prev:", categories.value); // Debugging
  if (categoryIndex !== -1) {
    categories.value.splice(categoryIndex, 1);
  } else {
    categories.value.push(index);
  }
  console.log("Selected Categories:", categories.value); // Debugging
};

const createAnnouncement = async (announce) => {
  try {

    // Update addAnnouncement with the selected categories and services
    announce.adv_type = props.activeTab === 1 ? 'RECEIVE' : props.activeTab === 2 ? 'PROVIDE' : '';
    announce.details.category = categories.value;
    announce.details.services = service.value;

    const announcementResponse = await $api.workshop.createWorkshop(announce);
    const advertisementId = announcementResponse?.data?.id;

    // Send Image
    const imagePayload = {
      advertisement_id: advertisementId,
      images: collectImages.value,
    }
    await $api.image.sendImage(imagePayload);

    addAnnouncement.value = {
      adv_type: '',
      service_type_id: 5,
      from_location: {
        lat: null,
        lng: null,
        name: null,
      },
      price: null,
      details: {
        repair_type_id: null,
        category: [],
        services: [],
        company_name: null,
      },
      note: null,
    };


  } catch (error) {
    console.error("Error creating announcement: ", error);
  }
};

</script>

<template>
  <Dialog dismissableMask v-model:visible="model" modal :style="{ width: '50rem' }"
          :breakpoints="{ '1199px': '75vw', '575px': '90vw' }">
    <template #header>
      <pre>{{addAnnouncement}}</pre>
      <pre>{{collectImages}}</pre>
      <div class="grow text-center text-[#292D32] text-[24px] font-medium">
        {{ announceValue.title }}
        ma’lumotlari
      </div>
    </template>
    <div>

      <div>
        <div
            v-if="announceValue.unique === 'delivery' || announceValue.unique === 'shipping' || announceValue.unique === 'passenger' || announceValue.unique === 'transfer'">
          <div class="grid grid-cols-2 gap-4">
            <FloatLabel variant="in">
              <InputText id="in_label" variant="filled"
                         class="w-full !bg-[#FAFAFA] !rounded-[24px] !pt-[34px] !pb-[18px] !px-[16px] !border-0"/>
              <label for="in_label" class="!text-[#292D324D]">Qayerdan</label>
            </FloatLabel>

            <FloatLabel variant="in">
              <InputText id="in_label" variant="filled"
                         class="w-full !bg-[#FAFAFA] !rounded-[24px] !pt-[34px] !pb-[18px] !px-[16px] !border-0"/>
              <label for="in_label" class="!text-[#292D324D]">Qayerga</label>
            </FloatLabel>

            <FloatLabel variant="in">
              <InputText id="in_label" variant="filled" type="number"
                         class="w-full !bg-[#FAFAFA] !rounded-[24px] !pt-[34px] !pb-[18px] !px-[16px] !border-0"/>
              <label for="in_label"
                     class="!text-[#292D324D]">{{
                  announceValue.unique === 'passenger' ? 'Maksimal yo‘lovchi soni' : announceValue.unique === 'transfer' ? 'Maksimal transport soni' : 'Maksimal yuk sig‘imi'
                }}</label>
            </FloatLabel>

            <FloatLabel variant="in">
              <InputText id="in_label" variant="filled" type="number"
                         class="w-full !bg-[#FAFAFA] !rounded-[24px] !pt-[34px] !pb-[18px] !px-[16px] !border-0"/>
              <label for="in_label" class="!text-[#292D324D]">Narx</label>
            </FloatLabel>
          </div>

          <div class="flex flex-col gap-2 w-full !mt-[24px]">
            <label for="description" class="text-[#292D3280] text-[16px]">Izoh</label>
            <Textarea id="description" class="w-full   custom-placeholder-input" rows="3" cols="30"
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
        </div>

        <div
            v-if="announceValue.unique === 'keeping'">
          <div class="grid grid-cols-2 gap-4">
            <FloatLabel variant="in">
              <InputText id="in_label" variant="filled"
                         class="w-full !bg-[#FAFAFA] !rounded-[24px] !pt-[34px] !pb-[18px] !px-[16px] !border-0"/>
              <label for="in_label" class="!text-[#292D324D]">Qayerdan</label>
            </FloatLabel>

            <FloatLabel variant="in">
              <InputText id="in_label" variant="filled" type="number"
                         class="w-full !bg-[#FAFAFA] !rounded-[24px] !pt-[34px] !pb-[18px] !px-[16px] !border-0"/>
              <label for="in_label" class="!text-[#292D324D]">Narx</label>
            </FloatLabel>

            <FloatLabel variant="in">
              <InputText id="in_label" variant="filled" type="number"
                         class="w-full !bg-[#FAFAFA] !rounded-[24px] !pt-[34px] !pb-[18px] !px-[16px] !border-0"/>
              <label for="in_label"
                     class="!text-[#292D324D]">Maydon</label>
            </FloatLabel>

          </div>

          <div class="flex flex-col gap-2 w-full !mt-[24px]">
            <label for="description" class="text-[#292D3280] text-[16px]">Izoh</label>
            <Textarea id="description" class="w-full   custom-placeholder-input" rows="3" cols="30"
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
        </div>

        <form @submit.prevent="createAnnouncement(addAnnouncement)"
            v-if="announceValue.unique === 'repair' || announceValue.unique === 'master'">
          <div class="grid grid-cols-2 gap-4 !mb-[24px]">
            <FloatLabel variant="in">
              <InputText v-model="addAnnouncement.from_location.name" id="in_label" variant="filled"
                         class="w-full !bg-[#FAFAFA] !rounded-[24px] !pt-[34px] !pb-[18px] !px-[16px] !border-0"/>
              <label for="in_label" class="!text-[#292D324D]">Qayerdan</label>
            </FloatLabel>

            <FloatLabel variant="in">
              <InputText v-model="addAnnouncement.price" id="in_label" variant="filled" type="number"
                         class="w-full !bg-[#FAFAFA] !rounded-[24px] !pt-[34px] !pb-[18px] !px-[16px] !border-0"/>
              <label for="in_label" class="!text-[#292D324D]">Narx</label>
            </FloatLabel>

            <FloatLabel variant="in">
              <InputText v-model="addAnnouncement.details.company_name" id="in_label" variant="filled"
                         class="w-full !bg-[#FAFAFA] !rounded-[24px] !pt-[34px] !pb-[18px] !px-[16px] !border-0"
                         placeholder="Kompaniya nomini kiriting!"/>
              <label for="in_label" class="!text-[#292D324D]">Kompaniya nomi</label>
            </FloatLabel>

          </div>

          <div v-if="announceValue.unique !== 'master'"
               class="bg-[#FAFAFA] !py-[12px] !px-[16px] rounded-[24px] !mb-[24px]">
            <span class="text-[#292D324D] text-[12px] !mb-[8px]">Toifalar</span>

            <div class="flex items-center gap-2">
              <button
                  type="button"
                  v-for="(item) in categoriesAllList"
                  :key="item.id"
                  @click="pushCategory(item?.id)"
                  :class="['!py-[4px] !px-[12px] text-[#292D32] text-[12px] rounded-[20px]', categories.includes(item?.id) && 'bg-[#66C61C] text-white']">
                {{ item?.name }}
              </button>
            </div>
          </div>

          <div class="bg-[#FAFAFA] !py-[12px] !px-[16px] rounded-[24px]">
            <span class="text-[#292D324D] text-[12px] !mb-[8px]">Xizmatlar</span>

            <div class="flex items-center gap-2">
              <button
                  type="button"
                  v-for="(item) in servicesAllList"
                  :key="item.id"
                  @click="pushService(item?.id)"
                  :class="['!py-[4px] !px-[12px] text-[#292D32] text-[12px] rounded-[20px]', service.includes(item?.id) && 'bg-[#66C61C] text-white']">
                {{ item?.name }}
              </button>
            </div>
          </div>

          <div class="flex flex-col gap-2 w-full !mt-[24px]">
            <label for="description" class="text-[#292D3280] text-[16px]">Izoh</label>
            <Textarea v-model="addAnnouncement.note" id="description" class="w-full   custom-placeholder-input" rows="3" cols="30"
                      placeholder="Yuk haqida izoh qoldiring!"/>
          </div>

          <div class="bg-[#FAFAFA] rounded-[24px] !p-[16px] !mt-[24px]">
            <span class="text-[#292D324D] text-[12px]">Ustaxona rasmlari</span>
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

                  <input @change="handleFileUpload"  class="absolute opacity-0 inset-0 cursor-pointer"
                         id="fileAnnouncement" type="file"
                         accept="image/*">
                </button>
              </label>
            </div>
          </div>
          <div class="w-full flex justify-end">
            <button type="submit" class="text-white bg-[#66C61C] !py-4 !px-11 rounded-3xl">Joylash</button>
          </div>
        </form>

        <div
            v-if="announceValue.unique === 'technical'">
          <div class="grid grid-cols-2 gap-4">
            <FloatLabel variant="in">
              <InputText id="in_label" variant="filled"
                         class="w-full !bg-[#FAFAFA] !rounded-[24px] !pt-[34px] !pb-[18px] !px-[16px] !border-0"/>
              <label for="in_label" class="!text-[#292D324D]">Qayerdan</label>
            </FloatLabel>

            <FloatLabel variant="in">
              <InputText id="in_label" variant="filled" type="number"
                         class="w-full !bg-[#FAFAFA] !rounded-[24px] !pt-[34px] !pb-[18px] !px-[16px] !border-0"/>
              <label for="in_label" class="!text-[#292D324D]">Narx</label>
            </FloatLabel>
          </div>

          <div class="flex flex-col gap-2 w-full !mt-[24px]">
            <label for="description" class="text-[#292D3280] text-[16px]">Izoh</label>
            <Textarea id="description" class="w-full   custom-placeholder-input" rows="3" cols="30"
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
        </div>

        <div v-if="announceValue.unique === 'oil'">
          <div class="grid grid-cols-2 gap-4">
            <FloatLabel variant="in">
              <InputText id="in_label" variant="filled"
                         class="w-full !bg-[#FAFAFA] !rounded-[24px] !pt-[34px] !pb-[18px] !px-[16px] !border-0"/>
              <label for="in_label" class="!text-[#292D324D]">Qayerda</label>
            </FloatLabel>

            <FloatLabel variant="in">
              <InputText id="in_label" variant="filled"
                         class="w-full !bg-[#FAFAFA] !rounded-[24px] !pt-[34px] !pb-[18px] !px-[16px] !border-0"/>
              <label for="in_label" class="!text-[#292D324D]">Kompaniya nomi</label>
            </FloatLabel>

            <FloatLabel variant="in">
              <InputText id="in_label" variant="filled" type="number"
                         class="w-full !bg-[#FAFAFA] !rounded-[24px] !pt-[34px] !pb-[18px] !px-[16px] !border-0"/>
              <label for="in_label" class="!text-[#292D324D]">Maksimal yuk sig‘imi</label>
            </FloatLabel>

            <FloatLabel variant="in">
              <InputText id="in_label" variant="filled" type="number"
                         class="w-full !bg-[#FAFAFA] !rounded-[24px] !pt-[34px] !pb-[18px] !px-[16px] !border-0"/>
              <label for="in_label" class="!text-[#292D324D]">Yetkazib berish narxi</label>
            </FloatLabel>
          </div>

          <div class="bg-[#FAFAFA] rounded-[24px] !p-[16px] !mt-[24px]">
            <span class="block !mb-[16px] text-[#000000] text-[16px] font-medium">Yoqilg‘i turi va narxlari</span>

            <div class="grid grid-cols-2 gap-4">
              <template v-for="item in oilList">
                <FloatLabel variant="in">
                  <Select :options="[]" optionLabel="name" placeholder="AI 80"
                          class="w-full !border-0 !rounded-[24px] custom-placeholder-select h-[76px] flex items-center"/>
                  <label for="in_label" class="!text-[#292D324D]">Yoqilg’i turi</label>
                </FloatLabel>

                <FloatLabel variant="in">
                  <InputText id="in_label" variant="filled" type="number"
                             class="w-full !bg-[#FFFFFF] !rounded-[24px] !pt-[34px] !pb-[18px] !px-[16px] !border-0"/>
                  <label for="in_label" class="!text-[#292D324D]">Narx</label>
                </FloatLabel>
              </template>

            </div>

            <button
                @click="addList"
                class="!mt-[16px] flex items-center text-[#66C61C] !pl-[115px] !py-[12px] !pr-[107px] rounded-[24px] border-[1px] border-[#66C61C]">
              <svg class="!mr-[16px]" width="10" height="10" viewBox="0 0 10 10" fill="none"
                   xmlns="http://www.w3.org/2000/svg">
                <path d="M1 5H9M5 1L5 9" stroke="#66C61C" stroke-width="1.5" stroke-linecap="round"/>
              </svg>
              Qo’shish
            </button>
          </div>

          <div class="flex flex-col gap-2 w-full !mt-[24px]">
            <label for="description" class="text-[#292D3280] text-[16px]">Izoh</label>
            <Textarea id="description" class="w-full   custom-placeholder-input" rows="3" cols="30"
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
        </div>

        <div v-if="announceValue.unique === 'rent'">
          <div class="grid grid-cols-2 gap-4">
            <FloatLabel variant="in">
              <InputText id="in_label" variant="filled"
                         class="w-full !bg-[#FAFAFA] !rounded-[24px] !pt-[34px] !pb-[18px] !px-[16px] !border-0"/>
              <label for="in_label" class="!text-[#292D324D]">Qayerda</label>
            </FloatLabel>

            <FloatLabel variant="in">
              <InputText id="in_label" variant="filled" type="number"
                         class="w-full !bg-[#FAFAFA] !rounded-[24px] !pt-[34px] !pb-[18px] !px-[16px] !border-0"/>
              <label for="in_label" class="!text-[#292D324D]">1 sutkalik narx</label>
            </FloatLabel>

          </div>

          <div class="bg-[#FAFAFA] rounded-[24px] !p-[16px] !mt-[24px]">
            <span class="block !mb-[16px] text-[#000000] text-[16px] font-medium">Texnik xarakteristikalar</span>

            <div class="">
              <div class="grid grid-cols-2 gap-4 border-b !pb-4 !mb-4" v-for="item in rentList">
                <FloatLabel variant="in">
                  <Select :options="[]" optionLabel="name" placeholder="AI 80"
                          class="w-full !border-0 !rounded-[24px] custom-placeholder-select h-[76px] flex items-center"/>
                  <label for="in_label" class="!text-[#292D324D]">Model</label>
                </FloatLabel>

                <FloatLabel variant="in">
                  <InputText id="in_label" variant="filled"
                             class="w-full !bg-[#FFFFFF] !rounded-[24px] !pt-[34px] !pb-[18px] !px-[16px] !border-0"/>
                  <label for="in_label" class="!text-[#292D324D]">Kuzov turi</label>
                </FloatLabel>

                <FloatLabel variant="in">
                  <Select :options="[]" optionLabel="name" placeholder="AI 80"
                          class="w-full !border-0 !rounded-[24px] custom-placeholder-select h-[76px] flex items-center"/>
                  <label for="in_label" class="!text-[#292D324D]">Uzatmalar qutisi</label>
                </FloatLabel>

                <FloatLabel variant="in">
                  <InputText id="in_label" variant="filled"
                             class="w-full !bg-[#FFFFFF] !rounded-[24px] !pt-[34px] !pb-[18px] !px-[16px] !border-0"/>
                  <label for="in_label" class="!text-[#292D324D]">Dvigatel hajmi</label>
                </FloatLabel>

                <FloatLabel variant="in">
                  <InputText id="in_label" variant="filled"
                             class="w-full !bg-[#FFFFFF] !rounded-[24px] !pt-[34px] !pb-[18px] !px-[16px] !border-0"/>
                  <label for="in_label" class="!text-[#292D324D]">Rangi</label>
                </FloatLabel>

                <FloatLabel variant="in">
                  <InputText id="in_label" variant="filled"
                             class="w-full !bg-[#FFFFFF] !rounded-[24px] !pt-[34px] !pb-[18px] !px-[16px] !border-0"/>
                  <label for="in_label" class="!text-[#292D324D]">Bagaj hajmi</label>
                </FloatLabel>

                <FloatLabel variant="in">
                  <InputText id="in_label" variant="filled"
                             class="w-full !bg-[#FFFFFF] !rounded-[24px] !pt-[34px] !pb-[18px] !px-[16px] !border-0"/>
                  <label for="in_label" class="!text-[#292D324D]">O‘rindiqlar soni</label>
                </FloatLabel>

                <FloatLabel variant="in">
                  <Select :options="[]" optionLabel="name" placeholder=""
                          class="w-full !border-0 !rounded-[24px] custom-placeholder-select h-[76px] flex items-center"/>
                  <label for="in_label" class="!text-[#292D324D]">Konditsioner</label>
                </FloatLabel>

                <FloatLabel variant="in">
                  <InputText id="in_label" variant="filled"
                             class="w-full !bg-[#FFFFFF] !rounded-[24px] !pt-[34px] !pb-[18px] !px-[16px] !border-0"/>
                  <label for="in_label" class="!text-[#292D324D]">Sug’urta</label>
                </FloatLabel>

                <FloatLabel variant="in">
                  <InputText id="in_label" variant="filled"
                             class="w-full !bg-[#FFFFFF] !rounded-[24px] !pt-[34px] !pb-[18px] !px-[16px] !border-0"/>
                  <label for="in_label" class="!text-[#292D324D]">Sutkalik km limiti</label>
                </FloatLabel>
              </div>

            </div>

            <button
                @click="addRentList"
                class="!mt-[16px] flex items-center text-[#66C61C] !pl-[115px] !py-[12px] !pr-[107px] rounded-[24px] border-[1px] border-[#66C61C]">
              <svg class="!mr-[16px]" width="10" height="10" viewBox="0 0 10 10" fill="none"
                   xmlns="http://www.w3.org/2000/svg">
                <path d="M1 5H9M5 1L5 9" stroke="#66C61C" stroke-width="1.5" stroke-linecap="round"/>
              </svg>
              Qo’shish
            </button>
          </div>

          <div class="bg-[#FAFAFA] rounded-[24px] !p-[16px] !mt-[24px]">
            <span class="block !mb-[16px] text-[#000000] text-[16px] font-medium">Ta’riflar</span>

            <div class="grid grid-cols-2 gap-4">
              <template v-for="item in definitionList">
                <FloatLabel variant="in">
                  <InputText id="in_label" variant="filled" type="number"
                             class="w-full !bg-[#FFFFFF] !rounded-[24px] !pt-[34px] !pb-[18px] !px-[16px] !border-0"/>
                  <label for="in_label" class="!text-[#292D324D]">Kun</label>
                </FloatLabel>

                <FloatLabel variant="in">
                  <InputText id="in_label" variant="filled" type="number"
                             class="w-full !bg-[#FFFFFF] !rounded-[24px] !pt-[34px] !pb-[18px] !px-[16px] !border-0"/>
                  <label for="in_label" class="!text-[#292D324D]">Narx</label>
                </FloatLabel>
              </template>

            </div>

            <button
                @click="addDefinitionList"
                class="!mt-[16px] flex items-center text-[#66C61C] !pl-[115px] !py-[12px] !pr-[107px] rounded-[24px] border-[1px] border-[#66C61C]">
              <svg class="!mr-[16px]" width="10" height="10" viewBox="0 0 10 10" fill="none"
                   xmlns="http://www.w3.org/2000/svg">
                <path d="M1 5H9M5 1L5 9" stroke="#66C61C" stroke-width="1.5" stroke-linecap="round"/>
              </svg>
              Qo’shish
            </button>
          </div>

          <!--          <div class="flex flex-col gap-2 w-full !mt-[24px]">-->
          <!--            <label for="description" class="text-[#292D3280] text-[16px]">Izoh</label>-->
          <!--            <Textarea id="description" class="w-full   custom-placeholder-input" rows="3" cols="30"-->
          <!--                      placeholder="Yuk haqida izoh qoldiring!"/>-->
          <!--          </div>-->

          <div class="bg-[#FAFAFA] rounded-[24px] !p-[16px] !mt-[24px]">
            <span class="text-[#292D324D] text-[12px]">Mashina rasmlari</span>
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
        </div>


        <div class="bg-[#FAFAFA] rounded-[24px] !p-[16px] !mt-[24px] !mb-[56px]">
          <iframe
              src="https://yandex.uz/map-widget/v1/?ll=69.279737%2C41.311151&z=12"
              width="100%"
              style="height: 300px"
              frameborder="0"
          />
        </div>

      </div>
    </div>
  </Dialog>
</template>

<style lang="scss">

.p-floatlabel label {
  top: 1rem !important;
}

</style>