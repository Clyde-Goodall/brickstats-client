<template>
<!-- Reusable Bar Chart implementation. -->
    <div class="w-auto max-h-1/3 h-auto shadow-md rounded-lg px-12 py-3 m-2 box-border">
        <Bar 
            :chartOptions="chartOptions"
            :chartData="chartData"
            chart-id="bar-chart"
        />
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { Bar } from 'vue-chartjs';
import zoomPlugin from 'chartjs-plugin-zoom';
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js';

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);
ChartJS.register(zoomPlugin);
export default {
    components: { Bar },
    name: 'BarChart',
    props: ['cdata', 'options', 'title', 'x-axis', 'y-axis'],
    computed: {
    },
  
  mounted() {
    //pulls data from prop 
    this.chartData.labels = this.cdata.names;
    this.chartData.datasets = [ { 
        backgroundColor: 'rgba(20,30,90,1)',
        label: this.yAxis,
        data: this.cdata.totals 
        } ]
  },
  data() {
    return {
    // declaration of chart data before it gets defined because of reasons
      chartData: {
        labels: [],
        datasets: [],
      },
      chartOptions: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            x: {
                grid: {
                display: false,
                drawBorder: false,
                },
                scaleLabel: {
                    display:true,
                    labelString: this.cdata.x
                }
            },
            y: {
                grid: {
                drawBorder: false
                },
                scaleLabel: {
                    display:true,
                    labelString: this.cdata.y
                }
            }
        },
        //oom is really fucked up on here so don't use it for now
        plugins: {
            legend: {
                display: false,
            },
            title: {
                display: true,
                text: `${this.title}`,
                padding: {
                    bottom: 40
                },
                font: {
                    size: 20,
                }
            },
        }
      }
    }
  }
}
</script>