<script setup lang="ts">


import {computed, inject, ref, watch} from 'vue';
import {useRoute, useRouter} from 'vue-router';

const $auth = inject('auth')
const route = useRoute()
const router = useRouter()
const detailsWrapper = ref(null)
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

const menuVisible = ref(false);

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
              src="@/assets/images/avatar.jpg"
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
                :src="user.photo"
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

          <h3 class="font-medium text-[#292D32] text-[24px]">{{ user.firstName }}</h3>

          <span class="text-[14px] text-[#292D324D]">+{{ user.phone_number }}</span>
        </div>

        <div class="!mt-[16px]">

          <div
              class="flex items-center justify-between rounded-[16px] bg-[#FAFAFA] !py-[12px] !px-[16px] !mb-[8px] cursor-pointer"
          >
            <div class="flex items-center gap-2">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                    d="M13.3986 7.64605C13.495 7.37724 13.88 7.37724 13.9764 7.64605L14.2401 8.38111C14.271 8.46715 14.3395 8.53484 14.4266 8.56533L15.1709 8.82579C15.443 8.92103 15.443 9.30119 15.1709 9.39644L14.4266 9.65689C14.3395 9.68738 14.271 9.75507 14.2401 9.84112L13.9764 10.5762C13.88 10.845 13.495 10.845 13.3986 10.5762L13.1349 9.84112C13.104 9.75507 13.0355 9.68738 12.9484 9.65689L12.2041 9.39644C11.932 9.30119 11.932 8.92103 12.2041 8.82579L12.9484 8.56533C13.0355 8.53484 13.104 8.46715 13.1349 8.38111L13.3986 7.64605Z"
                    fill="#BFC0C2"
                />
                <path
                    d="M16.3074 10.9122C16.3717 10.733 16.6283 10.733 16.6926 10.9122L16.8684 11.4022C16.889 11.4596 16.9347 11.5047 16.9928 11.525L17.4889 11.6987C17.6704 11.7622 17.6704 12.0156 17.4889 12.0791L16.9928 12.2527C16.9347 12.2731 16.889 12.3182 16.8684 12.3756L16.6926 12.8656C16.6283 13.0448 16.3717 13.0448 16.3074 12.8656L16.1316 12.3756C16.111 12.3182 16.0653 12.2731 16.0072 12.2527L15.5111 12.0791C15.3296 12.0156 15.3296 11.7622 15.5111 11.6987L16.0072 11.525C16.0653 11.5047 16.111 11.4596 16.1316 11.4022L16.3074 10.9122Z"
                    fill="#BFC0C2"
                />
                <path
                    d="M17.7693 3.29184C17.9089 2.90272 18.4661 2.90272 18.6057 3.29184L19.0842 4.62551C19.1288 4.75006 19.2281 4.84805 19.3542 4.89219L20.7045 5.36475C21.0985 5.50263 21.0985 6.05293 20.7045 6.19081L19.3542 6.66337C19.2281 6.7075 19.1288 6.80549 19.0842 6.93005L18.6057 8.26372C18.4661 8.65284 17.9089 8.65284 17.7693 8.26372L17.2908 6.93005C17.2462 6.80549 17.1469 6.7075 17.0208 6.66337L15.6705 6.19081C15.2765 6.05293 15.2765 5.50263 15.6705 5.36475L17.0208 4.89219C17.1469 4.84805 17.2462 4.75006 17.2908 4.62551L17.7693 3.29184Z"
                    fill="#BFC0C2"
                />
                <path
                    d="M3 13.4597C3 17.6241 6.4742 21 10.7598 21C14.0591 21 16.8774 18.9993 18 16.1783C17.1109 16.5841 16.1181 16.8109 15.0709 16.8109C11.2614 16.8109 8.17323 13.8101 8.17323 10.1084C8.17323 8.56025 8.71338 7.13471 9.62054 6C5.87502 6.5355 3 9.67132 3 13.4597Z"
                    stroke="#BFC0C2"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                />
              </svg>
              <span class="text-[#292D32]">{{ $t('theme') }}</span>
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


          <div
              class="flex items-center justify-between rounded-[16px] bg-[#FAFAFA] !py-[12px] !px-[16px] !mb-[8px] cursor-pointer"
          >
            <div class="flex items-center gap-2">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M4 5H11" stroke="#BFC0C2" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                <path
                    d="M9 3V5C9 9.418 6.761 13 4 13"
                    stroke="#BFC0C2"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                />
                <path
                    d="M5 9C4.997 11.144 7.952 12.908 11.7 13"
                    stroke="#BFC0C2"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                />
                <path
                    d="M12 20L16 11L20 20"
                    stroke="#BFC0C2"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                />
                <path
                    d="M19.0984 18H12.8984"
                    stroke="#BFC0C2"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                />
              </svg>

              <span class="text-[#292D32]">{{ $t('lenguage') }}</span>
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
