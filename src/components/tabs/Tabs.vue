<script setup>
import { ref, watchEffect } from 'vue';
import Button from '../button/Button.vue';

const props = defineProps({
    tabs: {
        type: Array,
        required: true,
    },
    initialTab: {
        type: String,
        default: null
    }
});

const emit = defineEmits(['tab-change']);
const activeTab = ref(null);

watchEffect(() => {
    if (props.initialTab && props.tabs.includes(props.initialTab)) {
        activeTab.value = props.initialTab;
    } else if (props.tabs && props.tabs.length > 0) {
        activeTab.value = props.tabs[0];
    }
});


const selectTab = (tab) => {
    activeTab.value = tab;
    emit('tab-change', tab);
};
</script>

<template>
    <div class="inline-flex items-center p-1.5 space-x-1 bg-white/5 rounded-full shadow-inner">
        <Button v-for="tab in props.tabs" :key="tab" @click="selectTab(tab)" :class="[
            'px-6 py-2 text-sm !rounded-full transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-800 focus:ring-white hover:cursor-pointer',
            {
                'bg-white text-black shadow-sm': activeTab === tab,
                'text-white bg-white/5 hover:text-white': activeTab !== tab
            }
        ]" :label="tab" />
    </div>
</template>