<script setup lang="ts">
import {computed, inject, reactive, ref, watch} from 'vue'
import editIcon from '@/assets/icons/edit.svg';
import type {MaskInputOptions} from 'maska';
import {Field, Form} from 'vee-validate';
import {useI18n} from 'vue-i18n';
import {imageCDN} from '@/config'
import EditPhoneModal from '@/pages/Profile/components/EditPhoneModal.vue';
import {useToast} from 'primevue/usetoast';
import * as yup from 'yup';

const {t} = useI18n()
const $auth = inject('auth')
const $api = inject('api')
const _user = ref({})
const vForm = ref()
const prefix = '998'

const schema = yup.object({
  first_name: yup.string().required(),
  last_name: yup.string().required(),
  phone_number: yup.string().required(),
  tg_link: yup.string().required(),
  type: yup.string().required(),
  email: yup.string().email().required(),
  // agree: yup.boolean().required().oneOf([true], t('agreeToTerms')),
})

const options = reactive<MaskInputOptions>({
  mask: '+998 (##) ###-##-##',
  reversed: true,
  postProcess: (event) => {
    vForm.value.setFieldValue('phone_number', `${prefix}${event.detail.unmasked}`)
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
  return $auth.user || null
})

watch(user, (newVal) => {
  console.log(newVal)
  if (newVal) {

    _user.value = {...newVal}
    vForm.value?.setFieldValue('first_name', newVal.first_name)
    // vForm.value?.setValues({...newVal})
  }
}, {
  immediate: true
})


const userTypes = ref([
  {
    name: t('legalEntity'),
    value: ' CLIENT'
  },
  {
    name: t('individual'),
    value: 'PHYSICAL'
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
const avatarUpload = ref(false)
const avatarDelete = ref(false)
const submitForm = ref(false)

const _showEditModal = ref(false)
const showEditModal = () => {
  _showEditModal.value = true
}
const toast = useToast()
const savePhone = (phone) => {
  _showEditModal.value = false
  _user.value.phone_number = phone
  return;
  $api.user.updateUserProfile({
    ...user.value,
    phone_number: phone,
  }).then(() => {

    toast.add({
      severity: 'success',
      summary: t('phoneNumberChanged'),
      life: 2000,
      group: 'br'
    })
  }).catch(err => {
    toast.add({
      severity: 'error',
      summary: err.message,
      life: 2000,
      group: 'br'
    })
  })
}

const submit = () => {
  vForm.value.validate().then((res) => {
    if (res.valid) {
      const values = vForm.value.values
      delete values.agree
      delete values.phone_number
      submitForm.value = true
      $api.user.updateUserProfile(values)
          .then(res => {
            toast.add({
              severity: 'success',
              summary: t('profileUpdated'),
              life: 2000,
              group: 'br'
            })
          }).catch(err => {
        toast.add({
          severity: 'error',
          summary: err.message,
          life: 2000,
          group: 'br'
        })
      }).finally(() => {
        submitForm.value = false
      })
    }
  })
}
const handleFileUpload = (event) => {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      const base64 = e.target.result as string;
      avatarUpload.value = true
      $api.user.updateUserProfile({
        ...user.value,
        base64: base64.split(',')[1],
      }).then(() => {
        toast.add({
          severity: 'success',
          summary: t('avatarUpdated'),
          life: 2000,
          group: 'br'
        })
      }).catch(err => {
        toast.add({
          severity: 'error',
          summary: err.message,
          life: 2000,
          group: 'br'
        })
      }).finally(() => {
        avatarUpload.value = false
      })
    };
    reader.readAsDataURL(file);
  }
};

const deleteAvatar = () => {
  avatarDelete.value = true
  $api.user.updateUserProfile({
    ...user.value,
    base64: '',
  })
      .then(() => {
        toast.add({
          severity: 'success',
          summary: t('avatarDeleted'),
          life: 2000,
          group: 'br'
        })
      }).catch(err => {
    toast.add({
      severity: 'error',
      summary: err.message,
      life: 2000,
      group: 'br'
    })
  }).finally(() => {
    avatarDelete.value = false
  })
}

</script>

<template>
  <div class="!bg-[#FFFFFF] !rounded-[24px] !px-[40px] !py-[40px] min-w-[940px]">

    <h1 class="text-[32px] text-[#292D32] font-bold">
      {{ $t('personalInformation') }}
    </h1>
    <div class="flex items-center gap-[40px]  !my-[32px]">
      <div class=" w-[120px] h-[120px] rounded-full">
        <template v-if="_user?.photo">
          <img
              :src="`${imageCDN}/${user.photo}`"
              alt="avatar"
              class="!rounded-full !mb-[8px]"
          />
        </template>
        <template v-else>
          <Avatar
              icon="pi pi-user"
              size="xlarge"
              class="bg-[#F3F3F3]  !w-full !h-full text-[#B7B8BA] !mb-[8px]"
              shape="circle"
          />
        </template>

      </div>
      <div class="flex items-center w-max gap-[16px]">
        <label
            class="!bg-[#66C61C] !py-[18px] !px-[24px]
             flex items-center justify-center gap-2 text-white text-[16px]
             rounded-[20px] whitespace-nowrap !mt-auto w-full cursor-pointer"
            for="upload_avatar"
        >
          <span>
            {{ $t('uploadAvatar') }}
          </span>
          <svg
              v-if="avatarUpload"
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
          <input
              type="file"
              accept="image/jpeg, image/jpg, image/png"
              @change="handleFileUpload"
              hidden
              id="upload_avatar"
          />
        </label>
        <label
            class="!bg-[#f3f3f3] !py-[18px] !px-[24px]
             flex items-center justify-center gap-2 text-[#292d32] text-[16px]
             rounded-[20px] !mt-auto w-full cursor-pointer whitespace-nowrap"
            @click="deleteAvatar"
        >
          <span>
            {{ $t('deleteAvatar') }}
          </span>
          <svg
              v-if="deleteAvatar"
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
        </label>
      </div>
    </div>
    <Form
        ref="vForm"
        as="div"
        v-slot="{errors}"
        :validation-schema="schema"
        class="grid grid-cols-3 gap-x-[24px] gap-y-[32px]"
    >
      <div class=" w-full flex flex-col items-start gap-[6px] justify-between">
        <label class="!text-[#292D324D]">{{ $t('personal') }}</label>
        <Field
            as="div"
            name="type"
            v-slot="{field}"
            :model-value="_user.type"
            :class="{
                _invalid: errors.type
            }"
            class="flex items-center border-[1px] border-[#FAFAFA] bg-[#fafafa] justify-between w-full !pr-[16px]"
        >
          <Select
              :loading="isLoading"
              v-model="_user.type"
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
                    :model-value="_user?.type"
                    :inputId="`name.${slotProps.option.value}`"
                    :name="field.name"
                    :value="slotProps.option.value"
                />

              </div>
            </template>
          </Select>
          <div class="cursor-pointer" @click="() => edit.type = !edit.type">
            <img :src="editIcon" alt="">
          </div>
        </Field>

      </div>
      <div class=" w-full flex flex-col items-start gap-[6px] justify-between">
        <label class="!text-[#292D324D]">{{ $t('firstName') }}</label>
        <Field
            name="first_name"
            as="div"
            v-model="_user.first_name"
            :class="{_invalid: errors.first_name}"
            class="flex items-center border-[1px] border-[#FAFAFA] bg-[#fafafa] justify-between w-full !pr-[16px]"
        >
          <InputText
              id="in_label"
              v-model="_user.first_name"
              variant="outline"
              autocomplete="off"
              :placeholder="$t('firstName')"
              class=" !bg-transparent  !py-[16px] !px-[16px]
                     shadow-none !border-0"
          />
          <!--          <div @click="() => edit.user_name = !edit.user_name">-->
          <!--            <img :src="editIcon" alt="">-->
          <!--          </div>-->
        </Field>

      </div>
      <div class=" w-full flex flex-col items-start gap-[6px] justify-between">
        <label class="!text-[#292D324D]">{{ $t('lastName') }}</label>
        <Field
            as="div"
            name="last_name"
            :model-value="_user.last_name"
            :class="{ _invalid: errors.last_name}"
            class="flex items-center border-[1px] border-[#FAFAFA] bg-[#fafafa] justify-between w-full !pr-[16px]"
        >
          <InputText
              id="in_label"
              :model-value="_user.last_name"
              variant="outline"
              autocomplete="off"
              :placeholder="$t('lastName')"
              :class="{
                  _invalid: errors.lastName
                }"
              class=" !bg-transparent  !py-[16px] !px-[16px]
                     shadow-none !border-0"
          />
          <!--          <div @click="() => edit.user = !edit.user">-->
          <!--            <img :src="editIcon" alt="">-->
          <!--          </div>-->
        </Field>

      </div>
      <div class=" w-full flex flex-col items-start gap-[6px]  justify-between">
        <label class="!text-[#292D324D]">{{ $t('phoneNumber') }}</label>
        <Field
            as="div"
            name="phone_number"
            :model-value="_user?.phone_number"
            :class="{ _invalid: errors.phone_number}"
            class="flex items-center border-[1px] border-[#FAFAFA] bg-[#fafafa] justify-between w-full !pr-[16px]"
        >
          <input
              id="phone"
              v-maska
              :data-maska="options.mask"
              placeholder="+998"
              :disabled="!edit.phone"
              :value="_user?.phone_number"
              class="!bg-[#FAFAFA] !border-0 !p-[16px] outline-none rounded-[20px]"
          />
          <div class="cursor-pointer" @click="showEditModal">
            <img :src="editIcon" alt="">
          </div>
        </Field>

      </div>
      <div class=" w-full flex flex-col items-start gap-[6px] justify-between">
        <label class="!text-[#292D324D]">{{ $t('telegram') }}</label>
        <Field
            as="div"
            name="tg_link"
            :model-value="_user?.tg_link"
            :class="{_invalid: errors.tg_link}"
            class="flex items-center bg-[#fafafa] justify-between w-full !pr-[16px]"
        >
          <InputText
              id="in_label"
              :model-value="_user?.tg_link"
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
        </Field>

      </div>
      <div class=" w-full flex flex-col items-start gap-[6px] justify-between">
        <label class="!text-[#292D324D]">{{ $t('email') }}</label>
        <Field
            as="div"
            name="email"
            :model-value="_user?.mail"
            :class="{_invalid: errors.email}"
            class="flex items-center bg-[#fafafa] justify-between w-full !pr-[16px]"
        >
          <InputText
              id="in_label"
              :model-value="_user?.mail"
              :disabled="!edit.email"
              variant="outline"
              autocomplete="off"
              class=" !bg-transparent  !py-[16px] !px-[16px]
                     shadow-none !border-0"
          />
          <div class="cursor-pointer" @click="() => edit.email = !edit.email">
            <img :src="editIcon" alt="">
          </div>
        </Field>

      </div>
      <div class=" w-full flex flex-col items-start gap-[6px] justify-between">
        <label class="!text-[#292D324D]">{{ $t('referalCode') }}</label>
        <div
            class="flex items-center bg-[#fafafa] justify-between w-full !pr-[16px]"
        >
          <InputText
              id="in_label"
              :model-value="_user?.referred_by"
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
          <!--          <Checkbox-->
          <!--              :class="{-->
          <!--                          _invalid: !agreeValue-->
          <!--                        }"-->
          <!--              :invalid="!agreeValue"-->
          <!--              v-model="initialValues.agree"-->
          <!--              inputId="agree"-->
          <!--              binary-->
          <!--              name="agree"-->
          <!--              @update:model-value="updateAgreeValue"-->
          <!--          />-->
          <!--          <label for="agree" class="!ml-[8px] text-[14px]">-->
          <!--            <span class="text-[#218BFF]">Foydalanish shartlari</span>-->
          <!--            <span class="text-[#292D324D]">ga roziman</span>-->
          <!--          </label>-->
        </div>
        <button
            @click="submit"
            type="button"
            class="!bg-[#66C61C] !py-[18px] !px-[24px] w-max min-w-[100px] flex items-center justify-center
            gap-2 text-white text-[16px] rounded-[20px] !mt-[16px]"
        >

          {{ $t('save') }}
          <svg
              v-if="submitForm"
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

      <EditPhoneModal
          v-if="_showEditModal"
          :visible="_showEditModal"
          @save:phone="savePhone"
          @update:visible="_showEditModal = $event"
      />
    </Form>
  </div>
</template>

<style lang="scss">
.userTypes.p-select.p-disabled {

  .p-select-dropdown {
    display: none !important;
  }
}

._invalid {
  border-color: #EA5455;

  .p-inputtext {
    border-color: #EA5455;

  }
}
</style>
