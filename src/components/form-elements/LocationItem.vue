<script setup lang="ts">
import {Field} from 'vee-validate'
import geoIcon from "@/assets/icons/geo.svg";
import {PropType} from "vue";
import {useI18n} from 'vue-i18n';

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


</script>

<template>
  <Field :name="name">
    <div class="formItem">
      <div class=" w-full flex items-center justify-between">
        <div class="flex flex-col  items-start justify-center">
          <label class="!text-[#292D324D]">{{ label || $t('to') }}</label>
          <InputText id="in_label"
                     readonly :model-value="location.name"
                     :disabled="true"
                     variant="outline"
                     :placeholder="$t('pickAddress')"
                     class=" !bg-transparent  !py-[8px] !px-[0]
                     shadow-none !border-0"/>
        </div>
        <div class="geo-icon">
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
  </Field>

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
