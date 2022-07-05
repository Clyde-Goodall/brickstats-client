<template>
<!-- top bar -->
    <div class="top shadow-xl z-50 ">
        <h1 class="text-white text-4xl">BrickStats</h1>
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
    @apply w-full h-24 bg-black text-white text-3xl uppercase font-black flex items-center pl-8 select-none;
}
</style>
