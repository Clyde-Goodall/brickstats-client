<template>
    <div class="flex flex-row h-auto flex-wrap p-10 justify-center ">
        <BarChart :cdata="cdata" :options="options" title="Month Totals"></BarChart>
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
        ...mapState(['transforms_data']),
        cdata() {
            return JSON.parse(JSON.stringify(this.transforms_data.monthly));
        }
    }
}
</script>