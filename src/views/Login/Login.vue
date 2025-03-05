<script setup lang="ts">
import {inject, reactive, ref} from "vue";
import {useRouter} from "vue-router";
import {Form, Field, ErrorMessage, defineRule, SchemaValidationMode, useField} from 'vee-validate';

import {MaskInput} from 'maska';

import {min, required} from "@vee-validate/rules";
import * as yup from 'yup';
import type {MaskInputOptions} from "maska"

// could be plain object too
const phoneField = useField('phone')
const prefix = '998'

const options = reactive<MaskInputOptions>({
  mask: "+998 (##) ###-##-##",
  reversed: true,
  postProcess: (event) => {
    console.log(phoneField)
    vForm.value.setFieldValue('phone', `${prefix}${event.detail.unmasked}`)
  }
})

const router = useRouter()
const $api = inject('api')
const $auth = inject('auth')
const value = ref<string>('+998')
const vForm = ref(null)
const authType = ref(1)

const validationSchema = yup.object({
  phone: yup.string().required().min(12)
})
const showBackground = reactive(false)

const changeAuthType = (e) => {
  e.preventDefault()
  authType.value = authType.value === 1 ? 2 : 1
}
const onSubmit = (res) => {
  vForm.value.validate().then((valid) => {
    if (valid) {
      $api.auth.sendSmsCode({
        type: 1
      })
    }
  })
}

</script>
<template>
  <div>
    <div v-if="showBackground" class="fixed inset-0">
      <img src="../../assets/images/bgCar.png" alt="Background" class="w-full h-full object-cover">
    </div>

    <Form
        ref="vForm"
        :validationSchema="validationSchema"
        @submit="onSubmit"
        class="absolute flex justify-around md:w-[60%] w-full top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
      <img @click="$router.push('/')" src="../../assets/images/logo.svg"
           class="w-[217px] hidden md:block cursor-pointer" alt="logo">

      <div class="bg-white rounded-[24px] !w-[400px] !px-[40px] !py-[32px] md:-translate-x-8">
        <h2 class="text-[#282B30] text-[36px] !mb-[20px] text-center font-600">Kirish</h2>
        <p class="text-[#292D324D] text-[16px] text-center !mb-[24px]">
          Profilingizga kirish uchun ro'yxatdan o'tgan raqamingizni kiriting!
        </p>

        <div name="phone" as="div" class="flex flex-col !mt-[24px]">
          <label for="phone" class="text-[#292D324D] text-[14px]">Telefon</label>
          <input
              id="phone"
              v-maska
              :data-maska="options.mask"
              @maska="options.postProcess"
              placeholder="+998"
              class="!bg-[#FAFAFA] border-0 !p-[16px] outline-none rounded-[20px]"
          />
          <ErrorMessage v-if="vForm?.errors.phone" name="phone" as="span" class="text-red-500 text-[14px]">
            {{
              vForm?.errors.phone
            }}
          </ErrorMessage>
        </div>
        <Field v-model="value" v-slot="{meta, handleChange}" name="phone" type="hidden"></Field>

        <button
            type="submit"
            class="!bg-[#66C61C] !py-[16px] text-white text-[16px] rounded-[20px] !mt-[36px] w-full"
        >
          Kirish
        </button>

        <div v-if="authType === 1" class="!mt-[24px] text-center text-gray-600">
          <span class="text-[#292D32] !text-[15px] text-nowrap">
            Platformamizda yangimisiz? <a href="#" @click="changeAuthType" class="text-[#0BA5EC] !ml-1 !text-[15px]">Ro'yxatdan o'tish</a>
          </span>
        </div>
        <div v-else class="!mt-[24px] text-center text-gray-600">
          <span class="text-[#292D32] !text-[15px]">Avval ro‘yhatdan o‘tganmisiz?</span>
          <a href="#" @click="changeAuthType" class="text-[#0BA5EC] !ml-1 !text-[15px]">Kirish</a>
        </div>
      </div>
    </Form>
  </div>
</template>
