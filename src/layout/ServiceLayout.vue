<script setup lang="ts">
import {Menu} from './fakeJson'

const menuItems = [
  {
    title: 'Xizmatlar',
    children: Menu
  },
  {
    title: 'E’lonlar',
  },
  {
    title: "Transport e'lonlari",
    children: Menu
  },
]
</script>

<template>
  <div class="bg-[#FAFAFA]">
    <div class="fixed top-[24px] !px-[24px] w-full">
      <div class="bg-[#FFFFFF] rounded-[100px] flex1 !shadow-header !py-[12px] !px-[32px]">
        <router-link to="/">
          <img class="!mr-[45px]" src="@/assets/logo.svg" alt="logo" width="130"/>
        </router-link>

        <div class="bg-[#1A1F23] !px-[5px] !py-[4px] flex1 rounded-[50px] hidden !md:block !lg:block">
          <div
              class="flex1 group !ml-[32px] text relative"
              v-for="(list, index2) in menuItems"
              :key="index2"
          >
            <span>{{ list.title }}</span>
            <svg v-if="list.children" width="25" height="24" viewBox="0 0 25 24" fill="none"
                 xmlns="http://www.w3.org/2000/svg">
              <path d="M17.75 9.5L12.75 14.5L7.75 9.5" stroke="white" stroke-width="1.5" stroke-linecap="round"
                    stroke-linejoin="round"/>
            </svg>

            <div class="mega-drop-menu" v-if="list.children">
              <div class="grid grid-cols-2 gap-3">
                <div class="cards"
                     v-for="(item, index) in list.children"
                     :key="index"
                >
                  <img
                      :src="item.img"
                      class="!m-auto !my-0"
                      alt="#"
                  />
                  <p class="text-gray-900">
                    {{ item.title }}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="flex items-center">
          <h4 class="text-[#292D3266] text-[18px] !mr-[18px]">Asror</h4>
          <img src="@/assets/images/avatar.jpg" alt="avatar" height="40" width="40"/>
        </div>
      </div>
    </div>

    <iframe
        src="https://yandex.uz/map-widget/v1/?ll=69.279737%2C41.311151&z=12"
        width="100%"
        style="height: 100vh"
        frameborder="0"
    />
  </div>
</template>

<style lang="scss">
.flex1 {
  @apply flex items-center justify-between;
}

.text {
  @apply text-[#FFFFFF] text-[18px] font-medium cursor-pointer !py-[11px] !px-[16px] rounded-[50px];

  svg {
    transition: all .3s;
  }
}

.text:hover {
  background-color: #fff;
  transition: all .3s;

  span {
    color: #292D32;
  }

  svg {
    transform: rotate(180deg);
  }

  svg path {
    stroke: #2d2b32 !important;
  }
}

.mega-drop-menu {
  position: absolute;
  top: 52px;
  left: -50%;
  padding: 16px;
  background-color: #FAFAFA;
  box-shadow: 0 32px 100px 0 #292D3229;
  width: 359px;
  border-radius: 24px;
  display: none;
  @apply group-hover:block;

  .cards {
    @apply w-[157px] h-[112px] p-[14px] bg-white rounded-[20px] text-center flex flex-col items-center justify-center;
    box-shadow: 0 2px 8.4px 0 #292D3214;

    p {
      @apply text-[#292D3266] text-[12px] w-[70%];
    }
  }
}
</style>