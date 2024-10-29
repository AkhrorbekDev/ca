<template>
  <div>
    <div class="fixed inset-0">
      <img src="@/assets/images/bgCar.svg" alt="Background" class="w-full h-full object-cover">
    </div>

    <div class="absolute flex justify-between w-[60%] top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
      <img src="@/assets/images/logo.svg" class="w-[217px]" alt="logo">

      <div class="bg-white rounded-[24px] !w-[396px] !px-[56px] !py-[32px]">
        <h2 class="text-[#282B30] text-[36px] mb-[20px] text-center font-600">Kirish</h2>
        <p class="text-[#292D324D] text-[16px] text-center mb-[24px]">
          Profilingizga kirish uchun ro'yxatdan o'tgan raqamingizni kiriting!
        </p>

        <label class="block mb-4">
          <span class="text-gray-700">Telefon</span>
          <input type="tel" placeholder="+998" class="w-full mt-1 p-2 border rounded-lg focus:outline-none focus:border-blue-500" />
        </label>

        <button class="w-full bg-green-500 text-white py-2 rounded-lg font-semibold hover:bg-green-600 transition">Kirish</button>
        <p class="mt-4 text-center text-gray-600">
          Platformamizda yangimisiz? <a href="#" class="text-blue-500 hover:underline">Ro'yxatdan o'tish</a>
        </p>
      </div>
    </div>
  </div>
</template>
