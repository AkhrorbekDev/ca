<script lang="ts" setup>

interface AdvantagesData {
  title: string
  description: string
}

const advantagesDataData: AdvantagesData[] = [

  {
    title: "Qulaylik va Tezkorlik",
    description: "Barcha transport va logistika xizmatlarini mobil ilova yoki veb-sayt orqali tez va qulay tarzda buyurtma berish.",
  },

  {
    title: "Xizmatlarning Keng Qamrovi",
    description: "Barcha turdagi transport, logistika va omborxona xizmatlarini bir joyda taqdim etadi.",
  },

  {
    title: "Qulay To‘lov Tizimlari",
    description: "Mijozlar uchun naqd, shaxsiy karta yoki pul ko‘chirish orqali to‘lov qilish imkoniyati mavjud.",
  },

  {
    title: "Mijozlarga Munosabat",
    description: "Mijozlar 24\\7 rejimida texnik qo‘llab-quvvatlash xizmati orqali o‘z muammolarini yechishlari mumkin.",
  },
]
</script>


<template>
  <div class="bg-[#FAFAFA] !py-[100px]">
    <div class="max-w-screen-xl  container lg:mx-auto">
      <div class="flex items-center">
        <img src="@/assets/images/advantages-img.png" alt="advantages-img" width="600"
             class="w-[600px] h-[808px] !mr-[39px]">

        <div>
          <p class="font-medium text-[#292D3266] !mb-[24px]">Nima uchun bizni tanlashadi</p>

          <h3 class="text-[#292D32] text-[40px] font-semibold !mb-[24px]">“Carting”ni Tanlash uchun
            Sabablar va uning Afzalliklari</h3>

          <p class="text-[#292D3266] text-[18px] !mb-[24px]">Biz mijozlarga ishonchli va qulay transport xizmatlaridan
            bahramand bo‘lish imkonini yaratamiz!</p>

          <div>
            <div class="flex items-start !mb-[24px]" v-for="(item, index) in advantagesDataData" :key="index">
              <img src="@/assets/images/icons/advantages-icon.svg" alt="advantages-icon.svg" width="48"
                   class="!mr-[16px]">

              <div>
                <h4 class="text-[#000000] text-[20px] font-medium !mb-2">{{ item.title }}</h4>
                <h4 class="text-[#292D3266]">{{ item.description }}</h4>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">


</style>