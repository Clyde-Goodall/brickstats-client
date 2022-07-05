<template>
<!-- Must be user to view this -->
    <div class="w-full h-screen">
         <Top :name="this.$route.name"></Top>
        <div class="flex flex-row h-full">
            <div class="min-w-fit h-screen flex-grow-0">
                <SideBar></SideBar>
            </div>
            <!-- the meat and potaters (charts/stats) -->
            <div class="h-full w-full overflow-y-auto" v-if="isDataAvailable">
            <!-- Sidebar will route between views here  -->
                <router-view :key="$route.fullPath">
                </router-view>
            </div>
        </div>        
   </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';

//components
import Top from "../components/Top.vue";
import BarChart from "../components/BarChart.vue";
import SideBar from "../components/SideBar.vue";
export default {
    components: { Top, BarChart, SideBar },
    data() {
        return {
            //preset some chart options 
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
}
</script>