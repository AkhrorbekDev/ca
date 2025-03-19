<script setup lang="ts">
import {inject, reactive, ref} from 'vue';
import {useRouter} from 'vue-router';
import * as yup from 'yup'
import type {MaskInputOptions} from 'maska';
import {Field, Form} from 'vee-validate';

import {useI18n} from 'vue-i18n';
import {useToast} from 'primevue/usetoast';

const {t} = useI18n()
const toast = useToast()

interface DataValue {
  company: null;
  stir: null;
  phone: null;
  agree: string;
}

const isLoading = ref(false)

const router = useRouter()
const showPersonalData = ref(false)
const mainForm = ref(null)
const clForm = ref(null)
const $api = inject('api')
const dataValue = ref<DataValue>({
  company: null,
  stir: null,
  phone: null,
  agree: '',
})
const prefix = '998'
const userTypes = ref([
  {
    name: t('legalEntity'),
    value: 'CLIENT'
  },
  {
    name: t('individual'),
    value: 'PHYSICAL'
  }
])
const selectedUserType = ref(userTypes.value[0])

const options = reactive<MaskInputOptions>({
  mask: '+998 (##) ###-##-##',
  reversed: true,
  postProcess: (event, name) => {
    if (selectedUserType.value.value === 'CLIENT') {
      clForm.value.setFieldValue(name, `${prefix}${event.detail.unmasked}`)
    } else {
      mainForm.value.setFieldValue(name, `${prefix}${event.detail.unmasked}`)
    }
  }
})


const physicalSchema = yup.object({
  call_phone: yup.string().required().min(12),
  agree: yup.bool().notOneOf([false]).required(),
  org_name: yup.string().required().nonNullable(),
  stir: yup.number().required().nonNullable(),
  user_type: yup.string().required().nonNullable(),
  phone_number: yup.string().required().min(12),
  tg_link: yup.string().required().url(),
  mail: yup.string().required().email()
})

const clientSchema = yup.object({
  first_name: yup.string().required().nonNullable(),
  last_name: yup.string().required().nonNullable(),
  tg_link: yup.string().required().url(),
  email: yup.string().required().email(),
  phone_number: yup.string().required().min(12),
  agree: yup.bool().oneOf([true]).required(),
  user_type: yup.string().required().nonNullable(),
  mail: yup.string().required().email()
})

const initialValues = ref({
  user_type: userTypes.value[0].value,
  org_name: null,
  first_name: null,
  last_name: null,
  mail: null,
  call_phone: null,
  agree: false,
  tg_link: null,
  phone_number: null,
  stir: null

})

const agreeValue = ref(false)
const updateAgreeValue = (e) => {
  agreeValue.value = e
  if (selectedUserType.value.value === 'CLIENT') {
    clForm.value.setFieldValue('agree', e)
  } else {
    mainForm.value.setFieldValue('agree', e)
  }
}

const saveUserType = (item) => {
  // selectedUserType.value = userTypes.value.find(item => item.value === mainForm.value.getValues().user_type)
  showPersonalData.value = true
}
const submit = () => {
  if (selectedUserType.value.value === 'CLIENT') {
    clForm.value.validate()
        .then(res => {
          if (res.valid) {
            isLoading.value = true
            $api.auth.updateUserProfile(clForm.value.getValues())
                .then(res => {
                  router.push({
                    name: 'services'
                  })
                })
                .catch(err => {
                  toast.add({
                    group: 'br',
                    life: 2000,
                    severity: 'error',
                    summary: err.message
                  })
                })
                .finally(() => {
                  isLoading.value = false
                })
          }
        })
  } else {
    mainForm.value.validate()
        .then(res => {
          if (res.valid) {
            isLoading.value = true
            $api.auth.updateUserProfile(mainForm.value.getValues())
                .then(res => {
                  router.push({
                    name: 'services'
                  })
                })
                .catch(err => {
                  toast.add({
                    group: 'br',
                    life: 2000,
                    severity: 'error',
                    summary: err.message
                  })
                })
                .finally(() => {
                  isLoading.value = false
                })
          }
        })
  }
}

