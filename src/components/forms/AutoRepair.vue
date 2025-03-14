<script setup lang="ts">

import {inject, ref} from "vue";
import {useRouter} from "vue-router";
import useBreadcrumbs from "@/stores/breadcrumbs";
import {useI18n} from 'vue-i18n'

const {t} = useI18n()
const props = defineProps({
  transports: {
    type: Array,
    default: () => ([])
  },
  serviceId: {
    type: Number,
    default: null
  },
  loading: {
    type: Boolean,
    default: true
  },
  show: {
    type: Boolean,
    default: true
  },
  service: {
    type: Object,
    default: () => ({})
  }
})
const breadcrumbStore = useBreadcrumbs()
const router = useRouter()
const masterRoom = ref<Car[]>([
  {
    title: 'Mannol center'
  },
  {
    title: 'Diamond center'
  },
  {
    title: 'Shark'
  },
  {
    title: 'Black star'
  },
])
const $auth = inject('auth')

const master = ref([
  {
    title: t('matorMaster'),
    info: t('matorMasterDes'),
    image: '',
    id: 1,
    unique: "master",
  },
  {
    title: t('electricMaster'),
    info: t('electricMasterDes'),
    image: '',
    id: 2,
    unique: "master",
  },
  {
    title: t('bodyMaster'),
    info: t('bodyMasterDes'),
    image: '',
    id: 3,
    unique: "master",
  },
])
const emit = defineEmits(['on:click'])
const handleSubmit = (item?: any) => {
  let query = {}
  if (item?.id) {
    query.repair_type_id = item.id
  }

  router.push({
    name: 'transport-repair-rooms-id',
    query
  })
  emit('on:click')
}
</script>

<template>
  <div
      :class="{
            '_form-active': show,
          }"
      class="navbar-items__form w-[180px] flex items-start !transition-all"
  >
    <div class="navbar-items__divider"/>

    <div class="grid grid-cols-1  gap-4 !p-[16px]">

      <div @click="handleSubmit" class="flex items-center justify-between !py-[16px] cursor-pointer">
        <span class="text-[#292D32] text-[14px]">
          {{ $t('workshops') }}
        </span>
        <img src="@/assets/images/arrowUp.svg" class="-rotate-90" alt="arrow"/>
      </div>
      <div v-for="(item, index) in master"
           :key="index"
           class="flex items-center col-span-full justify-between border-[#F5F5F7] border-b !mb-[12px] !pb-[12px] cursor-pointer"
           @click="handleSubmit(item)"
      >

        <div class="flex flex-col">
          <h3 class="text-[#292D32] text-[14px]">{{ item.title }}</h3>
          <h5 class="text-[#292D324D] text-[12px]">{{ item.info }}</h5>
        </div>

        <img src="@/assets/images/arrowsR.svg" alt="right">
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.cards {
  @apply w-[157px] p-[14px] bg-white rounded-[20px] text-center flex flex-col items-center justify-center;
  box-shadow: 0 2px 8.4px 0 #292D3214;
  cursor: pointer;
  min-height: 150px;
  overflow: hidden;

  p {
    @apply text-[#292D3266] text-[12px];
  }
}

.card-wrap:hover {
  @apply bg-[#66C61C];

  .swg {
    filter: brightness(13.5);
  }

  p {
    @apply text-[#fff];
  }
}
</style>
