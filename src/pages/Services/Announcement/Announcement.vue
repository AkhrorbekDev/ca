<script setup lang="ts">
import {ref} from 'vue';


const activeTab = ref(0);
const tabs = ['Barchasi', 'Mening e\'lonlarim', 'Mening e\'lonlarim'];
</script>

<template>
  <div>
    <div class="flex items-center justify-between">

      <div class="flex items-center space-x-4 bg-white rounded-lg !p-1.5">
        <button
            v-for="(tab, index) in tabs"
            :key="index"
            :class="[
        '!px-4 !py-3 rounded-lg font-medium',
        activeTab == index ? 'bg-gray-800 text-white' : 'text-gray-400'
      ]"
            @click="activeTab = index"
        >
          {{ tab }}
        </button>
      </div>

      <div class="flex items-center gap-4">
        <div class="flex flex-col gap-2 w-full">
          <Select v-model="selectedCity" :options="[]" optionLabel="name" placeholder="Xizmatlar"
                  class="w-full !border-0 !rounded-[16px] custom-placeholder-select h-[56px] flex items-center"/>
        </div>

        <div class="flex flex-col gap-2 w-full">
          <Select v-model="selectedCity" :options="[]" optionLabel="name" placeholder="Status"
                  class="w-full !border-0 !rounded-[16px] custom-placeholder-select h-[56px] flex items-center"/>
        </div>

        <AutoComplete
            type="text"
            placeholder="Kerakli e’lonni qidiring"
            :scrollHeight="'300'"
        />
      </div>
    </div>

    <div class="!mt-[31px]">

    </div>
  </div>
</template>

<style lang="scss">
.custom-placeholder-select .p-placeholder {
  font-size: 14px !important;
  color: #292D324D !important;
}


.p-autocomplete-input::placeholder {
  color: #292D3233 !important;

}

.p-autocomplete-input {
  background-image: url("../../../../node_modules/primeicons/raw-svg/search.svg") !important;
  background-size: 1.5em !important;
  background-color: #F3F3F3 !important;
  background-position: left 10px top 17px !important;
  background-repeat: no-repeat !important;
  text-indent: 30px !important;
  padding: 16px !important;
  border-radius: 16px !important;
  border: none !important;
  width: 350px;
}

.p-select {
  position: static!important;
}
</style>