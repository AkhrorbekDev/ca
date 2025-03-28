<script lang="ts" setup>
import {useI18n} from 'vue-i18n';
import {ref} from 'vue';

interface FaqData {
  title: string
  description: string
}

const {t} = useI18n()
const faqsData: WizardData[] = [

  {
    title: t('faq_how_it_works_title'),
    description: t('faq_how_it_works_desc'),
  },
  {
    title: t('faq_login_title'),
    description: t('faq_login_desc'),

  },


  {
    title: t('faq_payment_methods_title'),
    description: t('faq_payment_methods_desc'),
  },

  {
    title: t('faq_pricing_title'),
    description: t('faq_pricing_desc'),
  },

  {
    title: t('faq_referral_title'),
    description: t('faq_referral_desc'),
  },
]

const tabIndex = ref<string | number>(null)


const changeIndex = (index) => {
  if (tabIndex.value !== index) {
    tabIndex.value = index
  } else {
    tabIndex.value = null
  }

}
</script>


<template>
  <div id="faq" class="bg-white  !py-[100px]">
    <div class="max-w-screen-xl  container lg:mx-auto">
      <div class="flex items-start">
        <div class="!mr-[40px]">
          <h4 class="text-[#66C61C] text-[48px] font-semibold !mb-[16px]">FAQ</h4>

          <p class="text-[#292D32] text-[18px] w-[327px]">
            {{ $t('home.faqDescription') }}
          </p>
        </div>

        <div class="w-full dark:!bg-[#1a1a1a] ">
          <Accordion class="dark:!bg-[#1a1a1a]" expandIcon="none" collapseIcon="none">
            <AccordionPanel
                v-for="(item, index) in faqsData"
                @click="changeIndex(index)"
                :value="index"
                class="!border-0 dark:!bg-zinc-600"
            >
              <AccordionHeader>
                <div class="flex items-center grow dark:!bg-[#1a1a1a]">
                  <div
                      :class="tabIndex == index ? '!bg-[#66C61C]' : '!bg-[#353C4A]'"
                      class="w-[56px] h-[56px]  rounded-[16px] flex items-center justify-center !mr-[24px]"
                  >
                    <i
                        :class="['pi  ', tabIndex == index ? 'pi-minus' : 'pi-plus']"
                        style="font-size: 19px; color: white"
                    ></i>
                  </div>

                  <div
                      :class="tabIndex == index ? '!bg-[#66C61C]' : '!bg-[#353C4A]'"
                      class="rounded-[16px] !py-[16px] !px-[24px] w-full flex items-center justify-between"
                  >
                    <span
                        class="text-[18px] font-semibold text-white"
                    >{{ item.title }}</span>

                    <i
                        :class="['pi  ', tabIndex == index ? 'pi-angle-down' : 'pi-angle-right']
"
                        style="font-size: 19px; color: white"
                    ></i>
                  </div>
                </div>
              </AccordionHeader>
              <AccordionContent>
                <p class="text-[#292D32] !ml-[80px]">
                  {{ item.description }}

                </p>
              </AccordionContent>
            </AccordionPanel>
          </Accordion>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.dark .p-accordion .p-accordionheader {
  background-color: #1a1a1a !important;
}

</style>
