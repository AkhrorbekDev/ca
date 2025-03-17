<script setup lang="ts">
import {computed, inject, reactive, ref} from 'vue';
import {useRoute, useRouter} from 'vue-router';
import {ErrorMessage, Field, Form, useField} from 'vee-validate';

import type {MaskInputOptions} from 'maska'
import * as yup from 'yup';
import InputOtp from 'primevue/inputotp';

// could be plain object too
const phoneField = useField('phone')
const prefix = '998'

const options = reactive<MaskInputOptions>({
  mask: '+998 (##) ###-##-##',
  reversed: true,
  postProcess: (event) => {
    vForm.value.setFieldValue('phone', `${prefix}${event.detail.unmasked}`)
  }
})

const router = useRouter()
const $api = inject('api')
const $auth = inject('auth')
const value = ref<string>('+998')
const maskedPhone = ref<string>('')
const vForm = ref(null)
const optCode = ref(null)
const vCodeForm = ref(null)
const authType = ref(1)
const showCodeField = ref(false)
const counter = ref(60 * 5)
const interval = ref(null)
const resendDisabled = ref(true)
const validationSchema = yup.object({
  phone: yup.string().required().min(12),
})
const validationSchema2 = yup.object({
  security_code: yup.string().required().min(4),
})
const showBackground = ref(true)
const isLoading = ref(false)

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

function maskNumber(number) {
  // Convert to string in case it's a number
  const numStr = number.toString();

  // Get the first 3 and last 4 digits
  const firstPart = numStr.slice(0, 3);
  const lastPart = numStr.slice(-4);

  // Create asterisks for the middle part
  const middlePart = '*'.repeat(numStr.length - 7);

  // Combine all parts
  return firstPart + middlePart + lastPart;
}

const onSubmit = () => {
  vForm.value.validateField('phone').then(res => {
    if (res) {
      isLoading.value = true
      $api.auth.sendSmsCode({
        phone_number: vForm.value.values.phone,
        sms_type: 'phone',
        type: authType.value
      })
          .then((response) => {
            if (!response.error) {
              showBackground.value = false
              showCodeField.value = true
              maskedPhone.value = maskNumber(vForm.value.values.phone)
              vForm.value.setFieldValue('session_token', response.data.session_token)
              counterInterval()
            } else {
              vForm.value.setFieldError('globalErrorField', response.message)
            }
          })
          .catch(err => {
            vForm.value.setFieldError('globalErrorField', err.message)
          })
          .finally(() => {
            isLoading.value = false
          })
    }
  })
}

const resendSmsCode = () => {
  if (resendDisabled.value) return
  onSubmit()
}
const route = useRoute()
const verifySMSCode = () => {
  vCodeForm.value.validate().then(res => {
    if (res.valid)
      isLoading.value = true
    $auth.login({
      phone_number: vForm.value.values.phone,
      session_token: vForm.value.values.session_token,
      sms_type: 'phone',
      security_code: vCodeForm.value.values.security_code
    }).then(res => {
      if (authType.value === 1) {
        router.push({
          name: 'services'
        })
      } else {

      }
    }).catch(err => {
      vForm.value.setFieldError('globalErrorField', err.response?._data?.message || 'Something wrong')
    })
        .finally(() => {
          isLoading.value = false
        })
  })
}


function counterInterval() {
  interval.value = setInterval(() => {
    counter.value--
    if (!counter.value) {
      clearInterval(interval.value)
      resendDisabled.value = true
      counter.value = 60 * 5
    }
    if (counter.value === 0) {
      resendDisabled.value = false
      clearInterval(inverval.value)
    }
  }, 1000)
}

