<script setup lang="ts">
import {computed, inject, onMounted, reactive, ref} from 'vue'
import editIcon from '@/assets/icons/edit.svg';
import type {MaskInputOptions} from 'maska';
import {Field, Form} from 'vee-validate';

const $auth = inject('auth')
const _user = ref({})
const vForm = ref()
const prefix = '998'

const options = reactive<MaskInputOptions>({
  mask: '+998 (##) ###-##-##',
  reversed: true,
  postProcess: (event) => {
    vForm.value.setFieldValue('phone', `${prefix}${event.detail.unmasked}`)
  }
})
const edit = ref({
  user_name: false,
  user_lastname: false,
  phone: false,
  tg_link: false,
  type: false,
  email: false,
})
const user = computed(() => {
  return $auth.user
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
const initialValues = ref({
  agree: false
})
const isLoading = ref(false)

const agreeValue = ref(false)
const updateAgreeValue = (e) => {
  agreeValue.value = e
  vForm.value.setFieldValue('agree', e)
}

const submit = () => {
  vForm.value.validate()
}

onMounted(() => {
  _user.value = $auth.user || {}
  console.log(_user.value, $auth.user, 'user')
})

</script>

<template>
  <div class="!bg-[#FFFFFF] !rounded-[24px] !px-[40px] !py-[40px] min-w-[940px]">
    <h1 class="text-[32px] text-[#292D32] font-bold">
      {{ $t('personalInformation') }}
    </h1>
    <div class="flex items-center gap-[40px]  !my-[32px]">
      <div class=" w-[120px] h-[120px] rounded-full">
        <template v-if="user?.photo">
          <img
              :src="user.photo"
              alt="avatar"
              class="!rounded-full !mb-[8px]"
          />
        </template>
        <template v-else>
          <Avatar
              icon="pi pi-user"
              size="xlarge"
              class="bg-[#F3F3F3] !w-full !h-full text-[#B7B8BA] !mb-[8px]"
              shape="circle"
          />
        </template>

      </div>
      <div class="flex items-center gap-[16px]">
        <label
            class="!bg-[#66C61C] !py-[18px] !px-[24px]
             flex items-center justify-center gap-2 text-white text-[16px]
             rounded-[20px] !mt-auto w-full"
            for="upload_avatar"
        >
          <span>
            {{ $t('uploadAvatar') }}
          </span>
          <input type="file" hidden id="upload_avatar"/>
        </label>
        <label
            class="!bg-[#f3f3f3] !py-[18px] !px-[24px]
             flex items-center justify-center gap-2 text-[#292d32] text-[16px]
             rounded-[20px] !mt-auto w-full"
            for="upload_avatar"
        >
          <span>
            {{ $t('uploadAvatar') }}
          </span>
          <input type="file" hidden id="upload_avatar"/>
        </label>
      </div>
    </div>
    <Form ref="vForm" as="div" v-slot="{errors}" class="grid grid-cols-3 gap-x-[24px] gap-y-[32px]">
      <div class=" w-full flex flex-col items-start gap-[6px] justify-between">
        <label class="!text-[#292D324D]">{{ $t('personal') }}</label>
        <Field
            as="div"
            name="type"
            v-slot="{field}"
            class="flex items-center bg-[#fafafa] justify-between w-full !pr-[16px]"
        >
          <Select
              :loading="isLoading"
              :model-value="user?.type"
              :options="userTypes"
              :disabled="!edit.type"
              :readonly="!edit.type"
              optionLabel="name"
              optionValue="value"
              :placeholder="$t('select')"
              class="w-full userTypes !border-0
              !bg-transparent
              custom-placeholder-select h-[56px] flex items-center"
          >

            <template #option="slotProps">
              <div

                  class="flex items-center min-w-[60px] w-full justify-between !py-4 border-b border-[#F5F5F7]"
              >
                <div class="w-full flex flex-col items-start justify-start">
                  <label
                      :for="`name.${slotProps.option.value}`"
                      class="flex items-center gap-4 cursor-pointer"
                  >
                    {{ slotProps.option.name }}
                  </label>
                </div>
                <RadioButton
                    :model-value="user?.type"
                    :inputId="`name.${slotProps.option.value}`"
                    :name="field.name"
                    :value="slotProps.option.value"
                />

              </div>
            </template>
          </Select>
          <div @click="() => edit.type = !edit.type">
            <img :src="editIcon" alt="">
          </div>
        </Field>

      </div>
      <div class=" w-full flex flex-col items-start gap-[6px] justify-between">
        <label class="!text-[#292D324D]">{{ $t('firstName') }}</label>
        <div class="flex items-center bg-[#fafafa] justify-between w-full !pr-[16px]">
          <InputText
              id="in_label"
              :model-value="_user.first_name"
              :disabled="!edit.user_name"
              :readonly="!edit.user_name"
              variant="outline"
              autocomplete="off"
              :placeholder="$t('pickAddress')"
              class=" !bg-transparent  !py-[16px] !px-[16px]
                     shadow-none !border-0"
          />
          <!--          <div @click="() => edit.user_name = !edit.user_name">-->
          <!--            <img :src="editIcon" alt="">-->
          <!--          </div>-->
        </div>

      </div>
      <div class=" w-full flex flex-col items-start gap-[6px] justify-between">
        <label class="!text-[#292D324D]">{{ $t('lastName') }}</label>
        <div class="flex items-center bg-[#fafafa] justify-between w-full !pr-[16px]">
          <InputText
              id="in_label"
              :model-value="_user.last_name"
              :disabled="!edit.user_lastname"
              :readonly="!edit.user_lastname"
              variant="outline"
              autocomplete="off"
              :placeholder="$t('pickAddress')"
              class=" !bg-transparent  !py-[16px] !px-[16px]
                     shadow-none !border-0"
          />
          <!--          <div @click="() => edit.user = !edit.user">-->
          <!--            <img :src="editIcon" alt="">-->
          <!--          </div>-->
        </div>

      </div>
      <div class=" w-full flex flex-col items-start gap-[6px]  justify-between">
        <label class="!text-[#292D324D]">{{ $t('phoneNumber') }}</label>
        <div class="flex items-center bg-[#fafafa] justify-between w-full !pr-[16px]">
          <input
              id="phone"
              v-maska
              :data-maska="options.mask"
              @maska="options.postProcess"
              placeholder="+998"
              :disabled="!edit.phone"
              :readonly="!edit.phone"
              :value="user?.phone_number"
              class="!bg-[#FAFAFA] border-0 border-[#FAFAFA] !p-[16px] outline-none rounded-[20px]"
              :class="{
                  _invalid: errors.phone
                }"
          />
          <div @click="() => edit.user = !edit.user">
            <img :src="editIcon" alt="">
          </div>
        </div>

      </div>
      <div class=" w-full flex flex-col items-start gap-[6px] justify-between">
        <label class="!text-[#292D324D]">{{ $t('telegram') }}</label>
        <div class="flex items-center bg-[#fafafa] justify-between w-full !pr-[16px]">
          <InputText
              id="in_label"
              :model-value="user?.tg_link"
              :disabled="!edit.tg_link"
              :readonly="!edit.tg_link"
              variant="outline"
              autocomplete="off"
              :placeholder="$t('https://t.me/username')"
              class=" !bg-transparent  !py-[16px] !px-[16px]
                     shadow-none !border-0"
          />
          <!--          <div @click="() => edit.user = !edit.user">-->
          <!--            <img :src="editIcon" alt="">-->
          <!--          </div>-->
        </div>

      </div>
      <div class=" w-full flex flex-col items-start gap-[6px] justify-between">
        <label class="!text-[#292D324D]">{{ $t('email') }}</label>
        <div class="flex items-center bg-[#fafafa] justify-between w-full !pr-[16px]">
          <InputText
              id="in_label"
              :model-value="user?.mail"
              :disabled="!edit.email"
              :readonly="!edit.email"
              variant="outline"
              autocomplete="off"
              class=" !bg-transparent  !py-[16px] !px-[16px]
                     shadow-none !border-0"
          />
          <!--          <div @click="() => edit.user = !edit.user">-->
          <!--            <img :src="editIcon" alt="">-->
          <!--          </div>-->
        </div>

      </div>
      <div class=" w-full flex flex-col items-start gap-[6px] justify-between">
        <label class="!text-[#292D324D]">{{ $t('referalCode') }}</label>
        <div class="flex items-center bg-[#fafafa] justify-between w-full !pr-[16px]">
          <InputText
              id="in_label"
              :model-value="user?.referred_by"
              :disabled="true"
              :readonly="true"
              variant="outline"
              autocomplete="off"
              class=" !bg-transparent  !py-[16px] !px-[16px]
                     shadow-none !border-0"
          />
          <!--          <div @click="() => edit.user = !edit.user">-->
          <!--            <img :src="editIcon" alt="">-->
          <!--          </div>-->
        </div>

      </div>
      <div class="flex w-full col-span-full items-center justify-between gap-[16px]">
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
        <button
            @click="submit"
            type="button"
            class="!bg-[#66C61C] !py-[18px] !px-[24px] w-max min-w-[100px] flex items-center justify-center
            gap-2 text-white text-[16px] rounded-[20px] !mt-[16px]"
        >

          {{ $t('save') }}
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
      </div>
    </Form>
  </div>
</template>

<style lang="scss">
.userTypes.p-select.p-disabled {

  .p-select-dropdown {
    display: none !important;
  }
}
</style>
