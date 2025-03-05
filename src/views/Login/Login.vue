<script setup lang="ts">
import {inject, reactive, ref} from "vue";
import {useRoute, useRouter} from "vue-router";
import {ErrorMessage, Field, Form, useField} from 'vee-validate';

import type {MaskInputOptions} from "maska"
import * as yup from 'yup';
import InputOtp from "primevue/inputotp";

// could be plain object too
const phoneField = useField('phone')
const prefix = '998'

const options = reactive<MaskInputOptions>({
  mask: "+998 (##) ###-##-##",
  reversed: true,
  postProcess: (event) => {
    vForm.value.setFieldValue('phone', `${prefix}${event.detail.unmasked}`)
  }
})

const router = useRouter()
const $api = inject('api')
const $auth = inject('auth')
const value = ref<string>('+998')
const vForm = ref(null)
const optCode = ref(null)
const vCodeForm = ref(null)
const authType = ref(1)
const showCodeField = ref(false)

const validationSchema = yup.object({
  phone: yup.string().required().min(12),
})
const showBackground = ref(true)

const changeAuthType = (e) => {
  e.preventDefault()
  authType.value = authType.value === 1 ? 2 : 1
  vForm.value.setFieldValue('phone', undefined)
  vForm.value.setFieldError('phone', undefined)
  vForm.value.setFieldError('globalErrorField', undefined)
}

const updateOptCode = (e) => {
  vCodeForm.value.setFieldValue('security_code', e)
}
const onSubmit = (res) => {
  vForm.value.validateField('phone').then(res => {
    if (res) {
      $api.auth.sendSmsCode({
        phone_number: vForm.value.values.phone,
        sms_type: 'phone',
        type: authType.value
      })
          .then((response) => {
            if (!response.error) {
              showBackground.value = false
              showCodeField.value = true
              vForm.value.setFieldValue('session_token', response.data.session_token)
            } else {
              vForm.value.setFieldError(globalErrorField, response.message)
            }
          })
    }
  })
}
const route = useRoute()
const verifySMSCode = () => {
  vCodeForm.value.validate().then(res => {
    if (res.valid)
      $auth.login({
        phone_number: vForm.value.values.phone,
        session_token: vForm.value.values.session_token,
        sms_type: 'phone',
        security_code: vCodeForm.value.values.security_code
      }).then(res => {
        router.push({
          name: 'services'
        })
      })
  })
}

</script>
<template>
  <div>
    <div v-show="!showCodeField">
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
                class="!bg-[#FAFAFA] border-[1px] border-[#FAFAFA] !p-[16px] outline-none rounded-[20px]"
                :class="{
                _invalid: vForm?.errors.phone
              }"
            />
          </div>
          <div class="flex justify-center items-center w-full !mt-[36px] min-h-[24px]">
            <ErrorMessage v-if="vForm?.errors?.globalErrorField" name="globalErrorField" as="span"
                          class="text-[#EA5455]">
              {{ vForm.errors.globalErrorField }}
            </ErrorMessage>
          </div>

          <button
              type="submit"
              class="!bg-[#66C61C] !py-[16px] text-white text-[16px] rounded-[20px] !mt-[16px] w-full"
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
        <Field name="session_token" type="hidden"></Field>
      </Form>
    </div>

    <Form
        v-show="showCodeField"
        ref="vCodeForm"
        @submit="verifySMSCode"
    >
      <div class="flex items-center justify-center h-[100vh]">
        <div class="bg-white rounded-[24px] !w-[400px]">
          <h2 class="text-[#282B30] text-[36px] !mb-[20px] text-center font-600">Kodni kiriting</h2>
          <p class="text-[#292D324D] text-[16px] text-center !mb-[24px]">
            Tasdiqlash kodini +998******9763 raqamiga yubordik.
            Quyidagi maydonga mobil
            kodingizni kiriting.
          </p>

          <div as="div" name="security_code" class="flex flex-col items-center !mt-[24px]">
            <InputOtp :model-value="optCode" @update:model-value="updateOptCode" class="!border-none !outline-none"/>
          </div>

          <button
              type="submit"
              class="!bg-[#66C61C] !py-[16px] text-white text-[16px] rounded-[20px] !mt-[36px] w-full">
            Kirish
          </button>

          <div class="!mt-[24px] text-center text-gray-600">
            <span class="text-[#292D32] !text-[15px]">Kod olmadingizmi?</span>
            <a href="#" @click.prevent="resendSmsCode" class="text-[#0BA5EC] !ml-1 !text-[15px]">Qayta yuborish</a>
          </div>
        </div>
      </div>

    </Form>
  </div>
</template>

<style lang="scss">
._invalid {
  border-color: #EA5455;
}
</style>
