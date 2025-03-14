<script setup lang="ts">
import useBreadcrumbs from '@/stores/breadcrumbs'
import {computed, ref} from "vue";

const props = defineProps({
  breadcrumbs: {
    type: Array,
    default: () => ([])
  }
})
const breadcrumbsStore = useBreadcrumbs()
const home = ref({
  icon: 'pi pi-home',
  route: '/',
  class: '!text-[#292D3266]'
});

const _breadcrumbs = computed(() => {
  return props.breadcrumbs.filter((item) => item.title)
})

</script>

<template>
  <div class="card flex justify-start">
    <Breadcrumb :home="home" :model="_breadcrumbs" class="!px-0 !py-[24px]">
      <template #item="{ item, props }">
        <router-link v-if="item.route" v-slot="{ href, navigate }" :to="item.route" custom>
          <a :href="href" v-bind="props.action" @click="navigate">
            <span :class="[item.icon, 'text-color']"/>
            <span class="text-primary font-semibold">{{ item.title }}</span>
          </a>
        </router-link>
        <a v-else :href="item.url" :target="item.target" v-bind="props.action">
          <span class="text-[#292D3266]" :class="{'text-[#292D32]': item.last}">{{ item.title }}</span>
        </a>
      </template>
    </Breadcrumb>
  </div>

</template>

<style scoped lang="scss">

</style>
