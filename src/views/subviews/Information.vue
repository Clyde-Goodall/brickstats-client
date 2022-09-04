<template>
    <div class="w-full bg-slate-800 flex flex-wrap overflow-hidden splash-backdrop splash-rect">
       
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
            // console.log(this.colorIntervals())
            this.generateParticleVals()
            setInterval(this.regenerateVals)
        },
        methods: {
            generateParticleVals() {
                for(let i = 0; i < this.num_particles; i++) {
                    const col = this.colorIntervals()
                    // console.log(col)
                    this.particleVals.push({
                        id: i,
                        color: 'bg-' + ( col)
                    })
                }
                console.log(this.particleVals)
            },
            regenerateVals() {
                console.log('updating')
                const which = Math.floor(Math.random() * (this.num_particles - 1))
                this.particleVals[which].color = 'bg-' + this.colorIntervals()
                    // console.log(col)
            },
            // splashArrSize() {
            //     if(this.$refs['splash']) {
            //         return Math.floor((this.$refs['splash'].clientHeight) * (this.$refs['splash'].clientWidth))
            //     }
            // },
            async splashWidth() {
                if(this.$refs['splash']) {
                    return this.$refs['splash'].clientWidth
                }
            },
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
            particleClass() {
                const which = Math.floor(Math.random() * 10)
                // console.log(which)
                if(which >= 3 && which <= 6) {
                    // console.log('yup')
                    return 'bg-none'
                }
                return 'bg-gray-200'
            },
            refreshColors() {

            }

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
    height: clamp(200px, 80vh, 600px);
}
.splash-backdrop:after {
    background: rgba(0,0,0, .4);

}
.overlay {
   /* box-shadow: inset 0px 0px 300px 120px rgba(0,0,0,0.3); */
   /* backdrop-filter: blur(3px); */
   background: rgba(0,0,0, .2);
}
</style>