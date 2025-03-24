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
  },
  modelValue: {
    type: Number || String || undefined,
    default: undefined
  }
})
</script>

<template>
  <Field
      v-slot="{handleChange}"
      :name="name"
      class="flex items-center justify-between !py-4 border-b border-[#F5F5F7]"
  >
    <div class="w-full flex flex-col items-start justify-start">
      <label for="ingredient1" class="flex items-center gap-4 cursor-pointer">
        {{ item.label }}
      </label>
      <span v-if="item.description" class="radio-item__description dark:!text-gray-400">
        {{ item.description }}
      </span>
    </div>
    <RadioButton
        :model-value="modelValue"
        :inputId="`name.${value}`" :name="name"
        :value="value"
        @update:model-value="handleChange"/>

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
