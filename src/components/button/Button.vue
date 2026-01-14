<script setup lang="ts">
type SizeButton = "sm" | "md" | "lg";
withDefaults(defineProps<{
  size?: SizeButton;
  label: string;
  variant: "primary" | "secondary" | "ghost" | "link";
  classNames?: string
  type?: "button" | "submit" | "reset";
  disabled?: boolean;

}>(), {
  size: "md",
  type: "button",
  disabled: false,
});
const getVariantClasses = (variant: string) => {
  switch (variant) {
    case "primary":
      return "bg-white text-[#111827] font-semibold py-2 px-6 hover:bg-gray-200 transition-colors duration-300";
    case "secondary":
      return "border border-[#ADABC7] text-white font-semibold hover:bg-white hover:text-black transition-colors duration-300";
    case "ghost":
      return "bg-[#D2D2D5] text-[#727272] hover:bg-white hover:text-[#FF512F] transition-colors duration-300";
    case "link":
      return "bg-transparent text-blue-500 underline hover:cursor-pointer";
    default:
      return "";
  }
};
const getSizeClasses = (size: SizeButton) => {
  switch (size) {
    case "sm":
      return "text-sm px-2 py-1";
    case "md":
      return "text-base px-6 py-2";
    case "lg":
      return "text-lg px-6 py-3";
    default:
      return "";
  }
};
</script>
<template>
  <button :class="[
    `rounded-lg font-medium transition duration-200 ease-in-out hover:cursor-pointer`,
    getVariantClasses(variant),
    size && getSizeClasses(size),
    ...classNames ? [classNames] : [],
  ]" v-bind="$attrs" :type="type" :disabled="disabled">
    {{ label }}
  </button>
</template>
