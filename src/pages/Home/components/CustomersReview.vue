<script setup lang="ts">

</script>

<template>
  <div>
    <div class="bgWay">
      <div class="max-w-screen-xl  container lg:mx-auto !pt-[126px] !pb-[100px] relative dark:!bg-transparent">
        <h1 class="text-[#FFFFFF] text-[40px] !font-600 !mb-[16px] text-center">Mijozlarimiz fikri</h1>
        <p class="text-[#FFFFFF] text-[18px] font-400 !mb-[32px] text-center md:w-[53%] !m-auto">
          Xizmat ko‘rsatish sifatini yaxshilash va mijozlar ehtiyojlarini yanada yaxshiroq tushunish uchun
          bizga har bir mijozning fikri juda muhimdir!
        </p>

        <div
            class="md:absolute md:left-1/2 md:transform md:-translate-x-1/2 md:-translate-y-1/2  md:bottom-[-60%] md:w-full dark:!bg-transparent">
          <div class="grid md:grid-cols-3 sm:grid-cols-1 gap-10 dark:!bg-transparent">
            <div class="bg-[#FAFAFA] dark:!bg-zinc-700 !m-auto w-[392px] rounded-[24px] !p-[24px]"
            >
              <p class="text-[#292D3266] text-[18px]">
                Carting orqali buyurtmalarim har doim vaqtida yetib keladi. Bu juda qulay!

              </p>

              <img src="@/assets/images/star.svg" class="!my-[16px]" alt="star"/>

              <div class="flex items-center dark:!bg-zinc-700">
                <img src="@/assets/images/avatar.jpg" class="h-[64px] rounded-full  w-[64px]" alt="">
                <div class="!ml-[16px] dark:!bg-zinc-700">
                  <b class="text-[#000D24] dark:!text-white text-[18px] !mb-[4px] font-600">Begzod Rafikhov</b>
                  <p class="text-[#A8AAAE] text-[14px]">Haydovchi</p>
                </div>
              </div>
            </div>

            <div class="bg-[#FAFAFA] dark:!bg-zinc-700 !m-auto w-[392px] rounded-[24px] !p-[24px]"
            >
              <p class="text-[#292D3266] text-[18px]">
                Mobil ilova orqali tez va oson buyurtma berish imkoniyati yoqdi. Rahmat!


              </p>

              <img src="@/assets/images/star.svg" class="!my-[16px]" alt="star"/>

              <div class="flex items-center dark:!bg-zinc-700">
                <img src="@/assets/images/dilshod.jpg" class="h-[64px] rounded-full w-[64px]" alt="">
                <div class="!ml-[16px] dark:!bg-zinc-700">
                  <b class="text-[#000D24] dark:!text-white text-[18px] !mb-[4px] font-600">Dilshod Bunyodov</b>
                  <p class="text-[#A8AAAE] text-[14px]">Menejer</p>
                </div>
              </div>
            </div>

            <div class="bg-[#FAFAFA] dark:!bg-zinc-700 !m-auto w-[392px] rounded-[24px] !p-[24px]"
            >
              <p class="text-[#292D3266] text-[18px]">
                Carting xizmatlari boshqa kompaniyalarga nisbatan hamyonbop!
              </p>

              <img src="@/assets/images/star.svg" class="!my-[16px]" alt="star"/>

              <div class="flex items-center dark:!bg-zinc-700">
                <img src="@/assets/images/toir.png" class="h-[64px] w-[64px] rounded-full object-cover" alt="">
                <div class="!ml-[16px] dark:!bg-zinc-700">
                  <b class="text-[#000D24] dark:!text-white text-[18px] !mb-[4px] font-600">Ibrohim Nurmatov</b>
                  <p class="text-[#A8AAAE] text-[14px]">Operator</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="md:!p-[130px] bg-white"></div>
  </div>
</template>

<style lang="scss">
.bgWay {
  background-color: white !important;
  background-image: url("@/assets/images/bgWay.jpg") !important;
  background-size: cover;
  background-position: center center;
  background-repeat: no-repeat;
}
</style>