const formatTime = computed(() => {
  const minutes = Math.floor(counter.value / 60)
  const seconds = counter.value % 60
  return `${minutes}:${seconds < 10 ? '0' + seconds : seconds}`
})
</script>
<template>
  <div>
    <div v-show="!showCodeField">
      <div v-if="showBackground" class="fixed inset-0">
        <img src="../../assets/images/bgCar.png" alt="Background" class="w-full h-full object-cover">
      </div>

      <Form
          ref="vForm"
          v-slot="{errors}"
          :validationSchema="validationSchema"
          @submit="onSubmit"
          class="absolute flex justify-around md:w-[60%] w-full top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
      >
        <img
            @click="$router.push('/')"
            src="../../assets/images/logo.svg"
            class="w-[217px] hidden md:block cursor-pointer"
            alt="logo"
        >

        <div class="bg-white rounded-[24px] !w-[400px] !px-[40px] !py-[32px] md:-translate-x-8">
          <h2 class="text-[#282B30] text-[36px] !mb-[20px] text-center font-600">{{ $t('login') }}</h2>
          <p class="text-[#292D324D] text-[16px] text-center !mb-[24px]">

            {{ $t('enterRegisteredNumber') }}
          </p>
          <Field name="phone">
            <input type="hidden">
          </Field>

          <div class="flex flex-col !mt-[24px]">
            <label for="phone" class="text-[#292D324D] text-[14px]">{{ $t('phone') }}</label>
            <input
                id="phone"
                v-maska
                :data-maska="options.mask"
                @maska="options.postProcess"
                placeholder="+998"
                class="!bg-[#FAFAFA] border-[1px] border-[#FAFAFA] !p-[16px] outline-none rounded-[20px]"
                :class="{
                  _invalid: errors.phone
                }"
            />
          </div>
          <div class="flex justify-center items-center w-full !mt-[36px] min-h-[24px]">
            <ErrorMessage
                v-if="errors.globalErrorField"
                name="globalErrorField"
                as="span"
                class="text-[#EA5455]"
            >
              {{ vForm.errors.globalErrorField }}
            </ErrorMessage>
          </div>

          <button
              type="submit"
              class="!bg-[#66C61C] !py-[16px] flex items-center justify-center gap-2 text-white text-[16px] rounded-[20px] !mt-[16px] w-full"
          >

            {{ $t('phone') }}
            <svg
                v-if="isLoading"
                class="mr-3 -ml-1 size-5 animate-spin text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
            >
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path
                  class="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
          </button>

          <div v-if="authType === 1" class="!mt-[24px] text-center text-gray-600">
          <span class="text-[#292D32] !text-[15px] text-nowrap">
           {{ $t('newUserInfo') }} <a
              href="#"
              @click="changeAuthType"
              class="text-[#0BA5EC] !ml-1 !text-[15px]"
          >{{ $t('register') }}</a>
          </span>
          </div>
          <div v-else class="!mt-[24px] text-center text-gray-600">
            <span class="text-[#292D32] !text-[15px]">{{ $t('oldUserInfo') }}</span>
            <a href="#" @click="changeAuthType" class="text-[#0BA5EC] !ml-1 !text-[15px]">{{ $t('login') }}</a>
          </div>
        </div>
        <Field name="session_token" type="hidden"></Field>
      </Form>
    </div>

    <Form
        v-show="showCodeField"
        ref="vCodeForm"
        v-slot="{errors}"
        :validation-schema="validationSchema2"
        @submit="verifySMSCode"
    >
      <div class="flex items-center justify-center h-[100vh]">
        <div class="bg-white rounded-[24px] !w-[400px]">
          <h2 class="text-[#282B30] text-[36px] !mb-[20px] text-center font-600">
            {{ $t('enterCode') }}
          </h2>
          <p class="text-[#292D324D] text-[16px] text-center !mb-[24px]">
            {{
              $t('enterCodeWithPhone', {phone: maskedPhone})
            }}
          </p>
          <Field name="security_code">
            <input type="hidden">
          </Field>
          <div as="div" name="security_code" class="flex flex-col items-center !mt-[24px]">
            <InputOtp
                :class="{
                _invalid: errors.security_code
              }"
                :model-value="optCode"
                @update:model-value="updateOptCode"
                class="!border-none !outline-none"
            />
          </div>

          <div class="flex justify-center items-center w-full !mt-[36px] min-h-[24px]">
            <span
                v-if="vForm?.errors?.globalErrorField"
                class="text-[#EA5455]"
            >
              {{ vForm.errors.globalErrorField }}
            </span>
          </div>


          <button
              type="submit"
              class="!bg-[#66C61C] !py-[16px] flex items-center justify-center gap-2 text-white text-[16px] rounded-[20px] !mt-[16px] w-full"
          >

            {{ $t('login') }}
            <svg
                v-if="isLoading"
                class="mr-3 -ml-1 size-5 animate-spin text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
            >
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path
                  class="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
          </button>

          <div class="!mt-[24px] text-center text-gray-600">
            <span class="text-[#292D32] !text-[15px]">{{ $t('didNotReceiveCode') }}</span>
            <a
                href="#"
                @click.prevent="resendSmsCode"
                class="text-[#0BA5EC] !ml-1 !text-[15px]"
            >{{ resendDisabled ? formatTime : $t('resend') }}</a>
          </div>
        </div>
      </div>

    </Form>
  </div>
</template>

<style lang="scss">
._invalid {
  border-color: #EA5455;

  .p-inputtext {
    border-color: #EA5455;

  }
}
</style>
