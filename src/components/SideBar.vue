<template>
    <div class="max-w-96 w-72 bg-gray-800 text-white h-full overflow-y-hidden flex-wrap">
        <a class="opt" name="charts" @click="swapView('charts')">Charts</a>
        <a class="opt" name="details" @click="swapView('details')">Details</a>
    </div>
</template>

<script>
export default {
    data() {
        return {

        }
    },
    methods: {
        swapView(e) {
            this.$router.push(`/dashboard/${e}`);
        }
    }
}
</script>

<style scoped>
 .opt {
   @apply block drop-shadow-sm outline-none text-xl p-5 box-border uppercase border-b w-full border-gray-900 font-bold font-sans bg-gray-700;
    text-align:left;
 }
  .opt:hover {
   @apply bg-gray-600;
 }
  .opt:active {
   @apply bg-gray-500;
 }
</style>