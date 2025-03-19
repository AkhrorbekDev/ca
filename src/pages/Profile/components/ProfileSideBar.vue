<script setup lang="ts">
import {inject, ref} from 'vue';
import {useI18n} from 'vue-i18n'
import chart from '@/assets/icons/Chart.svg'
import language from '@/assets/icons/language.svg'
import userIcon from '@/assets/icons/User.svg'
import turnOff from '@/assets/icons/Turn off.svg'
import moon from '@/assets/icons/Moon.svg'
import question from '@/assets/icons/Question.svg'
import {useRouter} from 'vue-router';

const {t} = useI18n()
const $auth = inject('auth')
const router = useRouter()
const routes = ref([
  {
    title: t('profile'),
    icon: userIcon,
    link: 'profile-main'
  },
  {
    title: t('layout-mode'),
    icon: moon,
    link: 'profile-layout'
  },
  {
    title: t('lenguage'),
    icon: language,
    link: 'profile-language'
  },
  {
    title: t('referralProgram'),
    icon: chart,
    link: 'profile-referral'
  },
  {
    title: t('frequentlyAskedQuestions'),
    icon: question,
    link: 'faq'
  }
])
const logOut = () => {
  $auth.logout().then(res => {
    router.push({
      name: 'home'
    })
  })
}
</script>

<template>
  <div class="bg-[#FFFFFF] dark:!bg-zinc-800 !rounded-[16px] !px-[16px] !py-[16px] min-w-[300px] max-w-[300px]">
    <ul class="flex flex-col gap-[8px]">
      <li
          class="flex items-center justify-start !py-[12px] !px-[16px] bg-[#fafafa] dark:!bg-zinc-700 rounded-[16px] cursor-pointer"
          v-for="route in routes"
          :key="route.title"
      >
        <router-link
            :to="{
          name: route.link
        }"
            class="flex items-center justify-start gap-[8px]"
        >
          <img
              :src="route.icon"
              :alt="route.title"
              class="w-[24px] h-[24px] contrast-0"
              :class="{'!contrast-[unset]': $route.name === route.link}"
          />
          <span
              class="text-[#292D32] text-[14px] contrast-0 capitalize"
              :class="{'!contrast-[unset] dark:!text-[#66C61C]': $route.name === route.link}"
          >
            {{ route.title }}
          </span>
        </router-link>

      </li>
      <li
          class="flex items-center justify-start !py-[12px] !px-[16px] !bg-[#fafafa]  rounded-[16px] cursor-pointer"
      >
        <a
            class="flex items-center justify-start gap-[8px]"

            @click.prevent="logOut"
        >
          <img
              :src="turnOff"
              alt="logout"
              class="w-[24px] h-[24px]"
          />
          <span
              class="text-[#292D32] text-[14px] capitalize"
          >
            {{ $t('logOut') }}
          </span>
        </a>
      </li>
    </ul>
  </div>
</template>

<style scoped lang="scss">

</style>
