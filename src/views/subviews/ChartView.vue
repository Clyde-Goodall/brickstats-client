<template>
    <div class="flex flex-row h-auto flex-wrap p-10">
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
        if(!this.isDataAvailable) {
            this.$router.push('/');
        }
    },
    computed: {
        ...mapState(['transforms_data']),
        ...mapGetters(['isDataAvailable']),
        cdata() {
            return JSON.parse(JSON.stringify(this.transforms_data.monthly));
        }
    }
}
</script>