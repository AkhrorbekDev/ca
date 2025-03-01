<script setup lang="ts">
import {Field} from 'vee-validate'
import geoIcon from "@/assets/icons/geo.svg";
import {PropType} from "vue";

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
  name: {
    type: String,
    default: 'location'
  }
})


</script>

<template>
  <Field :name="name">
    <FloatLabel variant="in">
      <div class=" w-full !bg-[#FAFAFA] !rounded-[24px] flex items-center justify-between">
        <div class="flex flex-col  items-start justify-center">
          <InputText id="in_label" readonly :model-value="location.name" :disabled="true" variant="outline"
                     placeholder="Manzilni tanlang"
                     class=" !bg-transparent  !pt-[18px] !pb-[18px] !px-[16px] shadow-none !border-0"/>
          <label class="!text-[#292D324D]">Qayerga</label>
        </div>
        <div class="geo-icon">
          <img :src="geoIcon" alt="">
        </div>
      </div>
      <input type="hidden">
    </FloatLabel>
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
