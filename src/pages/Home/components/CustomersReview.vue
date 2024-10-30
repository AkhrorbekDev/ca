<script setup lang="ts">

</script>

<template>
  <div class="bgWay">
    <div class="max-w-screen-xl  container lg:mx-auto !pt-[126px] !pb-[100px]">
      <h1 class="text-[#FFFFFF] text-[40px] !font-600 !mb-[16px] text-center">Mijozlarimiz fikri</h1>
      <p class="text-[#FFFFFF] text-[18px] font-400 !mb-[32px] text-center w-[53%] !m-auto">
        Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod
        dolore magna aliquyam erat, sed diam voluptua.
      </p>

      <div class="grid grid-cols-3">
        <div class="bg-white rounded-[24px] !p-[24px]">
          <p>
            Lorem ipsum dolor sit amet, consetetur sadipscing elitr,
            sed diam nonumy eirmod tempor invidunt ut labore
            dolore magna aliquyam erat.
          </p>

          <div class="flex items-center">
            <img src="@/assets/images/avatar.jpg" alt="">
            <div>
              <b>Ibrohim Nurmatov</b>
              <p>Dasturchi</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.bgWay {
  background-color: white;
  background-image: url("@/assets/images/bgWay.jpg");
  background-size: cover;
  background-position: center center;
  background-repeat: no-repeat;
  //height: 426px;
}
</style>