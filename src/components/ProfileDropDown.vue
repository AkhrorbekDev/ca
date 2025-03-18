<script setup lang="ts">
import {computed, inject, ref, watch} from 'vue';
import {useRoute, useRouter} from 'vue-router';
import {imageCDN} from '@/config';
import {useI18n} from 'vue-i18n'
import chart from '@/assets/icons/Chart.svg'
import language from '@/assets/icons/language.svg'
import userIcon from '@/assets/icons/User.svg'
import moon from '@/assets/icons/Moon.svg'
import question from '@/assets/icons/Question.svg'

const $auth = inject('auth')
const route = useRoute()
const router = useRouter()
const detailsWrapper = ref(null)
const menuVisible = ref(false);

const {t} = useI18n()

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
    if (route.name === 'profile') {
      router.push({
        name: 'home'
      })
    }
  })
  menuVisible.value = false
}

const user = computed(() => {
  return $auth.user
})

const toggleMenu = () => {
  menuVisible.value = !menuVisible.value;
};
const clickOutSideDetails = e => {
  if (!detailsWrapper.value.contains(e.target)) {
    menuVisible.value = false
  }
}
const registerClickOutside = (e) => {
  if (e) {
    // Use setTimeout to add the listener on the next event cycle
    setTimeout(() => {
      document.addEventListener('click', clickOutSideDetails)
    }, 0)
  } else {
    document.removeEventListener('click', clickOutSideDetails)
  }
}


watch(menuVisible, (e) => {
  if (e) {
    registerClickOutside(e)
  } else {
    registerClickOutside(e)
  }
})

</script>

<template>
  <div class="flex items-center relative z-50 cursor-pointer">
    <template v-if="$auth.loggedIn">
      <div class="flex items-center" @click="toggleMenu">
        <h4 class="text-[#292D3266] text-[18px] !mr-[18px]">{{ user.first_name }}</h4>

        <template v-if="user.photo">
          <img
              :src="`${imageCDN}${user.photo}`"
              alt="avatar"
              class="h-[40px] w-[40px] !rounded-full cursor-pointer"
          />
        </template>
        <template v-else>
          <Avatar icon="pi pi-user" class="bg-[#F3F3F3] text-[#B7B8BA]" shape="circle"/>
        </template>
      </div>

      <div
          v-if="menuVisible"
          ref="detailsWrapper"
          class="bg-white profile_shadow rounded-[24px] !p-[16px] absolute z-50 top-[180%] right-[-30px] w-[300px]"
      >
        <div class="flex flex-col items-center">
          <template v-if="user.photo">
            <img
                :src="`${imageCDN}${user.photo}`"
                alt="avatar"
                class="h-[40px] w-[40px] !rounded-full !mb-[8px]"
            />
          </template>
          <template v-else>
            <Avatar
                icon="pi pi-user"
                class="bg-[#F3F3F3] text-[#B7B8BA] !mb-[8px]"
                shape="circle"
            />
          </template>

          <h3 class="font-medium text-[#292D32] text-[24px]">{{ user.full_name }} </h3>

          <span class="text-[14px] text-[#292D324D]">+{{ user.phone_number }}</span>
        </div>

        <div class="!mt-[16px]">
          <template v-for="route in routes" :key="route.link">
            <router-link
                :to="{
          name: route.link
        }"
                class="flex items-center justify-between rounded-[16px] bg-[#FAFAFA] !py-[12px] !px-[16px] !mb-[8px] cursor-pointer"
            >
              <div class="flex items-center gap-2">
                <img class="w-[24px] h-[24px] contrast-0" :src="route.icon" alt="">
                <span class="text-[#292D32] contrast-0">{{ route.title }}</span>
              </div>


              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                    d="M6.33464 4.66658L9.66797 7.99992L6.33464 11.3333"
                    stroke="#292D32"
                    stroke-opacity="0.3"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                />
              </svg>
            </router-link>

          </template>

          <div
              @click="logOut"
              class="flex items-center justify-between rounded-[16px] bg-[#FAFAFA] !py-[12px] !px-[16px] cursor-pointer"
          >
            <div class="flex items-center gap-2">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                    d="M18.6363 18.364C17.3553 19.6226 15.7232 20.4798 13.9464 20.8271C12.1697 21.1743 10.328 20.9961 8.65432 20.3149C6.98064 19.6337 5.55012 18.4802 4.54366 17.0001C3.5372 15.5201 3 13.78 3 12C3 10.22 3.53719 8.47992 4.54365 6.99988C5.55011 5.51983 6.98063 4.36628 8.6543 3.68509C10.328 3.0039 12.1697 2.82567 13.9464 3.17293C15.7232 3.5202 17.3553 4.37736 18.6362 5.63603M21 12L16.2725 12"
                    stroke="#F04438"
                    stroke-width="1.5"
                    stroke-linecap="round"
                />
              </svg>


              <span class="text-[#292D32]">{{ $t('logOut') }}</span>
            </div>


            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                  d="M6.33464 4.66658L9.66797 7.99992L6.33464 11.3333"
                  stroke="#292D32"
                  stroke-opacity="0.3"
                  stroke-linecap="round"
                  stroke-linejoin="round"
              />
            </svg>
          </div>

        </div>
      </div>
    </template>
    <template v-else>
      <router-link to="/login" class="flex items-center gap-6">
        <div class="flex items-center gap-4">
          <Avatar icon="pi pi-user" class="bg-[#F3F3F3] text-[#B7B8BA]" shape="circle"/>

          <span class="text-[#A8AAAE]">{{ $t('login') }}</span>
        </div>
      </router-link>
    </template>
  </div>

</template>

<style scoped lang="scss">

</style>
