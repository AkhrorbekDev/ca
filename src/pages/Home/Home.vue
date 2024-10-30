<script setup lang="ts">
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'
import HeroSection from '@/pages/Home/components/HeroSection.vue'
import AboutUsSection from "@/pages/Home/components/AboutUsSection.vue";
import ServiceSection from "./components/ServiceSection.vue";
import TopDrivers from "@/pages/Home/components/TopDrivers.vue";
import CustomersReview from "@/pages/Home/components/CustomersReview.vue";

</script>


<template>
  <div>
    <Header/>
    <HeroSection/>
    <AboutUsSection/>
    <ServiceSection/>
    <TopDrivers/>
    <CustomersReview/>
    <Footer/>
  </div>
</template>


