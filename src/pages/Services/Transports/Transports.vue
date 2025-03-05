<script setup lang="ts">
import Cards from '@/pages/Services/Components/Cards.vue'
import {useRouter} from "vue-router";
import {inject, onMounted, ref} from "vue";

const router = useRouter()

const enterToDetail = (value: number) => {
  router.push(`/transport-view/${value}`)
}

const $auth = inject('auth')
const $api = inject('api')
const advertisementData = ref()

onMounted(async () => {

  // console.log($api.services._fetch('test', {
  //   method: 'put'
  // }))

  // const res = await $api.auth.sendSmsCode({
  //   "phone_number":"998970175492",
  //   "sms_type":"phone",
  //   "type": 1 // 1-Login, 2-Regisrt
  // })
  console.log($auth.loggedIn)
  try {
    const loginResponse = await $auth.login({
      "phone_number": "998990195492",
      "sms_type": "phone", // phone, mail
      "session_token": "64430f938253f55cb6ebecbb46928523",
      "security_code": "5555"
    });
    console.log(loginResponse);

    const response = await $api.advertisement.getAdvertisement({
      transport_id: 7
    });
    advertisementData.value = response?.data;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
})
</script>

<template>
  <div>
    <h1 class="text-[#292D32] text  -[24px] font-500 !mb-[24px]">
      Yengil avtomobillar <span class="text-[#292D3266] font-400">(Kia Sonet)</span>
    </h1>

    <div class="grid xl:grid-cols-6 lg:grid-cols-5 md:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-5">
      <Cards
          v-for="(item, index) in advertisementData"
          :key="index"
          :item="item"
          @click="enterToDetail(item?.id)"
      />
    </div>
  </div>
</template>
