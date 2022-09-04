<template>
    <div class="w-full h-auto flex justify-center items-center flex-col bg-gray-100 pt-48 pb-24">
        <div class="w-3/4 h-auto flex flex-wrap flex-col text-pinblack font-thin">
            <h5>BrickStats</h5>
            <p>Copyright 2022 All Rights Reserved</p>
        </div>
    </div>
</template>
<script>
    export default {
        name: 'Footer',
    }
</script>

<style scoped>
    h5 {
        @apply text-4xl;
    }
    p {
        @apply text-black text-sm;
    }
</style>