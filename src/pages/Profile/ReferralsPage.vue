<script setup>
import { ref, onMounted, watch } from 'vue';

const selectedTheme = ref('mode');

// Save theme preference to localStorage
const saveThemeToLocalStorage = (theme) => {
  localStorage.setItem('theme-preference', theme);
};

// Get theme preference from localStorage
const getThemeFromLocalStorage = () => {
  return localStorage.getItem('theme-preference');
};

// Apply theme classes based on the selected theme
const applyThemeClass = (theme) => {
  // Remove existing theme classes
  document.documentElement.classList.remove('theme-mode', 'theme-light', 'theme-dark');

  // Apply new theme class
  document.documentElement.classList.add(`theme-${theme}`);

  // Handle dark mode
  if (theme === 'dark') {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }

  // Save to localStorage
  saveThemeToLocalStorage(theme);
};

// Load theme preference from localStorage on mount
onMounted(() => {
  const savedTheme = getThemeFromLocalStorage();
  if (savedTheme && ['mode', 'light', 'dark'].includes(savedTheme)) {
    selectedTheme.value = savedTheme;
    applyThemeClass(savedTheme);
  } else {
    // If no theme exists in localStorage, initialize with the default theme
    applyThemeClass(selectedTheme.value);
  }
});

const selectTheme = (theme) => {
  selectedTheme.value = theme;
};

// Watch for theme changes to update the UI immediately
watch(selectedTheme, (newTheme) => {
  // Apply theme immediately when radio button is changed
  applyThemeClass(newTheme);
});
</script>

<template>
  <div class="flex flex-col !p-10 bg-white dark:bg-zinc-800 rounded-3xl h-[70vh]">
    <h2 class="text-3xl font-semibold mb-8">{{$t('mode')}}</h2>

    <div class="grid grid-cols-1 md:grid-cols-3 !gap-8 w-full !mt-8 dark:bg-transparent">
      <!-- Tizim sozlamalari Theme Option -->
      <div class="theme-option dark:bg-transparent">
        <label
            :class="['theme-card !mb-4', selectedTheme === 'mode' ? 'border-green-500' : 'border-gray-300']"
            @click="selectTheme('mode')"
        >
          <div class="absolute !-bottom-5 rounded-xl">
            <img src="/icons/auto.svg" alt="auto" class="mode-preview" />
          </div>
          <div v-if="selectedTheme === 'mode'" class="flex items-end h-full">
            <RadioButton v-model="selectedTheme" inputId="mode" name="theme" value="mode" />
          </div>
        </label>

        <span class="font-medium text-lg">{{$t('system_settings')}}</span>
      </div>

      <!-- Yorug Theme Option -->
      <div class="theme-option dark:bg-transparent">
        <label
            :class="['theme-card !mb-4', selectedTheme === 'light' ? 'border-green-500' : 'border-gray-300']"
            @click="selectTheme('light')"
        >
          <div class="absolute !-bottom-5 rounded-xl">
            <img src="/icons/light.svg" alt="light" class="theme-light" />
          </div>
          <div v-if="selectedTheme === 'light'" class="flex items-end h-full">
            <RadioButton v-model="selectedTheme" inputId="light" name="theme" value="light" />
          </div>
        </label>

        <span class="font-medium text-lg">{{$t('light')}}</span>
      </div>

      <!-- Tungi Theme Option -->
      <div class="theme-option dark:bg-transparent">
        <label
            :class="['theme-card !mb-4', selectedTheme === 'dark' ? 'border-green-500' : 'border-gray-300']"
            @click="selectTheme('dark')"
        >
          <div class="absolute !-bottom-5 !rounded-xl">
            <img src="/icons/dark.svg" alt="dark" class="theme-dark" />
          </div>
          <div v-if="selectedTheme === 'dark'" class="flex items-end h-full !bg-transparent">
            <RadioButton v-model="selectedTheme" inputId="dark" name="theme" value="dark" />
          </div>
        </label>

        <span class="font-medium text-lg">{{$t('dark')}}</span>
      </div>
    </div>
  </div>
</template>

<style>
.theme-card {
  @apply block border-2 rounded-3xl overflow-hidden cursor-pointer transition-all relative w-[265px] bg-[#F3F3F3] p-6 h-[180px] hover:shadow-md;
}
</style>