<template>
    <div class="w-full h-screen">
         <Top :name="this.$route.name"></Top>
        <div class="flex flex-row h-full">
            <div class="min-w-fit h-screen flex-grow-0">
                <SideBar></SideBar>
            </div>
            <!-- the meat and potaters (charts/stats) -->
            <div class="h-full w-full overflow-y-auto" v-if="isDataAvailable">
                <router-view :key="$route.fullPath">
                </router-view>
            </div>
        </div>
        <!-- sidebar region -->
        
   </div>
</template>

<script>
import { mapActions, mapState, mapGetters } from 'vuex';

//components
import Top from "../components/Top.vue";
import BarChart from "../components/BarChart.vue";
import SideBar from "../components/SideBar.vue";
export default {
    components: { Top, BarChart, SideBar },
    data() {
        return {
             options: {
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