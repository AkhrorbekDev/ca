<script setup lang="ts">
import {ref} from 'vue';
import {useI18n} from 'vue-i18n'

const {t} = useI18n()

const routes = ref([
  {
    title: t('profile'),
    icon: '',
    link: 'profile-main'
  },
  {
    title: t('refreral'),
    icon: '',
    link: 'profile-referral'
  },
  {
    title: t('faq'),
    icon: '',
    link: 'faq'
  }
])

</script>

<template>
  <div>
    <ul>
      <li v-for="route in routes" :key="route.title">
        <router-link
            :to="{
          name: route.link
        }"
            class="flex items-center justify-start !py-[12px] !px-[16px] !bg-[#fafafa] gap-[8px] rounded-[16px] cursor-pointer">
          <img
              :src="route.icon"
              :alt="route.title"
              class="w-[24px] h-[24px] filter-[contrast-0]"
              :class="{'!filter-[unset]': $route.name === route.link}"
          />
          <span
              class="text-[#292D32] text-[14px] filter-[contrast-0]"
              :class="{'!filter-[unset]': $route.name === route.link}">
            {{ route.title }}
          </span>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<style scoped lang="scss">

</style>
