<script setup lang="ts">

import ServiceSideBar from '@/components/ServiceSideBar.vue';
import ConfirmDialog from 'primevue/confirmdialog';
import ProfileDropDown from '@/components/ProfileDropDown.vue';
import ProfileSideBar from '@/pages/Profile/components/ProfileSideBar.vue';
import Breadcrumbs from '@/components/Breadcrumbs.vue';
import {ref, watchEffect} from 'vue';
import {useI18n} from 'vue-i18n';
import {useRoute} from 'vue-router';

const {t} = useI18n();
const route = useRoute();
const breadcrumbs = ref([
  {
    title: t('profile'),
    route: '/profile',
  },
]);
watchEffect(() => {
  if (route.name === 'profile-main') {
    breadcrumbs.value = [
      {
        title: t('profile'),
      },
    ];
  }
  if (route.name === 'profile-layout') {
    breadcrumbs.value = [
      {
        title: t('layout-mode'),
      }
    ];
  }
  if (route.name === 'profile-language') {
    breadcrumbs.value = [
      {
        title: t('lenguage'),
      }
    ]
  }
  if (route.name === 'profile-referral') {
    breadcrumbs.value = [
      {
        title: t('referralProgram'),
      }
    ];
  }
  if (route.name === 'faq') {
    breadcrumbs.value = [
      {
        title: t('frequentlyAskedQuestions'),
      }
    ];
  }

})

</script>

<template>
  <div class="bg-[#FAFAFA] min-h-screen flex items-start">
    <ServiceSideBar/>
    <Toast position="bottom-right" group="br"/>
    <ConfirmDialog group="auth"/>
    <div
        class="fixed z-[2] profile_shadow   !rounded-[100px] top-[24px] !px-[32px] !py-[20px] right-[24px] bg-[#ffffff] "
    >
      <ProfileDropDown class=" "/>
    </div>
    <div class="w-full !px-[24px]">
      <Breadcrumbs :breadcrumbs="breadcrumbs"/>

      <div class="flex gap-[24px] justify-center">
        <ProfileSideBar class="h-max sticky top-0"/>

        <slot/>
      </div>
    </div>

  </div>
</template>

<style scoped lang="scss">

</style>
