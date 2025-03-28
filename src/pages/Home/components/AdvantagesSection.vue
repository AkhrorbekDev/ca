<script lang="ts" setup>
import {useI18n} from 'vue-i18n'

interface AdvantagesData {
  title: string
  description: string
}

const {t} = useI18n()
const advantagesDataData: AdvantagesData[] = [

  {
    title: t('home.advantages.first.title'),
    description: t('home.advantages.first.description'),
  },

  {
    title: t('home.advantages.second.title'),
    description: t('home.advantages.second.description')
  },

  {
    title: t('home.advantages.third.title'),
    description: t('home.advantages.third.description')
  },

  {
    title: t('home.advantages.fourth.title'),
    description: t('home.advantages.fourth.description')
  },
]
</script>


<template>
  <div id="advantage" class="bg-[#FAFAFA] !py-[100px]">
    <div class="max-w-screen-xl  container lg:mx-auto">
      <div class="flex items-center">
        <img
            src="@/assets/images/advantages-img.png"
            alt="advantages-img"
            width="600"
            class="w-[600px] h-[808px] !mr-[39px] !rounded-2xl"
        >

        <div class="dark:!bg-zinc-700 !p-4 rounded-lg">
          <p class="font-medium text-[#292D3266] !mb-[24px]">{{ $t('home.advantages.title') }}</p>

          <h3 class="text-[#292D32] text-[40px] font-semibold !mb-[24px]">
            {{ $t('home.advantages.description') }}
          </h3>

          <p class="text-[#292D3266] text-[18px] !mb-[24px]">
            {{ $t('home.advantages.description2') }}
          </p>

          <div class="dark:!bg-zinc-700">
            <div
                class="flex items-start !mb-[24px] dark:!bg-zinc-700"
                v-for="(item, index) in advantagesDataData"
                :key="index"
            >
              <img
                  src="@/assets/images/icons/advantages-icon.svg"
                  alt="advantages-icon.svg"
                  width="48"
                  class="!mr-[16px]"
              >

              <div class="dark:!bg-zinc-700">
                <h4 class="text-[#000000] text-[20px] font-medium !mb-2">{{ item.title }}</h4>
                <h4 class="text-[#292D3266]">{{ item.description }}</h4>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">


</style>
