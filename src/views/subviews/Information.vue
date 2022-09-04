<template>
    <!-- whle container -->
    <div class="min-h-screen white flex flex-wrap justify-center ">
        <!-- one mission statement row -->
        <div class="w-full h-screen white flex flex-wrap justify-between items-center box-border px-56">
            <svg
                xmlns="http://www.w3.org/2000/svg" 
                fill="none" viewBox="0 0 24 24" 
                stroke-width="1.5" 
                stroke="currentColor" 
                class="w-96 h-96 first-img"
            >
            <path 
                stroke-linecap="round" 
                stroke-linejoin="round" 
                d="M8.25 21v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21m0 0h4.5V3.545M12.75 21h7.5V10.75M2.25 21h1.5m18 0h-18M2.25 9l4.5-1.636M18.75 3l-1.5.545m0 6.205l3 1m1.5.5l-1.5-.5M6.75 7.364V3h-3v18m3-13.636l10.5-3.819" />
            </svg>
            <div class="text-left first-txt w-1/2 ">
                <h1 class="text-6xl"><b>All</b> your orders, under <b>one</b> roof</h1>
            </div>
        </div>
        <!-- second row -->
        <div class="w-full h-screen white flex flex-wrap justify-between items-center bg-pink-200 box-border px-56">
            <div class="text-left first-txt w-1/2 ">
                <h1 class="text-6xl"><b>Intelligent</b> progress tracking</h1>
            </div>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-96 h96 first-img">
                <path stroke-linecap="round" stroke-linejoin="round" d="M6.115 5.19l.319 1.913A6 6 0 008.11 10.36L9.75 12l-.387.775c-.217.433-.132.956.21 1.298l1.348 1.348c.21.21.329.497.329.795v1.089c0 .426.24.815.622 1.006l.153.076c.433.217.956.132 1.298-.21l.723-.723a8.7 8.7 0 002.288-4.042 1.087 1.087 0 00-.358-1.099l-1.33-1.108c-.251-.21-.582-.299-.905-.245l-1.17.195a1.125 1.125 0 01-.98-.314l-.295-.295a1.125 1.125 0 010-1.591l.13-.132a1.125 1.125 0 011.3-.21l.603.302a.809.809 0 001.086-1.086L14.25 7.5l1.256-.837a4.5 4.5 0 001.528-1.732l.146-.292M6.115 5.19A9 9 0 1017.18 4.64M6.115 5.19A8.965 8.965 0 0112 3c1.929 0 3.716.607 5.18 1.64" />
            </svg>
        </div>
        <!-- third row -->
        <div class="w-full h-screen white flex flex-wrap justify-between items-center bg-pink-700 box-border px-56">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-96 h-96 text-white">
                <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5M9 11.25v1.5M12 9v3.75m3-6v6" />
            </svg>

            <div class="text-left first-txt w-1/2 ">
                <h1 class="text-6xl text-white"><b>Third</b> thing</h1>
            </div>
        </div>
    </div>
</template>
<script>
    import Rellax from 'rellax'
    export default {
        name: 'Splash',
        data() {
            return {
                num_particles: 2200,
                particleVals: []
            }
        },
        mounted() {
            // console.log(this.colorIntervals())
            const first_image = new Rellax('.first-img', {
                center: true,
                speed:-1.25
            })
            const first_text = new Rellax('.first-txt', {
                center:true,
                speed: -1.5
            })

        },
     

    }
</script>

<style>
.graphic {
    width: clamp(200px, 30vw, 700px);
    height:auto;
}
</style>