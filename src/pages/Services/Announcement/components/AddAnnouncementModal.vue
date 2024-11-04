<script lang="ts" setup>
import ConfirmDialog from 'primevue/confirmdialog';

const model = defineModel()
const props = defineProps({
  announceValue: {
    type: Object,
    default: () => {
    }
  }
})

import {useConfirm} from "primevue/useconfirm";
import {ref} from "vue";

const imageList = ref<string[] | []>([])

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
      outlined: true
    },
    acceptProps: {
      label: 'Save'
    },
    accept: () => {

    },
    reject: () => {

    }
  });
};

const images = ref([
  "https://via.placeholder.com/150",
  "https://via.placeholder.com/150",
  "https://via.placeholder.com/150",
  "https://via.placeholder.com/150",
]);

const handleFileUpload = (event) => {
  const file = event.target.files[0];
  if (file) {
    // Create a temporary URL for the uploaded file
    imageList.value.push(URL.createObjectURL(file))
  }
};


const deleteImage = (index) => {
  imageList.value.splice(index, 1)
}

</script>

<template>
  <Dialog v-model:visible="model" modal :style="{ width: '50rem' }"
          :breakpoints="{ '1199px': '75vw', '575px': '90vw' }">
    <template #header>
      <div class="grow text-center text-[#292D32] text-[24px] font-medium">
        {{ announceValue.title }}
        ma’lumotlari
      </div>
    </template>
    <div>

      <div>
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
            <label for="in_label" class="!text-[#292D324D]">Maksimal yuk sig‘imi</label>
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