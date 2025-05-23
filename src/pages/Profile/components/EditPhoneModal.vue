<script setup lang="ts">
import {computed, inject, onMounted, reactive, ref} from 'vue';
import {useRouter} from 'vue-router';
import {ErrorMessage, Field, Form} from 'vee-validate';

import type {MaskInputOptions} from 'maska'
import * as yup from 'yup';
import InputOtp from 'primevue/inputotp';

// could be plain object too
const props = defineProps({
  phone: {
    type: String,
    default: ''
  },
  visible: {
    type: Boolean,
    default: false
  }
})
const emit = defineEmits(['on:send', 'update:visible'])
const prefix = '998'

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
const _phone = ref('')
const options = reactive<MaskInputOptions>({
  mask: '+998 (##) ###-##-##',
  reversed: true,
  postProcess: (event) => {
    vForm.value.setFieldValue('phone', `${prefix}${event.detail.unmasked}`)
  }
})

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
              emit('on:send', true)
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
const verifySMSCode = () => {
  vCodeForm.value.validate().then(res => {
    if (res.valid)
      isLoading.value = true

    $api.auth.verifySmsCode({
      phone_number: vForm.value.values.phone,
      session_token: vForm.value.values.session_token,
      sms_type: 'phone',
      security_code: vCodeForm.value.values.security_code
    }).then(res => {
      emit('save:phone', vForm.value.values.phone)
    }).catch(err => {
      vForm.value.setFieldError('globalErrorField', err.response?._data?.message || 'Something wrong')
    })
        .finally(() => {
          isLoading.value = false
        })
  })
}

const changePhone = () => {
  showCodeField.value = false
  _phone.value = ''
  vForm.value.resetForm()
  vCodeForm.value.resetForm()
  clearInterval(interval.value)
  counter.value = 60 * 5
  resendDisabled.value = true
}
onMounted(() => {
})

const formatTime = computed(() => {
  const minutes = Math.floor(counter.value / 60)
  const seconds = counter.value % 60
  return `${minutes}:${seconds < 10 ? '0' + seconds : seconds}`
})
</script>
<template>
  <Dialog
      :visible="visible"
      modal
      @update:visible="$emit('update:visible', $event)"
  >
    <template #header>
      <div>
        <button v-if="showCodeField" @click="changePhone" class="flex items-center gap-2">
          <img src="@/assets/images/arrowUp.svg" class="w-[24px] h-[24px] rotate-90" alt="close">
          <span>
            {{ $t('back') }}
          </span>
        </button>
      </div>
    </template>
    <div>
      <div v-show="!showCodeField">
        <Form
            ref="vForm"
            v-slot="{errors}"
            :validationSchema="validationSchema"
            @submit="onSubmit"
            class="flex justify-around  !w-[400px]"
        >
          <div class="bg-white rounded-[24px] !px-[40px] !py-[32px]">
            <h2
                class="text-[#282B30] text-[36px]
            !mb-[20px] text-center font-600"
            >{{ $t('changePhoneNumber') }}</h2>
            <p class="text-[#292D324D] text-[16px] text-center !mb-[24px]">

              {{ $t('enterNewPhoneNumber') }}
            </p>
            <Field name="phone">
              <input type="hidden">
            </Field>

            <div class="flex flex-col !mt-[24px]">
              <label for="phone" class="text-[#292D324D] text-[14px]">{{ $t('phone') }}</label>
              <input
                  id="phone"
                  v-maska
                  v-model="_phone"
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

              {{ $t('send') }}
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
            <Field name="session_token" type="hidden"></Field>
          </div>
        </Form>
      </div>

      <Form
          v-show="showCodeField"
          ref="vCodeForm"
          v-slot="{errors}"
          :validation-schema="validationSchema2"
          @submit="verifySMSCode"
      >
        <div class="flex items-center justify-center">
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

              {{ $t('send') }}
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
  </Dialog>
</template>

<style lang="scss">
._invalid {
  border-color: #EA5455;

  .p-inputtext {
    border-color: #EA5455;

  }
}
</style>
