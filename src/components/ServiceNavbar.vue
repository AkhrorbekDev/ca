<script setup lang="ts">
import {Menu} from '@/layout/fakeJson'
import {onMounted, onUnmounted, ref, watchEffect} from "vue";
import router from "@/router/router";
import {useRoute} from "vue-router";

const route = useRoute()

interface MenuItems {
  title: string;
  children?: MenuItems[];
  isOpen?: boolean,
  img?: string
  route?: string
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
    route: '/announcement'
  },
  {
    title: "Transport e'lonlari",
    isOpen: false,
    children: Menu
  },
])
const currentIndex = ref<number | null>(null)

onMounted(() => closeMenu())

onUnmounted(() => closeMenu())

const closeMenu = () => {
  document.body.addEventListener("click", () => {
    menuItems.value.forEach((e) => e.isOpen = false)
  });
}

const openChildMenu = (index: number, item: MenuItems) => {
  if (item.route) {
    router.push(item.route)
  }
  currentIndex.value = index
  menuItems.value.forEach((item, i) => {
    if (item.children) {
      item.isOpen = i === index ? !item.isOpen : false;
    }
  });
};

watchEffect(() => {
  currentIndex.value = route.name == 'announcement' && 1
})
</script>

<template>
  <div>
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
              :class="{'bg-white activeClass' : list.isOpen || (currentIndex === index2 && list.route)}"
              @click.stop="openChildMenu(index2, list)"
          >
            <div class="flex1">
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
                  <img :src="item.img" class="!m-auto !my-0" alt="#"/>
                  <p class="text-gray-900">{{ item.title }}</p>
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
  </div>
</template>

<style lang="scss">
.activeClass {
  background-color: #fff;

  span {
    color: #000;
  }

  svg path {
    stroke: #2d2b32 !important;
  }
}

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
      @apply text-[#292D3266] text-[12px];
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