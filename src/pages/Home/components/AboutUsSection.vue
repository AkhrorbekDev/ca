<script setup lang="ts">
import {inject, ref} from 'vue';
import {services} from '@/components/fakeJson'
import {useRouter} from 'vue-router';

const selectedService = ref();
const selectedTransport = ref();
const router = useRouter()
const $api = inject('api')
const transports = ref([])

const onSelectService = (e) => {
  $api.transport.getTransportByServiceId(e.id)
      .then(res => {
        transports.value = res.data
      })
}

const changeRoute = () => {
  router.push({
    name: 'announcement',
    query: {
      service_id: selectedService.value?.id,
      transport_type_id: selectedTransport.value?.id
    }
  })
}

</script>

<template>
  <div class="about-us ">
    <div class="max-w-screen-xl  container lg:mx-auto !pt-[334px] !pb-[100px] relative ">
      <div
          class="bg-white rounded-[24px] !p-[40px] grid grid-cols-3 gap-6 shadow-custom absolute top-[-80px] w-full left-0 dark:!bg-zinc-700"
      >
        <div class="flex flex-col gap-2 w-full dark:!bg-zinc-700">
          <label for="username" class="text-[#292D32] font-medium text-[16px]">Xizmat turi</label>
          <Select
              v-model="selectedService"
              :options="services"
              optionLabel="title"
              placeholder="Xizmat turini tanlang"
              class="w-full !bg-[#FAFAFA] !border-0 custom-placeholder-select"
              @update:model-value="onSelectService"
          >
            <template #option="slotProps">
              <div

                  class="flex items-center w-full justify-between"
              >
                <div class="w-full flex flex-col items-start justify-start">
                  <label :for="`name.${slotProps.option.value}`" class="flex items-center gap-4 cursor-pointer">
                    {{ $t(slotProps.option.title) }}
                  </label>
                </div>
              </div>
            </template>
          </Select>
        </div>

        <!--        <div class="flex flex-col gap-2 w-full">-->
        <!--          <label for="username" class="text-[#292D32] font-medium text-[16px]">Qayerdan</label>-->
        <!--          <InputText type="text" class="w-full !bg-[#FAFAFA] !border-0 custom-placeholder-input"-->
        <!--                     placeholder="Manzilni kiriting"/>-->
        <!--        </div>-->

        <!--        <div class="flex flex-col gap-2 w-full">-->
        <!--          <label for="username" class="text-[#292D32] font-medium text-[16px]">Qayerga</label>-->
        <!--          <InputText type="text" class="w-full !bg-[#FAFAFA] !border-0 custom-placeholder-input"-->
        <!--                     placeholder="Manzilni kiriting"/>-->
        <!--        </div>-->

        <!--        <div class="flex flex-col gap-2 w-full">-->
        <!--          <label for="username" class="text-[#292D32] font-medium text-[16px]">Qachon</label>-->
        <!--          <InputText type="text" class="w-full !bg-[#FAFAFA] !border-0 custom-placeholder-input"-->
        <!--                     placeholder="Kiriting"/>-->
        <!--        </div>-->

        <div class="flex flex-col gap-2 w-full dark:!bg-zinc-700">
          <label for="username" class="text-[#292D32] font-medium text-[16px]">{{ $t('transportType') }}</label>
          <Select
              v-model="selectedTransport"
              :options="transports"
              optionLabel="name"
              :placeholder="$t('pickTransport')"
              class="w-full !bg-[#FAFAFA] !border-0 custom-placeholder-select"
          />
        </div>

        <button class="bg-[#66C61C] h-[40px] text-white rounded-full !mt-auto" @click="changeRoute">
          Izlash
        </button>
      </div>

      <div class="flex justify-between" id="about">
        <div class="!mr-[40px]">
          <span class="block text-[16px] text-[#292D3266] font-medium !mb-[24px]">Biz haqimizda</span>

          <h2 class="text-[#292D32] text-[40px] font-semibold !mb-[24px]">Carting – Siz bilan Har <br>
            Qadamda endi Birga!</h2>

          <p class="w-[592px] text-[#292D3266] text-[18px] !mb-[24px]">
            Biz aholi va korporativ mijozlarga eng ommabop transport va
            logistika xizmatlarini tez, oson va ishonchli tarzda, zamonaviy
            texnologiyalar asosida taqdim etishni taklif etamiz. Maqsadimiz,
            ushbu platforma orqali yirik va kichik kompaniyalar, yakka tartibdagi
            tadbirkorlar va jismoniy shaxslar uchun sifatli, arzon va xavfsiz
            transport xizmatlaridan istalgan vaqtda, istalgan joydanfoydalanish
            imkoniyatini yaratishdir.</p>

          <router-link to="/services" class="bg-[#66C61C] font-medium text-white rounded-[8px] !px-[24px] !py-[12px]">
            Xizmatdan foydalanish
          </router-link>
        </div>

        <div>
          <img src="@/assets/images/about-us-img.png" alt="img" width="600">
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.about-us {
  background-color: white;
  background-image: url("@/assets/images/about-us-bg.png");
  background-size: cover;
  background-position: center center;
  background-repeat: no-repeat;
}

.custom-placeholder-select .p-placeholder {
  font-size: 14px !important;
  color: #292D324D !important;
}

.custom-placeholder-input::placeholder {
  font-size: 14px !important;
  color: #292D324D !important;
}
</style>
