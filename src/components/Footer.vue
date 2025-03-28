<template>
  <div class="bg-[#FAFAFA] dark:!bg-zinc-700">
    <div class="max-w-screen-xl  container lg:mx-auto ">
      <div class="!pt-[24px] !pb-[16px] flex justify-between dark:!bg-zinc-700">
        <div class="dark:!bg-zinc-700">
          <img class="!mb-[24px]" src="@/assets/logo.svg" alt="logo" width="130">

          <span class="block text-[#292D324D] text-[16px] !mb-[16px]">{{ $t('footerSiteDescription') }}</span>

          <div class="flex items-center gap-3 dark:!bg-zinc-700">
            <img src="/icons/telegram.svg" alt="telegram">
            <img src="/icons/instagram.svg" alt="instagram">
            <img src="/icons/facebook.svg" alt="facebook">
            <img src="/icons/youtube.svg" alt="youtube">
          </div>
        </div>

        <div class="!bg-transparent">
          <h3 class="font-semibold text-[#292D32] text-[16px] !mb-[16px]">{{ $t('home.footer.title') }}</h3>

          <router-link to="#" class="block text-[14px] !mb-[10px] text-[#292D324D]">{{
              $t('home.footer.aboutPlatform')
            }}
          </router-link>
          <router-link to="#" class="block text-[14px] !mb-[10px] text-[#292D324D]">{{
              $t('home.footer.services')
            }}
          </router-link>
          <router-link to="#" class="block text-[14px] !mb-[10px] text-[#292D324D]">{{
              $t('home.footer.advantages')
            }}
          </router-link>
          <router-link to="#" class="block text-[14px] !mb-[10px] text-[#292D324D]">{{
              $t('home.footer.collaboration')
            }}
          </router-link>
          <router-link to="#" class="block text-[14px] !mb-[10px] text-[#292D324D]">{{
              $t('home.footer.contact')
            }}
          </router-link>
          <router-link to="#" class="block text-[14px] text-[#292D324D]">{{ $t('home.footer.ourGoals') }}</router-link>
        </div>

        <div class="!bg-transparent">
          <h3 class="font-semibold text-[#292D32] text-[16px] !mb-[16px]">{{ $t('home.footer.title') }}</h3>

          <router-link to="#" class="block text-[14px] !mb-[10px] text-[#292D324D]">{{
              $t('home.footer.department')
            }}
          </router-link>
          <router-link to="#" class="block text-[14px] !mb-[10px] text-[#292D324D]">{{
              $t('home.footer.modeUse')
            }}
          </router-link>
          <router-link to="#" class="block text-[14px] !mb-[10px] text-[#292D324D]">{{
              $t('home.footer.topDrivers')
            }}
          </router-link>
          <router-link to="#" class="block text-[14px] !mb-[10px] text-[#292D324D]">{{
              $t('home.footer.personalCab')
            }}
          </router-link>
        </div>

        <div class="!bg-transparent">
          <h3 class="font-semibold text-[#292D32] text-[16px] !mb-[16px]">{{ $t('home.footer.location') }}</h3>

          <p class="text-[14px] text-[#292D324D] w-[180px]">
            Toshkent shahri,
            Shayxontohur tumani, Muqumiy ko‘chasi 46-uy
          </p>
        </div>
      </div>

      <span class="block w-full h-[1px] bg-[#292D321A]"></span>

      <div class="flex items-center justify-between !py-[16px] dark:!bg-zinc-700">
        <div class="flex items-center gap-6 !bg-transparent">
          <router-link to="#" class="text-[#292D32] font-medium text-[14px]">© 2024 “Carting”</router-link>
          <router-link to="#" class="text-[#292D324D] font-medium text-[14px]">{{
              $t('home.footer.termOfUse')
            }}
          </router-link>
          <router-link to="#" class="text-[#292D324D] font-medium text-[14px]">{{
              $t('home.footer.privacyPolicy')
            }}
          </router-link>
        </div>

        <a href="https://anysoft.uz/" target="_blank" class="flex items-center gap-4">
          <span class="text-[#292D324D] font-medium text-[14px]">{{ $t('home.footer.developed') }}</span>
          <img src="@/assets/anysoft.svg" alt="anysoft" width="85">
        </a>
      </div>
    </div>
  </div>
</template>
