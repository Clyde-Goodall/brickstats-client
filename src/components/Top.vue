<template>
<!-- top bar -->
    <div class="top">
       <span class="flex justify-between  items-top font-black text-white text-3xl "> <h1 class="text-white text-4xl uppercase">BrickStats</h1><h1 class="text-pink-500 text-2xl pl-2">Beta</h1></span>
    </div>
</template>     

<script>
export default {
    //originally took a name prop to show next to brickstats but there's not really a need unless I change my midn for some arbitrary reason
    props: ['name']
}
</script>

<style scoped>
.top {
    @apply w-full h-24 bg-black flex items-center pl-8 select-none shadow-lg z-50;
}
</style>
