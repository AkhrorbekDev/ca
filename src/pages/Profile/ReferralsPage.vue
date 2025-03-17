<script setup>
import { ref, onMounted, watch } from 'vue';

const selectedTheme = ref('tizim');

// Cookie management functions
const setCookie = (name, value, days) => {
  const expires = new Date();
  expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
  document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/`;
};

const getCookie = (name) => {
  const cookieName = `${name}=`;
  const cookies = document.cookie.split(';');

  for (let i = 0; i < cookies.length; i++) {
    let cookie = cookies[i].trim();
    if (cookie.indexOf(cookieName) === 0) {
      return cookie.substring(cookieName.length, cookie.length);
    }
  }
  return null;
};

// Load theme preference from cookie on mount
onMounted(() => {
  const savedTheme = getCookie('theme-preference');
  if (savedTheme && ['tizim', 'yorug', 'tungi'].includes(savedTheme)) {
    selectedTheme.value = savedTheme;
    applyThemeClass(savedTheme);
  }
});

const selectTheme = (theme) => {
  selectedTheme.value = theme;
};

const applyThemeClass = (theme) => {
  // Remove existing theme classes
  document.documentElement.classList.remove('theme-tizim', 'theme-yorug', 'theme-tungi');

  // Apply new theme class
  document.documentElement.classList.add(`theme-${theme}`);

  // Handle dark mode
  if (theme === 'tungi') {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }

  // Save to cookie
  setCookie('theme-preference', theme, 365); // Store for 1 year
};

// Watch for theme changes to update the UI immediately
watch(selectedTheme, (newTheme) => {
  // Apply theme immediately when radio button is changed
  applyThemeClass(newTheme);
});
</script>

<template>
  <div class="flex flex-col !p-10 bg-white rounded-3xl h-[70vh]">
    <h2 class="text-2xl font-bold mb-8">Rejim</h2>

    <div class="grid grid-cols-1 md:grid-cols-3 !gap-8 w-full">
      <!-- Tizim sozlamalari Theme Option -->
      <div class="theme-option">
        <label
            :class="['theme-card', selectedTheme === 'tizim' ? 'border-green-500' : 'border-gray-300']"
            @click="selectTheme('tizim')"
        >
          <div class="absolute inset-0">
            <img src="/icons/auto.svg" alt="auto" class="tizim-preview" />
          </div>
          <div class="flex items-center ">
            <RadioButton v-model="selectedTheme" inputId="tizim" name="theme" value="tizim" />
          </div>
        </label>

        <span class="font-medium !mt-4">Tizim sozlamalari</span>
      </div>

      <!-- Yorug Theme Option -->
      <div class="theme-option">
        <label
            :class="['theme-card', selectedTheme === 'yorug' ? 'border-green-500' : 'border-gray-300']"
            @click="selectTheme('yorug')"
        >
          <div class="relative">
            <img src="/icons/light.svg" alt="light" class="theme-light" />
          </div>
          <div class="mt-2 flex justify-between items-center">

            <RadioButton v-model="selectedTheme" inputId="yorug" name="theme" value="yorug" />
          </div>
        </label>

        <span class="font-medium">Yorug'</span>
      </div>

      <!-- Tungi Theme Option -->
      <div class="theme-option">
        <label
            :class="['theme-card', selectedTheme === 'tungi' ? 'border-green-500' : 'border-gray-300']"
            @click="selectTheme('tungi')"
        >
          <div class="relative">
            <img src="/icons/dark.svg" alt="dark" class="theme-dark" />
          </div>
          <div class="mt-2 flex justify-between items-center">
            <RadioButton v-model="selectedTheme" inputId="tungi" name="theme" value="tungi" />
          </div>
        </label>

        <span class="font-medium">Tungi</span>
      </div>
    </div>
  </div>
</template>

<style>
.theme-card {
  @apply block border-2 rounded-3xl overflow-hidden cursor-pointer transition-all relative p-6 h-[180px] hover:shadow-md;
}

/* Optional: Theme-specific styling for the app */
:root.theme-tizim {
  --bg-primary: #ffffff;
  --bg-secondary: #f1f5f9;
  --text-primary: #333333;
}

:root.theme-light {
  --bg-primary: #ffffff;
  --bg-secondary: #f8fafc;
  --text-primary: #1e293b;
}

:root.theme-dark {
  --bg-primary: #1a1a1a;
  --bg-secondary: #2a2a2a;
  --text-primary: #f1f5f9;
}

/* Apply theme variables to the body */
body {
  background-color: var(--bg-primary, #ffffff);
  color: var(--text-primary, #333333);
  transition: background-color 0.3s, color 0.3s;
}
</style>