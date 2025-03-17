<script setup lang="ts">
import {inject, reactive, ref} from 'vue';
import {useRouter} from 'vue-router';
import * as yup from 'yup'
import type {MaskInputOptions} from 'maska';
import {Field, Form} from 'vee-validate';

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
    name: 'Yuridik shaxs',
    value: 'PHYSICAL'
  },
  {
    name: 'Jismoniy shaxs',
    value: 'CLIENT'
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
  user_type: yup.string().required().nonNullable()
})

const clientSchema = yup.object({

  phone_number: yup.string().required().min(12),
  agree: yup.bool().oneOf([true]).required(),
  user_type: yup.string().required().nonNullable()
})

const initialValues = ref({
  user_type: userTypes.value[0].value,
  org_name: null,
  first_name: null,
  last_name: null,
  mail: null,
  call_phone: null,
  agree: false
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
            $api.auth.updateUserProfile(mainForm.value.getValues())
                .then(res => {
                  router.push({
                    name: 'services'
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
          <h2 class="text-[#282B30] text-[36px] !mb-[10px] text-center font-600">Shaxsingizni tanlang!</h2>
          <p class="text-[#292D324D] text-[16px] text-center !m-auto !mb-[24px] w-[80%]">
            Siz platformamizdan kim sifatida
            foydalanmoqchisiz?
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
            Keyingisi
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
        <div class="rounded-[24px] !w-[400px]">
          <h2 class="text-[#282B30] text-[36px] !mb-[10px] text-center font-600">Shaxs ma’lumotlari</h2>
          <p class="text-[#292D324D] text-[16px] text-center !m-auto !mb-[24px] w-[80%]">
            Ma’lumotlaringizni kiriting!
          </p>

          <div class="flex flex-col gap-y-4 !mt-[24px]">
            <Form
                v-slot="{values}"
                v-if="selectedUserType.value !== 'CLIENT'"
                ref="mainForm"
                :validation-schema="physicalSchema"
                :initial-values="initialValues"
            >
              <Field as="div" class="flex flex-col" name="org_name">
                <label for="org_name" class="text-[#292D324D] text-[14px] !mb-[8px]">Kompaniya nomi</label>
                <input
                    id="org_name"
                    :model-value="values.org_name"
                    placeholder="Kiriting"
                    :class="{
                    _invalid: mainForm?.errors?.org_name
                  }"
                    class="!bg-[#fff] border-[1px] border-[#FAFAFA] !p-[16px] outline-none rounded-[20px]"
                />
              </Field>

              <Field as="div" class="flex flex-col" name="stir">
                <label for="stir" class="text-[#292D324D] text-[14px] !mb-[8px]">STIR</label>
                <input
                    id="stir"
                    :model-value="values.stir"
                    placeholder="Kiriting"
                    :class="{
                    _invalid: mainForm?.errors?.stir
                  }"
                    class="!bg-[#fff] border-[1px] border-[#FAFAFA] !p-[16px] outline-none rounded-[20px]"
                />
              </Field>
              <div class="flex flex-col">
                <label for="call_phone" class="text-[#292D324D] text-[14px] !mb-[8px]">Telefon</label>
                <input
                    id="call_phone"

                    v-maska
                    :data-maska="options.mask"
                    @maska="(e) => options.postProcess(e, 'call_phone')"
                    placeholder="+998"
                    class="!bg-[#FAFAFA] border-[1px] border-[#FAFAFA] !p-[16px] outline-none rounded-[20px]"
                    :class="{
                    _invalid: mainForm?.errors?.call_phone

                  }"
                />
              </div>
            </Form>
            <Form
                ref="clForm"
                v-slot="{values}"
                v-else
                :validation-schema="clientSchema"
                :initial-values="initialValues"
            >
              <Field as="div" class="flex flex-col" name="first_name">
                <label for="first_name" class="text-[#292D324D] text-[14px] !mb-[8px]">Ismingiz</label>
                <input
                    id="first_name"
                    :model-value="values.first_name"
                    placeholder="Kiriting"
                    :class="{
                      _invalid: clForm?.errors?.first_name
                    }"
                    class="!bg-[#fff] border-0 !p-[16px] outline-none rounded-[20px]"
                />
              </Field>
              <Field as="div" class="flex flex-col" name="last_name">
                <label for="last_name" class="text-[#292D324D] text-[14px] !mb-[8px]">Familyangiz</label>
                <input
                    id="last_name"
                    :model-value="values.last_name"
                    placeholder="Kiriting"
                    :class="{
                      _invalid: clForm?.errors?.last_name
                    }"
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
                <span class="text-[#218BFF]">Foydalanish shartlari</span>
                <span class="text-[#292D324D]">ga roziman</span>
              </label>
            </div>
          </div>

          <button
              @click="submit"
              type="submit"
              class="!bg-[#66C61C] !py-[16px] flex items-center justify-center gap-2 text-white text-[16px] rounded-[20px] !mt-[16px] w-full"
          >

            Kirish
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
              <img src="../../assets/images/toLeft.svg" alt="left"/>
              Ortga
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
