<script setup lang="ts">

</script>

<template>
  <div class="bg-[#FAFAFA]">
    <div class="!p-[24px]">
      <div class="bg-[#FFFFFF] rounded-[100px] flex1 !shadow-header !py-[12px] !px-[32px]">
        <router-link to="/">
          <img class="!mr-[45px]" src="@/assets/logo.svg" alt="logo" width="130"/>
        </router-link>

        <div class="bg-[#1A1F23] !px-[5px] !py-[4px] flex1 rounded-[50px] hidden !md:block !lg:block">
          <div class="flex1 text">
            <span>Xizmatlar</span>
            <svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M17.75 9.5L12.75 14.5L7.75 9.5" stroke="white" stroke-width="1.5" stroke-linecap="round"
                    stroke-linejoin="round"/>
            </svg>
          </div>

          <div class="!ml-[32px] text">E’lonlar</div>

          <div class="flex1 !ml-[32px] text relative">
            <span>Transport e'lonlari</span>
            <svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M17.75 9.5L12.75 14.5L7.75 9.5" stroke="white" stroke-width="1.5" stroke-linecap="round"
                    stroke-linejoin="round"/>
            </svg>

            <div class="mega-drop-menu">

            </div>
          </div>
        </div>

        <div class="flex items-center">
          <h4 class="text-[#292D3266] text-[18px] !mr-[18px]">Asror</h4>
          <img src="@/assets/images/avatar.jpg" alt="avatar" height="40" width="40"/>
        </div>
      </div>
    </div>


    <p>
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Assumenda eos est impedit mollitia possimus provident
      temporibus voluptate. Dignissimos doloremque dolorum facere facilis neque ullam ut veritatis. Doloribus inventore
      sed soluta.
    </p>
  </div>
</template>

<style lang="scss">
.flex1 {
  @apply flex items-center justify-between
}

.text {
  @apply text-[#FFFFFF] text-[18px] font-medium cursor-pointer !py-[11px] !px-[16px] rounded-[50px];

  svg {
    transition: all .5s;
  }
}

.text:hover {
  background-color: #fff;
  transition: all .5s;
  color: #292D32;

  svg {
    transform: rotate(180deg);
  }

  svg path {
    stroke: #2d2b32 !important;
  }
}
</style>