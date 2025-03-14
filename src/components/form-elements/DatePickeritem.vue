<script setup lang="ts">
import {PropType} from "vue";
import {DatePickerProps} from 'primevue/datepicker'

defineProps({
  name: {
    type: String,
    default: "date",
  },
  datePicker: {
    type: PropType<Omit<DatePickerProps, "modelValue">>
  }
})
</script>

<template>
  <Field :name="name">
    <FloatLabel variant="in">
      <DatePicker :model-value="value2" inputId="in_label" showIcon iconDisplay="input" variant="filled"
                  class="custom-date w-full"/>
      <!--            <InputText id="in_label" variant="filled" placeholder="Manzilni tanlang"-->
      <!--                       class="w-full bg-[#FAFAFA] !rounded-[24px] !pt-[34px] !pb-[18px] !px-[16px] !border-0"/>-->
      <label for="in_label" class="!text-[#292D324D]">{{ $t('departureDate') }}</label>
    </FloatLabel>
  </Field>
</template>

<style scoped lang="scss">

</style>
