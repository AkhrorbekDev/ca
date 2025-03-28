<script lang="ts" setup>

import {ref} from 'vue';

const value = ref(null);
</script>


<template>
  <div>
    <div class="!bg-[#353C4A] !pt-[80px] !pb-[244px]" id="contact">
      <div class="max-w-screen-xl  container lg:mx-auto">
        <div class="flex items-start justify-between !bg-[#353C4A]">
          <h3 class="text-white text-[48px] font-semibold">
            {{ $t('home.offer.title') }}
          </h3>

          <p class="text-white text-[16px] w-[617px]">
            {{ $t('home.offer.description') }}
          </p>
        </div>
      </div>
    </div>

    <div class="bg-[#FAFAFA] dark:!bg-zinc-800 h-[505px]">
      <div class="max-w-screen-xl  container lg:mx-auto relative">
        <div class="flex rounded-[24px] overflow-hidden absolute w-full top-[-200px]">
          <img src="@/assets/images/offer-img.png" alt="">
          <div class="!px-[50px] !pt-[32px] !pb-[40px] grow bg-[#FAFAFA] dark:!bg-zinc-700">
            <h5 class="text-center text-[#101828] text-[18px] font-semibold">
              {{ $t('home.offer.connectWith') }}
            </h5>

            <div class="flex flex-col gap-5 dark:!bg-zinc-700">
              <div class="flex flex-col gap-2 w-full dark:!bg-zinc-700">
                <label for="username" class="text-[#344054] font-medium">{{ $t('firstName') }} <span
                    class="text-red-500"
                >*</span></label>

                <InputText
                    type="text"
                    class="w-full bg-[#FAFAFA] dark:!bg-zinc-500 custom-placeholder-input"
                    :placeholder="$t('enterYourName')"
                />
              </div>

              <div class="flex flex-col gap-2 w-full dark:!bg-zinc-700">
                <label for="username" class="text-[#344054] font-medium">{{ $t('companyName') }} <span
                    class="text-red-500"
                >*</span></label>

                <InputText
                    type="text"
                    class="w-full bg-[#FAFAFA] dark:!bg-zinc-500 custom-placeholder-input"
                    :placeholder="$t('enterCompanyName')"
                />
              </div>

              <div class="flex flex-col gap-2 w-full dark:!bg-zinc-700">
                <label for="phone" class="text-[#344054] font-medium">{{ $t('phone') }} <span
                    class="text-red-500"
                >*</span></label>

                <InputMask
                    class="w-full bg-[#FAFAFA] dark:!bg-zinc-500 custom-placeholder-input"
                    id="phone"
                    v-model="value"
                    mask="(999) 99-999-99-99"
                    placeholder="(998)"
                    fluid
                />

              </div>

              <div class="flex flex-col gap-2 w-full dark:!bg-zinc-700">
                <label for="username" class="text-[#344054] dark:!text-white font-medium">{{
                    $t('description')
                  }}</label>
                <Textarea class="w-full bg-[#FAFAFA] dark:!bg-zinc-500 custom-placeholder-input" rows="5" cols="30"/>
              </div>

              <button class="bg-[#66C61C] text-[16px] font-medium text-white rounded-[8px] text-center !py-[12px]">
                {{ $t('send') }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">


</style>
