<script lang="ts" setup>
import {inject, ref} from "vue";
import ProfileDropDown from "@/components/ProfileDropDown.vue";

interface Items {
  label: string;
}

const $auth = inject('auth')
const menu = ref();
const items = ref<Items[]>([
  {
    label: "O'zbekcha",
  },
  {
    label: 'Русский',
  }
]);

const toggle = (event) => {
  menu.value.toggle(event);
};
</script>

<template>
  <div class="bg-white">
    <div class="max-w-screen-xl  container lg:mx-auto">
      <div class="!py-[12px] flex items-center justify-between">
        <div class="flex items-center gap-3">
          <img src="/icons/telegram.svg" alt="telegram">
          <img src="/icons/instagram.svg" alt="instagram">
          <img src="/icons/facebook.svg" alt="facebook">
          <img src="/icons/youtube.svg" alt="youtube">
        </div>

        <span>{{ $auth.loggedIn }} loggendin</span>

        <div class="flex items-center gap-6">
          <div>
            <img src="/icons/lang.svg" alt="lang" class="cursor-pointer" @click="toggle">

            <Menu class="!mt-4" ref="menu" id="overlay_menu" :model="items" :popup="true"/>
          </div>
          <template></template>

          <ProfileDropDown/>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
#overlay_menu {
  min-width: 6.7rem;
}
</style>
