<script setup lang="ts">
import {inject, reactive, ref} from "vue";
import {useRouter} from "vue-router";
import * as yup from 'yup'
import type {MaskInputOptions} from "maska";
import {Field, Form} from "vee-validate";

interface DataValue {
  company: null;
  stir: null;
  phone: null;
  agree: string;
}

const router = useRouter()
const showPersonalData = ref(false)
const mainForm = ref(null)
const $api = inject('api')
const dataValue = ref<DataValue>({
  company: null,
  stir: null,
  phone: null,
  agree: '',
})
const prefix = '998'

const options = reactive<MaskInputOptions>({
  mask: "+998 (##) ###-##-##",
  reversed: true,
  postProcess: (event, name) => {
    mainForm.value.setFieldValue(name, `${prefix}${event.detail.unmasked}`)
  }
})


const physicalSchema = yup.object({
  call_phone: yup.string().required().min(12),
  agree: yup.bool().notOneOf([false]).required(),
  user_type: yup.string().required().nonNullable()
})

const clientSchema = yup.object({
  org_name: yup.string().required().nonNullable(),
  stir: yup.number().required().nonNullable(),
  phone_number: yup.string().required().min(12),
  agree: yup.bool().oneOf([true]).required(),
  user_type: yup.string().required().nonNullable()
})

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
const initialValues = ref({
  user_type: userTypes.value[0].value,
  org_name: null,
  first_name: null,
  last_name: null,
  mail: null,
  call_phone: null,
  agree: false
})


const updateAgreeValue = (e) => {
  mainForm.value.setFieldValue('agree', e)
}

const saveUserType = () => {
  selectedUserType.value = userTypes.value.find(item => item.value === mainForm.value.getValues().user_type)
  showPersonalData.value = true
}
const submit = () => {
  mainForm.value.validate()
      .then(res => {
        console.log(res)
        if (res.valid) {
          $api.auth.updateUserProfile(mainForm.value.getValues())
              .then(res => {
                router.push({
                  name: 'services'
                })
              })
        }
      })
}

</script>
<template>
  <Form
      v-slot="{values}"
      ref="mainForm"
      :initial-values="initialValues"
      :validation-schema="physicalSchema"
      class="bg-[#FAFAFA]">
    <router-link to="/public">
      <img src="../../assets/images/logo2.svg" class="!p-[24px] absolute right-0" alt="logo"/>
    </router-link>
    <div v-show="!showPersonalData">
      <div
          class="flex items-center justify-center h-[100vh]">
        <div class="rounded-[24px] !w-[400px]">
          <h2 class="text-[#282B30] text-[36px] !mb-[10px] text-center font-600">Shaxsingizni tanlang!</h2>
          <p class="text-[#292D324D] text-[16px] text-center !m-auto !mb-[24px] w-[80%]">
            Siz platformamizdan kim sifatida
            foydalanmoqchisiz?
          </p>

          <Field as="div" name="user_type" class="flex flex-col items-center !mt-[24px] gap-y-[8px]">
            <template v-for="type in userTypes" :key="type.value">
              <label :for="type.value"
                     class="bg-[#FFFFFF] !p-[16px] w-full flex items-center justify-between rounded-[20px] cursor-pointer">
                <span class="text-[16px] text-[#292D324D]">{{ type.name }}</span>
                <RadioButton :model-value="values.user_type" :inputId="type.value" name="user_type"
                             :value="type.value"/>
              </label>
            </template>
          </Field>

          <button
              @click="saveUserType"
              type="button"
              :disabled="!values.user_type"
              :class="!values.user_type ? '!bg-[#8ccc5a]' : '!bg-[#66C61C]'"
              class="!py-[16px] text-white text-[16px] rounded-[20px] !mt-[24px] w-full"
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
            <template v-if="values.user_type === 'PHYSICAL'">
              <Field :rules="yup.string().required()" as="div" class="flex flex-col" name="org_name">
                <label for="org_name" class="text-[#292D324D] text-[14px] !mb-[8px]">Kompaniya nomi</label>
                <input
                    id="org_name"
                    :model-value="values.org_name"
                    placeholder="Kiriting"
                    :class="{
                    _invalid: mainForm?.errors.org_name
                  }"
                    class="!bg-[#fff] border-[1px] border-[#FAFAFA] !p-[16px] outline-none rounded-[20px]"
                />
              </Field>

              <Field :rules="yup.string().required()" as="div" class="flex flex-col" name="stir">
                <label for="stir" class="text-[#292D324D] text-[14px] !mb-[8px]">Kompaniya nomi</label>
                <input
                    id="stir"
                    :model-value="values.stir"
                    placeholder="Kiriting"
                    :class="{
                    _invalid: mainForm?.errors.stir
                  }"
                    class="!bg-[#fff] border-[1px] border-[#FAFAFA] !p-[16px] outline-none rounded-[20px]"
                />
              </Field>
            </template>
            <template v-else>
              <Field :rules="yup.string().required()" as="div" class="flex flex-col" name="first_name">
                <label for="first_name" class="text-[#292D324D] text-[14px] !mb-[8px]">Ismingiz</label>
                <input
                    id="first_name"
                    :model-value="values.first_name"
                    placeholder="Kiriting"
                    :class="{
                      _invalid: mainForm?.errors.first_name
                    }"
                    class="!bg-[#fff] border-0 !p-[16px] outline-none rounded-[20px]"
                />
              </Field>
              <Field :rules="yup.string().required()" as="div" class="flex flex-col" name="last_name">
                <label for="last_name" class="text-[#292D324D] text-[14px] !mb-[8px]">Familyangiz</label>
                <input
                    id="last_name"
                    :model-value="values.last_name"
                    placeholder="Kiriting"
                    :class="{
                      _invalid: mainForm?.errors.last_name
                    }"
                    class="!bg-[#fff] border-0 !p-[16px] outline-none rounded-[20px]"
                />
              </Field>
            </template>

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
                    _invalid: mainForm?.errors.call_phone

                  }"
              />
            </div>

            <div
                as="div" name="agree" class="flex items-center !mt-[36px]">
              <Checkbox
                  :class="{
                          _invalid: mainForm?.errors.agree
                        }"
                  :invalid="!values.agree"
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
              type="button"
              class="!bg-[#66C61C] !py-[16px] text-white text-[16px] rounded-[20px] !mt-[24px] w-full"
          >
            Kirish
          </button>

          <div class="!mt-[24px]  text-gray-600">
            <a href="#" @click.prevent="() => showPersonalData = false"
               class="text-[#0BA5EC] !text-[15px] flex items-center justify-center">
              <img src="../../assets/images/toLeft.svg" alt="left"/>
              Ortga
            </a>
          </div>
        </div>
      </div>
    </div>

  </Form>
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
