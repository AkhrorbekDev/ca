<script setup lang="ts">
import {deliverySchema} from "@/components/form-elements/schema";
import {onMounted, ref, watchEffect} from "vue";
import getGeoObject from "@/composables/getGeoObject";
import {Field, Form} from "vee-validate";
import RadioItem from "@/components/form-elements/RadioItem.vue";
import {useRoute} from "vue-router";


const route = useRoute()
const props = defineProps({
  serviceId: {
    type: Number,
    default: null
  },
})

console.log(deliverySchema, 'schema')


</script>

<template>
  <div>
    <div>
      <span class="bg-[#FAFAFA] rounded-[50px] !px-[8px] text-sm text-[#292D324D]">
        Yuk turi
      </span>
    </div>
    <RadioItem
        v-model="formValues.details.cargo_type"
        as="div"
        name="details.cargo_type"
        v-for="item in cargoTypes"
        :key="item.label"
        :value="item.value"
        :item="item"/>

    <div>
      <span class="text-sm text-[#292D324D]">
        Yuklash hizmat
      </span>

    </div>
    <RadioItem as="div" name="details.load_type" v-for="item in loadTypes"
               :key="item.label" :item="item" :value="item.value"/>

    <Field as="div" name="note" class="flex flex-col gap-2 w-full !mb-[24px]">
      <label for="description" class="text-[#292D3280] text-[12px]">Izoh</label>
      <Textarea v-model="formValues.note" id="description" class="w-full  !rounded-[16px] !placeholder-[#292D324D]"
                style="border: 1px solid #C2C2C233" rows="3"
                cols="30"
                placeholder="Buyurtma haqida izoh qoldiring!"/>
    </Field>

    <div class="!mb-[24px]">
               <span class="bg-[#FAFAFA] rounded-[50px] !px-[8px] text-sm text-[#292D324D]">
                To'lov
              </span>

      <Field name="pay-type" v-slot="{handleChange }">
        <div v-for="paymentType in paymentTypes" :key="paymentType.value">
          <div class="flex items-center justify-between !py-4 border-b border-[#F5F5F7]">
            <label :for="`paymentType.${paymentType.value}`"
                   class="flex items-center gap-4 cursor-pointer">
              <span v-html="paymentType.icon"/>
              {{ paymentType.name }}
            </label>
            <RadioButton
                :inputId="`paymentType.${paymentType.value}`"
                name="pay-type"
                :value="paymentType.value"
                @update:model-value="(e) => handleChange(e)"
            />

          </div>
        </div>
      </Field>
    </div>

    <Field as="div" name="price" class="flex flex-col gap-2">
      <label for="price" class="text-[#292D324D] txt-[12px]">Narx</label>
      <InputText
          class="!py-[12px] !px-[16px] !rounded-[16px] border !border-[#C2C2C233] !placeholder-[#292D324D]"
          id="price" aria-describedby="username-help"
          placeholder="Narxni kiriting"/>
    </Field>
  </div>
  <div class="footer">
    <button
        class="!p-[16px] bg-[#66C61C] rounded-[24px] text-white text-center w-full !mt-[72px] text-[16px]">
      Tasdiqlash
    </button>
  </div>
</template>

<style scoped lang="scss">

</style>
