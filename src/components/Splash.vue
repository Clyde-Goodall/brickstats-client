<template>
    <div class="w-full h-screen bg-pink-900 flex flex-wrap overflow-hidden splash-backdrop splash-rect" ref="splash">
        <div class="h-full w-full mt-24">
            <div class="w-full h-full flex flex-wrap splash-rect" v-if="particleVals.length > 0">
                <div
                    v-for="i in [...Array(num_particles).keys()]" :key="i" :id="particleVals[i].id"
                    class="splash-particle"
                    :class="vals[i].color"
                >
                </div>
            </div>
        </div>
        
        <div class="absolute left-0 w-full h-screen overlay flex flex-col items-start justify-center box-border pl-24 splash-rect">
            <h1 class="text-white text-7xl font-bold drop-shadow-md">
                Supercharge your Shipping.
            </h1>
            <h2 class="text-5xl font-bold drop-shadow-md text-gray-50 mt-10">Brick by brick.</h2>
        </div>
    </div>
</template>
<script>

    export default {
        name: 'Splash',
        data() {
            return {
                num_particles: 2200,
                particleVals: []
            }
        },
        mounted() {
            this.num_particles = Math.floor(this.$refs['splash'].clientHeight * 3)
            this.generateParticleVals()
            setInterval(this.regenerateVals, 20)
        },
        methods: {
            generateParticleVals() {
                for(let i = 0; i < this.num_particles; i++) {
                    const col = this.colorIntervals()
                    this.particleVals.push({
                        id: i,
                        color: 'bg-' + ( col)
                    })
                }
            },
            // picks
            regenerateVals() {
                // console.log('updating')
                const which = Math.floor(Math.random() * (this.num_particles - 1))
                this.particleVals[which].color = 'bg-' + this.colorIntervals()
                    // console.log(col)
            },
            // picks colors based on range
            colorIntervals() {
                const which = Math.floor(Math.random() * 10)
                switch(which) {
                    case 0:
                        return 'white';
                    case 1: 
                        return 'pink-100'
                    case 2: 
                        return 'pink-200'
                    case 3: 
                        return 'pink-300'
                    case 4: 
                        return 'pink-400'
                    case 5: 
                        return 'pink-500'
                    case 6: 
                        return 'pink-600'
                    case 7: 
                        return 'pink-700'
                    case 8: 
                        return 'pink-800'
                    case 9: 
                        return 'pink-900'
                }
            },
            setColor() {
                return setInterval(this.colorIntervals, 2000)
            },
        },
        computed: {
            vals() {
                return this.particleVals
            }
        }
    }
</script>
<style>

.splash-particle {
    width:.2rem;
    height:.2rem;
    @apply m-2 rounded-full;
}
.splash-rect {
    height: 100vh;
}
.splash-backdrop:after {
    background: rgba(0,0,0, .4);
}
.overlay {
   /* box-shadow: inset 0px 0px 300px 120px rgba(0,0,0,0.3); */
   /* backdrop-filter: blur(3px); */
   /* background: rgba(0,0,0, .2); */
   text-shadow: 0px 3px 25px rgba(0,0,0, .35);
}
</style>