<script setup lang="ts">
import {computed, inject, onMounted, ref, watch} from 'vue';
import {Field, Form} from 'vee-validate';
import {object, string} from 'yup'
import {useToast} from 'primevue/usetoast';
import {useI18n} from 'vue-i18n';

const {t} = useI18n();
const schema = object({
  note: string().max(250).min(1).required()
})
const activeTab = ref('invite');
const $api = inject('api');
const $auth = inject('auth')
const referralCodes = ref([]);
const referrals = ref([]);

const maxDescLength = 250;
const description = ref('');
const visible = ref(false);
const createForm = ref()
const toast = useToast();

const cancelCreate = () => {
  createForm.value.resetForm();
  visible.value = false;
  description.value = '';
}
const submit = () => {
  createForm.value.validate()
      .then(res => {
        if (res.valid) {
          $api.user.createReferralCode({note: description.value})
              .then(res => {
                toast.add({
                  severity: 'success',
                  life: 2000,
                  detail: t('createSuccess'),
                  group: 'br'
                })
                referralCodes.value.push({
                  id: res.data.id,
                  note: description.value
                });
                cancelCreate();
              }).catch(err => {
            toast.add({
              severity: 'error',
              life: 2000,
              detail: err.message,
              group: 'br',
            })
          })
        }
      })
}


const user = computed(() => $auth.user);
watch(user, (newVal) => {

})

onMounted(() => {
  $api.user.getMe().then(res => {
    referralCodes.value = res.data.referral_codes;
    referrals.value = res.data.referral_users;
  })
});
</script>

<template>
  <div class="!bg-[#FFFFFF] !rounded-[24px] !px-[40px] !py-[40px] min-w-[940px]">
    <h1 class="text-[32px] text-[#292D32] font-bold">
      {{ $t('referral') }}
    </h1>
    <div class="flex items-center justify-between">
      <div class="btn-shadow flex items-center !p-[4px] rounded-[16px] bg-[#FFFFFF]">
        <button
            class="bg-transparent min-w-[115px] !py-[18px] !px-[24px] w-max flex items-center justify-center
            gap-2 !text-[#1A1F23] text-[16px] rounded-[20px] !mt-[16px]"
            :class="{'!bg-[#1A1F23] !text-white': activeTab === 'invite'}"
            @click="activeTab = 'invite'"
        >
          {{ $t('invite') }}
        </button>
        <button
            class="bg-transparent min-w-[115px] !py-[18px] !px-[24px] w-max flex items-center justify-center
            gap-2 !text-[#1A1F23] text-[16px] rounded-[20px] !mt-[16px]"
            :class="{'!bg-[#1A1F23] !text-white': activeTab === 'statistics'}"
            @click="activeTab = 'statistics'"
        >
          {{ $t('statistics') }}
        </button>
      </div>
      <div class="flex items-center gap-[24px]">
        <button
            class="!bg-[#66C61C] !py-[18px] !px-[24px] w-max min-w-[100px] flex items-center justify-center
            gap-2 text-white text-[16px] rounded-[20px] !mt-[16px]"
        >
          <img src="" alt="">
          {{ $t('edit') }}
        </button>
        <button
            class="!bg-[#66C61C] !py-[18px] !px-[24px] w-max min-w-[100px] flex items-center justify-center
            gap-2 text-white text-[16px] rounded-[20px] !mt-[16px]"
            @click="visible = true"
        >
          <img src="" alt="">
          {{ $t('add') }}
        </button>
      </div>
    </div>
    <div class="grid grid-cols-2 gap-[32px] !mt-[40px]">
      <template v-for="(item, index) in referralCodes" :key="item.id">
        <div
            class="!bg-[#fafafa] !rounded-[24px] !px-[16px] !py-[24px] flex flex-col"
        >
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-[8px]">
              <div class="rounded-[8px] flex items-center justify-center bg-[#f3f3f3] !py-[8px] !px-[16px]">
                <span>
                  {{ index + 1 }}
                </span>
              </div>
              <div
                  class="min-w-[255px] flex items-center justify-between gap-[8px] rounded-[8px] bg-[#f3f3f3] !py-[8px] !px-[16px]"
              >
                <span class="text-[#292D32] text-[12px]">
                  {{ item.code }}
                </span>
                <button class="bg-transparent border-0">
                  <img src="@/assets/icons/copy.svg" class="w-[24px] h-[24px]" alt="">
                </button>
              </div>

            </div>
            <button class="flex items-center justify-center bg-transparent border-0">
              <img src="@/assets/icons/share.svg" class="w-[24px] h-[24px]" alt="">
            </button>
          </div>
          <div class="flex flex-col gap-[16px] !mt-[24px]">
            <div class="flex items-center justify-between !mb-[6px]">
            <span>
              {{ $t('description') }}
            </span>
              <span>
              {{ item.note.length }}/{{ maxDescLength }}
            </span>
            </div>
            <Textarea :model-value="item.note" readonly rows="5" cols="30"/>
          </div>

        </div>

      </template>
    </div>
    <div class="mt-[32px]">

    </div>
    <Dialog
        v-model:visible="visible"
        :showHeader="false"
        modal
        class="w-[600px] !rounded-[24px] text-center !pt-[24px] !pb-[4px] !px-[4px]"
    >
      <h4 class="text-[#292D32] text-[24px] font-[500] !mb-[26px]">
        {{ $t('createCode') }}
      </h4>
      <Form
          ref="createForm"
          :validation-schema="schema"
          v-slot="{errors}"
          class="flex flex-col gap-[6px] !mb-[24px]"
      >
        <div class="flex items-center justify-between">
            <span class="text-[#292D324D] text-[10px]">
              {{ $t('description') }}
            </span>
          <span class="text-[#292D324D] text-[10px]">
              {{ description.length }}/{{ maxDescLength }}
            </span>
        </div>
        <Field
            v-model="description"
            name="note"
        >
          <Textarea
              v-model="description"
              rows="5"
              cols="30"
              name="note"
              :class="{'!border-[#EA5455]': errors.note}"
          />
        </Field>
      </Form>
      <div class="flex items-center justify-end gap-[24px]">
        <button
            class="!bg-[#f3f3f3] !py-[18px] !px-[24px] w-max min-w-[100px] flex items-center justify-center
            gap-2 text-[#292d32] text-[16px] rounded-[20px]"
            @click="cancelCreate"
        >
          {{ $t('edit') }}
        </button>
        <button
            class="!bg-[#66C61C] !py-[18px] !px-[24px] w-max min-w-[100px] flex items-center justify-center
            gap-2 text-white text-[16px] rounded-[20px]"
            @click="submit"
        >
          {{ $t('add') }}
        </button>
      </div>

    </Dialog>
  </div>

</template>

<style scoped lang="scss">
.btn-shadow {
  box-shadow: 0px 2px 8.4px 0px #292D3214;
}
</style>
