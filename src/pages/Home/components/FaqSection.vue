<script lang="ts" setup>

import {ref} from "vue";

interface FaqData {
  title: string
  description: string
}

const faqsData: WizardData[] = [

  {
    title: "Carting platformasidan qanday ro’yxatdan o’taman?",
    description: "Platformani o’zida yoki Ilovani yuklab olib, ro‘yxatdan o‘tish orqali siz o‘z profilingizni yaratasiz. Kelgusida ushbu yaratilgan profil orqali siz platforma va undagi xizmatlardan foylanishingiz mukin",

  },

  {
    title: "Carting orqali transport xizmati ko’rsatsam bo’ladimi?",
    description: "Albatta, buning uchun siz Platforma yoki Ilovani yuklab olib, ro‘yxatdan o‘tish orqali siz o‘z profilingizni yaratasiz. Qaysi turdagi transport xizmatini ko’rsatishingiz, uning narxlarini ko’rsatgan holda e’lon yaratasiz. Mijozlar esa o’zlari sizni topishadi va aloqaga chiqishadi.",
  },

  {
    title: "Cartingda buyurtma narxi qanday hisoblanadi?",
    description: " Har bir xizmat bo’yicha narxlar buyurtmachi va xizmat ko’rsatuvchi o’rtasida erkin bozor sharoitida, o’zaro kelishilgan holda belgilanadi. Platforma esa yuk hajmi va manzil masofasidan kelib chiqib taxminiy narx taklif etadi.",
  },

  {
    title: "Baholar va sharhlar qanday beriladi?",
    description: "Yuk yetkazib berilganidan so‘ng, siz haydovchiga va xizmat sifatiga baho berishingiz va sharh qoldirishingiz mumkin. Bu baholar boshqa foydalanuvchilarga yordam beradi va xizmatimizni yanada yaxshilashga hissa qo‘shadi.",
  },

  {
    title: "Baholar va sharhlar qanday beriladi?",
    description: "Albatta, buning uchun siz Platforma yoki Ilovani yuklab olib, ro‘yxatdan o‘tish orqali siz o‘z profilingizni yaratasiz. Qaysi turdagi transport xizmatini ko’rsatishingiz, uning narxlarini ko’rsatgan holda e’lon yaratasiz. Mijozlar esa o’zlari sizni topishadi va aloqaga chiqishadi.",
  },
]

const tabIndex = ref<string | number>(null)


const changeIndex = (index) => {
  console.log(tabIndex.value, index)
  if (tabIndex.value !== index) {
    tabIndex.value = index
  } else {
    tabIndex.value = null
  }

}
</script>


<template>
  <div id="faq" class="bg-white !py-[100px]">
    <div class="max-w-screen-xl  container lg:mx-auto">
      <div class="flex items-start">
        <div class="!mr-[40px]">
          <h4 class="text-[#66C61C] text-[48px] font-semibold !mb-[16px]">FAQ</h4>

          <p class="text-[#292D32] text-[18px] w-[327px]">Ushbu FAQ bo‘limi foydalanuvchilarga
            platformadan samarali foydalanish
            va kerakli ma’lumotlarni tezkor topish
            imkoniyatini beradi.</p>
        </div>

        <div class="w-full">
          <Accordion expandIcon="none" collapseIcon="none">
            <AccordionPanel v-for="(item, index) in faqsData" @click="changeIndex(index)" :value="index"
                            class="!border-0">
              <AccordionHeader>
                <div class="flex items-center grow">
                  <div
                      :class="tabIndex == index ? 'bg-[#66C61C]' : 'bg-[#353C4A]'"
                      class="w-[56px] h-[56px]  rounded-[16px] flex items-center justify-center !mr-[24px]">
                    <i :class="['pi  ', tabIndex == index ? 'pi-minus' : 'pi-plus']"
                       style="font-size: 19px; color: white"></i>
                  </div>

                  <div
                      :class="tabIndex == index ? 'bg-[#66C61C]' : 'bg-[#353C4A]'"
                      class="rounded-[16px] !py-[16px] !px-[24px] w-full flex items-center justify-between">
                    <span
                        class="text-[18px] font-semibold text-white">{{ item.title }}</span>

                    <i :class="['pi  ', tabIndex == index ? 'pi-angle-down' : 'pi-angle-right']
" style="font-size: 19px; color: white"></i>
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


</style>