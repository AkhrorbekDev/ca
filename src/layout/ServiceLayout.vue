<script setup lang="ts">
import {Menu} from './fakeJson'
import {ref} from "vue";

interface MenuItems {
  title: string;
  children?: MenuItems[];
  isOpen?: boolean,
  img?: string
}

const menuItems = ref<MenuItems[]>([
  {
    title: 'Xizmatlar',
    isOpen: false,
    children: [{
      img: "./car.svg",
      title: 'Yuk tashish'
    }, {
      img: "./car.svg",
      title: 'Yuk tashish'
    }]
  },
  {
    title: 'E’lonlar',
  },
  {
    title: "Transport e'lonlari",
    isOpen: false,
    children: Menu
  },
])


const openChildMenu = (index: number) => {
  menuItems.value.forEach((item, i) => {
    if (item.children) {
      item.isOpen = i === index ? !item.isOpen : false;
    }
  });
};
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
              v-for="(list, index2) in menuItems"
              :key="index2"
              class="flex1 group text relative"
              :class="list.isOpen ? 'bg-white' : ''"
          >
            <div class="flex1" @click="openChildMenu(index2)">
              <span :class="list.isOpen ? 'text-[#000]' : ''">{{ list.title }}</span>
              <svg v-if="list.children" width="25" height="24" viewBox="0 0 25 24" fill="none"
                   xmlns="http://www.w3.org/2000/svg">
                <path d="M17.75 9.5L12.75 14.5L7.75 9.5" :class="list.isOpen ? 'stroke-black' : 'stroke-white'"
                      stroke-width="1.5" stroke-linecap="round"
                      stroke-linejoin="round"/>
              </svg>
            </div>

            <div class="mega-drop-menu" v-if="list.isOpen && list.children">
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

  span {
    user-select: none;
  }
}

.text {
  @apply text-[#FFFFFF] text-[18px] font-medium cursor-pointer !py-[11px] !px-[16px] rounded-[50px];
}

.text:hover {
  background-color: #fff;
  transition: all .3s;

  span {
    color: #292D32;
  }

  svg path {
    stroke: #2d2b32 !important;
  }
}

.group {
  margin-right: 32px;

  &:last-child {
    margin-right: 0;
  }
}

.mega-drop-menu {
  position: absolute;
  top: 80px;
  left: -50%;
  padding: 16px;
  background-color: #FAFAFA;
  box-shadow: 0 32px 100px 0 #292D3229;
  width: 359px;
  border-radius: 24px;

  .cards {
    @apply w-[157px] h-[112px] p-[14px] bg-white rounded-[20px] text-center flex flex-col items-center justify-center;
    box-shadow: 0 2px 8.4px 0 #292D3214;

    p {
      @apply text-[#292D3266] text-[12px] w-[70%];
    }
  }

  .cards:hover {
    background-color: #66C61C;

    img {
      filter: brightness(13.5);
    }

    p {
      color: white;
    }
  }
}
</style>