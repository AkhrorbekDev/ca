<script setup lang="ts">
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'
import HeroSection from '@/pages/Home/components/HeroSection.vue'
import AboutUsSection from "@/pages/Home/components/AboutUsSection.vue";
import ServiceSection from "./components/ServiceSection.vue";
import TopDrivers from "@/pages/Home/components/TopDrivers.vue";
import DownloadApps from "@/pages/Home/components/DownloadApps.vue";

import InfoWizard from "@/pages/Home/components/InfoWizard.vue";
import AdvantagesSection from "@/pages/Home/components/AdvantagesSection.vue";
import CustomersReview from "@/pages/Home/components/CustomersReview.vue";
import FaqSection from "@/pages/Home/components/FaqSection.vue";

</script>


<template>
  <div>
    <Header/>

    <HeroSection/>
    <AboutUsSection/>
    <ServiceSection/>
    <TopDrivers/>

    <InfoWizard/>
    <AdvantagesSection/>
    <FaqSection/>
     <DownloadApps/>
    <CustomersReview/>

    <Footer/>
  </div>
</template>