</script>
<template>
  <div
      class="bg-[#FAFAFA]"
  >
    <router-link to="/">
      <img src="../../assets/images/logo2.svg" class="!p-[24px] absolute right-0" alt="logo"/>
    </router-link>
    <div v-show="!showPersonalData">
      <div
          class="flex items-center justify-center h-[100vh]"
      >
        <div class="rounded-[24px] !w-[400px]">
          <h2 class="text-[#282B30] text-[36px] !mb-[10px] text-center font-600">{{ $t('personal') }}</h2>
          <p class="text-[#292D324D] text-[16px] text-center !m-auto !mb-[24px] w-[80%]">
            {{
              $t('whoAreYouOnPlatform')
            }}
          </p>

          <div as="div" name="user_type" class="flex flex-col items-center !mt-[24px] gap-y-[8px]">
            <template v-for="type in userTypes" :key="type.value">
              <label
                  :for="type.value"
                  class="bg-[#FFFFFF] !p-[16px] w-full flex items-center justify-between rounded-[20px] cursor-pointer"
              >
                <span class="text-[16px] text-[#292D324D]">{{ type.name }}</span>
                <RadioButton
                    :model-value="selectedUserType.value"
                    :inputId="type.value"
                    name="user_type"
                    :value="type.value"
                    @update:model-value="() => {
                               selectedUserType = type
                             }"
                />
              </label>
            </template>
          </div>

          <button
              @click="saveUserType"
              type="button"
              class="!py-[16px] !bg-[#66C61C] text-white text-[16px] rounded-[20px] !mt-[24px] w-full"
          >
            {{ $t('next') }}
          </button>

          <!--          <div class="!mt-[24px]  text-gray-600">
                      <router-link to="/income-password" class="text-[#0BA5EC] !text-[15px] flex items-center justify-center">
                        <img src="../../assets/images/toLeft.svg" alt="left">
                        Ortga
                      </router-link>
                    </div>-->
        </div>
      </div>

    </div>
    <div v-show="showPersonalData">
      <div class="flex items-center justify-center h-[100vh]">
        <div class="rounded-[24px] !w-[500px]">
          <h2 class="text-[#282B30] text-[36px] !mb-[10px] text-center font-600">
            {{ selectedUserType.value === 'CLIENT' ? $t('enterPhysicalInfos') : $t('enterClientInfos') }}
          </h2>
          <p class="text-[#292D324D] text-[16px] text-center !m-auto !mb-[24px] w-[80%]">
            {{ $t('enterInfos') }}
          </p>

          <div class="flex flex-col gap-y-4 !mt-[24px]">
            <Form
                v-slot="{values, errors}"
                v-if="selectedUserType.value === 'CLIENT'"
                ref="clForm"

                class="flex flex-col gap-y-4"
                :validation-schema="physicalSchema"
                :initial-values="initialValues"
            >
              <Field as="div" class="flex flex-col" name="org_name">
                <label for="org_name" class="text-[#292D324D] text-[14px] !mb-[8px]">
                  {{ $t('companyName') }}
                </label>
                <input
                    id="org_name"
                    :value="values.org_name"
                    :placeholder="$t('enterCompanyName')"
                    :class="{
                    _invalid: errors?.org_name
                  }"
                    class="!bg-[#fff] border-[1px] border-[#FAFAFA] !p-[16px] outline-none rounded-[20px]"
                />
              </Field>

              <Field as="div" class="flex flex-col" name="stir">
                <label for="stir" class="text-[#292D324D] text-[14px] !mb-[8px]">
                  {{ $t('stir') }}
                </label>
                <input
                    id="stir"
                    :value="values.stir"
                    :placeholder="$t('enterSTIR')"
                    :class="{
                    _invalid: errors?.stir
                  }"
                    class="!bg-[#fff] border-[1px] border-[#FAFAFA] !p-[16px] outline-none rounded-[20px]"
                />
              </Field>
              <div class="flex flex-col">
                <label for="phone_number" class="text-[#292D324D] text-[14px] !mb-[8px]">
                  {{ $t('phone') }}
                </label>
                <input
                    id="phone_number"

                    v-maska
                    :data-maska="options.mask"
                    @maska="(e) => options.postProcess(e, 'phone_number')"
                    placeholder="+998"
                    class="!bg-[#FAFAFA] border-[1px] border-[#FAFAFA] !p-[16px] outline-none rounded-[20px]"
                    :class="{
                    _invalid: errors?.phone_number

                  }"
                />
              </div>
              <div class="flex flex-col">
                <label for="call_phone" class="text-[#292D324D] text-[14px] !mb-[8px]">
                  {{ $t('callCenterNumber') }}
                </label>
                <input
                    id="call_phone"

                    v-maska
                    :data-maska="options.mask"
                    @maska="(e) => options.postProcess(e, 'call_phone')"
                    placeholder="+998"
                    class="!bg-[#FAFAFA] border-[1px] border-[#FAFAFA] !p-[16px] outline-none rounded-[20px]"
                    :class="{
                    _invalid: errors?.call_phone

                  }"
                />
              </div>

              <Field as="div" class="flex flex-col" name="tg_link">
                <label for="tg_link" class="text-[#292D324D] text-[14px] !mb-[8px]">
                  {{ $t('telegram') }}
                </label>
                <input
                    id="tg_link"
                    :model-value="values.tg_link"
                    :placeholder="$t('telegram')"
                    :class="{
                    _invalid: errors?.tg_link
                  }"
                    class="!bg-[#fff] border-[1px] border-[#FAFAFA] !p-[16px] outline-none rounded-[20px]"
                />
              </Field>
              <Field as="div" class="flex flex-col" name="mail">
                <label for="mail" class="text-[#292D324D] text-[14px] !mb-[8px]">
                  {{ $t('email') }}
                </label>
                <input
                    id="mail"
                    :model-value="values.mail"
                    :placeholder="$t('email')"
                    :class="{
                    _invalid: errors?.mail
                  }"
                    class="!bg-[#fff] border-[1px] border-[#FAFAFA] !p-[16px] outline-none rounded-[20px]"
                />
              </Field>
              <Field as="div" class="flex flex-col" name="referred_by">
                <label for="referred_by" class="text-[#292D324D] text-[14px] !mb-[8px]">
                  {{ $t('referalCode') }}
                </label>
                <input
                    id="referred_by"
                    :value="values.referred_by"
                    class="!bg-[#fff] border-0 !p-[16px] outline-none rounded-[20px]"
                />
              </Field>
            </Form>
            <Form
                ref="mainForm"
                v-slot="{values, errors}"
                v-else
                class="flex flex-col gap-y-4"
                :validation-schema="clientSchema"
                :initial-values="initialValues"
            >
              <Field as="div" class="flex flex-col" name="first_name">
                <label for="first_name" class="text-[#292D324D] text-[14px] !mb-[8px]">
                  {{ $t('yourName') }}
                </label>
                <input
                    id="first_name"
                    :value="values.first_name"
                    :placeholder="$t('enterYourName')"
                    :class="{
                      _invalid: errors?.first_name
                    }"
                    class="!bg-[#fff] border-0 !p-[16px] outline-none rounded-[20px]"
                />
              </Field>
              <Field as="div" class="flex flex-col" name="last_name">
                <label for="last_name" class="text-[#292D324D] text-[14px] !mb-[8px]">
                  {{ $t('yourSurname') }}
                </label>
                <input
                    id="last_name"
                    :value="values.last_name"
                    :placeholder="$t('enterYourSurname')"
                    :class="{
                      _invalid: errors?.last_name
                    }"
                    class="!bg-[#fff] border-0 !p-[16px] outline-none rounded-[20px]"
                />
              </Field>
              <div class="flex flex-col">
                <label for="phone_number" class="text-[#292D324D] text-[14px] !mb-[8px]">
                  {{ $t('phone') }}
                </label>
                <input
                    id="phone_number"
                    v-maska
                    :data-maska="options.mask"
                    @maska="(e) => options.postProcess(e, 'phone_number')"
                    placeholder="+998"
                    class="!bg-[#FAFAFA] border-[1px] border-[#FAFAFA] !p-[16px] outline-none rounded-[20px]"
                    :class="{
                    _invalid: errors?.phone_number

                  }"
                />
              </div>

              <Field as="div" class="flex flex-col" name="tg_link">
                <label for="tg_link" class="text-[#292D324D] text-[14px] !mb-[8px]">
                  {{ $t('telegram') }}
                </label>
                <input
                    id="tg_link"
                    :model-value="values.tg_link"
                    :placeholder="$t('telegram')"
                    :class="{
                    _invalid: errors?.tg_link
                  }"
                    class="!bg-[#fff] border-[1px] border-[#FAFAFA] !p-[16px] outline-none rounded-[20px]"
                />
              </Field>
              <Field as="div" class="flex flex-col" name="mail">
                <label for="mail" class="text-[#292D324D] text-[14px] !mb-[8px]">
                  {{ $t('email') }}
                </label>
                <input
                    id="mail"
                    :model-value="values.mail"
                    :placeholder="$t('email')"
                    :class="{
                    _invalid: errors?.mail
                  }"
                    class="!bg-[#fff] border-[1px] border-[#FAFAFA] !p-[16px] outline-none rounded-[20px]"
                />
              </Field>
              <Field as="div" class="flex flex-col" name="referred_by">
                <label for="referred_by" class="text-[#292D324D] text-[14px] !mb-[8px]">
                  {{ $t('referalCode') }}
                </label>
                <input
                    id="referred_by"
                    :value="values.referred_by"
                    class="!bg-[#fff] border-0 !p-[16px] outline-none rounded-[20px]"
                />
              </Field>
            </Form>

            <div
                as="div"
                name="agree"
                class="flex items-center !mt-[36px]"
            >
              <Checkbox
                  :class="{
                          _invalid: !agreeValue
                        }"
                  :invalid="!agreeValue"
                  v-model="initialValues.agree"
                  inputId="agree"
                  binary
                  name="agree"
                  @update:model-value="updateAgreeValue"
              />
              <label for="agree" class="!ml-[8px] text-[14px]">
                <span class="text-[#218BFF]">
                  {{ $t('agreeTo') }}
                </span>
                <span class="text-[#292D324D]">
                  {{ $t('agreeTerms') }}
                </span>
              </label>
            </div>
          </div>

          <button
              @click="submit"
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

          <div class="!mt-[24px]  text-gray-600">
            <a
                href="#"
                @click.prevent="() => showPersonalData = false"
                class="text-[#0BA5EC] !text-[15px] flex items-center justify-center"
            >
              <img src="@/assets/images/toLeft.svg" alt="left"/>
              {{ $t('back') }}
            </a>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<style scoped lang="scss">
._invalid {
  border-color: #EA5455;
  --p-checkbox-invalid-border-color: #EA5455;

  .p-inputtext {
    border-color: #EA5455;

  }
}
</style>
