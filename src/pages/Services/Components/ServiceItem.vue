<script lang="ts" setup>
import velosiped from "@/assets/images/velosiped.png"
import skuter from "@/assets/images/skuter.png"
import sedan from "@/assets/images/sedan.png"

import {ref} from "vue";

const value2 = ref(null);

const selectedCountry = ref();
const countries = ref([
  {name: 'Velosiped', info: "3 kg gacha", image: velosiped},
  {name: 'Skuter', info: "5 kg gacha", image: skuter},
  {name: 'Sedan', info: "20 kg gacha", image: sedan},

]);
</script>

<template>
  <div>

    <div class="relative z-50">
      <div class="flex items-center gap-4 bg-white !p-[16px] rounded-[40px]">
        <div class="w-[22%]">
          <FloatLabel variant="in">
            <InputText id="in_label" variant="filled" placeholder="Manzilni tanlang"
                       class="w-full bg-[#FAFAFA] !rounded-[24px] !pt-[34px] !pb-[18px] !px-[16px] !border-0"/>
            <label for="in_label" class="!text-[#292D324D]">Qayerdan</label>
          </FloatLabel>
        </div>

        <div class="w-[22%]">
          <FloatLabel variant="in">
            <InputText id="in_label" variant="filled" placeholder="Manzilni tanlang"
                       class="w-full bg-[#FAFAFA] !rounded-[24px] !pt-[34px] !pb-[18px] !px-[16px] !border-0"/>
            <label for="in_label" class="!text-[#292D324D]">Qayerga</label>
          </FloatLabel>
        </div>

        <div class="w-[12%]">
          <FloatLabel variant="in">
            <DatePicker v-model="value2" inputId="in_label" showIcon iconDisplay="input" variant="filled"
                        class="custom-date"/>
            <!--            <InputText id="in_label" variant="filled" placeholder="Manzilni tanlang"-->
            <!--                       class="w-full bg-[#FAFAFA] !rounded-[24px] !pt-[34px] !pb-[18px] !px-[16px] !border-0"/>-->
            <label for="in_label" class="!text-[#292D324D]">Jo‘natish sanasi</label>
          </FloatLabel>
        </div>

        <div class="w-[22%]">
          <FloatLabel variant="in">
            <Select :options="[]" optionLabel="name" placeholder="Yuk turi, rasmi, yuklash xizmati, to‘lov..."
                    class="w-full !bg-[#FAFAFA] !border-0 !rounded-[24px] custom-placeholder-select h-[76px] flex items-center"/>
            <label for="in_label" class="!text-[#292D324D]">Qo‘shimcha ma’lumotlar</label>
          </FloatLabel>
        </div>

        <div class="w-[22%]">
          <FloatLabel variant="in">
            <Select v-model="selectedCountry" :options="countries" optionLabel="name" placeholder="Transportni tanlang"
                    class="w-full !bg-[#FAFAFA] !border-0 !rounded-[24px] custom-placeholder-select h-[76px] flex items-center">
              <template #value="slotProps">
                <div v-if="slotProps.value" class="flex items-center">
                  <img :alt="slotProps.value.label"
                       src="https://primefaces.org/cdn/primevue/images/flag/flag_placeholder.png"
                       class="mr-2" style="width: 18px"/>
                  <div>{{ slotProps.value.name }}</div>
                </div>
                <span v-else>
                    {{ slotProps.placeholder }}
                </span>
              </template>
              <template #option="slotProps">
                <div class="flex items-center">
                  <img :alt="slotProps.option.label"
                       src="https://primefaces.org/cdn/primevue/images/flag/flag_placeholder.png"
                       :class="`mr-2`" style="width: 18px"/>
                  <div>{{ slotProps.option.name }}</div>
                </div>
              </template>
            </Select>
            <label for="in_label" class="!text-[#292D324D]">Transport turi</label>
          </FloatLabel>
        </div>
      </div>
    </div>

    <iframe
        src="https://yandex.uz/map-widget/v1/?ll=69.279737%2C41.311151&z=12"
        width="100%"
        style="height: 100vh; position: fixed; top: 0; left: 0"
        frameborder="0"
    />
  </div>
</template>

<style lang="scss">
.p-floatlabel label {
  top: 1rem !important;
}

.custom-date input {
  border: none;
  height: 76px;
  border-radius: 24px;
}
</style>