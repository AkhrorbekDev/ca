<script lang="ts" setup>

interface WizardData {
  title: string
  description: string
}

const wizardData: WizardData[] = [

  {
    title: "Ro‘yxatdan\n" +
        "O‘ting",
    description: "Platformada yoki mobil ilova orqali ro‘yxatdan o‘ting",
  },

  {
    title: "Xizmatni Tanlang",
    description: "O‘zingizga kerakli xizmat turini\n" +
        "tanlang",
  },

  {
    title: "E’lon Joylashtiring",
    description: "Xizmatdan foydalanish bo‘yicha e’lon yarating",
  },

  {
    title: "Xizmatdan Foydalaning",
    description: "To‘lov qiling\n" +
        "va xizmatdan foydalaning",
  },
]

</script>


<template>
  <div class="bg-white">
    <h3 class="text-[#292D32] text-[64px] font-semibold text-center !mb-[40px]">Foydalanish tartibi</h3>

    <div class="max-w-screen-xl  container lg:mx-auto">
      <div class="!pt-[72px] !pb-[100px] flex items-center">
        <div
            class="relative wizard-wrapper w-[229px] h-[230px] !pt-[48px] !pb-[24px] !px-[32px] rounded-[24px]"
            v-for="(item, index) in wizardData"
            :key="index">
          <h4 class="text-[#292D32] text-[24px] font-semibold text-center !mb-[16px]">{{ item.title }}</h4>

          <span class="block text-[#292D3266] text-center">{{ item.description }}</span>

          <img class="absolute top-[-30px] left-[50%] translate-x-[-50%]" src="@/assets/images/icons/success-tab.svg"
               alt="success-tab">

          <img v-if="wizardData.length - 1 !== index" class="absolute top-[35%] left-[110%]"
               src="@/assets/images/icons/arrrow-tab.svg"
               alt="arrrow-tab">
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">

.wizard-wrapper {
  margin-right: 108px;
  background-color: #FAFAFA;
  background-image: url("@/assets/images/wizard-back.png");
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center center;

  &:last-child {
    margin-right: 0;
  }
}


</style>