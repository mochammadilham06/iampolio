<template>
    <section class="my-5">
        <div class="max-w-4xl w-3xl mx-auto rounded-xl
                bg-white/[0.07] backdrop-blur-md 
                flex flex-col md:flex-row items-center justify-between gap-4">

            <div class="flex items-center gap-4 flex-grow p-4 md:p-6">
                <div class="relative w-20 h-20 rounded-full overflow-hidden border-2 border-orange-500 flex-shrink-0">
                    <img src="../../assets/me.png" alt="Avatar" class="w-full h-full object-cover" />
                    <div
                        class="absolute bottom-0 right-0 w-6 h-6 bg-red-600 rounded-full flex items-center justify-center text-white text-xs font-bold">
                        R
                    </div>
                </div>

                <div class="text-white">
                    <h2 class="text-xl md:text-2xl font-bold flex items-center gap-2">
                        Mochammad Ilham Maulana
                        <span class="bg-white/[0.07] rounded-xl max-w-5">
                            <img src="../../assets/svgs/id.svg" class="w-full h-full rounded-xl" />
                        </span>
                    </h2>
                    <div class="flex flex-wrap gap-x-4 gap-y-1 text-sm text-gray-400 mt-1">
                        <p class="flex items-center gap-1">
                            <img src="../../assets/svgs/computer.svg" /> <span>Software Engineer</span>
                        </p>
                        <p class="flex items-center gap-1">
                            <img src="../../assets/svgs/map.svg" /> <span>Everywhere</span>
                        </p>
                        <div class="flex items-center gap-1 text-green-500">
                            <div class="p-1 rounded-full bg-[#179D59]">
                                <div class="p-[3px] rounded-full bg-green-400">

                                </div>
                            </div>
                            <span>Available</span>
                        </div>
                    </div>
                </div>
            </div>

            <div class="hidden md:block w-48 h-28 overflow-hidden flex-shrink-0">
                <img src="../../assets/indonesia.png" alt="World Map Dots"
                    class="w-full h-full object-cover opacity-100 bg-blend-multiply" />
            </div>

        </div>

        <div class="max-w-3xl mx-auto text-center my-8 text-xl opacity-70">
            Frontend Developer with several years of experience as a Developer. Multiple certifications. Passionate
            about traveling and naturally curious. Currently, I am focused on becoming a great leader and continuing to
            share.
        </div>

    </section>
</template>
