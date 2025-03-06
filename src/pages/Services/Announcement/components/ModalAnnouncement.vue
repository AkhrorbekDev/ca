<script lang="ts" setup>
import ConfirmDialog from 'primevue/confirmdialog';
import {AnnouncementType} from "@/pages/Services/Announcement/announcement.types";

const model = defineModel()

import {useConfirm} from "primevue/useconfirm";
import {formatNumber} from "@/utils/helper";
import {inject} from "vue";

const props = defineProps({
  tabIndex: {
    type: Number,
    default: 0
  },
  announcement: {
    type: Object as () => AnnouncementType,
    default: () => ({})
  }
})

const confirm = useConfirm();

const $auth = inject('auth');
const $api = inject('api');

const confirm1 = (id: number) => {
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
    accept: async () => {
      try {
        const editAnnouncement = {
          id: id,
          status: "IS_ACTIVE"
        };

        console.log("Sending edit announcement request with data:", editAnnouncement);
        await $api.announcement.editAnnouncement({id, data: editAnnouncement});
        console.log("Edit announcement request successful");
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    },
    reject: () => {
      console.error("Error fetching data:", error);
    }
  });
};
</script>

<template>
  <Dialog dismissableMask v-model:visible="model" modal :style="{ width: '50rem' }"
          :breakpoints="{ '1199px': '75vw', '575px': '90vw' }">
    <template #header>
      <div class="grow text-center text-[#292D32] text-[24px] font-medium">
        {{announcement?.service_name}}
      </div>
    </template>
    <div>
      <!--      <button class="w-full bg-[#66C61C1A] text-[#66C61C] text-[16px] !py-[16px] !px-[16px] rounded-[24px]">-->
      <!--        Faol-->
      <!--      </button>-->

      <div
          class="flex items-center justify-between bg-[#66C61C1A] text-[#66C61C] !py-[16px] !px-[16px] rounded-[24px] w-full !mb-[24px]">
        <span class="w-full text-center">Faol</span>
        <button>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
                d="M20.4445 6.88859C18.7779 7.4441 16.5559 5.22205 17.1114 3.55551M16.9766 3.6903L13.3862 7.28073C11.8253 8.84163 10.718 10.7974 10.1826 12.9389L10.0091 13.6329C9.95503 13.8491 10.1509 14.045 10.3671 13.9909L11.0611 13.8174C13.2026 13.282 15.1584 12.1747 16.7193 10.6138L20.3097 7.02338C20.7517 6.58139 21 5.98192 21 5.35684C21 4.05519 19.9448 3 18.6432 3C18.0181 3 17.4186 3.24831 16.9766 3.6903Z"
                stroke="#66C61C" stroke-width="1.5"/>
            <path
                d="M12 3C10.9767 3 9.95334 3.11763 8.95043 3.35288C6.17301 4.00437 4.00437 6.17301 3.35288 8.95043C2.88237 10.9563 2.88237 13.0437 3.35288 15.0496C4.00437 17.827 6.17301 19.9956 8.95044 20.6471C10.9563 21.1176 13.0437 21.1176 15.0496 20.6471C17.827 19.9956 19.9956 17.827 20.6471 15.0496C20.8824 14.0466 21 13.0233 21 12"
                stroke="#66C61C" stroke-width="1.5" stroke-linecap="round"/>
          </svg>
        </button>
      </div>

      <div>
        <div class="grid grid-cols-2 gap-4">
          <div class="bg-[#FAFAFA] rounded-[24px] !py-[8px] !px-[16px]">
            <p class="text-[12px] text-[#292D324D] !mb-[6px]">Qayerdan</p>
            <h6 class="text-[#292D32] text-[16px]">{{announcement?.from_location?.name}}</h6>
          </div>

          <div class="bg-[#FAFAFA] rounded-[24px] !py-[8px] !px-[16px]">
            <p class="text-[12px] text-[#292D324D] !mb-[6px]">Qayerga</p>
            <h6 class="text-[#292D32] text-[16px]">{{announcement?.to_location?.name}}</h6>
          </div>

          <div class="bg-[#FAFAFA] rounded-[24px] !py-[8px] !px-[16px]">
            <p class="text-[12px] text-[#292D324D] !mb-[6px]">Jo‘natish sanasi</p>
            <div class="flex items-center gap-2">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                    d="M8 5.75C7.59 5.75 7.25 5.41 7.25 5V2C7.25 1.59 7.59 1.25 8 1.25C8.41 1.25 8.75 1.59 8.75 2V5C8.75 5.41 8.41 5.75 8 5.75Z"
                    fill="#BFC0C2"/>
                <path
                    d="M16 5.75C15.59 5.75 15.25 5.41 15.25 5V2C15.25 1.59 15.59 1.25 16 1.25C16.41 1.25 16.75 1.59 16.75 2V5C16.75 5.41 16.41 5.75 16 5.75Z"
                    fill="#BFC0C2"/>
                <path
                    d="M8.5 14.5003C8.37 14.5003 8.24 14.4703 8.12 14.4203C7.99 14.3703 7.89 14.3003 7.79 14.2103C7.61 14.0203 7.5 13.7703 7.5 13.5003C7.5 13.3703 7.53 13.2403 7.58 13.1203C7.63 13.0003 7.7 12.8903 7.79 12.7903C7.89 12.7003 7.99 12.6303 8.12 12.5803C8.48 12.4303 8.93 12.5103 9.21 12.7903C9.39 12.9803 9.5 13.2403 9.5 13.5003C9.5 13.5603 9.49 13.6303 9.48 13.7003C9.47 13.7603 9.45 13.8203 9.42 13.8803C9.4 13.9403 9.37 14.0003 9.33 14.0603C9.3 14.1103 9.25 14.1603 9.21 14.2103C9.02 14.3903 8.76 14.5003 8.5 14.5003Z"
                    fill="#BFC0C2"/>
                <path
                    d="M12 14.4999C11.87 14.4999 11.74 14.4699 11.62 14.4199C11.49 14.3699 11.39 14.2999 11.29 14.2099C11.11 14.0199 11 13.7699 11 13.4999C11 13.3699 11.03 13.2399 11.08 13.1199C11.13 12.9999 11.2 12.8899 11.29 12.7899C11.39 12.6999 11.49 12.6299 11.62 12.5799C11.98 12.4199 12.43 12.5099 12.71 12.7899C12.89 12.9799 13 13.2399 13 13.4999C13 13.5599 12.99 13.6299 12.98 13.6999C12.97 13.7599 12.95 13.8199 12.92 13.8799C12.9 13.9399 12.87 13.9999 12.83 14.0599C12.8 14.1099 12.75 14.1599 12.71 14.2099C12.52 14.3899 12.26 14.4999 12 14.4999Z"
                    fill="#BFC0C2"/>
                <path
                    d="M15.5 14.4999C15.37 14.4999 15.24 14.4699 15.12 14.4199C14.99 14.3699 14.89 14.2999 14.79 14.2099C14.75 14.1599 14.71 14.1099 14.67 14.0599C14.63 13.9999 14.6 13.9399 14.58 13.8799C14.55 13.8199 14.53 13.7599 14.52 13.6999C14.51 13.6299 14.5 13.5599 14.5 13.4999C14.5 13.2399 14.61 12.9799 14.79 12.7899C14.89 12.6999 14.99 12.6299 15.12 12.5799C15.49 12.4199 15.93 12.5099 16.21 12.7899C16.39 12.9799 16.5 13.2399 16.5 13.4999C16.5 13.5599 16.49 13.6299 16.48 13.6999C16.47 13.7599 16.45 13.8199 16.42 13.8799C16.4 13.9399 16.37 13.9999 16.33 14.0599C16.3 14.1099 16.25 14.1599 16.21 14.2099C16.02 14.3899 15.76 14.4999 15.5 14.4999Z"
                    fill="#BFC0C2"/>
                <path
                    d="M8.5 18.0002C8.37 18.0002 8.24 17.9702 8.12 17.9202C8 17.8702 7.89 17.8002 7.79 17.7102C7.61 17.5202 7.5 17.2602 7.5 17.0002C7.5 16.8702 7.53 16.7402 7.58 16.6202C7.63 16.4902 7.7 16.3802 7.79 16.2902C8.16 15.9202 8.84 15.9202 9.21 16.2902C9.39 16.4802 9.5 16.7402 9.5 17.0002C9.5 17.2602 9.39 17.5202 9.21 17.7102C9.02 17.8902 8.76 18.0002 8.5 18.0002Z"
                    fill="#BFC0C2"/>
                <path
                    d="M12 18.0002C11.74 18.0002 11.48 17.8902 11.29 17.7102C11.11 17.5202 11 17.2602 11 17.0002C11 16.8702 11.03 16.7402 11.08 16.6202C11.13 16.4902 11.2 16.3802 11.29 16.2902C11.66 15.9202 12.34 15.9202 12.71 16.2902C12.8 16.3802 12.87 16.4902 12.92 16.6202C12.97 16.7402 13 16.8702 13 17.0002C13 17.2602 12.89 17.5202 12.71 17.7102C12.52 17.8902 12.26 18.0002 12 18.0002Z"
                    fill="#BFC0C2"/>
                <path
                    d="M15.5 17.9999C15.24 17.9999 14.98 17.8899 14.79 17.7099C14.7 17.6199 14.63 17.5099 14.58 17.3799C14.53 17.2599 14.5 17.1299 14.5 16.9999C14.5 16.8699 14.53 16.7399 14.58 16.6199C14.63 16.4899 14.7 16.3799 14.79 16.2899C15.02 16.0599 15.37 15.9499 15.69 16.0199C15.76 16.0299 15.82 16.0499 15.88 16.0799C15.94 16.0999 16 16.1299 16.06 16.1699C16.11 16.1999 16.16 16.2499 16.21 16.2899C16.39 16.4799 16.5 16.7399 16.5 16.9999C16.5 17.2599 16.39 17.5199 16.21 17.7099C16.02 17.8899 15.76 17.9999 15.5 17.9999Z"
                    fill="#BFC0C2"/>
                <path
                    d="M20.5 9.83984H3.5C3.09 9.83984 2.75 9.49984 2.75 9.08984C2.75 8.67984 3.09 8.33984 3.5 8.33984H20.5C20.91 8.33984 21.25 8.67984 21.25 9.08984C21.25 9.49984 20.91 9.83984 20.5 9.83984Z"
                    fill="#BFC0C2"/>
                <path
                    d="M16 22.75H8C4.35 22.75 2.25 20.65 2.25 17V8.5C2.25 4.85 4.35 2.75 8 2.75H16C19.65 2.75 21.75 4.85 21.75 8.5V17C21.75 20.65 19.65 22.75 16 22.75ZM8 4.25C5.14 4.25 3.75 5.64 3.75 8.5V17C3.75 19.86 5.14 21.25 8 21.25H16C18.86 21.25 20.25 19.86 20.25 17V8.5C20.25 5.64 18.86 4.25 16 4.25H8Z"
                    fill="#BFC0C2"/>
              </svg>
              <span class="text-[#292D32] text-[16px]">{{announcement.details?.from_date}}</span>
            </div>
          </div>

          <div class="bg-[#FAFAFA] rounded-[24px] !py-[8px] !px-[16px]">
            <p class="text-[12px] text-[#292D324D] !mb-[6px]">Yuk vazni</p>
            <div class="flex items-center justify-between">
              <span class="text-[#292D32] text-[16px]">{{announcement.details?.load_weight?.amount}}</span>
              <span class="text-[#292D32] text-[16px]">{{announcement.details?.load_weight?.name}}</span>
            </div>
          </div>

          <div class="bg-[#FAFAFA] rounded-[24px] !py-[8px] !px-[16px]">
            <p class="text-[12px] text-[#292D324D] !mb-[6px]">Transport turi</p>
            <div class="flex items-center gap-10">
              <span class="text-[#292D32] text-[16px]">{{announcement.transport_name}}</span>
              <img v-if="announcement?.transport_icon" class="object-contain w-[86px]" :src="announcement?.transport_icon" alt="truck">
            </div>
          </div>

        </div>

        <div class="bg-[#FAFAFA] rounded-[24px] !p-[16px] grid grid-cols-2 gap-10 !mt-[24px]">
          <div class="flex flex-col gap-2">
            <div class="flex items-center">
              <span class="text-[#AFAFAF] text-[16px] !mr-1">Yuk turi:</span>
              <span class="text-[#000000] text-[16px] !mr-1">Boshqa materiallar</span>
            </div>

            <div class="flex items-center">
              <span class="text-[#AFAFAF] text-[16px] !mr-1">To‘lov turi:</span>
              <span class="text-[#000000] text-[16px] !mr-1">{{announcement.details?.pay_type}}</span>
            </div>

            <div class="flex items-center">
              <span class="text-[#AFAFAF] text-[16px] !mr-1">Izoh:</span>
              <span class="text-[#000000] text-[16px] !mr-1">{{announcement?.note}}</span>
            </div>
          </div>

          <div class="flex flex-col gap-2">
            <div class="flex items-center">
              <span class="text-[#AFAFAF] text-[16px] !mr-1">Yuklash:</span>
              <span class="text-[#000000] text-[16px] !mr-1">Haydovchi yuklarni tashishi kerak</span>
            </div>

            <div class="flex items-center">
              <span class="text-[#AFAFAF] text-[16px] !mr-1">Narxi:</span>
              <span class="text-[#000000] text-[16px] !mr-1">{{formatNumber(announcement?.price)}} UZS</span>
            </div>

          </div>
        </div>

        <div class="bg-[#FAFAFA] rounded-[24px] !p-[16px] !mt-[24px]">
          <span class="text-[#292D324D] text-[12px]">Yuk rasmlari</span>

          <div class="flex items-center gap-6 !mt-[8px]">
            <img v-for="(image, index) in announcement?.images" :key="index" class="rounded-2xl" :src="`https://api.carting.uz/uploads/files/${image}`" alt="img" width="109">
          </div>
        </div>



        <div class="bg-[#FAFAFA] rounded-[24px] !p-[16px] !mt-[24px] !mb-[56px]">
          <iframe
              :src="`https://yandex.uz/map-widget/v1/?ll=${announcement.from_location?.lng}${announcement.from_location?.lat}`"
              width="100%"
              style="height: 300px"
              frameborder="0"
          />
        </div>

        <p class="font-light text-[#292D324D] text-center !mb-[16px]">E’lon vaqti: 16.08.2024, 09:14</p>

        <button v-if="props.tabIndex !== 0" @click="confirm1(announcement?.id)"
                class="bg-[#F044381A] text-[16px] text-[#F04438] text-center w-full rounded-[24px] !p-[16px]">
          Faolsizlantirish
        </button>

      </div>
    </div>
    <ConfirmDialog group="headless">
      <template #container="{ message, acceptCallback, rejectCallback }">
        <div class="bg-white rounded-[24px] !p-[24px]">
          <h6 class="!mb-[24px]">{{ message.message }}</h6>
          <div class="flex items-center gap-4 justify-end">
            <button class="bg-[#F3F3F3] rounded-[24px] text-[#292D32] text-[16px] !px-[30px] !py-[16px]"
                    @click="rejectCallback">Yo‘q
            </button>
            <button class="bg-[#F3F3F3] rounded-[24px] text-[#292D32] text-[16px] !px-[30px] !py-[16px]"
                    @click="acceptCallback">Ha
            </button>
          </div>
        </div>
      </template>
    </ConfirmDialog>
  </Dialog>
</template>
