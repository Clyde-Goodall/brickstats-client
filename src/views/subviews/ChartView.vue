<template>
    <div class="flex flex-row h-full flex-wrap p-10 justify-center items-center">
        <h1 class="text-8xl text-pink-800 font-bold">Coming Soon</h1>
    </div>
</template>

<script>
import { mapActions, mapState, mapGetters } from 'vuex';
import BarChart from "../../components/BarChart.vue";

export default {
    components: { BarChart },
    data() {
        return {
             options: {
                legend: {
                    display: false
                },
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                yAxes: [
                    {
                    display: true,
                    ticks: {
                        suggestedMin: 0,
                        beginAtZero: true
                    }
                    }
                ]
                }
            }
        }
    },
    mounted() {
      
    },
    computed: {
        ...mapState('base', ['transforms_data']),
        cdata() {
            return JSON.parse(JSON.stringify(this.transforms_data.monthly));
        }
    }
}
</script>