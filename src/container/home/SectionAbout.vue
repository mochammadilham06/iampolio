<template>
  <section class="my-10 px-4">
    <div
      v-reveal="{ stagger: 0.12, y: 60 }"
      class="max-w-4xl mx-auto rounded-2xl
                    bg-white/[0.07] backdrop-blur-md border border-white/10
                    flex flex-col md:flex-row items-center justify-between overflow-hidden
                    transition-all duration-500 hover:border-[#FF512F]/40 hover:shadow-[0_0_50px_-12px_rgba(255,81,47,0.35)]"
    >
      <div class="flex flex-col sm:flex-row items-center gap-6 p-6 md:p-8 flex-grow w-full">
        <div class="relative w-24 h-24 rounded-full overflow-hidden border-2 border-[#FF512F] flex-shrink-0 shadow-lg">
          <img
            src="../../assets/me.png"
            alt="Mochammad Ilham Maulana"
            class="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
            loading="lazy"
          />
          <div
            class="absolute bottom-1 right-1 w-6 h-6 bg-gradient-to-br from-[#FF512F] to-[#F09819] rounded-full flex items-center justify-center text-white text-[10px] font-bold border-2 border-[#1a1a1a]"
          >
            R
          </div>
        </div>

        <div class="text-center sm:text-left text-white">
          <h2 class="text-2xl md:text-3xl font-bold flex items-center justify-center sm:justify-start gap-3">
            Mochammad Ilham Maulana
            <span class="inline-block w-6 h-6">
              <img src="../../assets/svgs/id.svg" alt="ID Flag" class="w-full h-full object-contain" />
            </span>
          </h2>

          <div
            class="flex flex-wrap justify-center sm:justify-start gap-x-6 gap-y-2 text-sm md:text-base text-gray-400 mt-2"
          >
            <p class="flex items-center gap-2">
              <img src="../../assets/svgs/computer.svg" class="w-4 h-4 opacity-70" alt="" />
              <span>Software Engineer</span>
            </p>
            <p class="flex items-center gap-2">
              <img src="../../assets/svgs/map.svg" class="w-4 h-4 opacity-70" alt="" />
              <span>Jakarta, Indonesia</span>
            </p>
            <div class="flex items-center gap-2 text-green-400 font-medium">
              <span class="relative flex h-3 w-3">
                <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span class="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
              </span>
              <span>Available for Projects</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Pola titik dekoratif (pengganti gambar peta 876KB) -->
      <div class="hidden lg:block w-64 h-full overflow-hidden flex-shrink-0 self-stretch relative">
        <div class="absolute inset-0 dot-pattern opacity-60 transition-opacity duration-700 hover:opacity-100"></div>
        <div class="absolute inset-0 bg-gradient-to-l from-transparent to-[#121120]/60"></div>
      </div>
    </div>

    <div v-reveal="{ y: 40, delay: 0.15 }" class="max-w-3xl mx-auto text-center mt-10 px-2">
      <p class="text-lg md:text-xl text-gray-300 leading-relaxed font-light">
        Software Engineer with expertise in Frontend Architecture and growing proficiency in Backend Engineering.
        Currently contributing to enterprise-grade banking solutions at PT Bank Rakyat Indonesia, focusing on scalable
        Micro Frontend systems and performance optimization.
      </p>
    </div>
  </section>
</template>

<style scoped>
.dot-pattern {
  background-image: radial-gradient(rgba(255, 81, 47, 0.5) 1.5px, transparent 1.5px);
  background-size: 18px 18px;
  mask-image: linear-gradient(to bottom, rgba(0, 0, 0, 0.9), rgba(0, 0, 0, 0.2));
  -webkit-mask-image: linear-gradient(to bottom, rgba(0, 0, 0, 0.9), rgba(0, 0, 0, 0.2));
}
</style>
