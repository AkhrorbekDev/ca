<script setup lang="ts">
import {Field} from 'vee-validate'
import geoIcon from '@/assets/icons/geo.svg';
import type {PropType} from 'vue';
import {ref} from 'vue';
import {useI18n} from 'vue-i18n';
import {getSuggest} from '@/composables/getGeoObject';

const {t} = useI18n()

defineProps({
  location: {
    type: Object as PropType<{
      lat: string,
      lng: string,
      name: string
    }>,
    default: () => ({
      lat: null,
      lng: null,
      name: null
    })
  },
  label: {
    type: String,
    default: null
  },
  name: {
    type: String,
    default: 'location'
  }
})

const op = ref()
const formItem = ref()
const emit = defineEmits(['on:select'])
const members = ref([
  {name: 'Amy Elsner', image: 'amyelsner.png', email: 'amy@email.com', role: 'Owner'},
  {name: 'Bernardo Dominic', image: 'bernardodominic.png', email: 'bernardo@email.com', role: 'Editor'},
  {name: 'Ioni Bowcher', image: 'ionibowcher.png', email: 'ioni@email.com', role: 'Viewer'}
]);
let timeout = null
const geoSuggest = ref([])
const getLocations = (e) => {
  if (timeout) {
    clearTimeout(timeout)
  }

  timeout = setTimeout(() => {
    getSuggest({
      address: e.target.value
    }).then((res) => {
      geoSuggest.value = res.data
      op.value.show(e, e.target)
    })
  }, 500)

}

const selectLocation = (item) => {
  emit('on:select', item.title.text)
  op.value.hide()
}

const showOverlay = (e) => {
  if (geoSuggest.value.length) {
    op.value.show(e, e.target)
  }
}

</script>

<template>
  <div :name="name" class="">
    <div class="formItem dark:!bg-zinc-700" ref="formItem">
      <div class=" w-full flex items-center justify-between dark:!bg-zinc-700">
        <div class="flex flex-col  items-start justify-center dark:!bg-zinc-700">
          <label class="text-[#292D324D] dark:!text-[#fff]">{{ label || $t('to') }}</label>
          <InputText
              id="in_label"
              :model-value="location.name"
              variant="outline"
              autocomplete="off"
              :placeholder="$t('pickAddress')"
              class=" !bg-transparent  !py-[8px] !px-[0]
                     shadow-none !border-0"
              @input="getLocations"
              @focus="showOverlay"
          />
        </div>
        <div class="geo-icon" @click="toggle">
          <img :src="geoIcon" alt="">
        </div>
      </div>

    </div>
    <Field :name="`${name}.lat`">
      <input type="hidden" :value="location.lat">
    </Field>
    <Field :name="`${name}.lng`">
      <input type="hidden" :value="location.lng">
    </Field>
    <Field :name="`${name}.name`">
      <input type="hidden" :value="location.name">
    </Field>
    <OverlayPanel ref="op">
      <ul class="flex flex-col items-start">
        <li
            v-for="(item, index) in geoSuggest"
            :key="index"
            class="geo-suggest flex flex-col items-start justify-center !py-[12px] !px-[16px] !bg-[#fafafa] gap-[8px] rounded-[16px] cursor-pointer"
            @click="selectLocation(item)"
        >
          <p class="geo-suggest__title text-[18px]">
            {{ item.title.text }}
          </p>
          <p v-if="item.subtitle" class="geo-suggest__description text-[14px]">
            {{ item.subtitle.text }}
          </p>
        </li>
      </ul>
    </OverlayPanel>
  </div>

</template>

<style scoped lang="scss">

.geo-icon {
  width: 40px;
  height: 40px;
  border-radius: 12px;
  padding: 8px;
  background: #66C61C;
}
</style>
