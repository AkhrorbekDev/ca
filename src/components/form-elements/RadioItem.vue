<script setup lang="ts">
import {Field} from 'vee-validate'

defineProps({
  name: {
    type: String,
    default: 'radio'
  },
  value: {
    type: String || Number,
    default: 0
  },
  item: {
    type: Object,
    default: () => ({})
  }
})
</script>

<template>
  <Field
      :name="name"
      class="flex items-center justify-between !py-4 border-b border-[#F5F5F7]"
  >
    <div class="w-full flex flex-col items-start justify-start">
      <label for="ingredient1" class="flex items-center gap-4 cursor-pointer">
        {{ item.label }}
      </label>
      <span class="radio-item__description">
        {{ item.description }}
      </span>
    </div>
    <RadioButton :inputId="`name.${value}`" :name="name" :value="value"/>

  </Field>
</template>

<style scoped lang="scss">
.radio-item {
  &__description {
    font-size: 12px;
    color: #292D3230;
  }
}
</style>
