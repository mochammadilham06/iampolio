<template>
  <section class="hero-section">
    <div class="my-10 text-center px-4 pt-24">
      <div class="text-5xl md:text-8xl font-bold text-white">
        <h1 class="tracking-widest">CREATIVE</h1>
        <div class="developer-line-wrapper w-full">DEVELOPER</div>
        <h1 class="tracking-widest">SINCE</h1>
        <h1 class="text-5xl md:text-7xl font-bold text-white mb-4">
          <span class="text-[#FF512F]">2023</span>
        </h1>

        <div class="space-y-4 flex justify-center flex-col items-center">
          <p class="text-xl md:text-2xl text white max-w-2xl font-bold my-4">
            Over the last 2y, I've empowered 4+ companies
          </p>
          <p class="text-xl md:text-2xl text-[#F5F5F5] max-w-2xl font-thin">
            Developing user-centric interfaces...
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.hero-section {
  min-height: 100vh;
  width: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.hero-section::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 23%;
  background-image: linear-gradient(to top, rgba(18, 17, 32, 1) 5%, rgba(18, 17, 32, 0) 50%), url('@/assets/bg.png');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  z-index: -1;
}

.developer-line-wrapper {
  position: relative;
  display: inline-block;
  /* Tambahan agar wrapper pas dengan teks */
}

.developer-line-wrapper::after {
  content: "";
  position: absolute;
  background-image: url('@/assets/selection.png');
  background-size: 100% 100%;
  background-repeat: no-repeat;
  width: 100%;
  height: 300%;
  top: -100%;
  left: 0%;
  z-index: -1;
}
</style>