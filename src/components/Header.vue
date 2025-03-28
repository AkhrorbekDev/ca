<script lang="ts" setup>
import {ref} from 'vue';
import ProfileDropDown from '@/components/ProfileDropDown.vue';
import Menu from 'primevue/menu';
import {Language} from '@/i18n';
import {useI18n} from 'vue-i18n';

interface Items {
  label: string;
}

const {locale} = useI18n({useScope: 'global'});
const menu = ref();
const items = ref<Items[]>([
  {
    label: 'O\'zbekcha',
    code: Language.UZ
  },
  {
    label: 'Русский',
    code: Language.RU
  },
  {
    label: 'English',
    code: Language.EN
  },
  {
    label: 'Ўзбекча',
    code: Language.KK
  }
]);

const toggle = (event) => {
  menu.value.toggle(event);
};

const changeLanguage = (e) => {
  locale.value = e;
}
</script>

<template>
  <div class="bg-white dark:!bg-zinc-700">
    <div class="max-w-screen-xl  container lg:mx-auto">
      <div class="!py-[12px] flex items-center justify-between dark:!bg-zinc-700">
        <div class="flex items-center gap-3 dark:!bg-zinc-700">
          <img src="/icons/telegram.svg" alt="telegram">
          <img src="/icons/instagram.svg" alt="instagram">
          <img src="/icons/facebook.svg" alt="facebook">
          <img src="/icons/youtube.svg" alt="youtube">
        </div>

        <div class="flex items-center gap-6 dark:!bg-zinc-700">
          <div class="flex items-center gap-3 dark:!bg-zinc-700">
            <img src="/icons/lang.svg" alt="lang" class="cursor-pointer" @click="toggle">

            <Menu class="!mt-4" ref="menu" id="overlay_menu" :model="items" :popup="true">
              <template #item="slotProps">
                <div
                    class="w-full flex flex-col !py-[4px] !px-[4px] items-start justify-start"
                    @click="changeLanguage(slotProps.item.code)"
                >
                  <label class="flex items-center gap-4 cursor-pointer">
                    {{ slotProps.item.label }}
                  </label>
                </div>
              </template>
            </Menu>
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
