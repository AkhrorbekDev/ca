 <script lang="ts" setup>
import {Announcement} from "../types";
import {useConfirm} from "primevue/useconfirm";
import {inject, onMounted, ref, watch} from "vue";
import RepairMaster from "@/pages/Services/Announcement/Forms/RepairMaster.vue";
import DeliveryShippingPassengerTransfer
  from "@/pages/Services/Announcement/Forms/DeliveryShippingPassengerTransfer.vue";
import Warehouse from "@/pages/Services/Announcement/Forms/Warehouse.vue";
import Oil from "@/pages/Services/Announcement/Forms/Oil.vue";
import ServiceItem from "@/pages/Services/Components/ServiceItem.vue";
import SpecialEquipmentServices from "@/pages/Services/Announcement/Forms/SpecialEquipmentServices.vue";
import Rental from "@/pages/Services/TransportRental/Rental.vue";
import RentAuto from "@/pages/Services/Announcement/Forms/RentAuto.vue";
import Stage from "@/pages/Services/Announcement/Forms/Stage.vue";

const model = defineModel();
const props = defineProps({
  announceValue: {
    type: Object,
    default: () => ({}),
  },
  data: Object,
  activeTab: {
    type: Number,
  },
});
const uniqueVal = ref(props.announceValue.unique);

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
    accept: () => {
    },
    reject: () => {
    },
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
const $api = inject('api');

const categoriesAllList = ref([]);
const servicesAllList = ref([]);

onMounted(async () => {
  await fetchAnnouncements();
});

const fetchAnnouncements = async () => {
  try {
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

    imagePayload.images = [];

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

const dynamicId = ref(0);

watch(
  () => props.data,
  (value) => {
    if (value) {
      dynamicId.value = value.id;
    }
  },
  { immediate: true, deep: true }
);

</script>

<template>
  <Dialog dismissableMask v-model:visible="model" modal :style="{ width: '50rem' }"
          :breakpoints="{ '1199px': '75vw', '575px': '90vw' }">
    <template #header>
      <div class="grow text-center text-[#292D32] text-[24px] font-medium">
        {{ announceValue.name }}
        ma’lumotlari
      </div>
    </template>
    <div>
      <div>
        <DeliveryShippingPassengerTransfer
            v-if="dynamicId === 9 || dynamicId  === 1 || dynamicId === 2 || dynamicId === 6"
            :announceValue="dynamicId"
            :childForm="announceValue"
            :activeTab="activeTab"
        />

        <Warehouse
            v-if="dynamicId === 7"
            :announceValue="announceValue"
            :activeTab="activeTab"
        />

        <Stage
            v-if="dynamicId === 10"
            :announceValue="announceValue"
            :activeTab="activeTab"
        />

        <RepairMaster
            v-if="dynamicId === 5"
            :announceValue="announceValue"
            :activeTab="activeTab"
        />

        <SpecialEquipmentServices 
          v-if="dynamicId === 3" 
          :announceValue="dynamicId"
          :childForm="announceValue"
          :activeTab="activeTab"
        />

        <Oil v-if="dynamicId === 8"/>

        <RentAuto v-if="dynamicId === 4" />
        

        <div class="bg-[#FAFAFA] rounded-[24px] !p-[16px] !mt-[24px] !mb-[56px]">
          <ServiceItem/>
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
