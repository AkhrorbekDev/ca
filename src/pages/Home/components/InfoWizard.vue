<script lang="ts" setup>
import {useI18n} from 'vue-i18n'

interface WizardData {
  title: string
  description: string
}


const {t} = useI18n()

const wizardData: WizardData[] = [

  {
    title: t('home.usingMode.first.title'),
    description: t('home.usingMode.first.description'),
  },

  {
    title: t('home.usingMode.second.title'),
    description: t('home.usingMode.second.description'),
  },

  {
    title: t('home.usingMode.third.title'),
    description: t('home.usingMode.third.description'),
  },

  {
    title: t('home.usingMode.fourth.title'),
    description: t('home.usingMode.fourth.description'),
  },
]

</script>


<template>
  <div class="bg-white ">
    <h3 class="text-[#292D32] text-[64px] font-semibold text-center !mb-[40px]">{{ $t('home.usingMode.title') }}</h3>

    <div class="max-w-screen-xl  container lg:mx-auto">
      <div class="!pt-[72px] !pb-[100px] flex items-center">
        <div
            class="relative wizard-wrapper w-[229px] h-[230px] !pt-[48px] !pb-[24px] !px-[32px] rounded-[24px] dark:!bg-zinc-700"
            v-for="(item, index) in wizardData"
            :key="index"
        >
          <h4 class="text-[#292D32] text-[24px] font-semibold text-center !mb-[16px]">{{ item.title }}</h4>

          <span class="block text-[#292D3266] text-center">{{ item.description }}</span>

          <img
              class="absolute top-[-30px] left-[50%] translate-x-[-50%]"
              src="@/assets/images/icons/success-tab.svg"
              alt="success-tab"
          >

          <img
              v-if="wizardData.length - 1 !== index"
              class="absolute top-[35%] left-[110%]"
              src="@/assets/images/icons/arrrow-tab.svg"
              alt="arrrow-tab"
          >
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">

.wizard-wrapper {
  margin-right: 108px;
  background-color: #FAFAFA;
  background-image: url("@/assets/images/wizard-back.png");
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center center;

  &:last-child {
    margin-right: 0;
  }
}


</style>
